export const columns = [
    {
        title: 'Nombre',
        field: 'name',
        editable: false,
        filtering: false
    },
    // {
    //     title: 'Apellido',
    //     field: 'lastname',
    //     editable: false,
    //     filtering: false
    // },
    {
        title: 'Email',
        field: 'email',
        editable: false,
        filtering: false
    },
    {
        title: 'Rol',
        field: 'roles',
        lookup: { 'user,admin': 'admin', user: 'user'},
        filterPlaceholder: 'Filtro por Rol'
    },
    {
        title: 'Status',
        field: 'active',
        lookup: { true: 'Activo', false: 'Desactivo' },
        filtering: false
    },
    {
        title: 'Membership',
        field: 'membership',
        lookup: { true: 'Con Membership', false: 'Sin Membership' },
        filterPlaceholder: 'Filtro por membership',
        // editable: false,
    },
    {
        title: 'Banned',
        field: 'banned',
        lookup: { true: 'Banneado', false: 'No Banneado' },
        filterPlaceholder: 'Filtro por Banneado'
    },
]

export const columnsOffersA = [
    {
        title: 'ID',
        field: '_id',
        editable: false,
    },
    {
        title: 'Imagen',
        field: 'image',
        validate: rowData => {
            if (rowData.image === '' || !rowData.image) return 'Required'
            return true;
        }
        // editable: false,
    },
    {
        title: 'Cant. Dias',
        field: 'day',
        type: 'numeric',
        validate: rowData => {
            if (rowData.day === '' || !rowData.day) return 'Required'
            return true;
        },
        // editable: false,
    },
    {
        title: 'Cant. Noches',
        field: 'nigth',
        type: 'numeric',
        validate: rowData => {
            if (rowData.nigth === '' || !rowData.nigth) return 'Required'
            return true;
        },
        // editable: false,
    },
    {
        title: 'Nombre del pais',
        field: 'name',
        validate: rowData => {
            if (rowData.name === '' || !rowData.name) return 'Required'
            return true;
        },
        // type: 'numeric',
        // editable: false,
    },
    {
        title: 'Dia de salida',
        field: 'dateFrom',
        validate: rowData => {
            if (rowData.dateFrom === '' || !rowData.dateFrom) return 'Required'
            return true;
        },
        // type: 'time',
        // editable: false,

    },
    {
        title: 'Dia de vuelta',
        field: 'dateTo',
        validate: rowData => {
            if (rowData.dateTo === '' || !rowData.dateTo) return 'Required'
            return true;
        },
        // type: 'time',
        // editable: false,

    },
    {
        title: 'Aeropuerto de salida',
        field: 'nameAirportFrom',
        validate: rowData => {
            if (rowData.nameAirportFrom === '' || !rowData.nameAirportFrom) return 'Required';
            else if (rowData.nameAirportFrom.length !== 3) return 'Tiene que contener 3 letras'
            return true;
        },
        // type: 'time',
        // editable: false,
    }, {
        title: 'Aeropuerto de llegada',
        field: 'nameAirportTo',
        validate: rowData => {
            if (rowData.nameAirportTo === '' || !rowData.nameAirportTo) return 'Required';
            else if (rowData.nameAirportTo.length !== 3) return 'Tiene que contener 3 letras'
            return true;
        },
        // type: 'time',
        // editable: false,
    },
    {
        title: 'Asistencia',
        field: 'asistans',
        lookup: { Estandar: 'Estandar', Basica: 'Basica', Premium: 'Premium', },
        validate: rowData => {
            if (rowData.asistans === '' || !rowData.asistans) return 'Required'
            return true;
        },
        // type: 'currency'
    },
    {
        title: 'Rating',
        field: 'rating',
        lookup: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
        validate: rowData => {
            if (rowData.rating === '' || !rowData.rating) return 'Required'
            return true;
        },
    },
    {
        title: 'Precio',
        field: 'price',
        type: 'currency',
        validate: rowData => {
            if (rowData.price === '' || !rowData.price) return 'Required'
            return true;
        },
        // editable: false,
    },
    // {
    //     title: 'Desde',
    //     field: 'from',
    //     // editable: false,
    // },
    // {
    //     title: 'Hasta',
    //     field: 'to',
    //     // editable: false,
    // },
]

export const columnsOffersD = [
    {
        title: 'ID',
        field: '_id',
        editable: false,
    },
    {
        title: 'Imagen',
        field: 'image',
        validate: rowData => {
            if (rowData.image === '' || !rowData.image) return 'Required'
            return true;
        }
        // editable: false,
    },
    {
        title: 'Cant. Dias',
        field: 'day',
        type: 'numeric',
        validate: rowData => {
            if (rowData.day === '' || !rowData.day) return 'Required'
            return true;
        },
        // editable: false,
    },
    {
        title: 'Cant. Noches',
        field: 'nigth',
        type: 'numeric',
        validate: rowData => {
            if (rowData.nigth === '' || !rowData.nigth) return 'Required'
            return true;
        },
        // editable: false,
    },
    {
        title: 'Nombre del pais',
        field: 'name',
        validate: rowData => {
            if (rowData.name === '' || !rowData.name) return 'Required'
            return true;
        },
        // type: 'numeric',
        // editable: false,
    },
    {
        title: 'Dia de salida',
        field: 'dateFrom',
        validate: rowData => {
            if (rowData.dateFrom === '' || !rowData.dateFrom) return 'Required'
            return true;
        },
        // type: 'time',
        // editable: false,

    },
    {
        title: 'Dia de vuelta',
        field: 'dateTo',
        validate: rowData => {
            if (rowData.dateTo === '' || !rowData.dateTo) return 'Required'
            return true;
        },
        // type: 'time',
        // editable: false,

    },
    {
        title: 'Aeropuerto de salida',
        field: 'nameAirportFrom',
        validate: rowData => {
            if (rowData.nameAirportFrom === '' || !rowData.nameAirportFrom) return 'Required';
            else if (rowData.nameAirportFrom.length !== 3) return 'Tiene que contener 3 letras'
            return true;
        },
        // type: 'time',
        // editable: false,
    }, {
        title: 'Aeropuerto de llegada',
        field: 'nameAirportTo',
        validate: rowData => {
            if (rowData.nameAirportTo === '' || !rowData.nameAirportTo) return 'Required';
            else if (rowData.nameAirportTo.length !== 3) return 'Tiene que contener 3 letras'
            return true;
        },
        // type: 'time',
        // editable: false,
    },
    {
        title: 'Asistencia',
        field: 'asistans',
        lookup: { Estandar: 'Estandar', Basica: 'Basica', Premium: 'Premium', },
        validate: rowData => {
            if (rowData.asistans === '' || !rowData.asistans) return 'Required'
            return true;
        },
        // type: 'currency'
    },
    {
        title: 'Rating',
        field: 'rating',
        lookup: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
        validate: rowData => {
            if (rowData.rating === '' || !rowData.rating) return 'Required'
            return true;
        },
    },
    {
        title: 'Precio',
        field: 'price',
        type: 'currency',
        validate: rowData => {
            if (rowData.price === '' || !rowData.price) return 'Required'
            return true;
        },
        // editable: false,
    },
    // {
    //     title: 'Desde',
    //     field: 'from',
    //     // editable: false,
    // },
    // {
    //     title: 'Hasta',
    //     field: 'to',
    //     // editable: false,
    // },
]