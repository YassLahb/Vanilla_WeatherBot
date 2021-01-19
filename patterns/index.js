const patternDict=
[
	{
    pattern: '\\b(?<greeting>Hi|Hello|Hey)\\b',
    intent: 'Hello',
},
{
    pattern:'\\b(Bye|Exit)\\b',
    intent: 'Exit',
},
{
    pattern:'\\bweather(?:\\s+like)?\\s+in\\s+(?<city>.+)\\b',
    intent:'CurrentWeather',
},
{
    pattern:'\\b(?<weather>hot|cold|rain|rainy|sunny|snow|thunderstorms|windy|drizzle)\\b\\s+in\\s+\\b(?<city>' +
        '(?:\\w+\\s+)+)(?<time>day\\s+after\\s+tomorrow|tomorrow|today)',
    intent:'WeatherForecast'
}
];
module.exports = patternDict;