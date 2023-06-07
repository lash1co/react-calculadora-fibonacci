import React from 'react';
import '../Stylesheets/Button.css';

function Button(props){
   return (
    <div
        className='button-container'
        onClick={props.manageClick}>
        {props.children}
    </div>
   ); 
}

export default Button;