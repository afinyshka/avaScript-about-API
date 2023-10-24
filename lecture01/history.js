const nextBtn = document.querySelector('.nextBtn') 
const previousBtn = document.querySelector('.previousBtn') 

previousBtn.addEventListener('click', () => {
    window.history.back()
})

nextBtn.addEventListener('click', () => {
    window.history.forward()
})