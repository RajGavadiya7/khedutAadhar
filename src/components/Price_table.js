import React from "react";
import { useEffect, useState } from "react";


const Price_table = ({data}) => {
   
    return (

      
        <table className="table">
        <thead>
          <tr>
            <th scope="col"> State </th>
            <th scope="col"> District </th>
            <th scope="col"> Market </th>
            <th scope="col"> Commodity </th>
            <th scope="col"> Variety </th>
            <th scope="col"> Arrival Date </th>
            <th scope="col"> Min Price </th>
            <th scope="col"> Max Price </th>
            <th scope="col"> Modal Price </th>
          </tr>
        </thead>
        
        <tbody>
        {data.map((item) => (
            <tr>
              <th scope="row">{item.state}</th>
              <td> {item.district} </td>
              <td> {item.market} </td>
              <td> {item.commodity} </td>
              <td> {item.variety} </td>
              <td> {item.arrival_date} </td>
              <td> {item.min_price} </td>
              <td> {item.max_price} </td>
              <td> {item.modal_price} </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    )


}

export default Price_table;
