import Axios from 'axios';
import React, { useEffect, useState } from 'react';

 function Add() {
     const myArray = ["Red","Green","Cyan","Yellow","Blue"]
     let randomValue = myArray[Math.floor(Math.random() * myArray.length)];
     let [colorname, setColorName] = useState('Green')
     let [count, setCount] = useState(0)
     const [information, setInformation] = useState([])

     useEffect(()=>{
         Axios.get('https://api.github.com/users').then((response)=>{
             setInformation(response.data)
         })
     })

     const increment = () => {
         const number = count + 1
         setCount(number)
     }

     const decrement = () => {
         if(count === 0){
             alert("Negetive number is not allowed")
         }else{
            const number = count - 1
            setCount(number)
         }
     }
     const backgroundcolor = () =>{
        let color = randomValue.toString()
        setColorName(color)
        console.log(color)
     }
     
     return(
         <div>       
             {information.map((val)=>{
                 return(
                     <div>
                         <a href={val.html_url}>{val.html_url}</a>
                     </div>
                 )
             })}     
             <button onClick={decrement}>Minus</button> {count}<button onClick={increment}>Add</button>
             <h1 style={{backgroundColor:`${colorname}`}}>{colorname}</h1>
             <button onClick={backgroundcolor}>Change</button>
         </div>
     )
 }

 export default Add;