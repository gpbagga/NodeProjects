import './App.css';
import React, { useRef } from 'react';

import Header from './components/Header';
import Quotation  from './components/Quotation';
import Footer from './components/Footer';
import ReactToPrint from 'react-to-print';

function App() {

  const componentRef = useRef();
  
  const [quotationData, setQuotationData] = React.useState();

  React.useEffect(()=>{
    
    window.ZOHO.embeddedApp.on("PageLoad",function(data)
    {
      console.log(data);
      window.ZOHO.CRM.API.getRecord({Entity:data.Entity, RecordID:data.EntityId[0]})
      .then(function(data2){
          
          console.log(data2)
          //Billing_City, Billing_Code, Billing_Country, Billing_State, Billing_Street, Created_Time, id as ref#, 
          if(data2.data.length > 0){
            const record = data2.data[0]
            const temp = {}
            for(const k in record){
              switch(k){
                case "Billing_City":
                case "Billing_Code":
                case "Billing_Country":
                case "Billing_State":
                case "Billing_Street":
                case "Created_Time":
                case "Quote_Number":
                case "Product_Details":
                case "Tax":
                  temp[k] = record[k]
                  break
              }
            }
          
            setQuotationData(temp)
          }
      })
      //Custom Business logic goes here
    })

    /*
    * initializing the widget.
    */
    window.ZOHO.embeddedApp.init();

  },[])
  
  return (
    <>   
    <ReactToPrint
      trigger={() => 
        <button >Print this out!</button>
      }
      content={() => componentRef.current}
    />
        
     <div className='parentContainer' ref={componentRef} >
      <Header/>
      
      <Quotation
      data={quotationData}
      />
        
      <Footer />

   
     </div> 
    </>
 
  );
 
}

export default App;
