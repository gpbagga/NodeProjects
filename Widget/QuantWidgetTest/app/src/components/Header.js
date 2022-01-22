import headerLogo from '../assets/img/quant-header.png';
import '../assets/css/App.css';

export default function Header(){
    return(
        <header className="header">
           
        
            <img src={headerLogo} style={{height:"100%" , width:"100%" , top: "0px"}}/>
        
        </header>
       
    )
}