import axios from 'axios'
const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => axios.get(allUrl)

const getCountry = (countryName) => {
    const request = axios.get(`${baseUrl}${countryName}`)
    console.log(`making a request to ${baseUrl}${countryName} for ${countryName}s data`)
    return request.then(request.data)
}

export default { getAll, getCountry }