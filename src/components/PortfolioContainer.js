import React from "react";
import Stock from "./Stock";

function PortfolioContainer( {portStocks, handleDelete} ) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portStocks.map(stock => <Stock key={stock.id} stock={stock} handleClick={handleDelete}/>)}
    </div>
  );
}

export default PortfolioContainer;
