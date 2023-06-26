
import {v4 as uuidv4} from "uuid";


const CardForm =  ({ data }) => {

  if (data.length > 0) {
    return (
      <div className="pricecard-container-wrapper">
        {data.map((row, id) => (
          <div key={uuidv4()} className="pricecard-container" >
            <div className="card-row-1">
              <p className="crop-name">{row.commodity}</p>              
              <p className="crop-variety"> { row.variety}</p>
            </div>

            <div className="card-row">
              <p className="market">{row.market}</p>
              <p className="district">{row.district}</p>
              <p className="state">{row.state}</p>
            </div>

            <div className="card-row">
              <p className="min-price">Min:{row.min_price}</p>
              <p className="max-price">Max:{row.max_price}</p>
            </div>
            <div className="card-row">
              <p className="modal-price">Modal:{row.modal_price}</p>
              <p className="date">{row.arrival_date}</p>
            </div>
          </div>
        ))}

        <style>
          {`

          .pricecard-container-wrapper {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-items: center;
            margin: 0.5rem;
            
          }

          .pricecard-container {
            display: flex;
    margin: 0.2rem;
    border-left: 8px solid #18bb5c;
    background-color: #f2edede8;
    border-radius: 5px;
    max-width: 18rem;
    width: -webkit-fill-available;
    height: 10rem;
    flex-direction: column;
    justify-content: flex-start;
          }

          .card-row-1 {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            max-height: 4rem;
            height: -webkit-fill-available;
            padding: 0 0.5rem;
          }

          .card-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.5rem;
            max-height: 2rem;
            height: -webkit-fill-available;
          }


          .crop-name{
            margin: 0;
            margin-right: 0.3rem;
            color: #2909d0;
            font-size: 1rem;
            font-weight: 900;
          }

          .crop-variety {
            margin: 0;
            margin-right: 0.3rem;
            font-size: 1.9 vh;
            font-weight: 400;
            color: #d39e00;
          }


          .market,.district , .state{
            margin: 0 0.2rem;
          }

          .min-price , .max-price , .modal-price {
          margin: 0;
          color: #006b2d;
          font-size: 1rem;
          font-weight: 700;
          margin-right: 0.5rem;
          }

          .max-price{
          color: #f00;
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
      <>
      <div className="no-crop-msg" weight={1000} align="center">
        <p className="no-crop-msg-text" color="#007bff">
          We update Prices after Crop Auction of perticular marketyard
        </p>
        <p className="no-crop-msg-text" >Visit again after some hours</p>
      </div>

      <style>
        {`
        .no-crop-msg{
          margin-top: 2rem;
          background: azure;
          padding: 2rem;

        }
        .no-crop-msg-text{
          font-size: 1.5rem;
          font-weight: 900;
          color: #007bff;
          font-family: cursive;
        `}
        
      </style>
      </>
    );
  }
};
export default CardForm;
