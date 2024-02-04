function getOrders() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch('http://34.128.102.98/api/order', requestOptions)
        .then(response => {
            console.log('Raw Response:', response);
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                displayOrders(data.data);
            } else {
                console.error('API Error:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

// Display orders in the table
function displayOrders(orders) {
    const tableBody = document.getElementById('order2confirm');
    tableBody.innerHTML = '';

    orders.forEach(order => {
        const data = document.createElement('tr');
        data.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700";
        
        if (order.status === "true") {
            data.innerHTML = `
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <a href="detail.html?id=${order.id}">
                ${order.id}
                </a>
                </th>
                <td class="px-6 py-4">
                    Complete
                </td>
            `;
        } else if (order.status === "false") {
            data.innerHTML = `
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <a href="detail.html?id=${order.id}">
                ${order.id}
                </a>
                </th>
                <td class="px-6 py-4">
                    Cancelled
                </td>
            `;
        } else {
            data.innerHTML = `
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <a href="detail.html?id=${order.id}">
                ${order.id}
                </a>
                </th>
                <td class="px-6 py-4">
                    Need to Confirm
                </td>
            `;
        }

        tableBody.appendChild(data);
    });
}

function countOrders() {
    console.log("Hei function started!")
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch('http://34.128.102.98/api/order/count', requestOptions)
        .then(response => {
            console.log('Raw Response:', response);
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                displayCount(data);
            } else {
                console.error('API Error:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

// Display orders count in the table
function displayCount(orders) {
    const tableBody = document.getElementById('statsCard');
    tableBody.innerHTML = '';

    const data = document.createElement('div');
        
    data.innerHTML = `
        <a href="index.html">
            <div class="w-full bg-blue-700 pt-24 pb-4 px-4 rounded-xl">
                <div class="">
                    <h1 class="font-extrabold text-xl">All orders</h1>
                    <p class="text-slate-400">${orders.total_orders} orders</p>    
                </div>
            </div>
        </a>

        <a href="complete.html">
            <div class="w-full bg-green-700 pt-24 pb-4 px-4 rounded-xl">
                <div class="">
                    <h1 class="font-extrabold text-xl">Complete Orders</h1>
                    <p class="text-slate-400">${orders.true_orders} Orders</p>    
                </div>
            </div>
        </a>

        <a href="o2c.html">
            <div class="w-full bg-red-800 pt-24 pb-4 px-4 rounded-xl">
                <div class="">
                    <h1 class="font-extrabold text-xl">Orders to confirm</h1>
                    <p class="text-slate-400">${orders.nostat_orders} Orders</p>    
                </div>
            </div>    
        </a>
    `;

    tableBody.appendChild(data);
}

function loadData() {
    countOrders();
    getOrders();
}

window.onload = loadData;