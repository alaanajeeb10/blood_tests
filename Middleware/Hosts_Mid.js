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

async function Updatehosts(req,res,next){
    let idx    = parseInt(req.body.idx);
    let name   = addSlashes(req.body.name);

    let Query = `UPDATE hosts SET `;
    Query += ` name = '${name}' `;
    Query += ` WHERE id = ${idx} `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}


async function Deletehosts(req,res,next){
    let idx    = parseInt(req.body.idx);
    let Query = `DELETE FROM hosts  `;
    Query += ` WHERE id = ${idx} `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}

async function Readhosts(req,res,next){
    const Query = `SELECT * FROM hosts `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    req.user_by_id=[];
    try {
        [rows] = await promisePool.query(Query);
        for(let idx in rows){
            rows[idx].name= htmlspecialchars(stripSlashes(rows[idx].name));
            req.user_by_id[rows[idx].id] = rows[idx].name;
        }
        req.success=true;
        req.users_data=rows;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}

async function GetHostMonthStats(req, res) {
    const hostId = req.query.host_id;
    const month = req.query.month;

    const query = `
        SELECT
            host_id,
            AVG(CASE WHEN high_v > 140 OR low_v < 90 OR heart_r > 100 OR heart_r < 60 THEN high_v END) AS avg_high_v,
            AVG(CASE WHEN high_v > 140 OR low_v < 90 OR heart_r > 100 OR heart_r < 60 THEN low_v END) AS avg_low_v,
            AVG(CASE WHEN high_v > 140 OR low_v < 90 OR heart_r > 100 OR heart_r < 60 THEN heart_r END) AS avg_heart_r,
            COUNT(*) AS abnormal_count
        FROM tests
        WHERE user_id = ? 
          AND MONTH(date) = ?
          AND (high_v > 140 OR low_v < 90 OR heart_r > 100 OR heart_r < 60)
    `;

    const promisePool = db_pool.promise();
    try {
        const [rows] = await promisePool.query(query, [hostId, month]);

        res.json({ success: true, data: rows });
    } catch (err) {
        console.log("Database error:", err);
        res.status(500).json({ success: false, message: "Error fetching host statistics" });
    }
}

module.exports = {
    Addhosts: Addhosts,
    Readhosts:Readhosts,
    Updatehosts:Updatehosts,
    Deletehosts:Deletehosts,
    GetHostMonthStats:GetHostMonthStats,
}