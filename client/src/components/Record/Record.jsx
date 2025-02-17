import React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../styles/Record.css'
import { useDispatch } from "react-redux";
import { clearFlights, getFlights } from "../../Redux/Actions";
import { useHistory } from "react-router-dom";
// import img from '../../Images/historialBusqueda.jpg'

export default function Record() {
    let dispatch = useDispatch()
    let history = useHistory()
    let record = JSON.parse(localStorage.getItem('record'))
    // console.log(record);
    // let names = JSON.parse(localStorage.getItem('names'))

    // useEffect(e =>{
    //     dispatch(clearFlights())
    // },[dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(clearFlights())
        localStorage.setItem('busqueda', JSON.stringify(record[e.target.value]))
        dispatch(getFlights(record[e.target.value]));
        console.log(record[e.target.value])
        if (record[e.target.value].tripType === 'onewaytrip') {
            history.push('/flights');
        } else {
            history.push('/flights/roundtrip/firstFlight');
        }
        localStorage.setItem('tripType', record[e.target.value].tripType)
        // dispatch(clearCart())
        // dispatch(clearFlights())
    }

    return (

        <div className="container-record">
            {
                record
                ?
                    <div>
                        <h4>Busqueda Reciente</h4>
                        <div className="Record-ContainerGeneral">
                            {
                                record.map((e, i) => {
                                    if (i > 2) return;
                                    return (
                                            <div key={i} className="card" id="record-card">
                                                <div className="card-body">
                                                    {
                                                        e.tripType === "roundtrip" 
                                                        ? <h6 className="p-1">Vuelo Ida y vuelta</h6> 
                                                        : <h6 className="p-1">Vuelo Ida</h6>
                                                    }
                                                    <h5 className="card-title p-1">{e.arrivalAirportName !== undefined ?e.arrivalAirportName : null}</h5>
                                                    <h6 className="p-1">Desde {e.departureAirportName}</h6>
                                                    <button type="button" className="btn btn-light mt-3" value={i} onClick={e => handleClick(e)}>Seguir buscando <ArrowForwardIosIcon /></button>
                                                </div>
                                            </div>    
                                    )
                                })
                            }
                        </div>
                    </div> 
                : null}
        </div>
    )
}
