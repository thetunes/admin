// Get the current URL from the browser's address bar
var currentURL = window.location.href;

// Function to extract the value of a parameter from a URL
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Extract the 'id' parameter value from the current URL
var idValue = getParameterByName('id', currentURL);

function getDetail() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch('https://eclipse.herobuxx.me/api/order/get?id=' + idValue, requestOptions)
        .then(response => {
            console.log('Raw Response:', response);
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                displayDetail(data.data);  // Use data directly instead of data.data
            } else {
                console.error('API Error:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

// Display orders in the table
function displayDetail(order) {
    const tableBody = document.getElementById('ordersDetail');
    tableBody.innerHTML = '';

    const data = document.createElement('div');

    if (order.status === "true") {
        data.innerHTML = `
            <div id="cards-body" class="bg-gray-900 w-full py-6 px-8 my-8 rounded-2xl">
            <h1 class="font-extrabold text-3xl">Order Details</h1>

            <div class="my-8">
                <div class="relative overflow-x-auto py-6">
                    <h3 class="font-extrabold text-2xl">Customer ID</h3>
                    <span>${order.userid}</span>
                </div>

                <div class="relative overflow-x-auto py-6">
                    <h3 class="font-extrabold text-2xl">Ticket ID</h3>
                    <span>${idValue}</span>
                </div>

                <div class="relative overflow-x-auto py-6">
                    <h3 class="font-extrabold text-2xl">Ordered At</h3>
                    <span>${order.CreatedAt}</span>
                </div>
            </div>
            <div class="relative overflow-x-auto py-6">
                <div class="text-center">
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-1/3">
                        Cancel
                    </button>    
                </div>
            </div>
        </div>
        `;
    } else if (order.status === "false") {
        data.innerHTML = `
            <div id="cards-body" class="bg-gray-900 w-full py-6 px-8 my-8 rounded-2xl">
            <h1 class="font-extrabold text-3xl">Order Details</h1>

            <div class="my-8">
                <div class="relative overflow-x-auto py-6">
                    <h3 class="font-extrabold text-2xl">Customer ID</h3>
                    <span>${order.userid}</span>
                </div>

                <div class="relative overflow-x-auto py-6">
                    <h3 class="font-extrabold text-2xl">Ticket ID</h3>
                    <span>${idValue}</span>
                </div>

                <div class="relative overflow-x-auto py-6">
                    <h3 class="font-extrabold text-2xl">Ordered At</h3>
                    <span>${order.CreatedAt}</span>
                </div>
            </div>
        </div>
        `;
    } else {
        data.innerHTML = `
            <div id="cards-body" class="bg-gray-900 w-full py-6 px-8 my-8 rounded-2xl">
            <h1 class="font-extrabold text-3xl">Order Details</h1>

            <div class="my-8">
                <div class="relative overflow-x-auto py-6">
                    <h3 class="font-extrabold text-2xl">Customer ID</h3>
                    <span>${order.userid}</span>
                </div>

                <div class="relative overflow-x-auto py-6">
                    <h3 class="font-extrabold text-2xl">Ticket ID</h3>
                    <span>${idValue}</span>
                </div>

                <div class="relative overflow-x-auto py-6">
                    <h3 class="font-extrabold text-2xl">Ordered At</h3>
                    <span>${order.CreatedAt}</span>
                </div>
            </div>
            <div class="relative overflow-x-auto py-6">
                <div class="text-center">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/3">
                        Confirm
                    </button>    

                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-1/3">
                        Cancel
                    </button>    
                </div>
            </div>
        </div>
        `;
    }

    tableBody.appendChild(data);
}

function loadData() {
    getDetail();
}

window.onload = loadData;
