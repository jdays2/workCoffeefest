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
	};

	// функция клика вне элемента
	function clickOutside(elem, needToClose) {
		document.addEventListener('click', function (e) {
			if (e.target !== elem && !elem.contains(e.target)) {
				needToClose.classList.remove('active');
			}
		});
	}

	// функция открытия попапа
	function openPopupElement(element) {
		if (window.innerWidth > 768) {
			let scrollWidth = window.innerWidth - body.clientWidth;
			body.style.paddingRight = `${scrollWidth}px`;
			header.style.paddingRight = `${scrollWidth}px`;
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
		popupCloseBtns.forEach((btn) => {
			btn.addEventListener('click', function () {
				closePopupElement(btn.parentElement.parentElement);
			});
		});
	}

	// переключение табов на боковой панели в меню лк
	if (document.querySelector('.menu-tabs__item-btn')) {
	}

	// переключение тегов

	function initTags(tagButtons, tagBlocks) {
		tagButtons.forEach((btn) => {
			btn.addEventListener('click', function () {
				tagButtons.forEach((el) => el.classList.remove('active'));
				tagBlocks.forEach((el) => {
					el.classList.remove('active');
					el.classList.add('hide');
				});
				btn.classList.add('active');
				const path = btn.dataset.path;
				tagBlocks.forEach((block) => {
					if (block.dataset.target === path) {
						block.classList.add('active');
						block.classList.remove('hide');
					}
				});
			});
		});
	}

	// аккордеоны
	function initAccordion(accordion) {
		let accItems = accordion.querySelectorAll('.acc-item');
		accItems.forEach((item) => {
			let accHead = item.querySelector('.acc-head');
			let accContent = item.querySelector('.acc-content');
			accHead.addEventListener('click', function () {
				accItems.forEach((el) => {
					if (item !== el) {
						el.classList.remove('active');
						el.querySelector('.acc-content').style.maxHeight = null;
					}
				});

				item.classList.toggle('active');
				if (accContent.style.maxHeight) {
					accContent.style.maxHeight = null;
				} else {
					accContent.style.maxHeight = accContent.scrollHeight / 5 + 'rem';
				}
			});
		});
	}

	//показ и скрытие блока с информацией по заказу (корзина, после выбора карты)
	const ordersList = document.querySelector('.ordering__orders-wrapper');
	if (ordersList) {
		let accItems = ordersList.querySelectorAll('.acc-item');
		accItems.forEach((item) => {
			let accHead = item.querySelector('.acc-head');
			let accContent = item.querySelector('.acc-content');
			accHead.addEventListener('click', function () {
				item.classList.toggle('active');
				if (accContent.classList.contains('active')) {
					accContent.classList.remove('active');
				} else {
					accContent.classList.add('active');
				}
			});
		});
	}

	// аккордеон в таблице заказов

	if (document.querySelector('.order-table__item-head')) {
		let orderTable = document.querySelector('.order-table');
		if (window.innerWidth > 768) {
			initAccordion(orderTable);
		} else {
			let orderTableItems = orderTable.querySelectorAll('.order-table__item');
			orderTableItems.forEach((item) => {
				let accHead = item.querySelector('.acc-head');
				let orderPopup = document.querySelector('.order-popup');
				accHead.addEventListener('click', function () {
					openPopupElement(orderPopup);
				});
			});
		}
	}

	// табы
	function initTabs(tabButtons, tabBlocks) {
		tabButtons.forEach((btn) => {
			btn.addEventListener('click', function () {
				tabButtons.forEach((el) => el.classList.remove('active'));
				tabBlocks.forEach((el) => el.classList.remove('active'));
				btn.classList.add('active');
				const path = btn.dataset.path;
				tabBlocks.forEach((block) => {
					if (block.dataset.target === path) {
						block.classList.add('active');
						if (
							window.innerWidth <= 768 &&
							block.classList.contains('account-lk__right-content')
						) {
							body.classList.add('lock');
						}
					}
				});
			});
		});
	}

	// табы на сайдбаре в лк
	if (document.querySelector('.account-lk .sidebar-tabs__item-btn')) {
		const sidebarBtns = document.querySelectorAll(
			'.account-lk .sidebar-tabs__item-btn',
		);
		const accountBlocks = document.querySelectorAll(
			'.account-lk__right-content',
		);
		if (window.innerWidth > 768) {
			sidebarBtns[0].classList.add('active');
			accountBlocks[0].classList.add('active');
		}

		initTabs(sidebarBtns, accountBlocks);

		if (document.querySelector('.account-lk__right-back')) {
			const accountBlocksBackBtns = document.querySelectorAll(
				'.account-lk__right-back',
			);
			accountBlocksBackBtns.forEach((button) => {
				button.addEventListener('click', function () {
					button.parentElement.classList.remove('active');
					body.classList.remove('lock');
				});
			});
		}
	}

	// табы на вкладжке ЗАКАЗЫ в лк
	if (document.querySelector('.account-lk__right-content .section-tags')) {
		let ordersTags = document.querySelectorAll(
			'.account-lk__right-content .section-tags__item-btn',
		);
		let orderTables = document.querySelectorAll(
			'.account-lk__right-content .order-table',
		);
		initTabs(ordersTags, orderTables);
	}

	// валидация на имя
	if (document.querySelector('.input-name')) {
		const inputName = document.querySelectorAll('.input-name');

		const regName = /^[A-zА-ё]+$/;
		inputName.forEach((item) => {
			const inputNameContainer = item.parentElement;
			item.addEventListener('input', function (e) {
				let inputClass = regName.test(e.target.value) ? 'success' : 'invalid';
				inputNameContainer.classList.remove('success', 'invalid');
				inputNameContainer.classList.add(inputClass);
				if (e.target.value === '') {
					inputNameContainer.classList.remove('success', 'invalid');
				}
			});
		});
		//валидация на почту
		const inputEmail = document.querySelectorAll('.input-email');

		const regNameEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
		inputEmail.forEach((item) => {
			const inputEmailContainer = item.parentElement;
			item.addEventListener('input', function (e) {
				let inputClass = regNameEmail.test(e.target.value)
					? 'success'
					: 'invalid';
				inputEmailContainer.classList.remove('success', 'invalid');
				inputEmailContainer.classList.add(inputClass);
				if (e.target.value === '') {
					inputEmailContainer.classList.remove('success', 'invalid');
				}
			});
		});
	}

	//валидация телефонного номера
	const inputPhone = document.querySelectorAll('.input-tel');

	const regPhoneNumber =
		/^\+?\d{1,4}[\s.-]?\(?\d{1,3}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/;

	inputPhone.forEach((item) => {
		const inputPhoneContainer = item.parentElement;

		item.addEventListener('input', function (e) {
			let inputClass = regPhoneNumber.test(e.target.value)
				? 'success'
				: 'invalid';
			inputPhoneContainer.classList.remove('success', 'invalid');
			inputPhoneContainer.classList.add(inputClass);

			if (e.target.value === '') {
				inputPhoneContainer.classList.remove('success', 'invalid');
			}
		});
	});

	//валидация номера карты
	const inputCard = document.querySelectorAll('.input-card');

	const regCardNumber = /^(\d{4}\s?\d{4}\s?\d{4}\s?\d{4})$/;

	inputCard.forEach((item) => {
		const inputCardContainer = item.parentElement;

		item.addEventListener('input', function (e) {
			let inputClass = regCardNumber.test(e.target.value)
				? 'success'
				: 'invalid';
			inputCardContainer.classList.remove('success', 'invalid');
			inputCardContainer.classList.add(inputClass);

			if (e.target.value === '') {
				inputCardContainer.classList.remove('success', 'invalid');
			}
		});
	});

	//валидация даты карты
	const inputCardDate = document.querySelectorAll('.input-card-date');

	const regCardDate = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

	inputCardDate.forEach((item) => {
		const inputCardDateContainer = item.parentElement;

		item.addEventListener('input', function (e) {
			let inputClass = regCardDate.test(e.target.value) ? 'success' : 'invalid';
			inputCardDateContainer.classList.remove('success', 'invalid');
			inputCardDateContainer.classList.add(inputClass);

			if (e.target.value === '') {
				inputCardDateContainer.classList.remove('success', 'invalid');
			}
		});
	});

	// аккордеон на странице Доставка и оплата
	if (document.querySelector('.delivery-main__accordion')) {
		document.querySelectorAll('.delivery-main__accordion').forEach((acc) => {
			initAccordion(acc);
		});
	}

	// теги на странице Доставка и оплата
	if (document.querySelector('.delivery-main .section-tags')) {
		const deliveryMainTags = document.querySelectorAll(
			'.section-tags__item-btn',
		);
		const deliveryMainTagsBlock = document.querySelectorAll(
			'.delivery-main__accordion',
		);
		initTags(deliveryMainTags, deliveryMainTagsBlock);
	}

	// теги на странице О компании
	if (document.querySelector('.about-info .section-tags')) {
		const aboutInfoTags = document.querySelectorAll(
			'.about-info .section-tags__item-btn',
		);
		const aboutInfoTagsBlock = document.querySelectorAll(
			'.about-info .about-info__card',
		);
		initTags(aboutInfoTags, aboutInfoTagsBlock);
	}

	// аккордеон на странице Карьера
	if (document.querySelector('.carrer-vacancies__accordion')) {
		initAccordion(document.querySelector('.carrer-vacancies__accordion'));
	}
});

