import React , {Component} from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import Home from './Home'
import Patient from './Patient'
import Hospital from './Hospital'

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
            </div>
        )
    }
}