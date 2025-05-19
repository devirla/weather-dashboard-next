/*
 A function that returns an array of weather forecasts 
 for 12 hours ahead from the current time
*/

const get12HoursForecastWeather = async (city: string) => {
  const dataForecast = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=a530cc803efe4ab2a1b204603252503&q=${city}&days=3`
  );
  const forecastWeather = await dataForecast.json();

  const todayHours = forecastWeather.forecast.forecastday[0].hour;
  const tommorowHours = forecastWeather.forecast.forecastday[1].hour;

  const allHours = [...todayHours, ...tommorowHours];
  const now = new Date(forecastWeather.location.localtime);
  now.setMinutes(0, 0, 0);

  const next12Hours = allHours.filter((hour) => {
    const hourTime = new Date(hour.time);
    return (
      hourTime >= now &&
      hourTime <= new Date(now.getTime() + 11 * 60 * 60 * 1000)
    );
  });
  return next12Hours;
};
export default get12HoursForecastWeather;
