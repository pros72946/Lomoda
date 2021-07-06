const headerCityButton = document.querySelector('.header__city-button')

if (localStorage.getItem('lomoda-location')) {
    headerCityButton.textContent = localStorage.getItem('lomoda-location')
}
headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?'
headerCityButton.addEventListener('click' , () => {
    const city = prompt('Укажите ваш город')
    headerCityButton.textContent = city
    localStorage.setItem('lomoda-location', city)
})


// Блокировка скрола

const disableScroll = () => {
    const widthSroll = window.innerWidth - document.body.offsetWidth

    document.body.disableScrollY = window.scrollY

    document.body.style.cssText = `
    position = fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hiden;
    padding-right: ${widthSroll}px;
    `;
}

const enableScroll = () => {
    document.body.style.cssText = ''
    window.scroll({
        top: document.body.disableScrollY
    })
}

// Модальное окно
const subHeaderCart = document.querySelector('.subheader__cart')
const cartOverlay = document.querySelector('.cart-overlay')

const modalCartOpen = () => {
    cartOverlay.classList.add('cart-overlay-open')   
}

const modelCartClose = () => {
    cartOverlay.classList.remove('cart-overlay-open')   
}

subHeaderCart.addEventListener('click', modalCartOpen)

cartOverlay.addEventListener('click',event => {
    const target = event.target
    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay'))  {
        modelCartClose()
    }
})

document.addEventListener('keydown', event => {
    if (event.keyCode === 27) {
        modelCartClose()
    }
})