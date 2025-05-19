/*
List component containing cities in a defined array. 
If a logged in user searches for a city that is on the list, 
it is replaced by another city.
*/

import CityItem from "./CityItem";
import getCityWeather from "./getCityWeather";

const CitiesBox = async ({ city }: { city: string }) => {
  const cities = ["New York", "London", "Tokio", "Buenos Aires"];

  const changeCities = (cities: string[]) => {
    const index = cities.indexOf(city);
    cities.splice(index, 1, "Rome");
    return console.log(cities);
  };

  if (cities.some((item) => item === city)) {
    changeCities(cities);
  }

  const weatherData = await Promise.all(cities.map(getCityWeather));

  return (
    <div className="=w-full xl:w-[30vw]">
      <h2 className="text-xl text-white pb-[18px]">Other Cities</h2>
      <div className="grid sm: grid-cols-1 md:grid-cols-2 gap-4">
        {/*list of city item */}
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
