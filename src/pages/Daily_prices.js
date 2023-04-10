// Import Modules
import React from "react";
import { useEffect, useState } from "react";
import Price_table from "../components/Price_table";
import './css/Daily_price.css'
import Price_data from "./Price_data";
import CardForm from "../components/CardForm";
function Daily_prices() {

  const key = '579b464db66ec23bdd0000011d6d9c6d7a6e48d647fa0adc178fa21f';
 
  const [count, setCount] = useState(100);
  // const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${key}&format=json&limit=${count}`;
  
  const [data, setData] = useState([]);
  const [state, setState] = useState("Gujarat");
  const [district, setDistrict] = useState("Patan");

  const getData = () => {
    
    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${key}&limit=${count}&format=json&filters%5Bstate%5D=${state}&filters%5Bdistrict%5D=${district}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setData(data.records);
      console.log(data.records);
    });
    console.log(state, district);
  }
  
  useState(() => {
    getData();
  }, [ ]);

  // const handleCommodity = (e) => {
  //   setCommodity(e.target.value);
  //   console.log(commodity);
  // };

  const handleState = (e) => {
    setState(e.target.value);
    console.log(state);
  };

  const card_rows = data.map((row , id) => (
    <div className="card-container" key={id}>
      <div className="crop">
        <p className="crop-name">{row.commodity}</p>
        <p className="crop-variety">{row.variety}</p>
      </div>

      <div className="place">
        <p className="market">{row.market}</p>
        <p className="district">{row.district}</p>
        <p className="state">{row.state}</p>
      </div>

      <div className="price">
        <p className="min-price">{row.min_price}</p>
        <p className="max-price">{row.max_price}</p>
      </div>
      <div className="last">
        <p className="modal-price">{row.modal_price}</p>
        <p className="date">Today</p>
      </div>
    </div>
  ));

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  

  return (
    <div>
      {/* form  */}
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
        {/* <div className="form-group" >
          <label for="commodity">Commodity</label>
          <textarea
            onChange={handleCommodity}
            defaultValue={commodity}
            className="form-control"
            id="variety"
            rows="1"
            style={{ resize: "none" }}
          ></textarea>
        </div> */}
        
        <div>   
          <button onClick={handleSubmit} type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
     
      </form>

      <div><h1> Daily Crop Price </h1></div>
      

      {/* <Price_table data = {Price_data} /> */}
      <CardForm data = {card_rows} />
      <style>
          {`
            .buttons {
                display: flex;
                justify-content: fex-start;
                align-items: center;
                position: fixed;
                bottom: 0;
                width: 100%;
            }
            .button{
                margin: 10px;
            }
            .input{
                width: 80px;
                align-self: center;
            }


            .card-container, .crop, .place, .price, .last{
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                width: 100%;
                padding: 0.2rem;
            }
            .card-container {
              flex-direction: column;
              margin:0.2rem;
              border-left: 8px solid #18bb5c;
           
              background-color: #95959513;
              border-radius: 5px;
              width:18rem;
              max-width:18rem;
              height:10rem;
            }
            
            .crop  {
              padding: 0 0.5rem;
              align-items: center;
            }
            
            .crop-name{
              margin: 0;
              margin-right: 0.3rem;
              color: #d29300;
              font-size: 1.8vh;
              font-weight: 500;
              text-transform: uppercase;
            
            }
               
            .crop-variety {
              font-size: 0.8rem;
              font-weight: 200;
              color: #3b8997;
            }
            
            .place{
              margin: 0;
              height: 2rem;
              font-size: 0.8rem;
              font-weight: 400;
              color: #848f91;
            }

            .market,.district , .state{
              margin: 0 0.2rem;
            }
            
            .min-price , .max-price , .modal-price {
              margin: 0;
              color:#54df8e;
              font-size: 1.2rem;
              font-weight: 700;
              margin-right: 0.5rem;
            }
          
            .max-price{
              color:rgb(233, 80, 80)
            }
            .modal-price{
              color: #1ebfdb;
            }
            .last{
            }
            .date{
              margin: 0;
              color:green;
            }
            
            
        `}
        </style>
      
    </div>
  );
}

export default Daily_prices;
