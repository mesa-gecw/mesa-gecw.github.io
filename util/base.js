const { Deta } = require("deta");
const deta = Deta(process.env.DETA_PROJECT_KEY);

const GET = async (db_name = 'sw_ads' || 'sw_users', key = '') => { 
    let db = deta.Base(db_name);
    return await db.get(key);
};

const PUT = async (db_name = '', data = {}) => { 
    let db = deta.Base(db_name);
    return await db.put(data) 
};

const FETCH = async (db_name = '', last = '', limit = 25, query = {}) => { 
    let db = deta.Base(db_name);
    return await db.fetch(query, { last: last, limit: limit }) 
};

const DEL = async (db_name = '', key = '') => { 
    let db = deta.Base(db_name);
    return await db.delete(key); 
};

const ALL = async (db_name = '') => {
    let db = deta.Base(db_name);
    let res = await db.fetch();
    let allItems = res.items;
    while (res.last){
      res = await db.fetch({}, {last: res.last});
      allItems = allItems.concat(res.items);
    };
    return allItems;
};

const UPDATE = async (db_name = '', updates = {}, key = '') => { 
    let db = deta.Base(db_name);
    return await db.update(updates, key) 
};

module.exports = { GET, PUT, FETCH, DEL, ALL, UPDATE };