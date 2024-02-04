function confirmOrder(orderId) {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch(`http://34.128.102.98/api/order/done?id=${orderId}`, requestOptions)
        .then(response => {
            console.log('Confirmation Response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Confirmation Data:', data);
            if (data.status === "success") {
                // Assuming you want to update the UI after confirmation, you can reload the orders.
                getOrders();
            } else {
                console.error('Confirmation Error:', data.message);
            }
        })
        .catch(error => {
            console.error('Confirmation Fetch Error:', error);
        });
}


// Display orders in the table
function displayOrders(orders) {
    const tableBody = document.getElementById('order2confirm');
    tableBody.innerHTML = '';

    orders.forEach(order => {
        console.log('Order Status:', order.status);

        // Check if the status is "true" before displaying the order
        if (order.status === "") {
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
                    <button onClick='confirmOrder("${order.id}")' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Confirm
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
