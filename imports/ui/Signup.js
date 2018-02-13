import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0
        };
    }
onSubmit(event){
    event.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    if (password.length<6){return this.setState({error: 'Password must be more than 5 characters long   '})}
    Accounts.createUser({email, password}, (err) => {
        if(err){this.setState({error: err.reason});}
        else{this.setState({error: ""});}
    });
}
    render(){return(
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>Join us</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                    <input type="email" ref='email' name="email" placeholder="Email"/>
                    <input type="password" ref='password' name="password" placeholder="Password"/>
                    <button>Create account</button>
                </form>
                <p><Link to="/">Got an account?</Link></p>
            </div>
            
        </div>
    )}
}