import React, { useEffect, useState } from 'react';
import axios from "axios";

import "./App.css";

const App = () => {

    const [randomQuote, setRandomQuote] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    const API_URL = "https://api.adviceslip.com/advice";

    const fetchQuote = async () => {
        try {
            const response = await fetch(API_URL);
            if(!response.ok) throw Error("Data did not received!");
            const data = await response.json();
            setRandomQuote(data.slip.advice);
            setErrorMsg(null)
        }
        catch(error) {
            setErrorMsg(error.message);
        }
        finally {
            setIsLoading(false);
        }
        
    }

    useEffect(() => {

        setTimeout(() => {
            fetchQuote();
        }, Math.random() * 2000 + 1000)
    }, []);


    const generateBtnHandler = () => {
        
        setIsLoading(true);
        setTimeout(() => {
            fetchQuote();
        }, Math.random() * 2000 + 1000)
    }


    return (
        <div className='main-container'>
            <div className="quote-container">
                {!isLoading && errorMsg && <p style={{ color: "red", fontSize: "1.1rem", fontWeight: "600" }} >{errorMsg}</p>}
                {isLoading && <div class="loader"></div>}
                {!errorMsg && !isLoading && <h2>{randomQuote}</h2>}
                <button className='quote-button' onClick={generateBtnHandler} >Generate</button>
            </div>
            
            <div className="darken"></div>
        </div>
    )
}

export default App;