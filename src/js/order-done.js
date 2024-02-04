function cancelOrder(orderId) {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch(`http://34.128.102.98/api/order/cancel?id=${orderId}`, requestOptions)
        .then(response => {
            console.log('Cancelation Response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Cancelation Data:', data);
            if (data.status === "success") {
                // Assuming you want to update the UI after confirmation, you can reload the orders.
                getOrders();
            } else {
                console.error('Cancelation Error:', data.message);
            }
        })
        .catch(error => {
            console.error('Cancelation Fetch Error:', error);
        });
}


// Display orders in the table
function displayOrders(orders) {
    const tableBody = document.getElementById('order2confirm');
    tableBody.innerHTML = '';

    orders.forEach(order => {
        console.log('Order Status:', order.status);

        // Check if the status is "true" before displaying the order
        if (order.status === "true") {
            console.log('Displaying Order:', order);
        
            const data = document.createElement('tr');
            data.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700";
            data.innerHTML = `
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <a href="detail.html?id=${order.id}">
                ${order.id}
                </a>
                </th>
                <td class="px-6 py-4">
                    <button onClick='cancelOrder("${order.id}")' class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                        Cancel
                    </button>
                </td>
            `;
            tableBody.appendChild(data);
        }
    });
}

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
            console.log('Parsed JSON Data:', data);
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

window.onload = getOrders;
