import * as React from "react";
import headerLogo from '../images/quant-header.png';
import '../App.css';
export default function Header(){
    return(
        <header className="header">
        
          <img src={headerLogo} style={{height:"100%" , width:"100%" , top: "0px"}}/>
        
        </header>
       
    )
}