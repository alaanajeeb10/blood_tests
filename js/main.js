var URL = "http://localhost:6969";
var hosts = [];
var selectedHostId = null; // מזהה המדידה שנבחרה לעריכה

async function GetTests(hostId) {
    try {
        let url = `${URL}/T/?host_id=${hostId}`;
        let response = await fetch(url);
        let reply = await response.json();

        let filteredData = reply.data.filter(test => test.host_id == hostId);

        CreateTableBody(filteredData);
    } catch (error) {
        console.error("Error fetching measurements:", error);
    }
}

function CreateTableBody(tests) {
    let tableBody = document.getElementById("mainTableData");
    tableBody.innerHTML = "";

    for (let row of tests) {
        let smart_due = row.date !== "00-00-0000" ? row.date : "";
        let rowClass = row.highlight ? "highlighted" : "";

        tableBody.innerHTML += `
            <tr class="${rowClass}" id="row-${row.id}">
                <td>${row.high_v}</td>
                <td>${row.low_v}</td>
                <td>${row.heart_r}</td>
                <td>${smart_due}</td>
                <td>
                    <button onclick="editHosts(${row.id}, ${row.high_v}, ${row.low_v}, ${row.heart_r}, '${smart_due}')">ערוך</button>
                    <button onclick="deleteHosts(${row.id})" style="background-color: blue;">🗑 מחק</button>
                </td>
            </tr>
        `;
    }
}



async function GetHosts() {
    try {
        let url = `${URL}/H/`;
        let response = await fetch(url);
        let reply = await response.json();
        hosts = reply.data;
        loadHosts();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}


function loadHosts() {
    let select = document.getElementById("userSelectHistory");
    select.innerHTML = '<option value="">בחירת לקוח</option>';
    for (let host of hosts) {
        select.innerHTML += `<option value="${host.id}">${host.name}</option>`;
    }
}