//показ и скрытие header__search-block
const searchBtn = document.querySelector('#header-search');
const searchCloseBtn = document.querySelector('.header__search-close-icon');
const searchBlock = document.querySelector('.header__search-block');
const headerList = document.querySelector('.header__top-list');

if (searchBtn && searchCloseBtn) {
	searchBtn.addEventListener('click', () => {
		searchBlock.classList.toggle(activeClass);
		headerList.classList.toggle(activeClass);
	});
	searchCloseBtn.addEventListener('click', () => {
		searchBlock.classList.toggle(activeClass);
		headerList.classList.toggle(activeClass);
	});
}

//отключение всплытия для календаря
const popupBlocks = document.querySelectorAll('.popup-block');

if (popupBlocks) {
	popupBlocks.forEach((e) => {
		e.addEventListener('click', function (event) {
			if (event.target.closest('.calendar')) {
				event.stopPropagation();
				event.preventDefault();
			}
		});
	});
}

//показ нужного блока (выбор медота доставки) в карточке товара при оплате
const allItems = document.querySelectorAll('.delivery-method');
const deliveryCheckers = document.querySelectorAll(
	'.ordering__method-item input',
);

if (deliveryCheckers) {
	deliveryCheckers.forEach((checker) => {
		checker.addEventListener('input', () => {
			const id = checker.id;
			switch (id) {
				case 'self-delivery':
				case 'self-delivery-sdek':
					allItems.forEach((item) => {
						if (item.id === 'self-delivery-block') {
							item.classList.add('active');
						} else {
							item.classList.remove('active');
						}
					});
					break;
				case 'curier-delivery':
					allItems.forEach((item) => {
						if (item.id === 'curier-delivery-block') {
							item.classList.add('active');
						} else {
							item.classList.remove('active');
						}
					});
					break;
				default:
			}
		});
	});
}

