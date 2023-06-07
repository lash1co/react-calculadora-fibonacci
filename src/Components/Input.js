import React from "react";
import '../Stylesheets/Input.css';

function Input(props){
    return(
        <div className="input">
        <input
            className="textField" 
            type="text"
            value={props.numValue}
            onChange={props.handleNumChange}
            pattern="\d+"
        />
        <span className="numLabel">
            {props.numLabel}
        </span>
        </div>
    );
}

export default Input;