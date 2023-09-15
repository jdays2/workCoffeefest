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
