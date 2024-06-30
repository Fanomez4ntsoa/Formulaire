document.getElementById('user-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
        showNotification('Please enter your name.', 'warning');
        return;
    }

    if (!email || !emailPattern.test(email)) {
        showNotification('Please enter a valid email address.', 'warning');
        return;
    }

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        const data = await response.json();
        showNotification(data.message, 'success');
    } catch (error) {
        console.error('Error', error);
        showNotification('Please fill in all fields.', 'danger');
    }
});

function showNotification(message, type) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 4000);
}