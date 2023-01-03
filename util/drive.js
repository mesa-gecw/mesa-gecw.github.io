const { Deta } = require("deta");
const deta = Deta(process.env.DETA_PROJECT_KEY);
const drive = deta.Drive("sw_ads");

const PUT = async (name, data, contentType) => {
    return await drive.put( name, { data: data, contentType: (contentType ? contentType : '') } );
};

const GET = async (name = '') => {
    return await drive.get(name);
};

const DELETE = async (name = '') => {
    return await drive.delete(name);
};

const DELETE_MANY = async (names = ['']) => {
    return await drive.deleteMany(names);
};

const LIST = async ( prefix = '', limit = 5, last = '' ) => {
    let options = {
        prefix: (prefix ? prefix : ''),
        limit: (limit ? limit : 5),
        last: (last ? last : '')
    };
    return await drive.list(options);
};

module.exports = { PUT, GET, DELETE, DELETE_MANY, LIST };