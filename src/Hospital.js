import React , {Component} from 'react'
export default class Patient extends Component{
    constructor()
    {
        super()
    }

    patientlogin()
    {
        this.props.history.push(`/hospital_login`)
    }
    patientsignup()
    {
        this.props.history.push(`/hospital_signup`)
    }

    render()
    {
        return(
            <div className="Hospital">
                <button onClick={this.patientlogin} className="Hospital-login">LOGIN</button>
                <button onClick={this.patientsignup} className="Hospital-signup">SIGNUP</button>               
            </div>
        )
    }
}