// Import Modules
import React from "react";



const CardForm = ({data}) => {
  
  
  if(data.length > 0){
  
    return (
      <div className="cards-container">
        {data.map((row , id) => (
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
            margin:0;
            padding:0;
          }
        `}
      </style>
      </div>
    )
  }

  else{
    return(
      <div weight={1000} align="center">
      <h3 color='#007bff'>We are updating Prices after Crop Auction for perticular marketyard</h3>  
      <h2>Visit after few hours</h2>
    </div>
    )
  }
}


  
export default CardForm;