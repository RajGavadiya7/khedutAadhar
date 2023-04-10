// Import Modules
import React from "react";


// Default export function
function CardForm( props ) {
  const { data } = props;
  console.log(data);
  return (
    <tbody>
      <tr className="container">
        <td className="cards-container">
        {data.length > 0 ? (
            data
          ) : (
            <div weight={1000} align="center">
              <h2 color='#007bff'>We are updating Prices after Crop haraji(Auction) for perticular marketyard</h2> 

              <h2>Visit after few hours</h2>
            </div>
          )}
                      
        </td>
      </tr>
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
    </tbody>
  );
}

export default CardForm;