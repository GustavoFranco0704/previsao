function WeatherInfo({ weather }) {

  const formatarData = () => {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.toLocaleString("pt-BR", { month: "long" });
    const ano = data.getFullYear();
    return `${dia} ${mes} de ${ano}`;
  };
  
  
  return (
    <div className="bg-gradient-to-t from-blue-300 via-white to-white bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-md mb-8">
      {weather && weather.name ? (
        <>
          <p className="text-gray-600 text-center">{formatarData()}</p>
          <h2 className="text-3xl font-bold text-center text-blue-600 mt-4">
            {weather.name}
          </h2>
          <p className="text-lg text-gray-700 mt-2">
            Temperatura: <span className="font-semibold">{Math.round(weather.main.temp)}ºC</span>
          </p>
          <p className="text-lg text-gray-700">
            Sensação térmica: <span className="font-semibold">{Math.round(weather.main.feels_like)}ºC</span>
          </p>
          <p className="text-lg text-gray-700">
            Umidade: <span className="font-semibold">{weather.main.humidity}%</span>
          </p>
          <div className="flex justify-center my-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="Ícone do clima"
            />
          </div>
          <p className="text-gray-700 text-center italic">
            {weather.weather[0].description}
          </p>
        </>
      ) : (
        <p className="text-gray-500 text-center mt-4 font-roboto">
          Nenhuma informação do clima disponível. Busque uma cidade!
        </p>
      )}
    </div>
  )
}

export default WeatherInfo