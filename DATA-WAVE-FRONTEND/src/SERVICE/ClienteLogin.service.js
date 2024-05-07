import axios from "axios";
const API_URL = "http://localhost:3001";

// iniciar session

export async function loginClient(email, password) {
  console.log("entro a loginCliente")
  let data = {};
      await axios.post(`${API_URL}/cliente/login`, {email, password})
      .then((response) => {
      // Actualizar el estado con los datos obtenidos
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("nombre", response.data.nombre);
      data = response.data;
      console.log(localStorage.getItem("token"));
      //console.log(localStorage.getItem("nombre"));
    })
    .catch((error) => {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error("Error en el log cliente:", error);
    });
  return data
}