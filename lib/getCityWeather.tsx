const getCityWeather = async (city: string) => {
  const res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=a530cc803efe4ab2a1b204603252503&q=${city}&days=1`
  );
  const data = await res.json();
  return {
    city: city,
    temp: data.current.temp_c,
    minTemp: data.forecast.forecastday[0].day.mintemp_c,
    maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
    icon: data.current.condition.icon,
  };
};
export default getCityWeather;
