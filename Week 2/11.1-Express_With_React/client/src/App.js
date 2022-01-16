import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [data, setData] = useState();
    const [city, setCity] = useState("");

    const fetchData = async () => {
        try {
            const data = await axios.get(
                `http://localhost:3000/weather/${city}`
            );
            setData(data.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="App">
            <div>
                Enter a city:
                <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                ></input>
                <button onClick={fetchData}>Search</button>
            </div>
            <div>{data}</div>
        </div>
    );
}

export default App;
