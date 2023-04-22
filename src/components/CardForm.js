// Import Modules
import React from "react";

const CardForm = ({ data }) => {
  if (data.length > 0) {
    return (
      <div className="cards-container">
        {data.map((row, id) => (
          <div className="card-container" key={id}>
            <div className="crop">
              <p className="crop-name">{row.commodity}</p>              
              <p className="crop-variety"> { row.variety}</p>
            </div>

            <div className="place">
              <p className="market">{row.market}</p>
              <p className="district">{row.district}</p>
              <p className="state">{row.state}</p>
            </div>

            <div className="price">
              <p className="min-price">Min:{row.min_price}</p>
              <p className="max-price">Max:{row.max_price}</p>
            </div>
            <div className="last">
              <p className="modal-price">Modal:{row.modal_price}</p>
              <p className="date">Today</p>
            </div>
          </div>
        ))}

        <style>
          {`

          .container{
            width: 96vw;
            background: transparent;
          }
          .cards-container{
            display:flex;
            align-items:flex-start;
            justify-content:flex-start;
            width:96vw;
            height: auto;
            flex-wrap: wrap;
            margin:2rem;
            padding:0;
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
            color: #2909d0;
            font-size: 2vh;
            font-weight: 600;
          }

          .crop-variety {
            margin: 0;
            margin-right: 0.3rem;
            font-size: 1.9 vh;
            font-weight: 400;
            color: #d39e00;
          }

          .place{
            margin: 0;
            height: 2rem;
            font-size: 1.8vh;
            font-weight: 400;
            color: #214d12;
            align-items: end;
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

          .date{
          margin: 0;
          color:green;
          }
        `}
        </style>
      </div>
    );
  } else {
    return (
      <div weight={1000} align="center">
        <h3 color="#007bff">
          We are updating Prices after Crop Auction for perticular marketyard
        </h3>
        <h2>Visit after few hours</h2>
      </div>
    );
  }
};
export default CardForm;
