import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [portStocks, setPortStocks] = useState([])
  const [stocksToDisplay, setStocksToDisplay] = useState([])
  
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3001/stocks`)
    .then(r => r.json())
    .then(data => {
      setStocks(data)
      setStocksToDisplay(data)
    })
  }, [])

  function handleClick(stock) {
    if (!portStocks.includes(stock)) {
      setPortStocks([...portStocks, stock])
    }
    else {
      alert('This stock is already in your portfolio!')
    }
  }

  function handleDelete(deletedStock) {
    const updatedPortfolio = portStocks.filter(stock => stock.id !== deletedStock.id)
    console.log(updatedPortfolio)
    setPortStocks(updatedPortfolio)
  }

  function onFilter(e) {
    const filter = e.target.value
    const filteredStocks = stocks.filter (stock => stock.type === filter)
    setStocksToDisplay(filteredStocks)
  }

  function onAlphabet(e) {
    setSortBy('alphabet')
    const stocksAlphabetically = stocksToDisplay.sort(function(a,b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return true;
    })
    setStocksToDisplay(stocksAlphabetically)
  }

  function onPrice(e) {
    setSortBy('price')
    const stocksByPrice = stocksToDisplay.sort(function(a,b) {
      return a.price - b.price
    })
    setStocksToDisplay(stocksByPrice)
  }

  return (
    <div>
      <SearchBar onAlphabet={onAlphabet} onPrice={onPrice} onFilter={onFilter} sortBy={sortBy}/>
      <div className="row">
        <div className="col-8">
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
