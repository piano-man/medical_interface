import React , {Component} from 'react'
import styles from './css/Home.module.css'
export default class Patient extends Component{
    constructor()
    {
        super()
        this.patientlogin = this.patientlogin.bind(this)
        this.patientsignup = this.patientsignup.bind(this)
    }
    patientlogin()
    {
        this.props.history.push(`/login`)
    }
    patientsignup()
    {
        this.props.history.push(`/signup`)
    }

    render()
    {
        return(
            <div className={styles.container}>
            <div></div>
            <div className={styles.select}>
            <div>
                <button onClick={this.patientlogin} className="Patient-login">LOGIN</button>
            </div>
            <div>   
                <button onClick={this.patientsignup} className="Patient-signup">SIGNUP</button>               
            </div>
            </div>
            <div></div>
            </div>
        )
    }
}