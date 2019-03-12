import React from 'react';

class OwnerDitails extends React.Component
{
    constructor(props)
    {
        super(props);
       
    }
    render()
    {
        return(
            <React.Fragment>
                <label>Name: {this.props.onr.name}</label>
                <label>E-mail: {this.props.onr.email}</label>
                <label>Phone: {this.props.onr.phone}</label>
                <label>Phone: {this.props.onr.phones2}</label>
                <label>Phone: {this.props.onr.phones3}</label>

            </React.Fragment>
        );
    }
}
 export default OwnerDitails;