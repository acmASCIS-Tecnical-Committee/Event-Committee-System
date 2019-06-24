import React from 'react';
import ResourceOwners from './resoureowners'
class Resources extends React.Component{
    constructor(){
        super();
        this.state={
            resources : [],
            arrayOfOwners:['loly','khadiga','nada'],
            index : 0,
            addto : this.addto.bind(this),
            addResource : this.addResource.bind(this),
            showaddform : this.addResource.bind(this),
        }
    }
    showaddform=()=>
    {
        document.getElementById("addResourcesFrom").style.display='block';
    }
    addResource=()=>{
        let arr =  [];
        var elements = document.getElementById("addResourcesFrom").elements;

        for (var i = 0, element; element = elements[i++];) {
            if (element.type === "checkbox" && element.checked)
            { 
                arr.push(element.value);
                
            }
        }

        const resObj = {
            name :   document.getElementById("rsourcename").value,
            details : document.getElementById("rsourcedetails").value,
            feedback :  document.getElementById("rsourcefeedback").value,
            lastupdted :  document.getElementById("rsourcelastupdated").value,
            arrofcheckedowners : arr,


        }
        this.setState((prevstate)=>({
            resources : prevstate.resources.concat(resObj

            ),
        }));

    }
    addto=(e)=>{
        e.preventDefault();

    }
    render()
    {
        return(
            <div>
                <div>
                    <h2>Add Resource</h2>
                    <button onClick={this.showaddform}>Add</button>
                    <form id ="addResourcesFrom" onSubmit={this.addto} style={{display:'none'}}>
                        <label>Name</label>
                        <input type="text" id="rsourcename"></input>
                        <label>Details</label>
                        <input type="text" id="rsourcedetails"></input>
                        <label>Feedback</label>
                        <input type="text" id="rsourcefeedback"></input>
                        
                        {   
                           
                            this.state.arrayOfOwners.map((onr)=>{
                                
                                return(
                                    <div>
                                        <input type="checkbox" value={onr} id ={"owner"}></input>
                                        <label>{onr}</label>
                                    </div>
                                );
                                
                             })
                        }
                        
                        <label>Last Updated</label>
                        <input type="text" id="rsourcelastupdated"></input>
                        <button>Cancle</button>
                        <button onClick={this.addResource}>Done</button>
                    </form>
                </div>
                <div>
                    {this.state.resources.map((rsrs)=>{ 
                        return(
                            <div>
                        <label>name: {rsrs.name}</label>
                        <label>details: {rsrs.details}</label>
                        <label>feedback: {rsrs.feedback}</label>
                        <label>last updted: {rsrs.lastupdted}</label>
                        <React.Fragment>
                                names: 
                               <ResourceOwners owner  = {rsrs.arrofcheckedowners} />
                        </React.Fragment>
                        </div>
                        );
                    })

                    }
                </div>
            </div>                
        );
    }
}

export default Resources;