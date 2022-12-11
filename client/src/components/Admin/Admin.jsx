import React, { useEffect } from "react";
// import MuiDataTable from 'mui-datatables'
import { useDispatch, useSelector } from "react-redux";
import {  listHistory, listOffers, listUsers } from "../../Redux/Actions";
import '../styles/Admin.css'
import { ActiveOffersList, DisableOffersList, UserList } from "./Tables";


function Admin (){
    const dispatch = useDispatch()
    // const [render, setRender] = useState('')

    useEffect(e => {
        dispatch(listUsers())
        dispatch(listOffers())
        dispatch(listHistory())
        // setRender('chau')
    }, [dispatch]) 

    const users = useSelector(state => state.listUsers);
    const offersActive = useSelector(state => state.offersListA);
    const offersDisable = useSelector(state => state.offersListD);
    const history = useSelector(state => state.listHistory);
    let income = 0;
    history.forEach(e => {
        income += Number(e)
    })

    return (
        <div className="d-flex">
            <div className="usersTable">
                <div className="card-income">
                    <h3>Ingreso Total: {income}$</h3>
                </div>
                <div className="tableUsers">
                    <h2>Usuarios</h2>
                    <div>
                        <UserList users={users} />
                    </div>
                </div>
                <div className="tableUsers">
                    <h2>Ofertas Activas</h2>
                    <div>
                        <ActiveOffersList offersActive={offersActive} />
                    </div>
                </div>
                <div className="tableUsers">
                    <h2>Ofertas Desactivadas</h2>
                    <div>
                       <DisableOffersList offersDisable={offersDisable} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin