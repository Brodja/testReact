import React from "react";
import ReactDOM from "react-dom";

function StartBtn({started, edit}) {
    return (
        <button onClick={()=> edit(started)}>START</button>
    )
}



export default StartBtn