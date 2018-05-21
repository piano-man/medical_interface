import React , {Component} from 'react'
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
            <div className="Patient">
                <button onClick={this.patientlogin} className="Patient-login">LOGIN</button>
                <button onClick={this.patientsignup} className="Patient-signup">SIGNUP</button>               
            </div>
        )
    }
}