//обработка вставки изображения
const fileInput = document.querySelector('.catalog-inputs__file');
if (fileInput) {
	const inputParent = fileInput.closest('.catalog-inputs');
}

const removeFiles = document.querySelector('.catalog-inputs__file-remove-icon');
const fileName = document.querySelector('#file-name');
const fileSize = document.querySelector('#file-size');
//добавление
if (fileInput) {
	fileInput.addEventListener('input', function () {
		if (fileInput.files.length > 0) {
			inputParent.classList.add('active');
			fileInput.disabled = true;
			fileName.textContent = fileInput.files[0].name;
			fileSize.textContent =
				(fileInput.files[0].size / 1024).toFixed(2) + ' kb';
		}
	});
}
//удаление
if (removeFiles) {
	removeFiles.addEventListener('click', (e) => {
		if (fileInput.files.length > 0) {
			fileInput.value = '';
			inputParent.classList.remove('active');
			fileName.textContent = '';
			fileSize.textContent = '';
			fileInput.disabled = false;
		}
	});
}

//отображения текущего количества символов в textarea
const textareaWrap = document.querySelectorAll('.input-textarea-wrapper');
if (textareaWrap) {
	textareaWrap.forEach((item) => {
		const textarea = item.querySelector('textarea');
		const valueLimits = item.querySelector('.modal__textarea-limits');
		if (textarea && valueLimits) {
			textarea.addEventListener('input', () => {
				valueLimits.textContent = `${textarea.value.length}/1000`;
				debugger;
			});
		}
	});
}

//отображение :hover и постоянного выбранного состояния для иконок рейтинга
const iconsWrappers = document.querySelectorAll('.rates__icons-wrapper');
if (iconsWrappers) {
	iconsWrappers.forEach((wrapper) => {
		const icons = wrapper.querySelectorAll('.rates__icon');
		icons.forEach((icon, id) => {
			icon.addEventListener('click', () => {
				icons.forEach((currentIcon, i) => {
					if (i <= id) {
						currentIcon.classList.add('active');
					} else {
						currentIcon.classList.remove('active');
					}
				});
			});
			icon.addEventListener('mouseover', () => {
				icons.forEach((currentIcon, i) => {
					currentIcon.classList.add('hover-zero');
					if (i <= id) {
						currentIcon.classList.add('hover-active');
					} else {
						currentIcon.classList.remove('hover-active');
					}
				});
			});
			wrapper.addEventListener('mouseout', () => {
				icons.forEach((currentIcon) => {
					currentIcon.classList.remove('hover-zero');
					currentIcon.classList.remove('hover-active');
				});
			});
		});
	});
}

//загрузка изображений с превью в модалке
const inputImg = document.querySelector('.upload__input');
const previewImages = document.querySelectorAll('.upload__preview-box');
if (inputImg) {
	inputImg.addEventListener('change', function () {
		const selectedFile = inputImg.files.item(0);
		let imageAssigned = false;
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onload = function (event) {
			for (const item of previewImages) {
				const img = item.querySelector('img');

				if (!img.hasAttribute('src') || img.getAttribute('src') === '') {
					item.classList.add('active');
					img.src = event.target.result;
					imageAssigned = true;
					break;
				}
			}
		};
	});
}

// удаление картинки
const removeBtns = document.querySelectorAll('.upload__preview-box-remove');
if (removeBtns) {
	removeBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			const wrapper = btn.closest('.upload__preview-box');
			const img = wrapper.querySelector('img');
			img.src = '';
			wrapper.classList.remove('active');
		});
	});
}
