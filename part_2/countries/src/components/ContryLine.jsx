const CountryLine = ({country, buttonMethod}) => (
    <div>
      {country.name.common}
      <button onClick={() => buttonMethod(country)}>show</button>
    </div>
  )
export default CountryLine