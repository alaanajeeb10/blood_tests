var URL = "http://localhost:6969";
var hosts = [];
var selectedHostId = null; // מזהה המדידה שנבחרה לעריכה

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