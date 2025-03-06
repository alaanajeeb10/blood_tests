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

