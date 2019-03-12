import React from 'react';

import {BrowserRouter, Route , Link} from 'react-router-dom'

class Login extends React.Component{
    
    constructor(){
    
        super();
        
    }
    
    render ()
    {
        return(
        <div className="form"  onsubmit="check()">
            <h1>Events</h1>
            <h1>Committee</h1>
            <form name ="form1">
                <h1>Log in</h1>
                <br></br>
                <label>Username</label> <input type="text"  name="usernam"></input>
                <label>Password</label>   <input type="password"   name="passwrd"  ></input>
                <input type="submit" value="submit" onClick={this.moveToList}></input>
                 
                <br></br><br></br><br></br>
                <label>Don't have an account ?</label> <Link to="/register">Sign up</Link>
            </form>

        </div>
        );
    }

}
export default Login;
 
 