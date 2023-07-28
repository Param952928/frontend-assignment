import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios"

function App() {
  const [startDate, setStartDate] = useState(null);
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockData, setStockData] = useState({
    open: "",
    high: "",
    low: "",
    close: "",
    volume: ""
  });
  console.log("s", stockSymbol)

  const onSubmit = (e) => {
    e.preventDefault();
    const config = {  
      stockSymbol: stockSymbol,
      date: startDate
    }
    console.log("config", config);
    const url = "http://localhost:5000/api/fetchStockData";
    axios.post(url, config)
      .then((res) => {
        console.log("data", res.data);
        setStockData(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setStartDate(formattedDate);
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        <div style={{
          border: "1px solid #ccc",
          padding: "20px",
          textAlign: "center"
        }}>
          <h2>Stock </h2>
          <input
            type="text"
            onChange={(e) => setStockSymbol(e.target.value)}
            value={stockSymbol}
            placeholder="Stock Symbol"
            style={{ marginTop: "5px", marginBottom: "10px" }}
          /><br />
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={handleChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            style={{ marginTop: "10px" }}
          />
          <br />

          {/* New card with fields */}
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <h3>Stock Data</h3>
            <input
              type="text"
              onChange={(e) => setStockData({ ...stockData, openPrice: e.target.value })}
              value={stockData.open}
              placeholder="Open Price"
            />
            <br />
            <input
              type="text"
              onChange={(e) => setStockData({ ...stockData, highPrice: e.target.value })}
              value={stockData.high}
              placeholder="High Price"
            />
            <br />
            <input
              type="text"
              onChange={(e) => setStockData({ ...stockData, lowPrice: e.target.value })}
              value={stockData.low}
              placeholder="Low Price"
            />
            <br />
            <input
              type="text"
              onChange={(e) => setStockData({ ...stockData, closePrice: e.target.value })}
              value={stockData.close}
              placeholder="Close Price"
            />
            <br />
            <input
              type="text"
              onChange={(e) => setStockData({ ...stockData, volume: e.target.value })}
              value={stockData.volume}
              placeholder="Volume"
            />
          </div>

          <button type='submit' style={{ marginTop: "5px" }}>Submit</button>
        </div>
      </div>
    </form>
  );
}

export default App;
