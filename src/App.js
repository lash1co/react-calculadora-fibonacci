import {React, useState} from 'react';
import './App.css';
import Button from './Components/Button';
import Input from './Components/Input';
import Screen from './Components/Screen';
import Status from './Components/Status';

function App() {
  
  const[inputNum1, setInputNum1] = useState(0);
  const[inputNum2, setInputNum2] = useState(0);
  const[sum, setSum] = useState(0);
  const[isFibo, setIsFibo] = useState(false);
  const[messageResult, setMessageResult] = useState('');
  const[isAnswered, setIsAnswered] = useState(false);

  const handleNum1 = (e) => {
    const inputValue = parseInt(e.target.value);
    // Validar que el valor sea un número positivo
    if(isNaN(inputValue)){
      setInputNum1(0);
    }
    if (/^\d+$/.test(inputValue)&&inputValue<=999999) {
      setInputNum1(inputValue);
    }
  };

  const handleNum2 = (e) => {
    const inputValue = parseInt(e.target.value);
    // Validar que el valor sea un número positivo
    if(isNaN(inputValue)){
      setInputNum2(0);
    }
    if (/^\d+$/.test(inputValue)&&inputValue<=999999) {
      setInputNum2(inputValue);
    }
  };

  function calculate(){
    let operation = 0;
    try {
      operation = inputNum1 + inputNum2;
      setSum(operation);
    } catch (error) {
      setSum(0);
    }
    const data = {
      "num1": parseInt(inputNum1),
      "num2": parseInt(inputNum2)
    }
    setMessageResult('...');
    setIsAnswered(false);
    fetch('http://localhost:44358/api/Operation',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if(data.hasOwnProperty('estaEnFibo')){
        var response =data.estaEnFibo;
        setIsFibo(response);
        setMessageResult(response ? 'True' : 'False');
        setIsAnswered(true);
      }
      else{
        setIsFibo(false);
        var response = data.Message;
        setMessageResult(response);
        setIsAnswered(false);
        console.log(response);
      }
    })
    .catch(error => {
      setMessageResult('Error');
      setIsFibo(false);
      setIsAnswered(false);
      console.error(error);
    });
    //console.log(operation);
  }

  return (
    <div className="App">
      <div className='calculator-container'>
        <Screen 
          sum={sum}
        />
        <div className='row'>
          <Input 
            numValue = {inputNum1}
            handleNumChange = {handleNum1}
            numLabel = 'Number 1'
          />
          <Input 
            numValue = {inputNum2}
            handleNumChange = {handleNum2}
            numLabel = 'Number 2'
          />
        </div>
        <div className='row'>
          <Button 
            manageClick = {calculate}
          >
            Calculate
          </Button>
        </div>
        <div className='foot'>
          <Status
            isFibo = {isFibo}
            fiboText = {messageResult}
            requestState = {isAnswered}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
