import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    let filter = countries.filter(c => c.name.toLowerCase().includes(country.toLocaleLowerCase()))
    if (filter.length !== 0) {
      setFiltered(filter)
      if (filter.length === 1) {
        getWeather({ lat: filter[0].latlng[0], lon: filter[0].latlng[1] })
      }
    }
  }, [country, countries])

  const countryChange = (event) => {
    setCountry(event.target.value)
  }

  const getWeather = ({ lat, lon }) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OWM_API_KEY}&units=metric&lang=es`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <div>
        find countries <input value={country} onChange={countryChange} />
      </div>
      <div>
        <ul>
          {countries !== [] && country !== ''
            ? filtered.length > 10
              ? "Too many matches, specify another filter"
              : filtered.length === 1
                ? <div>
                  <h1>{filtered[0].name}</h1>
                  <div>
                    capital {filtered[0].capital}
                  </div>
                  <div>
                    area {filtered[0].area}
                  </div>
                  <h2>languages</h2>
                  <div>
                    <ul>
                      {filtered[0].languages.map(l => <li key={l.name}>{l.name}</li>)}
                    </ul>
                  </div>
                  <div>
                    <img style={{ "paddingTop": "20px" }} src={filtered[0].flag} height="128" alt='' />
                  </div>
                  <h1>Weather in {filtered[0].name}</h1>
                  <div>
                    temperature {weather ? `${weather.main.temp} Celcius` : ''}
                  </div>
                  {weather ? <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='' /> : ''}
                  <div>
                    wind {weather ? `${weather.wind.speed} m/s` : ''}
                  </div>
                </div>
                : filtered.map(c => <li key={c.name}>{`${c.name}`} <button onClick={() => setCountry(c.name)}>show</button> </li>)
            : "no criteria"
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
