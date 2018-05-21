import React , {Component} from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import Home from './Home'
import Patient from './Patient'
import Hospital from './Hospital'
import Login from './Login'
import Signup from './Signup'
import PatientView from './PatientView'

export default class Search extends Component {
    constructor(){
        super()
    }
    render(){
        return(
            <div>
            <Route exact path='/' component={Home}/>
            <Route exact path='/patient' component={Patient}/>
            <Route exact path='/hospital' component={Hospital}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/patientview/:id/:pbkey/:pvtkey' component={PatientView}/>
            </div>
        )
    }
}