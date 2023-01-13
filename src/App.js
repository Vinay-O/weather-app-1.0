import "./App.css";
import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometerLow,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

//api Key
const APIkey = "f381ec0a75285e84ee5b49e4e627ce7d";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Bangalore");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    if (input.value === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = "";

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 500);
    });
  }, [location]);
  //false data
  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className="text-5xl animate-spin" />
        </div>
      </div>
    );
  }
  //icon setting
  let icon;
  console.log(data.weather[0].main);
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Haze":
      icon = <BsCloudHaze />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  //date
  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {/* form */}
      <form
        onChange={(e) => handleInput(e)}
        className={`
        ${
          animate ? "animate-shake" : "animate-none"
        }h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[20px] font-light pl-6 h-full"
            type="text"
            placeholder="Search by City/Country"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#1ab8ed] hover:bg-[#408aa7] w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6 ">
        <div>
          {/* card top */}
          <div className="flex items-center gap-x-5">
            {/* icon */}
            <div className="text-[90px]">{icon}</div>
            {/* place name */}
            <div>
              <div className="text-2xl font-semibold">
                {data.name},{data.sys.country}
              </div>
              {/* date */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getFullYear()}
              </div>
            </div>
          </div>
          {/* card body */}
          <div className="my-20 ">
            <div className="flex justify-center items-center">
              {/* temp */}
              <div className="text-[144px] leading-none font-light">
                {parseInt(data.main.temp)}
              </div>
              {/* celcius */}
              <div className="text-6xl">
                <TbTemperatureCelsius />
              </div>
            </div>
            {/* description */}
            <div className="capitalize text-center">
              {data.weather[0].description}
            </div>
          </div>
          {/* card bottom */}
          <div className="max-w-[380px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                {/* icon */}
                <div className="text-[20px]">
                  <BsEye />
                </div>
                <div className="ml-2 ">
                  Visibility{""} <span>{data.visibility / 1000} km</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                {/* icon */}
                <div className="text-[20px]">
                  <BsThermometerLow />
                </div>
                <div className="flex ">
                  Feels Like
                  <div className="flex ml-2">
                    {parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                {/* icon */}
                <div className="text-[20px]">
                  <BsWater />
                </div>
                <div className="ml-2 ">
                  Humidity <span>{data.main.humidity} %</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                {/* icon */}
                <div className="text-[20px]">
                  <BsWind />
                </div>
                <div className="flex ">
                  Wind <span className="ml-2">{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
