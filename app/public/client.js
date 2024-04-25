document.addEventListener('DOMContentLoaded', () => {
    const healthButton = document.getElementById('getHealthButton');
    healthButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/health');
            if (!response.ok) {
                throw new Error('Failed to fetch health status');
            }
            const data = await response.json();
            console.log('Health status:', data);
        } catch (error) {
            console.error('Error fetching health status:', error);
        }
    });

    const idButton = document.getElementById('getIdButton');
    idButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/id');
            if (!response.ok) {
                throw new Error('Failed to fetch id');
            }
            const data = await response.json();
            console.log('id:', data);
        } catch (error) {
            console.error('Error fetching id:', error);
        }
    });

    const feedButton = document.getElementById('feedButton');
    var dogName = document.getElementById("dog-select").value;
    var feedQuantity = document.getElementById("feed-quantity").value;
    feedButton.addEventListener('click', async () => {
        try {
            var requestData = {
                dogName: dogName,
                feedQuantity: feedQuantity
            };

            const response = await fetch('/feed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to post feed');
            }
            await response.json();
            console.log('Successful feeding :)');
        } catch (error) {
            console.error('Error posting feed:', error);
        }
    });
});





// const feedButton = document.getElementById('feedButton');
// feedButton.addEventListener('click', async () => {
//     var dogName = document.getElementById("dog-select").value;
//     var feedQuantity = document.getElementById("feed-quantity").value;

//     try {
//         const response = await fetch('/feed');
//         if (!response.ok) {
//             throw new Error('Failed to fetch id');
//         }
//         const data = await response.json();
//         console.log('id:', data);
//     } catch (error) {
//         console.error('Error fetching id:', error);
//     }
// });


// document.getElementById("myForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Get form values
//     var username = document.getElementById("username").value;
//     var age = document.getElementById("age").value;
//     var gender = document.getElementById("gender").value;

//     // Do something with the form values, for example, log them to the console
//     console.log("Username:", username);
//     console.log("Age:", age);
//     console.log("Gender:", gender);

//     // Here you can perform further actions like sending the form data to the server via AJAX
// });
