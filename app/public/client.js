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
    feedButton.addEventListener('click', async () => {
        try {
            var dogName = document.getElementById("dog-select").value;
            var feedQuantity = document.getElementById("feed-quantity").value;
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

    const images = document.querySelectorAll('.dog-image');
    images.forEach(image => {
        image.addEventListener('click', async () => {
            var dogName = document.getElementById("dog-select").value;

            const response = await fetch('/feed/' + dogName);
            if (!response.ok) {
                throw new Error('Failed to fetch feed value: ' + response.statusText);
            }
            const data = await response.json();

            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.textContent = 'Feed quantity: ' + data;
            overlay.style.backgroundColor = 'lightblue';
            overlay.style.color = 'black';
            overlay.style.position = 'absolute';
            const imageRect = image.getBoundingClientRect();
            overlay.style.top = imageRect.top + 'px'; 
            overlay.style.left = imageRect.left + 'px'; 
            overlay.style.width = image.clientWidth + 'px';
            overlay.style.height = image.clientHeight + 'px';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.fontSize = '1rem';
            overlay.style.borderRadius = '15px';
            image.style.position = 'relative'; 
            image.parentNode.appendChild(overlay);
                setTimeout(() => {
                    overlay.remove();
                }, 2000);
        });
    });
});

