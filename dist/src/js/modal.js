//обработка select-popup (изменение активного элемента в кнопке)
const selects = document.querySelectorAll('.card-det__popup--select');

if (selects) {
	selects.forEach((item) => {
		const mainWrapper = item.closest('.card-det__more');
		const value = mainWrapper.querySelector('.card-det__select-value');
		const inputs = item.querySelectorAll('input');
		inputs.forEach((item) => {
			item.addEventListener('input', () => {
				const labelValue = item.nextElementSibling.textContent;
				if (item.checked === true) {
					value.textContent = labelValue;
				}
			});
		});
	});
}

//обработка select-popup !общего! (изменение активного элемента в кнопке)
const mainSelects = document.querySelectorAll('.popup-block__popup--select');

if (mainSelects) {
	mainSelects.forEach((item) => {
		const mainWrapper = item.closest('.popup-block');
		const value = mainWrapper.querySelector('.popup-block__select-value');
		const inputs = item.querySelectorAll('input');
		inputs.forEach((item) => {
			item.addEventListener('input', () => {
				const labelValue = item.nextElementSibling.textContent;
				if (item.checked === true) {
					value.textContent = labelValue;
				}
			});
		});
	});
}

//обработка модалки персональная информация
const cartBtnInputs = document.querySelectorAll('.cart-input');

if (cartBtnInputs) {
	cartBtnInputs.forEach((element) => {
		element.addEventListener('input', () => {
			const cartBtnWrapper = element.closest('.cart-input-wrapper');
			cartBtnWrapper.classList.toggle('active');
		});
	});
}

//обработка смежной кнопки закрытия модалки
const modal = document.querySelectorAll('.modal');

if (modal) {
	modal.forEach((item) => {
		const closeBtn = item.querySelector('.modal__close-btn');
		const root = item.querySelector('.modal__root');

		const transitionHandler = () => {
			while (root.firstChild) {
				root.removeChild(root.firstChild);
			}
			item.classList.remove('active');
			item.removeEventListener('transitionend', transitionHandler);
		};

		closeBtn.addEventListener('click', () => {
			item.classList.remove('active');
			item.addEventListener('transitionend', transitionHandler);
		});

		//обработка клика вне модалки, для закрытия
		item.addEventListener('click', (e) => {
			if (e.target === item) {
				item.classList.remove('active');
				item.addEventListener('transitionend', transitionHandler);
			}
		});
	});
}

//обработка клика по popup и открытию меню.
const popupBtns = document.querySelectorAll('.popup-btn');

if (popupBtns) {
	const activeClass = 'active';

	popupBtns.forEach((btn) => {
		const list = btn.querySelector('.popup-list');
		btn.addEventListener('click', (e) => {
			if (!list.contains(e.target)) {
				btn.classList.toggle(activeClass);
			}
		});
	});
}

//select для popups
const popupSelectList = document.querySelectorAll('.popup-select-list');

if (popupSelectList) {
	const activeClass = 'active';

	popupSelectList.forEach((list) => {
		const listItems = list.querySelectorAll('.popup-select-item');

		listItems.forEach((item) => {
			item.addEventListener('click', () => {
				listItems.forEach((selectList) => {
					if (selectList === item) {
						selectList.classList.add(activeClass);
					} else {
						selectList.classList.remove(activeClass);
					}
				});
				//меняем значение
				const btn = item.closest('.popup-btn');

				if (!btn) {
					return;
				}
				const cardDetSelectValue = btn.querySelector('.card-det__select-value');
				const popupBlockSelectValue = btn.querySelector(
					'.popup-block__select-value',
				);
				if (cardDetSelectValue) {
					cardDetSelectValue.textContent = item.textContent.trim();
					return;
				}
				popupBlockSelectValue.textContent = item.textContent.trim();
			});
		});
	});
}
