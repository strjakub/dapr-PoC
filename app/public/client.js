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
