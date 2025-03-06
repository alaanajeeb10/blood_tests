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
        console.error("Error fetching hosts:", error);
    }
}


function loadHosts() {
    let select = document.getElementById("hostSelectHistory");
    select.innerHTML = '<option value="">בחירת לקוח</option>';
    for (let host of hosts) {
        select.innerHTML += `<option value="${host.id}">${host.name}</option>`;
    }
}

function editTests(id, high, low, heartR, date) {
    document.getElementById("highV").value = high;
    document.getElementById("lowV").value = low;
    document.getElementById("heartR").value = heartR;
    document.getElementById("testDate").value = date;

    selectedTeststId = id;
    document.getElementById("updateButton").style.display = "block";
}



async function sendTests() {
    let hostId = document.getElementById("hostSelectHistory").value;
    let highV = document.getElementById("highV").value;
    let lowV = document.getElementById("lowV").value;
    let heartR = document.getElementById("heartR").value;
    let testDate = document.getElementById("testDate").value;

    if (!hostId) {
        alert("נא לבחור משתמש!");
        return;
    }

    if (!highV || !lowV || !heartR|| !testDate) {
        alert("בבקשה למלא את כל הנתונים לפני השליחה!");
        return;
    }

    let data = {
        host_id: hostId,
        high_v: highV,
        low_v: lowValue,
        heart_r: heartR,
        date: testDate
    };

    try {
        let response = await fetch(`${URL}/T/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        console.log("OK", result);

        GetTests(hostId);
    } catch (error) {
        console.error("ERROR", error);
        alert("שגיאה בהוספת הנתונים");
    }
}


async function updateTests() {
    if (!selectedTestsId) {
        alert("please specify a test ID");
        return;
    }

    let hostId = document.getElementById("hostSelectHistory").value;
    let highV = document.getElementById("highV").value;
    let lowV = document.getElementById("lowV").value;
    let heartR = document.getElementById("heartR").value;
    let testDate = document.getElementById("testDate").value;


    if (!highV || !lowV || !heartR || !testDate) {
        alert("נא למלא את כל השדות!");
        return;
    }

    let data = {
        high_v: highV,
        low_v: lowV,
        heart_r: heartR,
        date: testDate
    };

    console.log("Sending data to server:", data); // הדפסה של הנתונים המשלוחים לשרת

    try {
        let response = await fetch(`${URL}/T/${selectedTestId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idx: selectedTestId, // Ensure the backend receives "idx"
                high_v: highV,
                low_v: lowV,
                heart_r: heartR,
                date: testDate
            })
        });

        let result = await response.json();
        if (response.ok) {
            GetTests(hostId);
            document.getElementById("updateButton").style.display = "none";
            selectedTestId = null;
        } else {
            alert("שגיאה בעדכון הנתונים: " + result.errorMessage);
        }
    } catch (error) {
        alert("שגיאה בעדכון הנתונים");
    }
}