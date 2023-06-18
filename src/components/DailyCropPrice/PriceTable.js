import React from "react";
import { ScrollArea, Table } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

const PriceTable = ({ data }) => {
  return (
    <ScrollArea>
      <Table
        striped
        className="table-area"
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        sx={{ tableLayout: "auto" }}
      >
        <thead  className="table-head">
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
            <tr key={uuidv4()}>
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
      </Table>

      <style>
        {`
        
        .table-area {
          background-color: #fff;
          max-height: 40rem!important;
          height:100%;

      
        }

      

        @media screen and (max-width: 500px) {
          tbody, td, tfoot, th, thead, tr {
            font-size: 0.6rem!important;
        }
        `}
      </style>
    </ScrollArea>
  );
};

export default PriceTable;
