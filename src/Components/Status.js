import React from "react";
import '../Stylesheets/Status.css';

const manageState = (request, isIt) => {
    if(request){
        if(isIt){
            return 'fibo';
        }else{
            return 'nofibo';
        }
    }
    else{
        return '';
    }
};

const Status = ({isFibo, fiboText, requestState}) => (
    
    <div className={`status ${manageState(requestState, isFibo)}`}>
        Is the sum in Fibonacci?: {fiboText}
    </div>
);

export default Status;