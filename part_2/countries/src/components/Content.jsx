import CountryLine from "./ContryLine"
import CountryView from "./CountryView"

const Content = ({countryList, buttonMethod, weather}) => (
    countryList.length === 1 ?
      <CountryView country={countryList[0]} weather={weather} />
    :
      <div>{countryList.map(country => <CountryLine key={country.name.official} country={country} buttonMethod={buttonMethod}/>)}</div>
  )

export default Content