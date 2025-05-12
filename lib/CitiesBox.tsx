import CityItem from "./CityItem";

const CitiesBox = async ({ city }: { city: string }) => {
  const cities = ["New York", "London", "Tokio", "Buenos Aires"];

  const changeCities = (cities: string[]) => {
    const index = cities.indexOf(city);
    cities.splice(index, 1, "Rome");
    return console.log(cities);
  };
  {
    return cities.some((item) => item === city) ? changeCities(cities) : "";
  }
  async function getWeather(city: string) {
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
  }

  const weatherData = await Promise.all(cities.map(getWeather));

  return (
    <div className="=w-full xl:w-[30vw]">
      <h2 className="text-xl text-white pb-[18px]">Other Cities</h2>
      <div className="grid sm: grid-cols-1 md:grid-cols-2 gap-4">
        {weatherData.map((item) => (
          <CityItem
            key={item.city}
            name={item.city}
            temp={item.temp}
            minTemp={item.minTemp}
            maxTemp={item.maxTemp}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};
export default CitiesBox;
