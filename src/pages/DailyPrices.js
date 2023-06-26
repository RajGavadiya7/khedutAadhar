// Import Modules
import React from "react";
import { useState } from "react";
import PriceTable from "../components/DailyCropPrice/PriceTable";
import "./css/Daily_price.css";
import CardForm from "../components/DailyCropPrice/CardForm";
import { StateList } from "../data/StateList";
import { v4 as uuidv4 } from "uuid";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import price_transparency from "../data/DailyCropPrice/price_transparency.svg";
import financial_planning from "../data/DailyCropPrice/financial_planning.svg";
import market_awareness from "../data/DailyCropPrice/market_awareness.svg";
import price_negotiation_power from "../data/DailyCropPrice/price_negotition_power.svg";
import profit_maximization from "../data/DailyCropPrice/profit_maximization.svg";

// import all images at once from ../data/DailyCropPrice folder

export default function DailyPrices() {
  // const [count, setCount] = useState(100);
  const [data, setData] = useState([]);
  const [state, setState] = useState("Gujarat");
  const [district, setDistrict] = useState("");
  const [displayType, setDisplayType] = useState("card");
  const key = process.env.REACT_APP_API_KEY;

  let url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${key}&format=json&limit=10000`;

  const getData = async () => {
    try {
      if (state !== "") {
        url = url + `&filters[state]=${state}`;
      }
      if (district !== "") {
        url = url + `&filters[district]=${district}`;
      }
      const res = await axios.get(url);
      setData(res.data.records);
      console.log(res.data.records);
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
    <main>
      <Helmet>
        <title>Daily Crop Price</title>
        <meta
          name="description"
          content="Daily crop prices from all over India. Get the latest crop prices from your state and district."
        />
        <link rel="canonical" href="/price" />
        <meta
          name="keywords"
          content="Daily Crop Price, Crop Price, Crop Price in India, Crop Price in any state, district or market"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <article className="article-container">
        <h1 className="article-heading">How daily crop price helps farmers?</h1>

        <div className="daily-price-importance">
          <div className="daily-price-importance-card-left">
            <div className="daily-price-importance-card">
              <img
                className="daily-price-info-image"
                src={price_transparency}
                alt="price transparency"
              />
              <p>
                <span className="importance-card-heading">
                  Price Transparency:
                </span>
                Having access to daily crop prices allows farmers to make
                informed decisions about when to sell their produce. By staying
                updated on market prices, farmers can determine the optimal time
                to sell their crops, ensuring they receive fair and competitive
                prices for their harvest.
              </p>
            </div>
          </div>

          <div className="daily-price-importance-card-right">
            <div className="daily-price-importance-card">
              <p>
                <span className="importance-card-heading">
                  Profit Maximization:
                </span>
                With daily crop price information, farmers can analyze market
                trends and fluctuations. This helps them strategize and plan
                their crop production and sales to maximize their profits. They
                can adjust their planting schedules, quantities, and even
                explore different crop options based on price forecasts and
                demand patterns.
              </p>
              <img
                className="daily-price-info-image"
                src={profit_maximization}
                alt="profit maximization"
              />
            </div>
          </div>

          <div className="daily-price-importance-card-left">
            <div className="daily-price-importance-card">
              <img
                className="daily-price-info-image"
                src={financial_planning}
                alt="financial planning"
              />
              <p>
                <span className="importance-card-heading">
                  Financial Planning:
                </span>
                Daily crop price data enables farmers to plan their finances
                more effectively. They can estimate their potential earnings
                based on prevailing prices, which assists in budgeting for
                operational expenses, investment decisions, and future
                agricultural activities.
              </p>
            </div>
          </div>

          <div className="daily-price-importance-card-right">
            <div className="daily-price-importance-card">
              <p>
                <span className="importance-card-heading">
                  Market Awareness:
                </span>
                Daily crop price information keeps farmers informed about the
                overall market conditions. They can gain insights into supply
                and demand dynamics, identify emerging trends, and respond
                accordingly. This knowledge empowers farmers to adapt their
                farming practices, diversify their crops, and align their
                production with market demand.
              </p>
              <img
                className="daily-price-info-image"
                src={market_awareness}
                alt="market awareness"
              />
            </div>
          </div>

          <div className="daily-price-importance-card-left ">
            <div className="daily-price-importance-card">
              <img
                className="daily-price-info-image"
                src={price_negotiation_power}
                alt="price negotiation power"
              />
              <p className="importance-card-heading">
                <span>Price Negotiation Power:</span>
                Armed with current crop price data, farmers can negotiate better
                deals with buyers, traders, or market intermediaries. They can
                leverage their knowledge of prevailing prices to ensure fair
                transactions and avoid potential exploitation.
              </p>
            </div>
          </div>
        </div>
      </article>

      <form className="commodity-form">
        <div className="form-group">
          <label label="state">State</label>
          <select
            value={state}
            onChange={handleState}
            className="form-control"
            id="state"
          >
            {StateList.map((state) => {
              return (
                <option key={uuidv4()} value={state}>
                  {state}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label label="district">District</label>
          <textarea
            value={district}
            onChange={handleDistrict}
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

      {/* Crop Data */}
      <div className="crop-data-container">
        {displayType === "card" ? (
          <CardForm data={data} />
        ) : (
          <PriceTable data={data} />
        )}
      </div>
    </main>
  );
}
