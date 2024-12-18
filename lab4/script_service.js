document.getElementById("myForm").addEventListener("submit", validateForm);
async function validateForm(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let service = document.getElementById("service").value;
    let errorDiv = document.getElementById("error-messages");
    let messageDiv = document.getElementById("message");

    errorDiv.innerHTML = '';
    let hasErrors = false;

    // Проверка имени
    if (name.trim() === "" || name.length <= 2 || !/^[a-zA-Zа-яА-Я\s-]+$/.test(name)) {
        errorDiv.innerHTML += "<p style='color:red;'>Пожалуйста, введите корректное имя (только буквы, пробелы и дефисы, длина имени больше 2).</p>";
        hasErrors = true;
    }

    // Проверка телефона
    if (phone.trim() === "" || !/^(?:\+?\d{11})$/.test(phone)) {
        errorDiv.innerHTML += "<p style='color:red;'>Неверный формат номера телефона! (11 цифр, можно с +, без пробелов, дефисов и скобок).</p>";
        hasErrors = true;
    }

    // Проверка услуги
    if (service === "") {
        errorDiv.innerHTML += "<p style='color:red;'>Пожалуйста, выберите услугу!</p>";
        hasErrors = true;
    }

    if (hasErrors) {
        errorDiv.style.display = 'block';
        return false;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/home', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ service, name, phone })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        messageDiv.style.display = "block";
        messageDiv.textContent = "Запрос отправлен администратору. Спасибо!";
        setTimeout(() => { messageDiv.style.display = "none"; }, 5000);
        // Очистка полей после успешной отправки
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("service").value = "";
        return true;

    } catch (error) {
        console.error('Ошибка:', error);
        errorDiv.innerHTML += "<p style='color:red;'>Ошибка отправки запроса!</p>";
        errorDiv.style.display = 'block';
        return false;
    }
}

