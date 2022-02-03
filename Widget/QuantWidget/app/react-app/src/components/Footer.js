import * as React from "react";
import footerLogo from '../images/quant-footer.png';
import '../App.css';
export default function Footer(){
    return(
        <footer className="footer">
        
            <img src={footerLogo} style={{height:"100%" , width:"100%"}}/>
        
        </footer>
        
    )
}