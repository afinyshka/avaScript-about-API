const accessKey = '7Jg_loOMubnt8Tt2o2IDKdVnV-ATogqQqWc44Mva8pw';
const imageElement = document.getElementById('image');
const photographerElement = document.getElementById('photographer');
const likeButton = document.getElementById('like-button');
const likeCount = document.getElementById('like-count');

// Функция для загрузки случайного изображения
async function getRandomImage() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);
        const data = await response.json();
        const imageUrl = data.urls.regular;
        const photographerName = data.user.name;

        imageElement.src = imageUrl;
        photographerElement.textContent = `Фотограф: ${photographerName}`;
    } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
    }
}

// Функция для обработки лайков
let likes = localStorage.getItem('likes') || 0;
likeCount.textContent = likes;

likeButton.addEventListener('click', () => {
    likes++;
    likeCount.textContent = likes;
    localStorage.setItem('likes', likes);
});

// Загрузка первого случайного изображения при загрузке страницы
getRandomImage();
