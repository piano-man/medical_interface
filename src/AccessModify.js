import React,{Component} from 'react'
import web3 from './web3';
import ipfs from './ipfs'
import Access from './Access'
const ecies = require("eth-ecies");
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

    
export default class AccessModify extends Component{
    constructor(props)
    {
        super(props)
        this.getHospitals = this.getHospitals.bind(this)
        this.grantaccess = this.grantaccess.bind(this)
        this.revokeaccess = this.revokeaccess.bind(this)
        this.getipfshash = this.getipfshash.bind(this)
    }

    async getHospitals()
    {
        let response = await fetch(`http://localhost:5000/getHospitals`)
        let response_json = await response.json()
        console.log(response_json.result)
        console.log(this.props.hashes)
        console.log(this.props.records)
    }  

    async getipfshash(buf)
    {
        var hash = await ipfs.add(buf)
        return hash;
    }
    async grantaccess(e)
    {
        e.preventDefault()
        var hashes = this.props.hashes
        var records = this.props.records
        var hkey = this.refs.hname.value;
        var rhash = this.refs.rhash.value;
        var combkey = this.props.match.params.id+hkey
        var ind = hashes.indexOf(rhash)
        console.log(ind)
        var rec = records[ind]
        console.log("hello")
        console.log(rec)
        //var ans = this.encrypt(hkey.toString(),rec.toString())
        var ans = await fetch(`http://localhost:5000/encryptrecord`,{
            method:"POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({"data":rec,
        "pbkey":hkey})
        })
        var ans_json = await ans.json();
        console.log(ans_json.encryptedData)
        var buf = Buffer.from(ans_json.encryptedData, 'utf8');
        var hash = await this.getipfshash(buf)
        var fhash = hash[0].hash
        console.log(fhash)
        Access.GrantAccess(combkey,web3.fromAscii(fhash.substr(0,24)),web3.fromAscii(fhash.substr(24,46)),{from: web3.eth.accounts[2], gas:3000000})
        console.log("success")
    }

    async revokeaccess(e)
    {
        e.preventDefault() 
        var hname = this.refs.hnamerevoke.value;
        var combkey = this.props.match.params.id+hname
        console.log(combkey)
        Access.RevokeAccess(combkey.toString(),{from: web3.eth.accounts[2], gas:3000000})
        console.log("revoke success")

    }

    componentDidMount()
    {
        this.getHospitals()
    }
    render()
    {
        return(
            <div>
                    <form onSubmit={this.grantaccess}>
                        <input ref="hname" className="hospital-name" type="text" placeholder="Enter Hospital Name" />
                        <input ref="rhash" className="record-hash" type="text" placeholder="Enter Hash of Record" />
                        <button className="signup-page_button">Grant Access</button>
                    </form>
                    <form onSubmit={this.revokeaccess}>
                        <input ref="hnamerevoke" className="hospital-name-revoke" type="text" placeholder="Enter Hospital Name" />
                        <button className="signup-page_button">Revoke Access</button>
                    </form>
            </div>
        )
    }
}