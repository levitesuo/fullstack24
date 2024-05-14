import Weather from './Weather'

const CountryLanguages = ({country}) => {
    return (
    <div>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
    </div>
)}
  
const CountryInfo = ({country}) => (
<div>
    <h1>{country.name.common}</h1>
    capital {country.capital[0]}
    <br />
    area {country.area}
    <CountryLanguages country={country} />
    <img src={country.flags.png} alt =""/>
</div>
)
  

const CountryView = ({country, weather}) => (
    <div>
      <CountryInfo country={country} />
      <Weather weather={weather} city={country.capital[0]}/>
    </div>
)

export default CountryView