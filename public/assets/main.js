document.getElementById('user-form').addEventListener('submit', function(event) {
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

    if (name && email) {
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
        .then(response => response.json())
        .then(data => {
            showNotification(data.message, 'success');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
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