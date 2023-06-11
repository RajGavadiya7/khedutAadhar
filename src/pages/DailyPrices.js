// Import Modules
import React from "react";
import { useState } from "react";
import PriceTable from "../components/PriceTable";
import "./css/Daily_price.css";
import CardForm from "../components/CardForm";
import { StateList } from "../data/StateList";
// const key = process.env.REACT_APP_API_KEY;

export default function DailyPrices() {

  // const [count, setCount] = useState(100);
  const [data, setData] = useState([]);
  const [state, setState] = useState("Gujarat");
  const [district, setDistrict] = useState("Patan");
  const [displayType, setDisplayType] = useState("card");

  const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000011d6d9c6d7a6e48d647fa0adc178fa21f&format=json&limit=10000&filters%5Bstate%5D=${state}&filters%5Bdistrict%5D=${district}`;

  const getData = async () => {
    try {
      const response = await fetch(url);

      const data = await response.json();
      setData(data.records);
      console.log(data.records);
      console.log(state, district);
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
      <form className="commodity-form">
        <div className="form-group">
          <label for="state">State</label>
          <select
            onChange={handleState}
            defaultValue={state}
            className="form-control"
            id="state"
          >
            {StateList.map((state) => {
              return <option value={state}>{state}</option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label for="district">District</label>
          <textarea
          
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
        <h1> Daily Crop Price </h1>
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