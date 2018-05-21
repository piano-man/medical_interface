import React,{Component} from 'react';
import web3 from './web3';
import Storet from './Storet';
import ipfs from './ipfs';
const ecies = require("eth-ecies");
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

export default class PatientView extends Component{
    constructor()
    {
        super();
        this.viewrecords = this.viewrecords.bind(this)
        this.accessgrant = this.accessgrant.bind(this)
        this.accessrevoke = this.accessrevoke.bind(this)
        this.retrieveIpfs = this.retrieveIpfs.bind(this)
        this.keydecrypt = this.keydecrypt.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
        this.state={}
    }

    async decrypt(privateKey, encryptedData) {
        let userPrivateKey = new Buffer(privateKey, 'hex');
        let bufferEncryptedData = new Buffer(encryptedData, 'base64');

        let decryptedData = await ecies.decrypt(userPrivateKey, bufferEncryptedData);
        
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
    async viewrecords()
    {
        var arr = new Array()
        const rel = Storet.getPatientHash(this.props.match.params.pbkey).toString()
        var len = rel.split(',').length
        for(var i=0;i<len;i+=2)
        {
            var ipfsdata
            var hash = web3.toAscii(rel.split(',')[i]).replace(/[^a-zA-Z0-9]/g, "")+web3.toAscii(rel.split(',')[i+1]).replace(/[^a-zA-Z0-9]/g, "")
            console.log(hash)
            var ipfsdata = await this.retrieveIpfs(hash)
            console.log(ipfsdata)
            arr.push(ipfsdata);  
                      
        }
        this.setState({
            ipfsdata:arr
        })
    }

    async handlesubmit(e)
    {
        e.preventDefault();
        var farray = new Array()
        var pwd = this.refs.dpwd.value
        var epvtkey = this.props.match.params.pvtkey
        console.log(epvtkey)
        var pvtkey = await this.keydecrypt(epvtkey,pwd)
        console.log("here")
        console.log(pvtkey.substr(7))
        var fpvtkey = pvtkey.substr(7)
        var arr = this.state.ipfsdata
        var len = arr.length
        for(var i = 0;i<len;i++)
        {
            console.log("in loop")
            var fdata = await this.decrypt(fpvtkey,arr[i])
            console.log(fdata)
            var final_data = JSON.parse(fdata)
            farray.push(final_data)
        }
        this.setState({
            final_record:farray//array of json objects 
        })

    }
    accessmodify()
    {
        this.props.history.push(`/access`)
    }
    render()
    {
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
        if(this.state.final_record!=null)
        {
            return(
                <div>

                </div>
            )
        }
        return(
            <div className="patient-view">
                <button onClick={this.viewrecords} className="view-rec">View Records</button>
                <button onClick={this.accessmodify} className="access-grant">Modify Access</button>
            </div>
        )
    }
}