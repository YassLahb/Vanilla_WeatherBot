'use strict';
const colors = require("colors");
const dictionary = require("./dictionary");
const getFeel = temperature => {
	if (temperature < 5) {
		return 'shivering cold';
	} else if (temperature >= 5 && temperature < 15) {
		return 'pretty cold';
	} else if (temperature >= 15 && temperature < 25) {
		return 'moderately cold';
	} else if (temperature >= 25 && temperature < 32) {
		return 'quite warm';
	} else if (temperature >= 32 && temperature < 40) {
		return 'very hot';
	} else {
		return 'super hot';
	}

}

const getPrefix = (conditionCode, tense = "present") => {
	let findPrefix = dictionary[tense].find(item => {
		if (item.codes.indexOf(Number(conditionCode)) > -1) {
			return true;
		}
	});
	return findPrefix.prefix || "";
}


let getDate = day => {
	day = day.toLowerCase().trim();
	switch (day) {
		case 'tomorrow':
			return moment().add(1, 'd').format("DD MMM YYYY");
			break;
		case 'day after tomorrow':
			return moment().add(2, 'd').format("DD MMM YYYY");
			break;
		default:
			return moment().format("DD MMM YYYY");
	}
};


const currentWeather = response => {
	if (response.location) {
		const {
			location, condition, code, temperature
		} = response;
		return `Right now, ${getPrefix(code)} ${condition.toLowerCase().red} in ${location}. It is ${getFeel(Number(temperature))} at ${String(temperature).red} degrees Celsius..`
	}
}

let forecastWeather = (response, data) => {
	if (response.query.results) {
		let parseDate = getDate(data.time);
		let resp = response.query.results.channel;
		let forecast = resp.item.forecast.filter(item => {
			return item.date === parseDate;
		})[0];
		let location = `${resp.location.city}, ${resp.location.country}`;
		let regEx = new RegExp(data.weather, "i");
		let testConditions = regEx.test(forecast.text);
		return `${testConditions ? 'Yes' : 'No'}, ${getPrefix(forecast.code, 'future')} ${forecast.text.toLowerCase()} ${data.time} in ${location}.`;
	} else {
		return "I don't seem to know anything about this place... Sorry :(";
	}
};

module.exports = { currentWeather, forecastWeather };
