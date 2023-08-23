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
		const closeBtn = document.querySelector('.modal__close-btn');
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

//очистка фильтра
const clearBtn = document.querySelector('#clear-filter');

if (clearBtn) {
	console.log(clearBtn);
	clearBtn.addEventListener('click', () => {
		const inputs = filterModal.querySelectorAll('input');
		console.log(inputs);
		inputs.forEach((item) => {
			item.checked = false;
		});
	});
}
