import React , {Component} from 'react'
import styles from './css/Home.module.css'
export default class Patient extends Component{
    constructor()
    {
        super()
        this.hospitallogin = this.hospitallogin.bind(this)
        this.hospitalsignup = this.hospitalsignup.bind(this)
    }

    hospitallogin()
    {
        this.props.history.push(`/hospital_login`)
    }
    hospitalsignup()
    {
        this.props.history.push(`/hospital_signup`)
    }

    render()
    {
        return(
            <div className={styles.container}>
            <div></div>
            <div className={styles.select}>
            <div>
                <button onClick={this.hospitallogin} className="Hospital-login">LOGIN</button>
            </div>
            <div>
                <button onClick={this.hospitalsignup} className="Hospital-signup">SIGNUP</button>               
            </div>
            </div>
            <div></div>
            </div>
        )
    }
}