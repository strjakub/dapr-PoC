document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('getHealthButton');
    button.addEventListener('click', async () => {
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
});

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('getIdButton');
    button.addEventListener('click', async () => {
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
});