// Здесь добавьте JavaScript для загрузки данных о занятиях, отображения их на странице,
// управления записью и отменой записи пользователей, и обновления данных в реальном времени.
// Вы можете использовать Fetch API для загрузки данных.

// Пример структуры данных о занятиях (замените на свои данные):
const scheduleData = [
    {
        name: "Вотер джим",
        time: "10:00 - 11:30",
        maxParticipants: 20,
        currentParticipants: 15,
    },
    {
        name: "Фитнес Лайт",
        time: "14:00 - 15:30",
        maxParticipants: 15,
        currentParticipants: 1,
    },
    {
        name: "Гимнастика",
        time: "10:00 - 11:30",
        maxParticipants: 12,
        currentParticipants: 11,
    },
    {
        name: "Пилатес",
        time: "14:00 - 15:30",
        maxParticipants: 15,
        currentParticipants: 15,
    },
    // Добавьте остальные занятия
];

const myTrainingData = []; // Массив для хранения выбранных занятий

let isRegistered = false; // Добавьте переменную для отслеживания регистрации
const registeredSessions = []; // Массив для отслеживания записей

function renderSchedule() {
    const scheduleElement = document.getElementById("schedule");
    if (scheduleElement.children.length === 0) {
        scheduleData.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("card", "mb-3");

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = item.name;

            const cardText = document.createElement("p");
            cardText.classList.add("card-text");
            cardText.textContent = `Время: ${item.time}`;
            cardText.textContent += `\nМакс. участников: ${item.maxParticipants}`;
            cardText.textContent += `\nТекущие участники: ${item.currentParticipants}`;

            const addButton = document.createElement("button");
            addButton.classList.add("btn", "btn-primary");
            addButton.textContent = "Записаться";

            // Проверяем, разрешено ли записываться
            if (!isRegistered) {
                addButton.addEventListener("click", () => {
                    if (item.currentParticipants < item.maxParticipants) {
                        // Проверяем, записан ли пользователь на это занятие
                        if (!registeredSessions.includes(item.name)) {
                            item.currentParticipants++;
                            // Обновляем текст в карточке расписания после изменения количества записей
                            updateCardText(item);
                            addToMyTraining(item);
                            registeredSessions.push(item.name); // Заносим это занятие в список записанных
                            updateButtonState(); // Обновляем состояние кнопок после регистрации
                        } else {
                            alert("Вы уже записаны на это занятие.");
                        }
                    } else {
                        alert("Извините, все места на занятии заняты.");
                    }
                });
            } else {
                addButton.disabled = true; // Кнопка неактивна, если пользователь уже зарегистрирован
            }

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(addButton);
            card.appendChild(cardBody);
            scheduleElement.appendChild(card);
        });
    }
}


function updateButtonState() {
    const buttons = document.querySelectorAll(".btn-primary");
    buttons.forEach(button => {
        if (isRegistered) {
            button.disabled = true;
        }
    });
}

function addToMyTraining(item) {
    myTrainingData.push(item);
    renderMyTraining();
}


// тут блок с моими тренировками
function renderMyTraining() {
    const myTrainingElement = document.getElementById("myTraining");
    myTrainingElement.innerHTML = "";
    myTrainingData.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card", "mb-3");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = item.name;

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = `Время: ${item.time}`;
        cardText.textContent += `\nМакс. участников: ${item.maxParticipants}`;
        cardText.textContent += `\nТекущие участники: ${item.currentParticipants}`;

        const removeButton = document.createElement("button");
        removeButton.classList.add("btn", "btn-danger");
        removeButton.textContent = "Отменить запись";
        removeButton.addEventListener("click", () => {
            item.currentParticipants--;
            removeFromMyTraining(item);
            renderSchedule();
        });

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(removeButton);
        card.appendChild(cardBody);
        myTrainingElement.appendChild(card);
    });
}

function updateCardText(item) {
    const scheduleElement = document.getElementById("schedule");
    const scheduleCards = scheduleElement.querySelectorAll(".card");
    scheduleCards.forEach(card => {
        const cardTitle = card.querySelector(".card-title");
        if (cardTitle.textContent === item.name) {
            const cardText = card.querySelector(".card-text");
            cardText.textContent = `Время: ${item.time}`;
            cardText.textContent += `\nМакс. участников: ${item.maxParticipants}`;
            cardText.textContent += `\nТекущие участники: ${item.currentParticipants}`;
        }
    });
}

function removeFromMyTraining(item) {
    const index = myTrainingData.indexOf(item);
    if (index !== -1) {
        myTrainingData.splice(index, 1);
        // Удалите название занятия из списка записанных
        const sessionIndex = registeredSessions.indexOf(item.name);
        if (sessionIndex !== -1) {
            registeredSessions.splice(sessionIndex, 1);
        }
        item.currentParticipants--; // Уменьшаем количество текущих записанных участников
        renderMyTraining();
        renderSchedule(); // Обновите карточку расписания после отмены записи
        updateButtonState(); // Обновите состояние кнопок после отмены записи
    }
}

renderSchedule();

