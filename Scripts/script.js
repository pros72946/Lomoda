const headerCityButton = document.querySelector('.header__city-button')
let hash = location.hash.substring(1);

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



// запрос базы данных 

const getData = async () => {
    const data = await fetch('db.json');

    if (data.ok) {
        return data.json()
    } else {
        throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`)
    }
};

const getGoods = (callback, value) => {
    getData()
        .then(data => {
            if(value) {
                callback(data.filter(item => item.category === value))
            }else {
                callback(data);
            }
            
        })
        .catch(err => {
            console.log(err);
        }); 
};

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


try {
    const goodsList = document.querySelector('.goods__list');

    if (!goodsList) {
        throw 'This is not a goods page'
    };

    const createCard = ({ id, preview, cost, brand, name, sizes }) => {

        //тоже самое но ущербно
        //const  = data;
        // const id = data.id;
        // const preview = data.preview;
        // const cost = data.cost;
        // const brand = data.brand;
        // const name = data.name;
        // const sizes = data.sizes;
        

        const li = document.createElement('li');
        li.classList.add('goods__item');
        li.innerHTML = `
        <article class="good">
            <a class="good__link-img" href="card-good.html#${id}">
                <img class="good__img" src="goods-image/${preview}" alt="">
            </a>
            <div class="good__description">
                <p class="good__price">${cost} &#8381;</p>
                <h3 class="good__title">${brand} <span class="good__title__grey">/${name}</span></h3>
                ${sizes ? 
                    `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` :
                ''}
                <a class="good__link" href="card-good.html#${id}">Подробнее</a>
            </div>
        </article>
        `;
        
        return li;
    };

    const renderGoodsList = data => {
        goodsList.textContent = '';

        data.forEach((item) => {
           const card = createCard(item);
           goodsList.append(card);
            
        });
    };


    window.addEventListener('hashchange', () => {
        hash = location.hash.substring(1);
        getGoods(renderGoodsList, hash);
        document.querySelector('.goods__title').innerHTML= '<h2 class="goods__title">хз как сделать</h2>';

    })

    window.addEventListener('hashchange', () => {

    })

    getGoods(renderGoodsList, hash);

} catch (err) {

};