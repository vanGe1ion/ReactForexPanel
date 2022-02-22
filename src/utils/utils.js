import axios from "axios";

export async function axiosGet(getPath, params, callback) {
  await axios
    .get(getPath, { params })
    .then((response) => {
      if (response.data.error)
        console.log(
          "Ошибка запроса к внешнему ресурсу: " + response.data.error.info
        );
      else callback(response.data);
    })
    .catch((error) => console.log("Axios Error: " + error));
}

export function proportionCalc(members, precision = 2) {
  if (members.denominator1 === 0 || members.denominator2 === 0) return null;
  return Number(
    (
      (members.numerator1 * members.denominator2) /
      members.denominator1
    ).toFixed(precision)
  );
}
