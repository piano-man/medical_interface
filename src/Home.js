import React,{Component} from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom';

export default class Home extends Component{
    constructor()
    {
        super()
        this.patientclick = this.patientclick.bind(this)
        this.hospitalclick = this.hospitalclick.bind(this)
    }
    patientclick(e)
    {
        e.preventDefault();
        this.props.history.push(`/patient`)
    }
    hospitalclick(e)
    {
        e.preventDefault();
        this.props.history.push(`/hospital`)
    }
    render()
    {
        return(
            <div className="select-interface">
                <button onClick={this.patientclick} className="patient-intf">Patient</button>
                <button onClick={this.hospitalclick} className="hospital-intf">Hospital</button>
            </div>
        )
    }
}