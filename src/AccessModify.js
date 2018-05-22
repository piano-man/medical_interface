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
        this.grantaccess = this.grantaccess.bind(this)
        this.grantaccess2 = this.grantaccess2.bind(this)
    }

    async getHospitals()
    {
        let response = await fetch(`http://localhost:5000/getHospitals`)
        let response_json = await response.json()
        console.log(response_json.result)
        console.log(this.props.hashes)
        console.log(this.props.records)
    }
    async grantaccess()
    {
        var hname = this.refs.hname.value;
        var rhash = this.refs.rhash.value;
        var combkey = this.props.match.params.id+hname
        Access.GrantAccess(combkey,web3.fromAscii(rhash.substr(0,24)),web3.fromAscii(rhash.substr(24,46)),{from: web3.eth.accounts[2], gas:3000000})
    }

    async revokeaccess()
    { 
        var hname = this.refs.hnamerevoke.value;
        var combkey = this.props.match.params.id+hname
        Access.RevokeAccess(combkey)

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