document.addEventListener('DOMContentLoaded', () => {
    const testButton = document.getElementById('test-button');
    const statusContainer = document.getElementById('status-container');

    testButton.addEventListener('click', async () => {
        statusContainer.innerHTML = '<p>Testando...</p>';
        statusContainer.className = ''; // Reset class

        try {
            const response = await fetch('/api/test-connection');
            const result = await response.json();

            if (response.ok) {
                statusContainer.innerHTML = `<p class="success">${result.message}</p>`;
            } else {
                throw new Error(result.message || 'Erro desconhecido');
            }
        } catch (error) {
            statusContainer.innerHTML = `<p class="error">Falha na conexão: ${error.message}</p>`;
        }
    });
});
