import React,{Component} from 'react'
import web3 from './web3';
import ipfs from './ipfs'
const ecies = require("eth-ecies");
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';
    
export default class Test extends Component{
    constructor(props)
    {
        super(props)
        this.decrypt = this.decrypt.bind(this)
    }

        async decrypt(privateKey, encryptedData) {
        let userPrivateKey = new Buffer(privateKey, 'hex');
        let bufferEncryptedData = new Buffer(encryptedData, 'base64');
        let decryptedData = ecies.decrypt(userPrivateKey, bufferEncryptedData);
        return decryptedData.toString('utf8');
    }

    async getHospitals()
    {
        console.log("in here")
        var temp1="B/9Z1awURZ4x46HpwAc0FARGaFXUGig7eLn2h5HcejkB79JLkDbYp5916yKvfHJTjnAljYxLa4UxFCYDfeutp9H67gO+H8Lw/zhrdh2UWYIU1BTAj1YSAqneb4XuZaih6GXFv/mUaed8r9yRhLHs6+GQ1qdD1mqhKhZEbB9/Y5MafUO/N0f0/ZB3T8Tr1zD04A=="
var temp2="616c0f618793eb4ffc03ddcc793e451803067d8d3cde435fd7a517c7c290cf20"
var fans = await this.decrypt(temp2.toString(),temp1.toString());
console.log(fans)
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