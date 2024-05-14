const WeatherIcon = ({weather}) => <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />


const Weather = ({weather, city}) => {
    if (weather.weather) {
        const temp = Math.round((parseFloat(weather.main.temp) - 273.15) * 100) / 100
        return(
            <div>
                <h2>{`Weather in ${city}`}</h2>
                <p>{`temperature ${temp} Celcius`}</p>
                <WeatherIcon weather={weather} />
                <p>{`wind ${weather.wind.speed} m/s`}</p>
            </div>
        )
    }

}

export default Weather