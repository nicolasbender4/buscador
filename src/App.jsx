import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsiarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticioGet = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsuarios(response.data);
        setTablaUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda = tablaUsiarios.filter((elemento)=>{
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
  }

  useEffect(() => {
    peticioGet();
  }, []);

  return (
    <>
      <div>
        <div>
          <h1 className="pb-5">Consulta de usuarios a una API </h1>
        </div>
        <div className="container">
          <input
            className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-full"
            id="buscar"
            type="text"
            placeholder="Buscar usuario..."
            value={busqueda}
            onChange={handleChange}
          />
        </div>
        <table className="table-fixed">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            {usuarios &&
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.name}</td>
                  <td>{usuario.username}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.address.city}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
