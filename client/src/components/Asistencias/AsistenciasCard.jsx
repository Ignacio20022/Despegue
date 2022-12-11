import React from "react";
import '../Asistencias/Asistencias.css'
import Portada from '../../Images/Asistencias/Portada.png'
import Condiciones from '../../Images/Asistencias/Condiciones.png'
import AsistenciasCardPlanes from "./AsistenciasCardPlanes";
export default function AsistenciasCard() {
  return (
    <div className="Asistencias-Fondo">
      <div className="Help-ContainerPortada Asistencias-Borde">
        <img src={Portada} alt="Portada" />
      </div>


      <div className="Asistencias-ContainerPrincipal container d-flex justify-content-center">
        <AsistenciasCardPlanes asistencia={'Basica'} info={null}/>
        <AsistenciasCardPlanes asistencia={'Estandar'} info={null}/>
        <AsistenciasCardPlanes asistencia={'Premium'} info={null}/>
      </div>
      <div className="container Asistencias-Condiciones">
        <img src={Condiciones} />
      </div>
    </div>
  );
}
