import { useState, useRef } from "react";
import axios from "axios";
import WeatherInfo from "./Components/WeatherInfo";
import WeatherInfo5Days from "./Components/WeatherInfo5Days";
import Footer from "./Components/Footer";
import { FaSpinner } from 'react-icons/fa';

function App() {
  const [weather, setWeather] = useState(null);
  const [weather_5days, setWeather_5days] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const inputRef = useRef();

  async function searchCity() {
    setIsLoading(true);
    try {
      console.log("Função searchCity chamada");
      const city = inputRef.current.value;

      const key = "cfeef10e69fbee250edf91776f23afee";
      const url_api_city = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pt_br`;

      const url_api_last_5days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric&lang=pt_br`;
      const response_5days = await axios.get(url_api_last_5days);
      const response = await axios.get(url_api_city);
      setWeather(response.data);
      console.log(response_5days.data);
      setWeather_5days(response_5days.data);
    } catch (error) {
      console.error("Erro ao buscar a cidade:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-blue-100 to-indigo-200 flex flex-col items-center p-6 md:p-8 lg:p-12 pb-20">
      <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg text-center">
        Previsão do Tempo
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <input
          ref={inputRef}
          type="text"
          placeholder="Digite uma cidade"
          className="px-6 py-3 bg-white text-gray-500 font-semibold rounded-lg shadow-md placeholder-gray-500 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2"
        />
        <button
          onClick={searchCity}
          className="px-4 py-2 bg-blue-700 text-white font-semibold rounded shadow-sm hover:bg-blue-600 hover:scale-105 transition duration-200 ease-in-out cursor-pointer"
        >
          Buscar
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-gray-500" size={32} />
        </div>
      ) : (
        <>
          {weather && <WeatherInfo weather={weather} />}
          {weather_5days && <WeatherInfo5Days weather_5days={weather_5days} />}
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
