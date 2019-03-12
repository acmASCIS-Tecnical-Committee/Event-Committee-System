import React from 'react';

import Login from "./login"
//import './style.scss'
import {BrowserRouter, Route , Link} from 'react-router-dom'

class Register extends React.Component{
    
    constructor(){
        super();
        this.state = {
            nameError : "",
            emailError : "",
            PhoneError : "",
            passwordError : "", 
            phones: [], 
            p1 : 0 ,
            p2 : 0 ,
            p3 : 0 ,
            p4 : 0 ,
            p1True : this.p1True.bind(this),
            formSubmit : this.formSubmit.bind(this),
        };
    }
    //it checks if the text boxes are field and if the passwords match
    // checkInput=()=>{
    //     var elements = document.getElementById("registrationForm").elements;

    //     for (var i = 0, element; element = elements[i++];) {
    //         if (element.type === "text" && element.value === "")
    //             {this.setState(()=>({completeData:0})); break;}
    //     }

    //     if(this.state.completeData==1)
    //     {
    //         if(document.getElementById("p1").value != document.getElementById("p2").value)
    //         {
    //             this.setState(()=>({matchPasswords:0}));
    //         }
    //     }
    // }
    formSubmit=(e)=>{
        e.preventDefault();
        var name = document.getElementsByName("name");
        var email = document.getElementsByName("email");
        var address = document.getElementsByName("address");
        
    }
    p1True=()=>{
        this.setState(()=>({p1 : 1}));
    }
    p2True=()=>{
        this.setState(()=>({p2 : 1}));
    }
    p3True=()=>{
        this.setState(()=>({p3 : 1}));
    }
    p4True=()=>{
        this.setState(()=>({p4 : 1}));
    }
    render ()
    {
        return(
        <div className="form"  >
            <h1>Events</h1>
            <h1>Committee</h1>
            <form id="registrationForm" name ="registrationForm" onsubmit={this.formSubmit} >
                <h1>Register</h1>
                <br></br>
                <label>Username</label> <input type="text" name="name"></input>
                <label>{}</label>
                <br></br>
                <label>E-mail</label>  <input type="text" name="email"></input>
                <label>{}</label>
                <br></br>

                <label>Mobile</label>  
                
                <input type="text" name="mobile1"></input> 
                <button onClick={this.p1True} type = "button">+</button>
                 
                {   this.state.p1==1 ? 
                        <React.Fragment> 
                        <br></br>
                        <input type="text" name="mobile2"></input> 
                        <button onClick={this.p2True} type = "button">+</button> 
                        </React.Fragment>
                    :   undefined 
                } 
                 
                {   this.state.p2==1 ? 
                        <React.Fragment>
                        <br></br> 
                        <input type="text" name="mobile3"></input> 
                        <button onClick={this.p3True} type = "button">+</button> 
                        </React.Fragment>
                    :   undefined 
                }
                 
                {   this.state.p3==1 ? 
                        <React.Fragment> 
                        <br></br>
                        <input type="text" name="mobile4"></input> 
                        <button onClick={this.p4True} type = "button" >+</button> 
                        </React.Fragment>
                    :   undefined 
                }
                 
                {   this.state.p4==1 ? 
                        <React.Fragment>
                            <br></br>
                            <input type="text" name="mobile5"></input> 
                        </React.Fragment>
                       
                    :   undefined 
                }
                <br></br>
                <label>{}</label>
                <label>Address</label>  <input type="text" name="mddress"></input>
                <br></br>
                <label>Password</label>   <input type="password"  name="password1" method="post" ></input>
                <br></br>
                <label>Re-enter passowrd</label>  <input type="password"   name="password2"></input>
                <label>{}</label>
                <input type="submit" value="submit" ></input>
                 
                <br></br><br></br><br></br>
                <label>Already have an account ?</label> <Link to="/login">log in</Link>            </form>

        </div>
        );
    }

}
 



   
   
export default Register;
 
 