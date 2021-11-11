import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [portStocks, setPortStocks] = useState([])
  const [stocksToDisplay, setStocksToDisplay] = useState([])
  
  const filteredOrSortedStocks = stocks

  useEffect(() => {
    fetch(`http://localhost:3001/stocks`)
    .then(r => r.json())
    .then(data => {
      setStocks(data)
      setStocksToDisplay(data)
    })
  }, [])

  function handleClick(stockID) {
    const stockToAdd = stocks.filter(stock => stock.id === stockID)
    setPortStocks([...portStocks, stockToAdd[0]])
  }

  function handleDelete(stockID) {
    const updatedPortfolio = portStocks.filter(stock => stock.id !== stockID)
    console.log(updatedPortfolio)
    setPortStocks(updatedPortfolio)
  }

  function onFilter(e) {
    const filter = e.target.value
    const filteredStocks = stocks.filter (stock => stock.type === filter)
    setStocksToDisplay(filteredStocks)
  }

  function onAlphabet(e) {
    console.log('alphabet')
    const stocksAlphabetically = stocksToDisplay.sort(function(a,b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return true;
    })
    console.log(stocksAlphabetically)
    setStocksToDisplay(stocksAlphabetically)
  }

  function onPrice(e) {
    console.log('price')
    const stocksByPrice = stocksToDisplay.sort(function(a,b) {
      return a.price - b.price
    })
    console.log(stocksByPrice)
    setStocksToDisplay(stocksByPrice)
  }

  console.log(stocksToDisplay)

  return (
    <div>
      <SearchBar onAlphabet={onAlphabet} onPrice={onPrice} onFilter={onFilter} />
      <div className="row">
        <div className="col-8">
          {console.log(stocksToDisplay)}
          <StockContainer stocks={stocksToDisplay} handleClick={handleClick} />
        </div>
        <div className="col-4">
          <PortfolioContainer portStocks={portStocks} handleDelete={handleDelete}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
