import React,{Component} from 'react';
import styles from './css/Home.module.css'
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
            <div className={styles.container}>
            <div></div>
            <div className={styles.select}>
                <div>
                    <button onClick={this.patientclick} className="patient-intf">Patient</button>
                </div>
                <div>    
                    <button onClick={this.hospitalclick} className="hospital-intf">Hospital</button>
                </div>
            </div>
            <div></div>
            </div>
        )
    }
}