import axios from "axios";
const API_URL = "http://localhost:3001";

export async function loginUser(dni, password) {
    console.log("entro a Usuario login----")
    let data = {};
    await axios.post(`${API_URL}/usuario/login`, {dni, password})
        .then((response) => {
            localStorage.setItem("dni", response.data.dni );
            data = response.data;
            console.log("entro a Usuario login ---- data")
            console.log(data);
        })
        .catch((error) => {
            console.error("Error en el log de usuario", error);
        });
    return data;
}



/*
{import axios from "axios";
const API_URL = "http://localhost:3001";

export async function loginUser(dni, password) {
    console.log("entro a Usuario login----")
    let data = {};
        await axios.post(`${API_URL}/usuario/login`, {dni, password})
        .then((response) => {
        //localStorage.setItem("token", response.data.token);
        localStorage.setItem("dni", response.data.nombre);
        data = response.data;
        //console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("dni"));
      })
      .catch((error) => {
        console.error("Error en el log de usuario", error);
      });
    return data
}}
*/
