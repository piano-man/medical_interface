import React,{Component} from 'react'
import ipfs from './ipfs';
import web3 from './web3';
import Storet from './Storet';

export default class CreateRecord extends Component{
    constructor()
    {
        super()
        this.handlesubmit = this.handlesubmit.bind(this)
    }
    
    async getipfshash(buf)
    {
        var hash = await ipfs.add(buf)
        return hash;
    }
    async handlesubmit(e)
    {
        e.preventDefault();
        
        var pat = new Object();
        pat.pat_id = this.refs.patient_id.value;
        pat.diagnosis = this.refs.diagnosis.value;
        pat.location = this.refs.location.value;
        pat.medication = this.refs.medication.value;
        pat.suggestion = this.refs.suggestion.value;
        pat.next_review = this.refs.next_review.value;
        pat.notes = this.refs.notes.value;
        pat.date = this.refs.date.value
        console.log(pat);
        let response = await fetch(`http://localhost:5000/hospitalencrypt/${this.refs.patient_id.value}/${this.props.match.params.id}`,{
            method:"POST",
            mode:"cors",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            cache: 'default',
            body:JSON.stringify({"pat":pat})
        })
        let response_json = await response.json()
        console.log(response_json.result)
        console.log(response)
        var buf = Buffer.from(response_json.result, 'utf8');
        var hash = await this.getipfshash(buf)
        console.log(hash)
        var fhash = hash[0].hash
        console.log(fhash)
        Storet.storeHash(pat.pat_id,web3.fromAscii(fhash.substr(0,24)),web3.fromAscii(fhash.substr(24,46)),{from: web3.eth.accounts[2], gas:3000000});
        var l2 = Storet.getPatientHash("1234",{from: web3.eth.accounts[2], gas:3000000}).toString();
        console.log(l2)
    }

    
    render(){
        return(
            <div className="Signup">
                <div className="Signup-form">
                    <form onSubmit={this.handlesubmit}>
                        <input ref = "patient_id" className = "patient_id" type = "text" placeholder = "Enter Patient ID" />
                        <br/>
                        <input ref = "diagnosis" className = "diagnosis" type = "text" placeholder = "Enter Diagnosis" />
                        <br/>
                        <input ref = "date" className = "date" type = "text" placeholder = "Enter Date" />
                        <br/>
                        <input ref = "location" className = "location" type = "text" placeholder = "Enter Location" />
                        <br/>
                        <input ref = "medication" className = "medication" type = "text" placeholder = "Enter Medication" />
                        <br/>
                        <input ref = "suggestion" className = "suggestion" type = "text" placeholder = "Enter Suggestion" />
                        <br/>
                        <input ref = "next_review" className = "next_review" type = "text" placeholder = "Enter Next Review" />
                        <br/>
                        <input ref = "notes" className = "notes" type = "text" placeholder = "Enter Additional Notes" />
                        <br/>
                        <button className="signup-page_button">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}