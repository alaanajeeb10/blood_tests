const { addSlashes, stripSlashes } = require('slashes');

async function Addhosts(req,res,next){
    let name   = addSlashes(req.body.name);

    const Query = `INSERT INTO hosts (name) VALUES('${name}')`;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
        req.insertId=rows.insertId;
    } catch (err) {
        console.log(err);
        req.success=false;
        req.insertId=-1;
    }

    next();
}