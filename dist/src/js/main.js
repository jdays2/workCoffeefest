document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('header');
    const body = document.body;
    const html = document.documentElement;

    // Пересчет rem в px 
    const rem = function (rem) {
        if (window.innerWidth > 768) {
            return 0.005208335 * window.innerWidth * rem;
        } else {
            // где 375 это ширина моб версии макета
            return (100 / 375) * (0.1 * window.innerWidth) * rem;
        }
    }

    // функция клика вне элемента
    function clickOutside(elem, needToClose) {
        document.addEventListener('click', function (e) {
            if (e.target !== elem && !elem.contains(e.target)) {
                needToClose.classList.remove('active');
            }
        })
    }

    // функция открытия попапа
    function openPopupElement(element) {
        if (window.innerWidth > 768) {
            let scrollWidth = (window.innerWidth - body.clientWidth);
            body.style.paddingRight = `${scrollWidth}px`;
            header.style.paddingRight = `${scrollWidth}px`
        }
        body.classList.add('lock', 'dark', 'blur');
        html.classList.add('lock');
        element.classList.add('active');
    }

    // функция закрытия попапа
    function closePopupElement(element) {
        body.classList.remove('lock', 'dark', 'blur');
        html.classList.remove('lock');
        element.classList.remove('active');
        if (window.innerWidth > 768) {
            body.style.paddingRight = '0';
            header.style.paddingRight = '0';
        }
    }

    if (document.querySelector('.popup__close')) {
        let popupCloseBtns = document.querySelectorAll('.popup__close');
        popupCloseBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                closePopupElement(btn.parentElement.parentElement);
            })
        })
    }

    // переключение табов на боковой панели в меню лк
    if (document.querySelector('.menu-tabs__item-btn')) {

    }


    // переключение тегов

    function initTags(tagButtons, tagBlocks) {
        tagButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                tagButtons.forEach(el => el.classList.remove('active'));
                tagBlocks.forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
                const path = btn.dataset.path;
                tagBlocks.forEach(block => {
                    if (block.dataset.target === path) {
                        block.classList.add('active');
                    }
                })
            })
        })
    }
    // аккордеоны

    function initAccordion(accordion) {
        let accItems = accordion.querySelectorAll('.acc-item');
        accItems.forEach(item => {
            let accHead = item.querySelector('.acc-head');
            let accContent = item.querySelector('.acc-content');
            accHead.addEventListener('click', function () {

                accItems.forEach(el => {
                    if (item !== el) {
                        el.classList.remove('active');
                        el.querySelector('.acc-content').style.maxHeight = null;
                    }
                })

                item.classList.toggle('active');
                if (accContent.style.maxHeight) {
                    accContent.style.maxHeight = null
                } else {
                    accContent.style.maxHeight = accContent.scrollHeight / 5 + "rem";
                }
            })
        });
    }

    // аккордеон в таблице заказов

    if (document.querySelector('.order-table__item-head')) {
        let orderTable = document.querySelector('.order-table');
        if (window.innerWidth > 768) {
            initAccordion(orderTable);
        } else {
            let orderTableItems = orderTable.querySelectorAll('.order-table__item');
            orderTableItems.forEach(item => {
                let accHead = item.querySelector('.acc-head');
                let orderPopup = document.querySelector('.order-popup');
                accHead.addEventListener('click', function () {
                    openPopupElement(orderPopup);
                })

            })
        }

    }

    // табы
    function initTabs(tabButtons, tabBlocks) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                tabButtons.forEach(el => el.classList.remove('active'));
                tabBlocks.forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
                const path = btn.dataset.path;
                tabBlocks.forEach(block => {
                    if (block.dataset.target === path) {
                        block.classList.add('active');
                        if (window.innerWidth <= 768 && block.classList.contains('account-lk__right-content')) {
                            body.classList.add('lock');
                        }
                    }
                })
            })
        })
    }

    // табы на сайдбаре в лк
    if (document.querySelector('.account-lk .sidebar-tabs__item-btn')) {
        const sidebarBtns = document.querySelectorAll('.account-lk .sidebar-tabs__item-btn');
        const accountBlocks = document.querySelectorAll('.account-lk__right-content');
        if (window.innerWidth > 768) {
            sidebarBtns[0].classList.add('active');
            accountBlocks[0].classList.add('active');
        }

        initTabs(sidebarBtns, accountBlocks);

        if (document.querySelector('.account-lk__right-back')) {
            const accountBlocksBackBtns = document.querySelectorAll('.account-lk__right-back');
            accountBlocksBackBtns.forEach(button => {
                button.addEventListener('click', function () {
                    button.parentElement.classList.remove('active');
                    body.classList.remove('lock');
                })
            })
        }
    }

    // табы на вкладжке ЗАКАЗЫ в лк
    if (document.querySelector('.account-lk__right-content .section-tags')) {
        let ordersTags = document.querySelectorAll('.account-lk__right-content .section-tags__item-btn');
        let orderTables = document.querySelectorAll('.account-lk__right-content .order-table');
        initTabs(ordersTags, orderTables)
    }

    // валидация на имя
    if (document.querySelector('.input#name')) {
        const inputName = document.querySelector('.input#name');
        const inputNameContainer = inputName.parentElement;
        const regName = /^[A-zА-ё]+$/;
        inputName.addEventListener('input', function (e) {
            let inputClass = regName.test(e.target.value) ? 'success' : 'invalid';
            inputNameContainer.classList.remove('success', 'invalid');
            inputNameContainer.classList.add(inputClass);
            if (e.target.value === '') {
                inputNameContainer.classList.remove('success', 'invalid');
            }
        })


        const inputEmail = document.querySelector('.input#email');
        const inputEmailContainer = inputEmail.parentElement;
        const regNameEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
        inputEmail.addEventListener('input', function (e) {
            let inputClass = regNameEmail.test(e.target.value) ? 'success' : 'invalid';
            inputEmailContainer.classList.remove('success', 'invalid');
            inputEmailContainer.classList.add(inputClass);
            if (e.target.value === '') {
                inputEmailContainer.classList.remove('success', 'invalid');
            }
        })

    }

    // аккордеон на странице Доставка и оплата
    if (document.querySelector('.delivery-main__accordion')) {
        document.querySelectorAll('.delivery-main__accordion').forEach(acc => {
            initAccordion(acc);
        })
    }

    // теги на странице Доставка и оплата
    if (document.querySelector('.delivery-main .section-tags')) {
        const deliveryMainTags = document.querySelectorAll('.section-tags__item-btn');
        const deliveryMainTagsBlock = document.querySelectorAll('.delivery-main__accordion');
        initTags(deliveryMainTags, deliveryMainTagsBlock);
    }

<<<<<<< HEAD
    // теги на странице О компании
    if (document.querySelector('.about-info .section-tags')) {
        const aboutInfoTags = document.querySelectorAll('.about-info .section-tags__item-btn');
        const aboutInfoTagsBlock = document.querySelectorAll('.about-info .about-info__card');
        initTags(aboutInfoTags, aboutInfoTagsBlock);
    }


=======
>>>>>>> bf42d05 (add some pages)
    // аккордеон на странице Карьера
    if (document.querySelector('.carrer-vacancies__accordion')) {
        initAccordion(document.querySelector('.carrer-vacancies__accordion'));
    }
})