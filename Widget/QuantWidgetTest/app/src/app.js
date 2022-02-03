function App () {
  const componentRef = React.useRef()
  const handlePrint = ReactToPrint.useReactToPrint({
    content: () => componentRef.current,
  });
  React.useEffect(()=>{
    
    ZOHO.embeddedApp.on("PageLoad",function(data)
    {
      console.log(data);
      ZOHO.CRM.API.getRecord({Entity:data.Entity, RecordID:data.EntityId[0]})
      .then(function(data2){
          console.log(data2)
      })
      //Custom Bussiness logic goes here
    })

    /*
    * initializing the widget.
    */
    ZOHO.embeddedApp.init();

  },[])
  
  return (
    <div>
      {/* <ReactToPrint
      trigger={() => 
        <button >Print this out!</button>
      }
      content={() => componentRef.current}
      /> */}
      {/* <button onClick={()=>window.print()} >Print</button> */}
      <div className='parentContainer' ref={componentRef} >
        <Header/>  
          <Quotation/>
          
        <Footer />
     </div> 
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

// 'use strict';
// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   componentDidMount(){
//     const mathJax = document.createElement('script');
//     mathJax.setAttribute('src', 'https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js');   
//     mathJax.addEventListener('load', () => {
//       console.log('hello');
//       ZOHO.embeddedApp.on("PageLoad",function(data){
//         console.log('hello', data);
//       })  
//     });
//     document.head.appendChild(mathJax);
//   }

//   render() {
    
//     return (
//       <h1>This is my React app!</h1>
//     );
//   }
// }

// let domContainer = document.querySelector('#root');
// ReactDOM.render(<LikeButton />, domContainer);