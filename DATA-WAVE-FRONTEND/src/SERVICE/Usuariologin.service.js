import axios from "axios";
const API_URL = "http://localhost:3001";

export async function loginUser(dni, password) {
    console.log("entro a Usuario login")
    let data = {};
        await axios.post(`${API_URL}/usuario/login`, {dni, password})
        .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("nombre", response.data.nombre);
        data = response.data;
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("nombre"));
      })
      .catch((error) => {
        console.error("Error en el log de usuario", error);
      });
    return data
}
