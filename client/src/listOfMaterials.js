import React from 'react';
import AMaterial from './aMaterial.js'
 
class Materials extends React.Component
{

   constructor(props){
        super(props);
        this.state={
            materials: [],
            textInTexbox : "",
            index : 0,
            shownPlusButton : 1,
            hidePlusButton : this.hidePlusButton.bind(this),
            addMaterial : this.addMaterial.bind(this),
        }
     
    }
    componentDidMount()
    {
        document.getElementById("textbox").style.display = 'none';
        document.getElementById("addMaterialButton").style.display = 'none';
        document.getElementById("plusMaterialButton").style.display = 'block';
    }
    hidePlusButton=()=>{
        document.getElementById("textbox").style.display = 'block';
        document.getElementById("addMaterialButton").style.display = 'block';
        document.getElementById("plusMaterialButton").style.display = 'none';
    
    }
    addMaterial=()=>{
        
            this.state.textInTexbox = document.getElementById("textbox").value;
            this.state.textInTexbox.trim();

            if(this.state.textInTexbox){

                this.setState((prevstate)=>({
                materials : prevstate.materials.concat( {name:this.state.textInTexbox , index: this.state.index}),
                index : prevstate.index +1,
                }));
                
                document.getElementById("textbox").value="";
            }
            document.getElementById("textbox").style.display = 'none';
            document.getElementById("addMaterialButton").style.display = 'none';
            document.getElementById("plusMaterialButton").style.display = 'block';
            
    }
    
    render()
    {
      return(
        <div className="">
            <div className = "" >
                <h1>Materials  </h1> 
                              
                <input type="text" id = "textbox"  ></input>
                <button id="addMaterialButton" onClick={this.addMaterial}>add</button>
                <button id="plusMaterialButton"onClick={this.hidePlusButton}  >plus</button>
            </div>
            <div className ="">
                {this.state.materials.map((materialItem)=>{
                        return <div>
                            <p>{materialItem.name}</p>
                            <AMaterial name = {materialItem.name} index ={materialItem.index} />
                            </div>
                    })
                    }
            </div>
        </div>
      );
    }
}


export default Materials;