// Import Modules
import React from "react";
import { useState } from "react";
import PriceTable from "../components/DailyCropPrice/PriceTable";
import "./css/Daily_price.css";
import CardForm from "../components/DailyCropPrice/CardForm";
import { StateList } from "../data/StateList";
import {v4 as uuidv4} from "uuid";
import { Helmet } from "react-helmet-async";


export default function DailyPrices() {

  // const [count, setCount] = useState(100);
  const [data, setData] = useState([]);
  const [state, setState] = useState("Gujarat");
  const [district, setDistrict] = useState("Patan");
  const [displayType, setDisplayType] = useState("card");
  const key = process.env.REACT_APP_API_KEY;


  const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${key}&format=json&limit=10000&filters%5Bstate%5D=${state}&filters%5Bdistrict%5D=${district}`;

  const getData = async () => {
    try {

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data.records);
        });
        

    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    getData();
  }, []);

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
    if (displayType === "card") {
      setDisplayType("table");
    } else {
      setDisplayType("card");
    }
  };


  return (
    <div>

      <Helmet>
        <title>Daily Crop Price</title>
        <meta 
          name="description"
          content="Daily crop prices from all over India. Get the latest crop prices from your state and district."
        />
        <link rel="canonical" href="/price" />
        <meta name="keywords" content="Daily Crop Price, Crop Price, Crop Price in India, Crop Price in any state, district or market" />
        
        <meta property="og:title" content="Daily Crop Price" />
        <meta property="og:description" content="Daily crop prices from all over India. Get the latest crop prices from your state and district." />
        <meta property="og:url" content="https://krushiaadhar.me/price" />
        <meta property="og:type" content="website" />
        

      </Helmet>



      <form className="commodity-form">
        <div className="form-group">
          <label label="state">State</label>
          <select
            value={state}
            onChange={handleState}
            defaultValue={state}
            className="form-control"
            id="state"
          >
            {StateList.map((state) => {
              return <option key={uuidv4()} value={state}>{state}</option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label label="district">District</label>
          <textarea
            value={district}
            onChange={handleDistrict}
            defaultValue={district}
            className="form-control"
            id="district"
            rows="1"
            style={{ resize: "none" }}
            
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-success find-button form-submit-button"
        >
          Get Price
        </button>
      </form>



      {/* Toogle Button of Card and Table */}
      <div className="daily-crop-price">
        <h2> Daily Crop Price </h2>
        <button onClick={tableOrCard} type="submit" className="toogle-btn">
          {displayType === "card" ? (
            <img
              className="table-logo"
              height="60px"
              src="https://static.thenounproject.com/png/1861887-200.png"
              alt="table"
            />
          ) : (
            <img
              className="table-logo"
              height="60px"
              src="https://cdn-icons-png.flaticon.com/512/7604/7604036.png"
              alt="table"
            />
          )}
        </button>
      </div>


      <div className="crop-data">
        {displayType === "card" ? (
          <CardForm data={data} />
        ) : (
          <PriceTable data={data} />
        )}
      </div>
    </div>
  );
}