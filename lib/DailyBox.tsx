/* 
Component containing daily weather information for the main city
(12-hour weather forecast, average temperature for tomorrow,
 sunrise time, sunset time, day length)
*/
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import DailyItem from "./DailyItem";
import get12HoursForecastWeather from "./get12HoursForecastWeather";
import lengthOfTheDay from "./lengthOfTheDay";

async function DailyBox({ city }: { city: string }) {
  const dataForecast = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=a530cc803efe4ab2a1b204603252503&q=${city}&days=3`
  );
  const forecastWeather = await dataForecast.json();

  return (
    <div>
      <div className="w-full   py-[29px] px-[27px] rounded-[30px] bg-secondary text-white font-inter flex flex-col sm:flex-row justify-between gap-[47px] md:gap-[30px]">
        <div className="w-full sm:w-[65%]  flex flex-col gap-[3vh]">
          <h2 className="text-2xl">Today/Week</h2>
          <div className="w-full px-[17px] py-[15px] rounded-[30px] bg-linear-to-bl from-[#0E1421] via-[#1D325F] to-[#0E1421] ">
            <div className="w-[83%] mx-auto">
              <Carousel className="w-[85%] m-auto">
                <CarouselPrevious />
                <CarouselContent>
                  {(await get12HoursForecastWeather(city)).map((item) => (
                    <DailyItem
                      key={item.time}
                      time={item.time}
                      conditionIcon={item.condition.icon}
                      temperature={item.temp_c}
                    />
                  ))}
                </CarouselContent>
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          <div className=" bg-linear-to-bl from-[#0E1421] via-[#1D325F] to-[#0E1421] rounded-[25px] px-[17px] py-[15px] flex justify-between ">
            <div className="flex flex-row gap-[7px]">
              <div className="flex flex-col gap-[5px]">
                <h2 className="text-base">Tomorrow</h2>
                <p className="text-[#676B73] text-xs">
                  {forecastWeather.forecast.forecastday[1].day.condition.text}
                </p>
              </div>
              <div className="text-4xl">
                {Math.round(
                  Number(forecastWeather.forecast.forecastday[1].day.avgtemp_c)
                ) + "\u00B0"}
              </div>
            </div>
            <Image
              alt="weather icon"
              width={50}
              height={50}
              src={`https:${forecastWeather.forecast.forecastday[1].day.condition.icon}`}
            ></Image>
          </div>
        </div>

        <div className="w-full sm:w-[35%] md:w-[50%] xl:w-[30%] bg-[#14203A] px-[14px] py-[35px] rounded-[20px] border border-solid border-[#000000] flex flex-col gap-[20px] items-center justify-between">
          <div>
            <h2 className="sm:text-xl md:text-sm sm:text-center  text-[#676B73]">
              Sunrise
            </h2>
            <div className="flex items-end sm:justify-center  gap-[15px]  ">
              <p className="text-2xl pt-[1vh] sm:text-center md:text-left ">
                {forecastWeather.forecast.forecastday[0].astro.sunrise}
              </p>
            </div>
          </div>
          <div>
            <h2 className="sm:text-xl md:text-sm sm:text-center  text-[#676B73]">
              Sundown
            </h2>
            <div className="flex items-end sm:justify-center  gap-[15px]  ">
              <p className="text-2xl pt-[1vh]">
                {" "}
                {forecastWeather.forecast.forecastday[0].astro.sunset}
              </p>
            </div>
          </div>
          <div>
            <h2 className="sm:text-xl md:text-sm sm:text-center  text-[#676B73]">
              Length of the day
            </h2>
            <div className="flex items-end sm:justify-center  gap-[15px]  ">
              {/* Length of the day in format hh:mm */}
              {lengthOfTheDay(city)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DailyBox;
