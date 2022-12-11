import React from "react";
import s from './Loader.module.css'
import img from '../../Images/Loader PF.gif'
// se usa info de momento

export default function Loader() {
    return (
        <div className={s.loader}>
            <img src={img} alt="Loader Img"/>
        </div>
    );
}

