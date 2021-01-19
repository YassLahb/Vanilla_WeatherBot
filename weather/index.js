'use strict';
const axios = require("axios");

const formatData = data => {
	return {
		location: `${data.location.name},${data.location.country}`,
		temperature: data.current.temperature,
		condition: data.current.weather_descriptions[0],
		code: data.current.weather_code,
		windSpeed: data.current.wind_speed,
		pressure: data.current.pressure,
		humidity: data.current.humidity
	}
}

const getWeather = location => {
	return new Promise(async (resolve, reject) => {
		const params =
		{
			access_key: '4cac01425f1c07eb64ad1b23fa18010f',
			query: location  
		}
		try {
			const weatherConditions = await axios.get(
				"http://api.weatherstack.com/current",
				{ params });
			resolve(formatData(weatherConditions.data));
		} catch (error) {
			reject(error);
		}
	});
}

const getWeatherforecast = (location,type='forecast') => {
	return new Promise(async (resolve, reject) => {
		const params =
		{
			access_key: '4cac01425f1c07eb64ad1b23fa18010f',
			query: location
		}
		try {
			const weatherConditions = await axios.get(
				"http://api.weatherstack.com/forecast",
				{ params });
			resolve(formatData(weatherConditions.data));
		} catch (error) {
			reject(error);
		}
	});
}


module.exports = { getWeather, getWeatherforecast};