import React,{Component} from 'react';
import web3 from './web3';
import Storet from './Storet';
import ipfs from './ipfs';
const ecies = require("eth-ecies");
var Buffer = require('buffer/').Buffer
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';
var toBuffer = require('typedarray-to-buffer')

export default class PatientView extends Component{
    constructor(props)
    {
        super(props);
    
    }

    viewrecords(e)
    {
        e.preventDefault()
    }

    createrecord(e)
    {
        e.preventDefault()
    }
    render()
    {
        return(
            <div className="patient-view">
                <button onClick={this.viewrecords} className="view-rec">View Patient Records</button>
                <button onClick={this.creayerecord} className="view-rec">Create new Record</button>
            </div>
        )
    }
}