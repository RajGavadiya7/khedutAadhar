// Import Modules
import React from "react";
import { useEffect, useState } from "react";
import Price_table from "../components/Price_table";
import './css/Daily_price.css'
import Price_data from "./Price_data";
import CardForm from "../components/CardForm";


function Daily_prices() {

  const key = process.env.REACT_APP_API_KEY;
  const [count, setCount] = useState(100); 
  const [data, setData] = useState([]);
  const [state, setState] = useState("Gujarat");
  const [district, setDistrict] = useState("Patan");
  const [displayType , setDisplayType] = useState("card");


  const getData = async () => {
    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${key}&limit=${count}&format=json&filters%5Bstate%5D=${state}&filters%5Bdistrict%5D=${district}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data.records);
      // console.log(data.records);
      // console.log(state, district);
    } catch (error) {
      console.log(error);
    }
  }
  
  useState(() => {
    getData();
  }, [ ]);

  const handleState = (e) => {
    setState(e.target.value);
  };

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const tableOrCard = (e) => {
    e.preventDefault();
    if(displayType === "card"){
      setDisplayType("table");
    }
    else{
      setDisplayType("card");
    }
  }

    
  const tableIcon = () => {
    if(displayType === "card"){
      return <img className="table-logo" height="80px" src="https://static.thenounproject.com/png/1861887-200.png" alt="table"/>
    }
    else{
      return <img className="table-logo" height="80px" src="https://cdn-icons-png.flaticon.com/512/7604/7604036.png" alt="table"/>
    }
  }

  
  return (
    <div>

      <form className="commodity-form">
        <div className="form-group">
          <label for="state">State</label>
          <select onChange={handleState} defaultValue={state} className="form-control" id="state">            
            <option>Andhra Pradesh</option>
            <option>Arunachal Pradesh</option>
            <option>Assam</option>
            <option>Bihar</option>
            <option>Chhattisgarh</option>
            <option>Goa</option>
            <option>Gujarat</option>
            <option>Haryana</option>
            <option>Himachal Pradesh</option>
            <option>Jammu and Kashmir</option>
            <option>Jharkhand</option>
            <option>Karnataka</option>
            <option>Kerala</option>
            <option>Madhya Pradesh</option>
            <option>Maharashtra</option>
            <option>Manipur</option>
            <option>Meghalaya</option>
            <option>Mizoram</option>
            <option>Nagaland</option>
            <option>Odisha</option>
            <option>Punjab</option>
            <option>Rajasthan</option>
            <option>Sikkim</option>
            <option>Tamil Nadu</option>
            <option>Telangana</option>
            <option>Tripura</option>
            <option>Uttar Pradesh</option>
            <option>Uttarakhand</option>
            <option>West Bengal</option>
          </select>
        </div>
        <div className="form-group">
          <label for="district">District</label>
          <textarea onChange={handleDistrict} defaultValue={district} className="form-control" id="district" rows="1" style={{ resize: "none" }} />
        </div>
     
       
          <button onClick={handleSubmit} type="submit" className="btn btn-primary">
          Submit
        </button>
       
        
     
      </form>


      <div className="data-area">
        <h1> Daily Crop Price </h1>
        <div className="data">
          <button onClick={tableOrCard} type="submit" className="toogle-btn">
          {tableIcon()}
          {/* {displayType === "card" ? "Table" : "Card"} */}
        </button>
        </div>
        <style>
          {`
            .data-area{
              display: flex;
              justify-content: flex-start;
              align-items: center;
            }
            .toogle-btn{
              margin-left: 1rem;
              border: none;
            }
           
          `}
        </style>
        </div>
     
    
      {displayType === "card" ?  <CardForm data = {Price_data} />  : <Price_table data = {Price_data} /> }
            
    </div>
  );
}

export default Daily_prices;
