// Свойства navigator:

console.log(navigator.userAgent); // Содержит строку, описывающую браузер пользователя. Это может быть полезно для определения, какой браузер используется.
console.log(navigator.platform) // Содержит строку, указывающую операционную систему пользователя.
console.log(navigator.language) // Содержит информацию о языке, предпочтениях и культуре пользователя.
console.log(navigator.cookieEnabled) // Это логическое свойство, которое указывает, разрешены ли Cookie в браузере пользователя.
console.log(navigator.cookieEnabled); // Включены ли Cookie.
console.log(navigator.geolocation.getCurrentPosition); // Этот метод позволяет получить текущее местоположение пользователя с использованием геолокации.
console.log(navigator.doNotTrack); // Включена ли опция запрета на отслеживание.

// 1.Напишите функцию findClosestCity(userLocation, cities), которая принимает текущее местоположение пользователя в формате [latitude, longitude] и массив городов с их координатами в формате {name: 'City', location: [latitude, longitudel}. Функция должна вернуть название ближайшего города к пользователю.
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180); // Преобразует значение в радианы
}

function calculateDistance(coord1, coord2) {
    const [lat1, lon1] = coord1; // Разбивает координаты первого местоположения на широту и долготу
    const [lat2, lon2] = coord2;
    const earthRadiusKm = 6371; // радиус Земли

    const dLat = degreesToRadians(lat2 - lat1); // Вычисляет разницу широты в радианах
    const dLon = degreesToRadians(lon2 - lon1); // Вычисляет разницу долготы в радианах

    // lat1 = degreesToRadians(lat1);
    // lat2 = degreesToRadians(lat2);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +  // Вычисляет квадрат синуса половины разницы широты
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); // Вычисляет квадрат синуса половины разницы долготы и учитывает косинусы широт

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Вычисляет центральный угол между двумя местоположениями
    const distance = earthRadiusKm * c; // Вычисляет расстояние между двумя местоположениями на сфере Земли

    return distance;
}

function findFastestCity(cities) {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) { // Проверяет поддержку геолокации в браузере
            navigator.geolocation.getCurrentPosition(
                position => {
                    const userLocation = [position.coords.latitude, position.coords.longitude]; // Получает текущие координаты пользователя
                    let closestCity = null; // Переменная для хранения ближайшего города
                    let shortestDistance = Infinity; // Переменная для хранения кратчайшего расстояния

                    cities.forEach(city => { // Перебирает все города из массива cities
                        const distance = calculateDistance(userLocation, city.location) // Вычисляет расстояние от пользователя до текущего городом
                        if (distance < shortestDistance) { // Если расстояние меньше кратчайшего расстояния
                            closestCity = city.name; // Записывает имя текущего города в closestCity
                            shortestDistance = distance; // Записывает текущее расстояние B shortestDistance
                        }
                    });
                    resolve(closestCity); // Возвращает ближайший город
                },
                error => {
                    if (error.code === error.PERMISSION_DENIED) { // Если пользователь отказал в доступе к геолокации
                        reject(new Error('Пользователь отказал в доступе к геолокации.')); // Возвращает ошибку
                    } else {
                        reject(new Error('Ошибка при получении местоположения.')); // Возвращает ошибку
                    }
                }
            );
        } else {
            reject(new Error('Геолокация не поддерживается вашим браузером.')); // Возвращает ошибку
        }
    });
}


// Пример использования
const cities = [
    { name: 'Berlin', location: [52.5200, 13.4050] },
    { name: 'Paris', location: [48.8566, 2.3522] },
    { name: 'London', location: [51.5074, -0.1278] },
];

const closestCity = findFastestCity(cities);
console.log('Ближайший город:', closestCity); // Выводит "Ближайший город: Berlin"
