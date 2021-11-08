import React, { useState } from 'react';

import { fetchWeather } from './weather';
import './weatherApp.css';

const WeatherApp = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    
    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchWeather(query);

            setWeather(data);
            setQuery('');
        }
    }


function togglediv(id){
    var divelement = document.getElementById(id);
    if(divelement.style.display === 'none') {divelement.style.display = 'block';}
    else{divelement.style.display = 'none'}
}

    return (
        <div id="root1">

<div className="main-container">
            <input type="text"className="search"placeholder="Search for location..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
            <button onclick="togglediv('sectiontohide');"></button>
            <div id="sectiontohide">
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
            </div>

        </div>


        </div>
       
    );
}

export default WeatherApp;