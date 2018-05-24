import React , {Component} from 'react'
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
            <div className="Hospital">
                <button onClick={this.hospitallogin} className="Hospital-login">LOGIN</button>
                <button onClick={this.hospitalsignup} className="Hospital-signup">SIGNUP</button>               
            </div>
        )
    }
}