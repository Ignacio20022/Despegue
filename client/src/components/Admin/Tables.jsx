import axios from "axios";
import { lazy } from "react";
import { deleteOffer, offersCreate, reactivateOffer, updateOffer, updateUser } from "../../Redux/Actions.js";
import { useDispatch } from "react-redux";
import { columns, columnsOffersA, columnsOffersD } from "./Columns"
const MaterialTable = lazy(() => import("@material-table/core"));
const DeleteIcon = lazy(() => import("@mui/icons-material/Delete"));
const ReplyAllTwoToneIcon = lazy(() =>
    import("@mui/icons-material/ReplyAllTwoTone")
);


export const UserList = (props) => {
    const { users } = props;
    const dispatch = useDispatch();

    return (
        <MaterialTable
            title={"Lista de usuarios"}
            columns={columns}
            data={users}
            options={{
                filtering: true,
                actionsColumnIndex: -1,
                columnsButton: true,
                rowStyle: { background: "#f5f5f5" },
                paginationType: "stepped",
            }}
            editable={{
                onRowUpdate: (newRow, oldRow) =>
                    new Promise(async (resolve, reject) => {
                        await dispatch(updateUser(newRow))
                        // setRender('hola')
                        resolve();
                        window.location.reload();
                    }),
            }}
        />
    );
};

export const ActiveOffersList = (props) => {
    const { offersActive } = props;
    const dispatch = useDispatch();

    return (
        <MaterialTable
            title={"Lista de Ofertas Activadas"}
            columns={columnsOffersA}
            data={offersActive}
            actions={[
                (data) => ({
                    icon: () => <DeleteIcon />,
                    tooltip: "Click me",
                    onClick: async (e, data) =>
                        await dispatch(deleteOffer(data)),
                }),
            ]}
            options={{
                addRowPosition: "first",
                actionsColumnIndex: -1,
                columnsButton: true,
                paginationType: "stepped",
                rowStyle: { background: "#f5f5f5" },
                selection: true,
            }}
            editable={{
                onRowAdd: (newRow) =>
                    new Promise(async (resolve, reject) => {
                        await dispatch(offersCreate(newRow));
                        console.log(newRow);
                        await axios({
                            method: "POST",
                            data: newRow,
                            url: "/users/dispatchEmail",
                        });
                        resolve();
                        window.location.reload();
                    }),
                onRowUpdate: (newRow, oldRow) =>
                    new Promise(async (resolve, reject) => {
                        await dispatch(updateOffer(newRow));

                        resolve();
                        window.location.reload();
                    }),
                onRowDelete: (selectedRow) =>
                    new Promise(async (resolve, reject) => {
                        await dispatch(deleteOffer(selectedRow));

                        resolve();
                        window.location.reload();
                    }),
            }}
        />
    );
};

export const DisableOffersList = (props) => {
    const { offersDisable } = props;
    const dispatch = useDispatch();

    return (
        <MaterialTable
            title={"Lista de Ofertas Desactivadas"}
            columns={columnsOffersD}
            data={offersDisable}
            actions={[
                (data) => ({
                    icon: () => <ReplyAllTwoToneIcon />,
                    tooltip: "Click me",
                    onClick: async (e, data) => {
                        await dispatch(reactivateOffer(data));
                        window.location.reload();
                    },
                }),
            ]}
            options={{
                addRowPosition: "first",
                actionsColumnIndex: -1,
                columnsButton: true,
                paginationType: "stepped",
                rowStyle: { background: "#f5f5f5" },
                selection: false,
            }}
        />
    );
};
