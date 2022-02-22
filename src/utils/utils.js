import axios from "axios";

export async function axiosGet(getPath, params, callback) {
  await axios
    .get(getPath, { params })
    .then((response) => {
      if (response.data.error)
        console.log(
          "Запрос вернул ответ с ошибкой: " + response.data.error.info
        );
      else callback(response.data);
    })
    .catch((error) =>
      console.log("Ошибка запроса к внешнему ресурсу: " + error)
    );
}

export function proportionCalc(members, precision = 2) {
  const { numeratorLeft, denominatorLeft, denominatorRight } = members;

  if (denominatorLeft === 0 || denominatorRight === 0) return null;

  return Number(
    ((numeratorLeft * denominatorRight) / denominatorLeft).toFixed(precision)
  );
}
