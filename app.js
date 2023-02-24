const http = require('http');
const https = require('https');
const url = require('url');

const apiKey = 'a2bfbb5f1609f60a07d4d739845fab48';
const city = 'JAPAN';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


http.createServer((req, res) => {
  const apiUrlObj = url.parse(apiUrl);
  const client = apiUrlObj.protocol === 'https:' ? https : http;

  client.get(apiUrl, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      const weatherData = JSON.parse(data);
      const tempC = (weatherData.main.temp - 273.15).toFixed(2);
      const tempF = ((tempC * 9/5) + 32).toFixed(2);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<h1>Weather in ${city}</h1>`);
      res.write(`<p>Temperature: ${tempC}°C / ${tempF}°F</p>`);
      res.end();
    });

  }).on('error', (err) => {
    console.log('Error: ', err.message);
  });

}).listen(3004, () => {
  console.log('Server listening on port 3004');
});
