import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = pos => axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${pos[0]}&lon=${pos[1]}&appid=${api_key}`)

export default getWeather