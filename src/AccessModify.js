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
        this.handlesubmit = this.handlesubmit.bind(this)
        this.handlesubmit2 = this.handlesubmit2.bind(this)
    }

    async getHospitals()
    {
        let response = await fetch(`http://localhost:5000/getHospitals`)
        let response_json = await response.json()
        console.log(response_json.result)
        console.log(this.props.hashes)
        console.log(this.props.records)
    }
    async handlesubmit()
    {
        var hname = this.refs.hname.value;
        var rhash = this.refs.rhash.value;
    }

    async handlesubmit2()
    {

    }

    componentDidMount()
    {
        this.getHospitals()
    }
    render()
    {
        return(
            <div>
                    <form onSubmit={this.handlesubmit}>
                        <input ref="hname" className="hospital-name" type="text" placeholder="Enter Hospital Name" />
                        <input ref="rhash" className="record-hash" type="text" placeholder="Enter Hash of Record" />
                        <button className="signup-page_button">Grant Access</button>
                    </form>
                    <form onSubmit={this.handlesubmit2}>
                        <input ref="hnamerevoke" className="hospital-name-revoke" type="text" placeholder="Enter Hospital Name" />
                        <button className="signup-page_button">Revoke Access</button>
                    </form>
            </div>
        )
    }
}