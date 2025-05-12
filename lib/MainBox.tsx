import Image from "next/image";

async function MainBox({ city }: { city: string | undefined }) {
  const dataForecast = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=a530cc803efe4ab2a1b204603252503&q=${city}&days=3`
  );

  const forecastWeather = await dataForecast.json();
  const dayName = new Date(forecastWeather.location.localtime).getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="w-full  py-[2vh] md:py-[7vh] px-[6vw] rounded-[30px] bg-secondary text-white font-inter flex  flex-row gap-[5vw] justify-between">
      <div className=" flex flex-col gap-y-[34px]">
        <div className="rounded-[50px] px-[13px] py-[10px] bg-brand flex gap-[1vw]">
          <Image
            alt="location pin"
            width={16}
            height={16}
            src="/images/location-icon.png"
          ></Image>
          <p className="text-base">{forecastWeather.location.name}</p>
        </div>
        <div>
          <div>
            <h2 className="text-2xl md:text-4xl font-medium">
              {days[dayName]}
            </h2>
            <p className="text-sm font-normal">
              {forecastWeather.location.localtime.split(" ")[0]}
            </p>
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-4xl md:text-6xl font-medium">
              {Math.round(Number(forecastWeather.current.temp_c)) + "\u00B0C"}
            </h2>
            <p className="text-xs md:text-sm font-normal">
              High:{" "}
              {Math.round(
                Number(forecastWeather.forecast.forecastday[0].day.maxtemp_c)
              )}{" "}
              Low:{" "}
              {Math.round(
                Number(forecastWeather.forecast.forecastday[0].day.mintemp_c)
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[50%] flex flex-col text-right items-end justify-around ">
        <Image
          alt="weather icon"
          width={180}
          height={180}
          src={`https:${forecastWeather.current.condition.icon}`}
        ></Image>
        <p className="text-xl md:text-2xl font-normal">
          {forecastWeather.current.condition.text}
        </p>
        <p className="text-sm font-normal">
          Feels Like {Math.round(Number(forecastWeather.current.feelslike_c))}
        </p>
      </div>
    </div>
  );
}
export default MainBox;
