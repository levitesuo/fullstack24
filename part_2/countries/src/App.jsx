import { useState, useEffect } from 'react'
import Input from './components/Input'
import countries from './services/countries'
import Content from './components/Content'
import getWeather from './services/weather'

const App = () => {
  const [countryList, setCountryList] = useState([])
  const [weatherObj, setWeatherObj] = useState('')

  const getAllHook = () => countries.getAll().then(response => setCountryList(response.data))

  const updateWeatherHook = () => {
    const l = filteredCountryList()
    if (l.length === 1) {
      getWeather(l[0].capitalInfo.latlng).then(response => {
        console.log("FFF", response.data)
        setWeatherObj(response.data)
      })
    }
  }
  const handleShowClick = country => {
    setFilterText(country.name.common)
  }

  const filteredCountryList = () => countryList.filter(country => country.name.common.toUpperCase().includes(filterText.toUpperCase()))

  const [filterText, setFilterText] = useState('')
  const handleFilterChange = event => setFilterText(event.target.value)

  useEffect(getAllHook, [])
  useEffect(updateWeatherHook, [filteredCountryList().length === 1])

  return (
    <div>
      <Input text="find countries " value={filterText} onChange={handleFilterChange}/>
      <Content countryList={filteredCountryList()} buttonMethod={handleShowClick} weather={weatherObj}/>
    </div>
  )
}
export default App
