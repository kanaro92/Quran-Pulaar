import client from './client';

const endPoint = '/ventes/';

const getVenteByCode = (code) => client.get(endPoint+code)

export default {
    getVenteByCode,
};
