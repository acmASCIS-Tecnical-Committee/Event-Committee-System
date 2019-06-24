import React from 'react';

class Account extends React.Component{
    constructor()
    {
        super();
        this.state={
            name : "laaaaaaaaaa",
            address :"",
            email : "",
            type : "",
            mobileNumber : "",
            editYesOrNo : 0,

        }
        //Add feature to edit each.
    }
    saveAndDiableEdit=()=>{
        
        
        this.setState(()=>({
            name : document.getElementById("nametextbox").value,
            address : document.getElementById("addresstextbox").value,
            mobileNumber : document.getElementById("mobilenumbertextbox").value,
            email :document.getElementById("emailtextbox").value,
            editYesOrNo : 0,
        }));
        // document.getElementById("nametextbox").value="";
        // document.getElementById("addresstextbox").value="";
        // document.getElementById("mobilenumbertextbox").value="";
        // document.getElementById("emailtextbox").value="";
    }
    enableEdit=()=>{
        this.setState(()=>({editYesOrNo : 1}));
    }
    render()
    {
        return(
            this.state.editYesOrNo ? 
                <div>
                    <form onSubmit = {(e)=>{e.preventDefault();}}>
                    <label>Name </label> 
                    <input id="nametextbox" type = "text"  value = {this.state.name}></input>
                    <label>Address </label>
                    <input id="addresstextbox" type = "text"  value = {this.state.address}></input>
                    <label>E-mail </label>
                    <input id="emailtextbox" type = "text"  value = {this.state.email}></input>
                    <label>Mobile Number </label>   
                    <input id="mobilenumbertextbox"type = "text"  value = {this.state.mobileNumber}></input>
                    <button onClick ={this.saveAndDiableEdit}>save</button>
                    </form>
                </div>
            :   <div>
                    <label>Name : {this.state.name}</label>
                    <label>Address : {this.state.address}</label>
                    <label>E-mail : {this.state.email}</label>
                    <label>Mobile Number : {this.state.mobileNumber}</label>
                    <button onClick ={this.enableEdit}>edit</button>
                    
                </div>
            
        );
    }
}

export default Account;
