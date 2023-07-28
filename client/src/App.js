import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the date picker styles
import axios from "axios"

function App() {
	const [startDate, setStartDate] = useState(null);
	const [stockSymbol, setStockSymbol] = useState()
	const [date, setDate] = useState()
	console.log("s", stockSymbol)

  const onSubmit = () => {
    const config = {
      stockSymbol : stockSymbol,
      date: date
    }
    const url = ""
    axios.post().then(()=>{

    }).catch((err)=>{
      console.log(err)
    })

  }

	return (
		<div style={{display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh"}}>
      <div style={{ border: "1px solid #ccc",
  padding: "20px",
  textAlign: "center"}}>
        <h2>Card Title</h2>
        <input type="text" onChange={(e)=>e.target.value}  value={stockSymbol} placeholder="Stock Symbol" style={{marginTop:"5px", marginBottom:"10px"}} /><br></br>
        <DatePicker
        value ={date}
		    style={{marginTop:"10px"}}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Select a date" // Placeholder for the input
        /><br></br>
        <button style={{marginTop:"5px"}}>Submit</button>
      </div>
    </div>
	);
}

export default App;