import Quotation from "./components/Quotation";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App () {
  const componentRef = React.useRef()
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
      <p>hello there</p>
      {/* <div className='parentContainer' ref={componentRef} >
        <Header/>
          <div
          >
            
            <Quotation/>
            
            <div className='pageBreak' 
            // style={{display:'flow-root'}} 
            >
              <p>abc</p>
            
            </div>
          </div>
        <Footer />
     </div>  */}
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