async function HighlightBox({ city }: { city: string }) {
  const dataForecast = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=a530cc803efe4ab2a1b204603252503&q=${city}&days=3`
  );
  const forecastWeather = await dataForecast.json();

  return (
    <div className="w-full  xl:w-[30vw] bg-radial-[at_0%_100%] from-[#162850] to-[#121A2D] px-[18px] py-[16px] rounded-[30px] text-white ">
      <h2 className="text-2xl pb-[17px]">Today Highlight</h2>
      <div className="flex flex-col gap-5 md:gap-19 w-full">
        <div className="flex gap-[21px]">
          <div className="w-full h-[120px] bg-secondary rounded-[20px] px-[16px] py-[5px]  ">
            <p className="text-sm md:text-base mb-[20px]">Chance of Rain</p>
            <p className="text-xl md:text-3xl">
              {forecastWeather.forecast.forecastday[0].day.daily_chance_of_rain}
              %
            </p>
          </div>
          <div className="w-full  h-[120px] bg-secondary rounded-[20px] px-[16px] py-[5px]">
            <p className="text-base mb-[20px]">UV Index</p>
            <p className="text-xl md:text-3xl">
              {Math.round(
                Number(forecastWeather.forecast.forecastday[0].day.uv)
              )}{" "}
            </p>
          </div>
        </div>
        <div className="flex gap-[21px]">
          <div className="w-full h-[120px] bg-secondary rounded-[20px] px-[16px] py-[5px] ">
            <p className="text-base mb-[20px]">Wind status</p>
            <p className="text-xl md:text-3xl">
              {Math.round(Number(forecastWeather.current.wind_kph))} km/h
            </p>
          </div>
          <div className="w-full h-[120px] bg-secondary rounded-[20px] px-[16px] py-[5px]">
            <p className="text-base mb-[20px]">Humidity</p>
            <p className="text-xl md:text-3xl">
              {forecastWeather.current.humidity}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HighlightBox;
