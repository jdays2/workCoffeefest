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

//обработка смежной кнопки закрытия модалки
const modals = document.querySelectorAll('.modal');
const activeClass = 'active';
if (modals) {
	modals.forEach((item) => {
		const closeBtn = item.querySelector('.modal__close-btn');
		closeBtn.addEventListener('click', () => {
			item.classList.remove(activeClass);
		});
	});
}

//обработка закрытия модалки при клике вне элемента
if (modals) {
	modals.forEach((item) => {
		item.addEventListener('click', (e) => {
			if (e.target === item) {
				item.classList.remove(activeClass);
			}
		});
	});
}

//обработка модалки для фильтра
const filterBtn = document.querySelectorAll('#filter');
const filterModal = document.querySelector('.filter-modal');

if (filterBtn) {
	filterBtn.forEach((item) => {
		item.addEventListener('click', () => {
			filterModal.classList.toggle(activeClass);
		});
	});
}

//обработка модалки для фильтра (news)
const filterBtnNews = document.querySelectorAll('#filter-1');
const filterModalNews = document.querySelector('.filter-modal-1');

if (filterBtnNews) {
	filterBtnNews.forEach((item) => {
		item.addEventListener('click', () => {
			filterModalNews.classList.toggle(activeClass);
		});
	});
}

//очистка фильтра
const clearBtn = document.querySelectorAll('#clear-filter');

if (clearBtn) {
	clearBtn.forEach((item) => {
		item.addEventListener('click', () => {
			const inputs = filterModal.querySelectorAll('input');
			inputs.forEach((item) => {
				item.checked = false;
			});
		});
	});
}

//очистка фильтра (news)
if (clearBtn) {
	clearBtn.forEach((item) => {
		item.addEventListener('click', () => {
			const inputs = filterModalNews.querySelectorAll('input');
			inputs.forEach((item) => {
				item.checked = false;
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
			if (cartBtnWrapper) {
				console.log('Найден элемент:', cartBtnWrapper);
			} else {
				console.log('Элемент не найден');
			}
			cartBtnWrapper.classList.toggle('active');
		});
	});
}
