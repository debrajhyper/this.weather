import React, { Component } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import else_icon from "./assets/icons/else_icon.gif"
import search_icon from "./assets/icons/search.gif"
import icon from './icon'

const api = {
  key: "YOUR_API_KEY",
  base: "https://api.openweathermap.org/data/2.5/"
}

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`
}

const unix_timestamp = (t) => {
  var date = new Date(t* 1000);
  var hours = date.getHours()
  var AmorPm = hours >= 12 ? 'PM' : 'AM'
  hours = (hours % 12) || 12
  var minutes = "0" + date.getMinutes();
  
  var formattedTime = hours + ':' + minutes.substr(-2) + ' ' + AmorPm;
  return formattedTime;
}

var degToCard = (deg) => {
  if (deg>11.25 && deg<=33.75){
    return "NNE";
  }else if (deg>33.75 && deg<=56.25){
    return "ENE";
  }else if (deg>56.25 && deg<=78.75){
    return "E";
  }else if (deg>78.75 && deg<=101.25){
    return "ESE";
  }else if (deg>101.25 && deg<=123.75){
    return "ESE";
  }else if (deg>123.75 && deg<=146.25){
    return "SE";
  }else if (deg>146.25 && deg<=168.75){
    return "SSE";
  }else if (deg>168.75 && deg<=191.25){
    return "S";
  }else if (deg>191.25 && deg<=213.75){
    return "SSW";
  }else if (deg>213.75 && deg<=236.25){
    return "SW";
  }else if (deg>236.25 && deg<=258.75){
    return "WSW";
  }else if (deg>258.75 && deg<=281.25){
    return "W";
  }else if (deg>281.25 && deg<=303.75){
    return "WNW";
  }else if (deg>303.75 && deg<=326.25){
    return "NW";
  }else if (deg>326.25 && deg<=348.75){
    return "NNW";
  }else{
    return "N"; 
  }
}


class App extends Component {

  state = {
    setQuery: null,
    lat: null,
    lon: null,
    temp: null,
    location: null,
    icon: null,
    weather: null,
    weatherDesc: null,
    realFeel: null,
    humidity: null,
    visibility: null,
    pressure: null,
    minTemp: null,
    maxTemp: null,
    cloudiness: null,
    country: null,
    sunrise: null,
    sunset: null,
    windSpeed: null,
    windDeg: null,
    windDirection: null
  }

  componentDidMount() {
    if(navigator.geolocation) {
      this.getPositions()
      .then((position) => {
        // console.log(position)
        // console.log(position.coords.longitude, position.coords.latitude)
        this.setState({
          lon: position.coords.longitude,
          lat: position.coords.latitude
        })
        this.getWeather(position.coords.latitude, position.coords.longitude)
      })
      .catch((err) => {
        this.getWeather(24, 88);
        alert("You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather.");
      });
    }
    else {
      alert("Geolocation not available");
    }
  }

  getPositions = () => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true
      })
    })
  }

  getWeather = async(latitude, longitude) => {
    const url = await fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`)
    const data = await url.json()
    // console.log(data)
    this.setState({
      setQuery: null,
      lat: data.coord.lat,
      lon: data.coord.lon,
      temp: Math.round(data.main.temp),
      location: data.name,
      icon: data.weather[0].icon,
      weather: data.weather[0].main,
      weatherDesc: data.weather[0].description,
      realFeel: data.main.feels_like.toFixed(1),
      humidity: data.main.humidity,
      visibility: Math.round(data.visibility/1000),
      pressure: data.main.pressure,
      minTemp: data.main.temp_min.toFixed(1),
      maxTemp: data.main.temp_max.toFixed(1),
      cloudiness: data.clouds.all,
      country: data.sys.country,
      sunrise: unix_timestamp(data.sys.sunrise),
      sunset: unix_timestamp(data.sys.sunset),
      windSpeed: Math.round(data.wind.speed * 3.6),
      windDeg: data.wind.deg,
      windDirection: degToCard(data.wind.deg)
    })
  }



  render() {

    const search = async(e) => {
      if (e.key === "Enter") {
        try {
          const url = await fetch(`${api.base}weather?q=${this.state.setQuery}&units=metric&APPID=${api.key}`)
          const data = await url.json()
          // console.log(data)
          this.setState({
            setQuery: null,
            lat: data.coord.lat,
            lon: data.coord.lon,
            temp: Math.round(data.main.temp),
            location: data.name,
            icon: data.weather[0].icon,
            weather: data.weather[0].main,
            weatherDesc: data.weather[0].description,
            realFeel: data.main.feels_like.toFixed(1),
            humidity: data.main.humidity,
            visibility: Math.round(data.visibility/1000),
            pressure: data.main.pressure,
            minTemp: data.main.temp_min.toFixed(1),
            maxTemp: data.main.temp_max.toFixed(1),
            cloudiness: data.clouds.all,
            country: data.sys.country,
            sunrise: unix_timestamp(data.sys.sunrise),
            sunset: unix_timestamp(data.sys.sunset),
            windSpeed: Math.round(data.wind.speed * 3.6),
            windDeg: data.wind.deg,
            windDirection: degToCard(data.wind.deg)
          })
        }
        catch {
          alert(`Location ${this.state.setQuery} not found !`)
        }
        
      }
    }

    var weatherIcon;
    var appName = "app_name";
    // eslint-disable-next-line default-case
    switch(this.state.icon) {
      case "01d" :
        weatherIcon = icon.D_clear_sky;
        appName = "D_clear_sky";
        break;
      case "01n" :
        weatherIcon = icon.N_clear_sky;
        appName = "N_clear_sky";
        break;
      case "02d" :
        weatherIcon = icon.D_few_clouds;
        appName = "D_few_clouds";
        break;
      case "02n" :
        weatherIcon = icon.N_few_clouds;
        appName = "N_few_clouds";
        break;
      case "03d" :
        weatherIcon = icon.D_scattered_clouds;
        appName = "D_scattered_clouds";
        break;
      case "03n" :
        weatherIcon = icon.N_scattered_clouds;
        appName = "N_scattered_clouds";
        break;
      case "04d" :
        weatherIcon = icon.D_broken_clouds;
        appName = "D_broken_clouds";
        break;
      case "04n" :
        weatherIcon = icon.N_broken_clouds;
        appName = "N_broken_clouds";
        break;
      case "09d" :
        weatherIcon = icon.D_shower_rain;
        appName = "D_shower_rain";
        break;
      case "09n" :
        weatherIcon = icon.N_shower_rain;
        appName = "N_shower_rain";
        break;
      case "10d" :
        weatherIcon = icon.D_rain;
        appName = "D_rain";
        break;
      case "10n" :
        weatherIcon = icon.N_rain;
        appName = "N_rain";
        break;
      case "11d" :
        weatherIcon = icon.D_thunderstorm;
        appName = "D_thunderstorm";
        break;
      case "11n" :
        weatherIcon = icon.N_thunderstorm;
        appName = "N_thunderstorm";
        break;
      case "13d" :
        weatherIcon = icon.D_snow;
        appName = "D_snow";
        break;
      case "13n" :
        weatherIcon = icon.N_snow;
        appName = "N_snow";
        break;
      case "50d" :
        weatherIcon = icon.D_mist;
        appName = "D_mist";
        break;
      case "50n" :
        weatherIcon = icon.N_mist;
        appName = "N_mist";
        break;
    }


  if(this.state.temp) {
    return (
      <div className={appName}>
        <main>
          <div className="row">
            <div className="col-12 col-md-7 col-xl-8 col left">
              <div className="heading-title">
                <h1 className="title" ><a className="title-link" href="/">this.weather<br/></a></h1>
              </div>
              <div className="weather-box">
                <h1 className="d-inline-flex temp">{this.state.temp}°C<br/></h1>
                <div className="d-inline-flex location-box">
                  <h1 className="location">{this.state.location}</h1>
                  <h1 className="date">{dateBuilder(new Date())}</h1>
                </div>
                <div className="d-inline-flex weather-icon">
                  <div className="d-inline-flex weather-ibox">
                    <img className="image" alt="icon" type="image/gif" src={weatherIcon} width="100%" height="100%" />
                    <h1 className="d-inline-flex weather">{this.state.weather}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col right">
              <div className="search-box">
                <input type="text" className="search-bar" placeholder="Search..." onChange={e => {this.setState({setQuery: e.target.value})}} onKeyPress={search} />
                <img className="search-icon" alt="search" src={search_icon} />
              </div>
              <div className="details-box">
                <div className="d-flex weather-details">
                  <h1>Weather Details</h1>
                  <h1>{this.state.weatherDesc}</h1>
                </div>
                <div className="weather-info">
                  <br/>
                  <div className="basic">
                    <div className="d-flex">
                      <h1 className="name">Real feel</h1>
                      <h1 className="data">{this.state.realFeel}° c</h1>
                    </div>
                    <div className="d-flex">
                      <h1 className="name">Humidity</h1>
                      <h1 className="data">{this.state.humidity} %</h1>
                    </div>
                    <div className="d-flex">
                      <h1 className="name">Visibility</h1>
                      <h1 className="data">{this.state.visibility} km</h1>
                    </div>
                    <div className="d-flex">
                      <h1 className="name">Pressure</h1>
                      <h1 className="data">{this.state.pressure} hPa</h1>
                    </div>
                    <br/>
                    <div className="d-flex">
                      <h1 className="name">Min Temperature</h1>
                      <h1 className="data">{this.state.minTemp}° c</h1>
                    </div>
                    <div className="d-flex">
                      <h1 className="name">Max Temperature</h1>
                      <h1 className="data">{this.state.maxTemp}° c</h1>
                    </div>
                    <div className="d-flex">
                      <h1 className="name">Cloudiness</h1>
                      <h1 className="data">{this.state.cloudiness} %</h1>
                    </div>
                  </div>
                  <br/>
                  <div className="station">
                    <div className="d-flex position">
                      <div className="text-center">
                        <h1 className="base name">longitude</h1>
                        <h1 className="value data">{this.state.lon}</h1>
                      </div>
                      <div className="text-center">
                        <h1 className="base name">latitude</h1>
                        <h1 className="value data">{this.state.lat}</h1>
                      </div>
                    </div>
                    <div className="d-flex country">
                      <div className="text-center d-inline-block">
                        <h1 className="value data">{this.state.country}</h1>
                        <h1 className="base name">country</h1>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div className="xtra">
                    <div className="d-flex">
                      <h1 className="name">Sunrise</h1>
                      <h1 className="data">{this.state.sunrise}</h1>
                    </div>
                    <div className="d-flex">
                      <h1 className="name">Sunset</h1>
                      <h1 className="data">{this.state.sunset}</h1>
                    </div>
                    <br/>
                    <div className="d-flex">
                      <h1 className="name">Wind Speed</h1>
                      <h1 className="data">{this.state.windSpeed} km/h</h1>
                    </div>
                    <div className="d-flex">
                      <h1 className="name">Wind Degree</h1>
                      <h1 className="data">{this.state.windDeg}°</h1>
                    </div>
                    <div className="d-flex">
                      <h1 className="name">Wind Direction</h1>
                      <h1 className="data">{this.state.windDirection}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      );
  }else {
    return (
        <div className="app_name" >
          <main className="else-main">
            <div className="else-box">
              {/* <ReactPlayer className="else-img" alt="loading" url={else_icon} playing={true} loop={true} controls={false} autoplay /> */}
              <img className="else-img" alt="loading" src={else_icon} width="100%" height="100%" />
              <h3 className="else-detect">Detecting your location</h3>
              <h3 className="else-msg">
                Your current location wil be displayed on the App <br/> & used
                for calculating Real time weather.
              </h3>
            </div>
          </main>
        </div>
    );
  }
    
  } 
}





export default App;
