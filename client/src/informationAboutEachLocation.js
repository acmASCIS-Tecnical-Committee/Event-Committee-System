import React from 'react';

 class StoresInformation extends React.Component
 {
   constructor(props)
   {
       super(props);
       this.state={
           storeName:this.props.storeInfo.storeName,
           zone:this.props.storeInfo.storeZone,
           notes:this.props.storeInfo.storeNotes,
           price:this.props.storeInfo.storePrice,
           locationLink:this.props.storeInfo.storeUrl,
           phone:this.props.storeInfo.storePhone,
           lastUpdated:this.props.storeInfo.storeLastUpdate,
           days:this.props.storeInfo.storeDays
       }
   }

   render()
   {   
        return (
        <div>
            <label>Store Name: {this.state.storeName}</label>
            <label>Store Zone: {this.state.zone}</label>
            <label>Store Price: {this.state.price}</label>
            <label>Store Phone: {this.state.phone}</label>
            <label>Store Days: {this.state.days}</label>
            <label>Store Location Link: {this.state.locationLink}</label>
            <label>Notes: {this.state.notes}</label>
            <label>Last Update: {this.state.lastUpdated}</label>
        </div>
        );
   }

 }
 export default StoresInformation;