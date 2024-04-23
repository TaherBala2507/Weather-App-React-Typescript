import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import cloudicon from '../assets/icons/clouds.png'
import rainicon from '../assets/icons/rain.png'
import fogicon from '../assets/icons/fog.png'
import sunicon from '../assets/icons/sun.png'
import clearbg from '../assets/backgrounds/clear.jpg'
import cloudybg from '../assets/backgrounds/cloudy.jpg'
import rainybg from '../assets/backgrounds/rainy.jpg'
import sunnybg from '../assets/backgrounds/sunny.jpg'


const WeatherPage = () => {
    const { cityName } = useParams()
    const [weatherData, setWeatherData] = useState(null)
    const [wicon, setwicon] = useState()
    const [wbg, setwbg] = useState()
    const [currentDate, setCurrentDate] = useState()
    console.log(cityName);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_API_KEY}`)
                setWeatherData(res.data)

            }
            catch (err) {
                console.log("Error Round", err);
            }
        }
        fetchWeatherData();
    }, [])
    console.log("state", weatherData)

    useEffect(() => {
        if (weatherData && weatherData.weather) {
            const weatherIcon = weatherData.weather[0].main;
            if (weatherIcon == 'Clouds') {
                setwicon(cloudicon)
                setwbg(cloudybg)
            }
            else if (weatherIcon == 'Rain') {
                setwicon(rainicon)
                setwbg(rainybg)
            }
            else if (weatherIcon == 'Clear') {
                setwicon(sunicon)
                setwbg(clearbg)
            }
            else if (weatherIcon == 'Fog') {
                setwicon(fogicon)
                setwbg(cloudybg)
            }
        }

        const date = new Date()
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
        setCurrentDate(date.toLocaleDateString("en-Us", options));
        console.log(date)

    }, [weatherData])
    return (

        <div>
            <>
                {
                    weatherData && (<div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${wbg})`, backgroundSize: `cover`, backgroundPosition: `center` }}>

                        <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
                            <div className="font-bold text-xl">{cityName}</div>
                            <div className="text-sm text-gray-500">{currentDate}</div>
                            <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                                <img src={cloudicon} alt='' />
                            </div>
                            <div className="flex flex-row items-center justify-center mt-6">
                                <div className="font-medium text-6xl">{(weatherData.main.temp - 237.15).toFixed(1)}°C</div>
                                <div className="flex flex-col items-center ml-6">
                                    <div>{weatherData.weather[0].main}</div>
                                    <div className="mt-1">
                                        <span className="text-sm">
                                            <i className="far fa-long-arrow-up" />
                                        </span>
                                        <span className="text-sm font-light text-gray-500">{(weatherData.main.temp_min - 237.15).toFixed(1)}°C</span>
                                    </div>
                                    <div>
                                        <span className="text-sm">
                                            <i className="far fa-long-arrow-down" />
                                        </span>
                                        <span className="text-sm font-light text-gray-500">{(weatherData.main.temp_max - 237.15).toFixed(1)}°C</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between mt-6">
                                <div className="flex flex-col items-center">
                                    <div className="font-medium text-sm">Wind</div>
                                    <div className="text-sm text-gray-500">{weatherData.wind.speed} km/hr</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="font-medium text-sm">Humidity</div>
                                    <div className="text-sm text-gray-500">{weatherData.main.humidity} %</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="font-medium text-sm">Pressure</div>
                                    <div className="text-sm text-gray-500">{weatherData.main.pressure} mg</div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }

            </>
        </div>

    )
}

export default WeatherPage