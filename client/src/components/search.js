import React,{useState} from 'react';
import Axios from 'axios';
import '../App.css';  

function MySearch() {
    const [search, setsearch] = useState('');
    const [result, setMyResult] = useState([]);
    
    const onSearch = () => {
        Axios.post(`http://localhost:3001/search/`,{firstname:search}).then((response) => {
            setMyResult(response.data)
          })
      };

    return (
      <div className="App">
          <input type="text" onChange={(e) => setsearch(e.target.value)}/>
          <button onClick={onSearch} >Search</button>
          {result.map((val)=> {
              return(
                  <center>
                  <div>
                      <h2>First Name : {val.first_name}</h2>
                      <h2>Last Name : {val.last_name}</h2>
                      <h2>Address : {val.address}</h2>
                      <h2>Email Id : {val.email_id}</h2>
                      <h2>Phone Number : {val.phone_number}</h2>
                  </div>
                  </center>
              )
          })}
      </div>
      
    );
  }
  
export default MySearch;