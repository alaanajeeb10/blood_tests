const { addSlashes, stripSlashes } = require('slashes');

async function Addtests(req,res,next){
    let host_id       = (req.body.host_id       === undefined)  ?      -1 : parseInt(req.body.host_id     );
    let high_v        = (req.body.high_v=== undefined    )  ?       -1 : parseInt(req.body.high_v);
    let low_v  = (req.body.low_v  === undefined)  ?       -1 : parseInt(req.body.low_v);
    let heart_r        = (req.body.heart_r        === undefined)  ?       -1 : parseInt(req.body.heart_r      );
    let date        = (req.body.date        === undefined)  ?      "" : addSlashes(req.body.date    );

    let Query = `INSERT INTO tests `;
    Query += "(`host_id`, `high_v`, `low_v`, `heart_r`, `date`)";
    Query += " VALUES ";
    Query += `('${host_id}','${high_v}','${low_v}','${heart_r}','${date}')`;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        console.log(rows);
        req.success=true;
        req.insertId=rows.insertId;

    } catch (err) {
        console.log(err);
        req.success=false;
        req.insertId=-1;
    }

    next();
}

async function Updatetests(req, res, next) {
    let idx = parseInt(req.params.id);
    let high_v = (req.body.high_v === undefined) ? -1 : parseInt(req.body.high_v);
    let low_v = (req.body.low_v === undefined) ? -1 : parseInt(req.body.low_v);
    let heart_r = (req.body.heart_r === undefined) ? -1 : parseInt(req.body.heart_r);
    let date = (req.body.date === undefined) ? "" : addSlashes(req.body.date);

    console.log("Received update request:", req.body);

    let Query = `UPDATE measurements SET high_v = ?, low_v = ?, heart_r = ?, date = ? WHERE id = ?`;
    const promisePool = db_pool.promise();
    try {
        const [rows] = await promisePool.query(Query, [high_v, low_v, heart_r, date, idx]);
        if (rows.affectedRows > 0) {
            req.success = true;
            res.json({ success: true, message: "המדידה עודכנה בהצלחה" });
        } else {
            req.success = false;
        }
    } catch (err) {
        req.success = false;
    }
}

async function Deletetests(req,res,next){
    let idx = parseInt(req.params.id);
    let Query = `DELETE FROM tests  `;
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

async function Readtests(req, res, next) {
    let Query = 'SELECT *, ';
    Query += 'DATE_FORMAT(date, "%Y-%m-%d") AS date, ';
    Query += '(SELECT AVG(high_v) FROM tests) AS avg_high, ';
    Query += '(SELECT AVG(low_v) FROM measurements) AS avg_low, ';
    Query += '(SELECT AVG(heart_r) FROM measurements) AS avg_heart ';
    Query += 'FROM tests';

    const promisePool = db_pool.promise();
    let rows = [];

    try {
        [rows] = await promisePool.query(Query);
        rows = rows.map(measurement => ({
            ...measurement,
            highlight: measurement.high_value > 120 * 1.2 ||
                measurement.low_value > 80 * 1.2 ||
                measurement.heart_rate > 80 * 1.2
        }));

        req.success = true;
        req.measurements_data = rows;
    } catch (err) {
        req.success = false;
        console.log(err);
    }
    next();
}