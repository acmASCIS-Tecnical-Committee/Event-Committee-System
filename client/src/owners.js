import React from 'react';
import OwnerDitails from './owerdetails'
 
class Owners extends React.Component
{

   constructor(props){
        super(props);
        this.state={
            owners: [],
            index : 0,
            showform : this.showform.bind(this),
            addowner : this.addowner.bind(this),
            cleantextboxes : this.cleantextboxes.bind(this),
        }
     
    }
    showform=()=>{
      document.getElementById("addownerform").style.display='block';
    }
    addowner=()=>{
      document.getElementById("addownerform").style.display='none';

      const ownerInfo = {
        name : document.getElementById("ownername").value.trim(),
        email : document.getElementById("owneremail").value.trim(),
        phone : document.getElementById("ownerphone1").value.trim(),
        phone2 : document.getElementById("ownerphone2").value.trim(),
        phone3 : document.getElementById("ownerphone3").value.trim(),
        indx : this.state.index,
      }
      this.setState((prevstate)=>({
          owners : prevstate.owners.concat(ownerInfo),
          index : prevstate.index+1,
      }));
      this.cleantextboxes();
    }
    cleantextboxes=()=>{
      document.getElementById("addownerform").style.display='none';
      document.getElementById("ownername").value="";
      document.getElementById("owneremail").value="";
      document.getElementById("ownerphone1").value="";
      document.getElementById("ownerphone2").value="";
      document.getElementById("ownerphone3").value="";
    }
    render()
    {
      return(
        <div className="">
          <div className = "" >
                <h1>add owner</h1>
                <button onClick={this.showform}>add</button>
                <form onSubmit={(e)=>{e.preventDefault();}} id ="addownerform" style={{display:'none'}}> 
                  <label>name </label>
                  <input type="text" id="ownername"></input>
                  <label>email </label>
                  <input type="text" id = "owneremail"></input>
                  <label>phone </label>
                  <input type="text" id="ownerphone1"></input>
                  <input type="text" id="ownerphone2"></input>
                  <input type="text" id="ownerphone3"></input>
                  <button onClick={this.cleantextboxes}>Cancle</button>
                  <button onClick={this.addowner}>Done</button>
                </form>
                
          </div>
          <div className ="">
          {this.state.owners.map((onr)=>{
                return <div key={onr.indx}> 
                 <OwnerDitails onr = {onr} />
                </div>
              })
            }
          </div>
        </div>
      );
    }
}


export default Owners;