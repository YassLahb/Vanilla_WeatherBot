'use strict';
const Readline = require('readline');
const rl = Readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});
const matcher = require('./matcher');
const { getWeather, getWeatherforecast} = require('./weather');
const { currentWeather, forecastWeather } = require('./parser');
rl.setPrompt('> ');
rl.prompt();
rl.on('line', reply => {
	matcher(reply, data => {
		switch (data.intent) {

			case 'Hello':
				console.log(`${data.entities.greeting} to you too!`);
				rl.prompt();
				break;

			case 'Exit':
				console.log("Have a great day!..Goodbye :) ");
				process.exit(0);
				break;

			case 'WeatherForecast':
				console.log(`Let me check...`);
				getWeatherforecast(data.entities.city, 'forecast').then(response => {
					console.log(forecastWeather(response, cb.entities));
				}).catch(error => {
					console.log("There seems to be a problem connecting to the Weather Service.");
				})
				break;

			case 'CurrentWeather':
				console.log(`Checking weather for ${data.entities.city}...`);
				getWeather(data.entities.city)
					.then(response => {
						let parseResult = currentWeather(response);
						console.log(parseResult);
						rl.prompt();
					})
					.catch(error => {
						console.log("I don't seem to know anything about this location...Sorry :(");

					});
				rl.prompt();
				break;



			default: {
				console.log("I don't know what you mean :(");
				rl.prompt();
			}
		}
	});
});