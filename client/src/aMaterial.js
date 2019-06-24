import React from 'react';
import StoresInformation from './informationAboutEachLocation'

 class AMaterial extends React.Component
 {
     constructor(props)
     {
         super(props);
         this.state={
           name : "",
           adddetails : this.adddetails.bind(this),
           addStore:this.addStore.bind(this),
           show_hideDetails : this.show_hideDetails.bind(this),
           details : [],
           indxDetails : 0,
         }
     }
    addStore=(e)=>
    { 
        document.getElementById("detailsForm"+this.props.index).style.display ='none';
            const obj = { 
            storeName : document.getElementById("name"+e.target.id).value,
            storeZone : document.getElementById("zone"+e.target.id).value,
            storePhone: document.getElementById("phone"+e.target.id).value,
            storeNotes: document.getElementById("notes"+e.target.id).value,
            storeUrl : document.getElementById("URL"+e.target.id).value,
            storeDays: document.getElementById("days"+e.target.id).value,
            storeLastUpdate: document.getElementById("lastUpdate"+e.target.id).value,
            storePrice: document.getElementById("price"+e.target.id).value
            
            };
        this.setState((prevstate)=>({
            details : prevstate.details.concat(obj)    
        })); 
    }
    adddetails=(e)=>{        
        document.getElementById("detailsForm"+this.props.index).style.display ='block';

      
       
    }
    show_hideDetails=(e)=>{
        var x = document.getElementById("details"+this.props.index);
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
            
        }
    }
    render()
    {
        return(
        <React.Fragment>
        <div>{this.state.name +"  "+ this.props.index}</div>
        
        <button onClick={this.show_hideDetails} id={"arrow"+this.props.index}>arrow</button>
        <button onClick={this.adddetails} id={"adddetails"+this.props.index}>add</button>

        <form id={"detailsForm"+this.props.index} style={{display:"none"}} onSubmit={(e)=>{e.preventDefault();}}>
                <label>store name</label>
                <input id={"name"+this.props.index} placeholder="store name"></input>
                <label>store zone</label>
                <input id={"zone"+this.props.index} placeholder="store zone"></input>
                <label>store phone</label>
                <input id={"phone"+this.props.index} placeholder="store phone"></input>
                <label>store notes</label>
                <input id={"notes"+this.props.index} placeholder="store notes"></input>
                <label>store Price</label>
                <input id={"price"+this.props.index} placeholder="store Price"></input>
                <label>store link</label>
                <input id={"URL"+this.props.index} placeholder="store link"></input>
                <label>when Open</label>
                <input id={"days"+this.props.index} placeholder="when Open"></input>
                <label>last update</label>
                <input id={"lastUpdate"+this.props.index} placeholder="last update"></input>
                <button id={this.props.index} onClick={this.addStore}>Done</button>
        </form>
        <div id = {"details"+this.props.index}>
            {this.state.details.map((dt)=>{
                            return <React.Fragment>
                                <StoresInformation storeInfo ={dt} />
                                <button>delete</button>
                                <button>update</button>

                            </React.Fragment>
                        })
                        }
        </div>
        </React.Fragment>
    );
        
    }
   
 }

export default AMaterial;