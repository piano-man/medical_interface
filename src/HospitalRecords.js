import React,{Component} from 'react';
import web3 from './web3';
import Storet from './Storet';
import ipfs from './ipfs';
import Access from './Access';
import styles2 from './css/Signup.module.css'
const ecies = require("eth-ecies");
var Buffer = require('buffer/').Buffer
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

export default class HospitalRecords extends Component{
    constructor(props)
    {
        super(props)
        //this.getPatientList = this.getPatientList.bind(this)
        this.viewrecords = this.viewrecords.bind(this)
        this.decrypt = this.decrypt.bind(this)
        this.keydecrypt = this.keydecrypt.bind(this)
        this.retrieveIpfs = this.retrieveIpfs.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
        this.state = {

        }
    }

    async viewrecords(e)
    {
        e.preventDefault()
        console.log("viewing records")
        var arr = new Array()
        var arrhash = new Array()
        const rel = Access.ViewAccess(this.refs.patid.value+this.props.match.params.pbkey).toString()
        console.log(rel)
        var len = rel.split(',').length
        for(var i=0;i<len;i+=2)
        {
            var ipfsdata
            var hash = web3.toAscii(rel.split(',')[i]).replace(/[^a-zA-Z0-9]/g, "")+web3.toAscii(rel.split(',')[i+1]).replace(/[^a-zA-Z0-9]/g, "")
            console.log(hash)
            arrhash.push(hash)
            var ipfsdata = await this.retrieveIpfs(hash)
            console.log(ipfsdata)
            arr.push(ipfsdata);  
                      
        }
        this.setState({
            ipfsdata:arr,
            hashes:arrhash
        })
    }

    async getPatientList()
    {
        console.log("requesting")
        let response = await fetch(`http://localhost:5000/getPatientList/${this.props.match.params.id}`)
        console.log("data received")
        let response_json = await response.json()
        var arr = response_json.result;
        console.log(arr)
        this.setState({
            list:arr
        })
    }

    async decrypt(privateKey, encryptedData) {
        //console.log(privateKey)
        //console.log(encryptedData)
        let userPrivateKey = new Buffer(privateKey, 'hex');
        let bufferEncryptedData = new Buffer(encryptedData, 'base64');
        console.trace()
        let decryptedData = ecies.decrypt(userPrivateKey,bufferEncryptedData);
        console.trace()
        console.log(decryptedData)
        return decryptedData.toString('utf8');
    }

    async keydecrypt(text,password){
        var decipher = await crypto.createDecipher(algorithm,password)
        var dec = await decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }

    async retrieveIpfs(hash)
    {
            var idata = await ipfs.cat(hash)
            var ipfsdata = idata.toString('utf8')
            return ipfsdata
    }

    async handlesubmit(e)
    {
        e.preventDefault();
        var farray = new Array()
        var pwd = this.refs.dpwd.value
        var epvtkey = this.props.match.params.pvtkey
        // console.log(epvtkey)
        var pvtkey = await this.keydecrypt(epvtkey,pwd)
        // console.log("here")
        //console.log(pvtkey.substr(7))
        var fpvtkey = pvtkey.substr(7)
        var arr = this.state.ipfsdata
        var hasharr = this.state.hashes
        var len = arr.length
        for(var i = 0;i<len;i++)
        {
            // console.log("in loop")
            // console.log(arr[0])
            // console.log(fpvtkey)
            var fdata = await this.decrypt(fpvtkey.toString(),arr[i].toString())
           console.log(fpvtkey.toString())
           console.log(arr[i].toString())
        console.log(fdata)
            var final_data = JSON.parse(fdata)
            console.log(final_data)
            farray.push(final_data)
        }
        console.log(farray)
        this.setState({
            final_record:farray//array of json objects 
        })

    }

    componentDidMount()
    {
        this.getPatientList()
    }

    renderList(record){
        return(
            <div>
            <li>{record.date}</li>
            </div>
        )
    }
    render(){
        if(this.state.final_record!=null)
        {
            return(
                <div>
                <ul>
                {this.state.final_record.map(this.renderList)}
                </ul>
                </div>
            )
        }
        if(this.state.ipfsdata!=null&&this.state.final_record==null)
        {
            return(
                <div>
                    <form onSubmit={this.handlesubmit}>
                        <input ref="dpwd" className="decryption-password" type="text" placeholder="Enter Decryption Password" />
                        <button className="signup-page_button">Decrypt Records</button>
                    </form>
                </div>
            )
        }
        return(
            <div className={styles2.signup}>
            <div></div>
                <div className={styles2.form}>
                    <form className={styles2.insideform} onSubmit={this.viewrecords}>
                        <input ref="patid" className="login-page_input" type="text" placeholder="Enter Patient ID" />
                        <button className="login-page_button">View Records</button>
                    </form>
                </div>
                <div></div>
            </div>
        )
    }
}