import axios from "axios";

export async function axiosGet(getPath, params, callback) {
  await axios
    .get(getPath, {params})
    .then((response) => {
      if (response.data.error)
        console.log(
          "Ошибка запроса к внешнему ресурсу: " + response.data.error.info
        );
      else callback(response.data);
    })
    .catch((error) =>
      console.log("Axios Error: " + error)
    );
}
