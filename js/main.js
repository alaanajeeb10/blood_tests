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