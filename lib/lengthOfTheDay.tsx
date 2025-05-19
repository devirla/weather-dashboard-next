/*
Function returning the calculated length of the day.
 */
const lengthOfTheDay = async (city: string) => {
  const dataForecast = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=a530cc803efe4ab2a1b204603252503&q=${city}&days=3`
  );
  const forecastWeather = await dataForecast.json();

  const sunrise = new Date(
    forecastWeather.forecast.forecastday[0].date +
      " " +
      forecastWeather.forecast.forecastday[0].astro.sunrise
  );

  const sunset = new Date(
    forecastWeather.forecast.forecastday[0].date +
      " " +
      forecastWeather.forecast.forecastday[0].astro.sunset
  );

  const diffMs = sunset.getTime() - sunrise.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <p className="text-2xl pt-[1vh]">
      {hours}h {minutes}m
    </p>
  );
};
export default lengthOfTheDay;
