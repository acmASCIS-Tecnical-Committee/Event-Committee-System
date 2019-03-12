import React from 'react';

class ResourceOwners  extends  React.Component{
    constructor(props)
    {
        super(props);
        this.state = {owners: this.props.owner};

    }
   
    render()
    {   
        return(
            <div>
                {this.state.owners.map((onr)=>{
                
                    return (
                        <p>{onr}</p>
                    );

                 })}
            </div>
        );
    }
}

export default ResourceOwners ;