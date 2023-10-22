document.addEventListener("DOMContentLoaded", function() {
    // Step 1: Get the user's IP address and display it.
    fetch("https://ipinfo.io/51.235.127.187/geo")
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            document.getElementById("ip-address").textContent = ipAddress;
            
            const latitude = data.loc.split(",")[0];
            const longitude = data.loc.split(",")[1];
            const city = data.city;
            const region = data.region;
            const timeZone = data.timezone;

            const userInfo = document.getElementById("user-info");
            userInfo.innerHTML = `
                <h2>User Information:</h2>
                <p>Latitude: ${latitude}</p>
                <p>Longitude: ${longitude}</p>
                <p>City: ${city}</p>
                <p>Region: ${region}</p>
                <p>Time Zone: ${timeZone}</p>
            `;

           
            const googleMaps = document.getElementById("google-maps");
            googleMaps.innerHTML = `
                <!-- Use Google Maps API to display the map using latitude and longitude -->
            `;

           
            const pincode = data.postal;
            fetch(`https://api.postalpincode.in/pincode/${pincode}`)
                .then(response => response.json())
                .then(postOfficeData => {
                    const postOffices = postOfficeData[0].PostOffice;
                    displayPostOffices(postOffices);
                });
        });
});

function displayPostOffices(postOffices) {
    const postOfficeContainer = document.getElementById("post-offices");
    const searchBox = document.getElementById("search-post-office");


    postOffices.forEach(postOffice => {
        const card = document.createElement("div");
        card.classList.add("post-office-card");
        card.innerHTML = `
            <h3>${postOffice.Name}</h3>
            <p>Branch Type: ${postOffice.BranchType}</p>
            <p>Delivery Status: ${postOffice.DeliveryStatus}</p>
            <p>District: ${postOffice.District}</p>
            <p>Division: ${postOffice.Division}</p>
        `;
        postOfficeContainer.appendChild(card);
    });
}
