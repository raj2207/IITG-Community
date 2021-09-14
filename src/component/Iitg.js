import React from "react";
import Navbar from "./Navbar";
import '../css/Iitg.css'; 
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";

function Iitg(){
    return(
    <div className="iitg">
        <Navbar />
        <div className="iitg_content">
        <Sidebar />
        <Feed />
        <Widget />
        </div>
        
    </div>
    );
}


export default Iitg;