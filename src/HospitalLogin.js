import React,{Component} from 'react'
import styles from './css/Signup.module.css';
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';
export default class HospitalLogin extends Component{
    constructor()
    {
        super()
        this.handlesubmit2 = this.handlesubmit2.bind(this)
        this.decrypt = this.decrypt.bind(this)
    }
    async handlesubmit2(e)
    {
        e.preventDefault()
        var id = this.refs.patid.value
        var pwd = this.refs.lpwd.value
        let response = await fetch(`http://localhost:5000/hospitallogin/${id}/${pwd}`)
        let response_json = await response.json();
        let result = response_json.result;
        console.log(result)
        if(result!="Error")
        {
            this.props.history.push(`/hospitalview/${result.id}/${result.pbkey}/${result.pvtkey}`)

        }

    }
    async decrypt(text,password){
        var decipher = crypto.createDecipher(algorithm,password)
        var dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }
    render(){
        return(
            <div className={styles.signup}>
            <div></div>
                <div className={styles.form}>
                    <form className={styles.insideform} onSubmit={this.handlesubmit2}>
                        <input ref="patid" className="login-page_input" type="text" placeholder="Enter Hospital ID" />
                        <input ref="lpwd" className="login-page_input" type="text" placeholder="Enter Login Password" />
                        <button className="login-page_button">Submit</button>
                    </form>
                </div>
            <div></div>
            </div>
        )
    }
}