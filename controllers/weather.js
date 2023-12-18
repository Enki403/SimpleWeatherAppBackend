const API_URL = process.env.OPENWEATHERMAP_URL || "http://api.openweathermap.org/data/2.5/";
const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

const {expressRequest, expressResponse} = require("express");

const axios = require("axios");
const { param } = require("../routes/weather");

const getWeatherByCityName = async(expressRequest, expressResponse = expressResponse) => {
    
    try{
        
        const units = expressRequest.query.units || 'imperial';

        const OpenWeatherParams = {
            q : expressRequest.query.cityName,
            units,
            appid: API_KEY,
        };
        
        const OpenWeatherResponse = await axios
            .get(`${ API_URL }weather`, { params : OpenWeatherParams })        
            .catch((OpenWeatherError)=>{
                const { status, data } = OpenWeatherError.response;
                
                parsedError = {
                    status: data.cod,
                    statusText: data.message
                }

                apiError = new Error(JSON.stringify(parsedError));
                apiError.code= status;
                
                throw( apiError );
            }
        );
        const { status, statusText, data } = OpenWeatherResponse;

        const location = {
            cityName: data.name,
            country: data.sys.country,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset
        };

        const keyWeatherInformation = {
            weather_main: data.weather[0].main,
            weather_description: data.weather[0].description,
            weather_icon: data.weather[0].icon,
            temperature: data.main.temp,
            feels_like:  data.main.feels_like,
            humidity: data.main.humidity,
        };
        
        return expressResponse.status(status).json({
            statusText,
            data: keyWeatherInformation
        });

    }catch( error ){
        
        const statusCode = error.code || 500;

        if(statusCode != 500){
            error.message = JSON.parse(error.message);
        }

        return expressResponse.status(statusCode).json({
            statusText: error.message.statusText
        });
    }
};

const getWeatherByCoordinates = async(expressRequest, expressResponse = expressResponse) => {
    
    try{
        
        const units = expressRequest.query.units || 'imperial';

        const OpenWeatherParams = {
            lat : expressRequest.query.lat,
            lon : expressRequest.query.lng,
            units,
            appid: API_KEY,
        };
        
        const OpenWeatherResponse = await axios
            .get(`${ API_URL }weather`, { params : OpenWeatherParams })        
            .catch((OpenWeatherError)=>{
                const { status, data } = OpenWeatherError.response;
                
                parsedError = {
                    status: data.cod,
                    statusText: data.message
                }

                apiError = new Error(JSON.stringify(parsedError));
                apiError.code= status;
                
                throw( apiError );
            }
        );
        const { status, statusText, data } = OpenWeatherResponse;

        const location = {
            cityName: data.name,
            country: data.sys.country,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset
        };

        const keyWeatherInformation = {
            timestamp: data.dt,
            timezone: data.timezone,
            location,
            weather_main: data.weather[0].main,
            weather_description: data.weather[0].description,
            weather_icon: data.weather[0].icon,
            temperature: data.main.temp,
            feels_like:  data.main.feels_like,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            humidity: data.main.humidity,
        };
        
        return expressResponse.status(status).json({
            statusText,
            data: keyWeatherInformation
        });

    }catch( error ){
        const statusCode = error.code || 500;

        if(statusCode != 500){
            error.message = JSON.parse(error.message);
        }

        return expressResponse.status(statusCode).json({
            statusText: error.message.statusText
        });
    }
};

module.exports = {
    getWeatherByCityName,
    getWeatherByCoordinates
}