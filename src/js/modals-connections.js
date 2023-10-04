//инициируем карту
const mapInitSecond = () => {
	const searchItems = document.querySelectorAll('.map-block__search-item');
	const mapModal = document.querySelector('.modal-map');
	const activeClass = 'active';
	const root = document.querySelector('#root');

	//яндекс карта
	if (root) {
		const init = () => {
			const map = new ymaps.Map('root', {
				center: [55.807749, 37.570141],
				zoom: 14,
				type: 'yandex#map',
				controls: [],
			});

			const myBlueIcon = new ymaps.Placemark(
				[55.807749, 37.570141],
				{},
				{
					iconLayout: 'default#image',
					iconImageHref: './src/images/svg/generic/geo-map-blue.svg',
					iconImageSize: [66, 74],
				},
			);

			const myBiegeIcon = new ymaps.Placemark(
				[55.810479, 37.570991],
				{},
				{
					iconLayout: 'default#image',
					iconImageHref: './src/images/svg/generic/geo-map-biege.svg',
					iconImageSize: [66, 74],
				},
			);

			const myGreenIcon = new ymaps.Placemark(
				[55.820479, 37.578991],
				{},
				{
					iconLayout: 'default#image',
					iconImageHref: './src/images/svg/generic/geo-map-green.svg',
					iconImageSize: [66, 74],
				},
			);

			myGreenIcon.events.add('click', () => {
				mapModal.classList.add(activeClass);
			});

			myBlueIcon.events.add('click', () => {
				mapModal.classList.add(activeClass);
			});

			myBiegeIcon.events.add('click', () => {
				mapModal.classList.add(activeClass);
			});

			map.geoObjects.add(myBlueIcon);
			map.geoObjects.add(myBiegeIcon);
			map.geoObjects.add(myGreenIcon);

			// скрыть все элементы управления картой
			map.options.set('suppressMapOpenBlock', true);
		};
		ymaps.ready(init);
	}

	//открыть модалку по клику по карточке в списке адресов
	if (searchItems && mapModal) {
		const activeClass = 'active';
		searchItems.forEach((item, id) => {
			const link = item.querySelector('.arrow-link');

			const linkClickHandler = () => {
				mapModal.classList.add(activeClass);

				if (item.classList.contains(activeClass)) {
					return;
				} else {
					searchItems.forEach((element, index) => {
						if (id === index) {
							element.classList.add(activeClass);
						} else {
							if (element.classList.contains(activeClass)) {
								element.classList.remove(activeClass);
							}
						}
					});
				}
			};
			link.removeEventListener('click', linkClickHandler);
			link.addEventListener('click', linkClickHandler);
		});
	}

	//инициируем слайдер для модалки внутри карты
	const modalMapSwiper = new Swiper('.modal-map__swiper', {
		slidesPerView: 1,
		pagination: {
			clickable: true,
			el: '.modal-map__swiper-pagination',
		},
	});

	closeMapModal();
};

//функция валидации форм
const initValidation = () => {
	const validateInput = (inputElement, regex) => {
		const inputContainer = inputElement.parentElement;

		const inputHandler = (e) => {
			let inputClass = regex.test(e.target.value) ? 'success' : 'invalid';
			inputContainer.classList.remove('success', 'invalid');
			inputContainer.classList.add(inputClass);

			if (e.target.value === '') {
				inputContainer.classList.remove('success', 'invalid');
			}
		};

		inputElement.removeEventListener('input', inputHandler);
		inputElement.addEventListener('input', inputHandler);
	};

	// Валидация имени
	const inputName = document.querySelectorAll('.input-name');
	if (inputName.length > 0) {
		const regName = /^[A-zА-яё]+$/;
		inputName.forEach((item) => {
			validateInput(item, regName);
		});
	}

	// Валидация почты
	const inputEmail = document.querySelectorAll('.input-email');
	if (inputEmail.length > 0) {
		const regEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
		inputEmail.forEach((item) => {
			validateInput(item, regEmail);
		});
	}

	// Валидация телефонного номера
	const inputPhone = document.querySelectorAll('.input-tel');
	if (inputPhone.length > 0) {
		const regPhone =
			/^\+?\d{1,4}[\s.-]?\(?\d{1,3}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/;
		inputPhone.forEach((item) => {
			validateInput(item, regPhone);
		});
	}
};

// Вызов функции для инициализации валидации
initValidation();
document.addEventListener('DOMContentLoaded', initValidation);

//закрытие модалки для карты клик вне поля и по кнопке
const closeMapModal = () => {
	const madals = document.querySelectorAll('.modal-map');
	madals.forEach((block) => {
		const buttons = block.querySelectorAll('.modal__close-btn');
		const removeActiveClass = () => {
			block.classList.remove('active');
		};

		buttons.forEach((btn) => {
			btn.removeEventListener('click', removeActiveClass);
			btn.addEventListener('click', removeActiveClass);
		});

		block.addEventListener('click', (e) => {
			if (e.target === block) {
				block.classList.remove('active');
			}
		});
	});
};
closeMapModal();

//ВЫВОД МОДАЛОК ИЗ JS!!!

//модалка фильтр1 (новости)
const addModal = (name, child, name1, child2, btn) => {
	const wrapper = document.querySelector(`.${name}`);
	if (!wrapper) return;
	document.removeEventListener('DOMContentLoaded', initValidation);

	const wrapperRoot = wrapper.querySelector('.modal__root');
	wrapper.classList.add('active');
	wrapperRoot.innerHTML = child;
	initValidation();

	if (document.querySelector('#root')) {
		mapInitSecond();
		initFeedbackHandler();
	}

	if (name1 && child2) {
		const feedbackConfirmationBtn = document.querySelector(`${btn}`);

		const feedbackLickHandler = () => {
			wrapper.classList.remove('active');
			addModal(name1, child2);
		};

		feedbackConfirmationBtn.removeEventListener('click', feedbackLickHandler);
		feedbackConfirmationBtn.addEventListener('click', feedbackLickHandler);
	}
};

const modalFilterFirst = `
	<div class="teg-list">
		<p class="heading2">Теги</p>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Новости кофе</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Кофейная культура</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">События</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Новости кофеен</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Полезные советы</span>
		</label>
	</div>

	<div class="modal__btns">
		<button class="square-btn blue-square-btn">
			<span>Применить</span>
		</button>

		<button
			class="btn"
			id="clear-filter">
			<span>Очистить</span>
		</button>
	</div>

`;

const filterBtnNews = document.querySelector('#filter-1');

//очистка фильтра (news)
const removeCheckers = () => {
	const modal = document.querySelectorAll(`.teg-list`);
	modal.forEach((list) => {
		const inputs = list.querySelectorAll('input');
		inputs.forEach((item) => {
			item.checked = false;
		});
	});
};

const clearFilter = () => {
	const clearBtn = document.querySelectorAll('#clear-filter');
	if (clearBtn) {
		clearBtn.forEach((item) => {
			item.removeEventListener('click', removeCheckers);
			item.addEventListener('click', removeCheckers);
		});
	}
};

//добавление модалки новостей
if (filterBtnNews) {
	const modalClass = 'filter-modal-1';

	filterBtnNews.addEventListener('click', () => {
		addModal(modalClass, modalFilterFirst);
		clearFilter();
	});
}

//модалка фильтр2 (категории)
const modalFilterSecond = `<div class="teg-list">
		<p class="heading3">Способ заваривания</p>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Фильтр</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Эспрессо</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Френч-пресс</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Турка</span>
		</label>
	</div>

	<div class="teg-list">
		<p class="heading3">Страна происхождения</p>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Эфиопия</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Бразилия</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Колумбия</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Индонезия</span>
		</label>
	</div>

	<div class="modal__btns">
		<button class="square-btn blue-square-btn">
			<span>Применить</span>
		</button>

		<button
			class="btn"
			id="clear-filter">
			<span>Очистить</span>
		</button>
	</div>
`;

const filterBtnCategory = document.querySelector('#filter');
if (filterBtnCategory) {
	const modalClass = 'filter-modal';

	filterBtnCategory.addEventListener('click', () => {
		addModal(modalClass, modalFilterSecond);
		clearFilter();
	});
}

//модалка с уточнением геолокации "Вы здесь находитесь? + модалка карты"
const mapContent = `<div class="map-block">
<div class="map-block__search-box">
	<p class="heading4 map-block__search-title">Адреса ресторанов</p>
	<div class="search-block search-block--long">
		<label>
			<input
				class="search-block__input"
				type="text"
				placeholder="Поиск" />
			<button class="search-block__enter-icon">
						<svg class="arrow-right">
							<use xlink:href="sprite.svg#arrow-right" />
						</svg>
					</button>
		</label>
	</div>

	<ul class="map-block__search-list">
		<li class="map-block__search-item active">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">БЦ «Валлекс»</p>
				<p class="map-block__search-item-text">Москва,</p>
				<p class="map-block__search-item-text">
					Старокалужское ш. 62, 1ый этаж
				</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>

		<li class="map-block__search-item">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">
					Детская поликлиника № 130
				</p>
				<p class="map-block__search-item-text">Москва,</p>
				<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>

		<li class="map-block__search-item">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">
					Детская поликлиника № 69
				</p>
				<p class="map-block__search-item-text">Москва,</p>
				<p class="map-block__search-item-text">
					Севастопольский пр-д, д.40, с.1
				</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>

		<li class="map-block__search-item">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">
					Детская поликлиника № 148
				</p>
				<p class="map-block__search-item-text">Капотня,</p>
				<p class="map-block__search-item-text">3-й квартал, д.27</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>

		<li class="map-block__search-item">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">
					Детская поликлиника № 130
				</p>
				<p class="map-block__search-item-text">Капотня,</p>
				<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>

		<li class="map-block__search-item">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">
					Детская поликлиника № 130
				</p>
				<p class="map-block__search-item-text">Капотня,</p>
				<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>

		<li class="map-block__search-item">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">
					Детская поликлиника № 130
				</p>
				<p class="map-block__search-item-text">Капотня,</p>
				<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>

		<li class="map-block__search-item">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">
					Детская поликлиника № 130
				</p>
				<p class="map-block__search-item-text">Капотня,</p>
				<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>

		<li class="map-block__search-item">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">
					Детская поликлиника № 130
				</p>
				<p class="map-block__search-item-text">Капотня,</p>
				<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>

		<li class="map-block__search-item">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">
					Детская поликлиника № 130
				</p>
				<p class="map-block__search-item-text">Капотня,</p>
				<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>

		<li class="map-block__search-item">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">
					Детская поликлиника № 130
				</p>
				<p class="map-block__search-item-text">Капотня,</p>
				<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>

		<li class="map-block__search-item">
			<div class="map-block__search-item-top">
				<p class="map-block__search-item-title">
					Детская поликлиника № 130
				</p>
				<p class="map-block__search-item-text">Капотня,</p>
				<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
			</div>

			<div class="map-block__search-item-bottom">
				<div class="map-block__search-item-time">
					<span>08-22</span>
				</div>

				<div
					href="#"
					class="arrow-link">
					<span>на карте</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</div>
			</div>
		</li>
	</ul>
</div>
<div
	class="map-block__map-box"
	id="root">
	<div class="modal modal-map">
		<div class="modal__container">
			<button class="modal__close-btn"></button>
			<div class="modal-map__swiper swiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide modal-map__swiper-item">
						<img
							src="./src/images/modal-map-img-1.png"
							alt="" />
					</div>

					<div class="swiper-slide modal-map__swiper-item">
						<img
							src="./src/images/modal-map-img-1.png"
							alt="" />
					</div>

					<div class="swiper-slide modal-map__swiper-item">
						<img
							src="./src/images/modal-map-img-1.png"
							alt="" />
					</div>
				</div>
				<div class="swiper-pagination modal-map__swiper-pagination"></div>
			</div>

			<div class="modal-map__content">
				<p class="modal-map__content-title">Детская поликлиника № 118</p>
				<div class="modal-map__content-disc">
					<div class="modal-map__content-adress">
						<p>Москва, 2-й Старомытищинский пр-д., д, 123, корп. 1</p>
					</div>

					<div class="modal-map__content-time">
						<span>08-22</span>
					</div>

					<div class="modal-map__content-pass">
						<span>Наличие пропуска:</span>
						<strong>Нет</strong>
					</div>

					<a
						href="tel:+74952121059"
						class="modal-map__content-tel">
						<span>+7 (495) 212 10 59</span>
					</a>
				</div>

				<button
					class="arrow-link left-feedback">
					<span>оставить отзыв</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./sprite.svg#standart-arrow-right" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>
</div>`;
const geoContent = `<p class="heading2">Вы здесь находитесь?</p>
<div class="map-block__form-adress-wrapper">
	<div class="map-block__form-adress">
		<span class="map-block__form-adress-value">
			Москва, ул. 1-й Старомытищенский пр-д, 15к1,
		</span>

		<div class="map-block__form-adress-remove">
			
		</div>
	</div>
	<div class="map-block__identify-box">
		<p>Определить местоположение</p>
	</div>
</div>

<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn">
		<span>да</span>
	</button>

	<button class="arrow-link" id="map">
		<span>другое местоположение</span>
	</button>
</div>
`;

const geoBtn = document.querySelectorAll('.geo-btn');

if (geoBtn) {
	const modalClass = 'is-correct-adress';
	const mapClass = 'map-modal';
	const secondBtn = '#map';

	geoBtn.forEach((btn) =>
		btn.addEventListener('click', () => {
			addModal(modalClass, geoContent, mapClass, mapContent, secondBtn);
		}),
	);
}

//модалка "персональная информация"
const personalInfoContent = `<p class="heading2">Персональная информация</p>
<form class="modal__form">
	<div class="input-container modal__input-medium">
		<input
			type="text"
			id="name"
			class="input input-name"
			placeholder="Имя" />
		<label
			for="name"
			class="input-label">
			Имя
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-medium">
		<input
			type="text"
			id="name1"
			class="input input-name"
			placeholder="Фамилия" />
		<label
			for="name1"
			class="input-label">
			Фамилия
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-medium">
		<input
			type="text"
			id="email"
			class="input input-email"
			placeholder="Email" />
		<label
			for="email"
			class="input-label">
			Email
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-medium">
		<input
			type="number"
			id="email"
			class="input input-tel"
			placeholder="Телефон" />
		<label
			for="email"
			class="input-label">
			Телефон
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>
</form>

<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn">
		<span>сохранить изменения</span>
	</button>
</div>`;

const personalBtn = document.querySelector('#red-prof');

if (personalBtn) {
	const modalClass = 'personal-info-modal';
	personalBtn.addEventListener('click', () => {
		addModal(modalClass, personalInfoContent);
	});
}

//модалка "сменить пароль"
const changePasswordContent = `
	<p class="heading2">Изменить пароль</p>

	<form class="modal__form">
		<div class="input-container modal__input-large">
			<input
				type="text"
				id="pass"
				class="input"
				placeholder="Старый пароль" />
			<label
				for="pass"
				class="input-label">
				Старый пароль
			</label>
			<div class="icon success"></div>
			<div class="icon invalid"></div>
			<div class="input-status">Неверный формат</div>

			
		</div>

		<div class="input-container modal__input-medium">
			<input
				type="text"
				id="newpass"
				class="input"
				placeholder="Новый пароль" />
			<label
				for="newpass"
				class="input-label">
				Новый пароль
			</label>
			<div class="icon success"></div>
			<div class="icon invalid"></div>
			<div class="input-status">Неверный формат</div>

			
		</div>

		<div class="input-container modal__input-medium">
			<input
				type="text"
				id="reppas"
				class="input"
				placeholder="Повторите пароль" />
			<label
				for="reppas"
				class="input-label">
				Повторите пароль
			</label>
			<div class="input-status">Неверный формат</div>

			<div class="icon success"></div>
			<div class="icon invalid"></div>
			
		</div>
	</form>

	<div class="modal__btns modal__btns--center">
		<button class="square-btn blue-square-btn">
			<span>сохранить изменения</span>
		</button>

		<div class="account-main__left-policy menu">
			<a href="forget-password.html">Забыли пароль?</a>
		</div>
	</div>`;

const changeBtn = document.querySelector('#change-pass');

if (changeBtn) {
	const modalClass = 'chage-password-modal';
	changeBtn.addEventListener('click', () => {
		addModal(modalClass, changePasswordContent);
	});
}

///инициализация счетчика для textarea
const initTextvalueCounter = () => {
	const textareaWrap = document.querySelectorAll('.input-textarea-wrapper');
	if (textareaWrap) {
		textareaWrap.forEach((item) => {
			const textarea = item.querySelector('textarea');
			const valueLimits = item.querySelector('.modal__textarea-limits');
			if (textarea && valueLimits) {
				const counterUpload = () => {
					valueLimits.textContent = `${textarea.value.length}/1000`;
				};
				textarea.removeEventListener('input', counterUpload);
				textarea.addEventListener('input', counterUpload);
			}
		});
	}
};

//модалка "оставить отзыв"
const initFeedbackHandler = () => {
	const feedbackContent = `
		<p class="heading2">Отзыв к кофейне в БЦ «Валлекс»</p>

		<div class="rates">
			<p class="rates__title">Оцените</p>

			<div class="rates__icons-wrapper">
				<svg class="rates__icon">
					<use xlink:href="./sprite.svg#star" />
				</svg>
				<svg class="rates__icon">
					<use xlink:href="./sprite.svg#star" />
				</svg>
				<svg class="rates__icon">
					<use xlink:href="./sprite.svg#star" />
				</svg>
				<svg class="rates__icon">
					<use xlink:href="./sprite.svg#star" />
				</svg>
				<svg class="rates__icon">
					<use xlink:href="./sprite.svg#star" />
				</svg>
			</div>
		</div>

		<form class="modal__form">
			<div
				class="input-container modal__textarea-medium input-textarea-wrapper">
				<textarea
					type="text"
					id="textarea3"
					class="input input-textarea"
					placeholder="Расскажите о продукте"
					maxlength="1000"></textarea>
				<label
					for="textarea3"
					class="input-label">
					Расскажите о продукте
				</label>
				<span class="modal__textarea-limits">0/1000</span>
				<div class="icon success"></div>
				<div class="icon invalid"></div>
			</div>
		</form>

		<div class="upload">
			<p class="upload__title">Загрузите до 5 фотографий</p>
			<div class="upload__content">
				<div class="upload__box">
					<div class="upload__preview-box">
						<img alt="" />
						<span class="upload__preview-box-remove"></span>
					</div>

					<div class="upload__preview-box">
						<img alt="" />
						<span class="upload__preview-box-remove"></span>
					</div>

					<div class="upload__preview-box">
						<img alt="" />
						<span class="upload__preview-box-remove"></span>
					</div>

					<div class="upload__preview-box">
						<img alt="" />
						<span class="upload__preview-box-remove"></span>
					</div>

					<div class="upload__preview-box">
						<img alt="" />
						<span class="upload__preview-box-remove"></span>
					</div>

					<div class="upload__input-label">
						<input
							type="file"
							class="upload__input"
							accept="image/*" />
					</div>
				</div>

				<div class="upload__info">
					<strong>Нажмите на область с иконкой</strong>
					<span>Формат JPG, JPEG, PNG, BMP, GIF</span>
				</div>
			</div>
		</div>

		<div class="modal__btns modal__btns--center">
			<button class="square-btn blue-square-btn" id="feedback-confirmation">
				<span>отправить</span>
			</button>

			<button class="arrow-link" id="remove-feedback-data">
				<span>Отменить</span>
			</button>
		</div>`;
	const feedbackConfirmationContent = `
<p class="heading2">Спасибо за отзыв!</p>
<p class="modal__message">Публикация отзыва может занять некоторое время</p>
<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn">
		<span>закрыть</span>
	</button>
		</div>`;
	const feedbackBtn = document.querySelectorAll('.left-feedback');

	///инициализация звезд с оценкой
	const initStarsRate = () => {
		const mainWrapper = document.querySelector('.feedback');
		const iconsWrapper = document.querySelector('.rates__icons-wrapper');
		const inputImg = document.querySelector('.upload__input');
		const inputLabel = document.querySelector('.upload__input-label');
		const inputText = document.querySelector('.upload__info');
		const previewImages = document.querySelectorAll('.upload__preview-box');
		const removeBtns = document.querySelectorAll('.upload__preview-box-remove');
		const removeDataBtn = document.querySelector('#remove-feedback-data');

		// добавляем счетчик на символы
		initTextvalueCounter();

		const imagesCounter = () => {
			let validImageCount = 0;
			for (const item of previewImages) {
				const img = item.querySelector('img');
				if (img.getAttribute('src')?.length) {
					validImageCount++;
				}
			}

			if (validImageCount === 5) {
				inputLabel.style.display = 'none';
				inputText.style.display = 'none';
			} else {
				inputLabel.style.display = 'block';
				inputText.style.display = 'flex';
			}
		};

		if (iconsWrapper && inputImg && removeBtns && removeDataBtn) {
			//отображение :hover и постоянного выбранного состояния для иконок рейтинга

			const icons = iconsWrapper.querySelectorAll('.rates__icon');
			icons.forEach((icon, id) => {
				const eventHandler = () => {
					icons.forEach((currentIcon, i) => {
						if (i <= id) {
							currentIcon.classList.add('active');
						} else {
							currentIcon.classList.remove('active');
						}
					});
				};
				icon.removeEventListener('click', eventHandler);
				icon.addEventListener('click', eventHandler);

				const mouseOverHandler = () => {
					icons.forEach((currentIcon, i) => {
						currentIcon.classList.add('hover-zero');
						if (i <= id) {
							currentIcon.classList.add('hover-active');
						} else {
							currentIcon.classList.remove('hover-active');
						}
					});
				};
				const mouseOutHandler = () => {
					icons.forEach((currentIcon) => {
						currentIcon.classList.remove('hover-zero');
						currentIcon.classList.remove('hover-active');
					});
				};
				icon.removeEventListener('mouseover', mouseOverHandler);
				icon.addEventListener('mouseover', mouseOverHandler);

				iconsWrapper.removeEventListener('mouseout', mouseOutHandler);
				iconsWrapper.addEventListener('mouseout', mouseOutHandler);
			});

			//загрузка изображений с превью в модалке
			inputImg.addEventListener('change', function () {
				const selectedFile = inputImg.files.item(0);
				const reader = new FileReader();
				reader.readAsDataURL(selectedFile);
				reader.onload = function (event) {
					for (const item of previewImages) {
						const img = item.querySelector('img');

						if (!img.hasAttribute('src') || img.getAttribute('src') === '') {
							item.classList.add('active');
							img.src = event.target.result;
							imagesCounter();
							break;
						}
					}
				};
			});

			// удаление одного изображения
			removeBtns.forEach((btn) => {
				btn.addEventListener('click', () => {
					const wrapper = btn.closest('.upload__preview-box');
					const img = wrapper.querySelector('img');
					img.removeAttribute('src');
					console.log(img);
					imagesCounter();
					wrapper.classList.remove('active');
				});
			});

			removeDataBtn.addEventListener('click', () => {
				const allTextareas = document.querySelectorAll('textarea');
				const icons = document.querySelectorAll('.rates__icon');
				const inputImg = document.querySelector('.upload__input');
				const textareaCounter = document.querySelector(
					'.modal__textarea-limits',
				);
				//чистка всех input & textarea
				inputImg.value = '';

				allTextareas.forEach((element) => {
					element.value = '';
					textareaCounter.textContent = '0/1000';
				});
				//чистка всех star-icons
				icons.forEach((element) => {
					element.classList = 'rates__icon';
				});
				//удаление всех изображений
				previewImages.forEach((image) => {
					image.classList.remove('active');
					const tag = image.querySelector('img');
					tag.src = '';
				});
				imagesCounter();
			});
		}
	};

	if (feedbackBtn) {
		const modalClass = 'feedback-modal';
		const confirmationClass = 'feedback-sended-modal';
		const secondBtn = '#feedback-confirmation';
		feedbackBtn.forEach((btn) =>
			btn.addEventListener('click', () => {
				addModal(
					modalClass,
					feedbackContent,
					confirmationClass,
					feedbackConfirmationContent,
					secondBtn,
				);
				initStarsRate();
			}),
		);
	}
};

initFeedbackHandler();

//модалка "Связаться с нами"
const textUsContent = `
<p class="heading2">Напишите нам</p>
<form class="modal__form">
	<div class="input-container modal__input-large">
		<input
			type="text"
			id="name5"
			class="input input-name"
			placeholder="Ваше Имя" />
		<label
			for="name5"
			class="input-label">
			Ваше Имя
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-large">
		<input
			type="text"
			id="email6"
			class="input input-email"
			placeholder="Email" />
		<label
			for="email6"
			class="input-label">
			Email
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div
		class="input-container modal__textarea-medium input-textarea-wrapper">
		<textarea
			type="text"
			id="textarea2"
			class="input input-textarea"
			placeholder="Комментарий"
			maxlength="1000"></textarea>
		<label
			for="textarea2"
			class="input-label">
			Комментарий
		</label>
		<span class="modal__textarea-limits">0/1000</span>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
	</div>
</form>

<div class="modal__btns modal__btns--between">
	<div class="account-main__left-policy menu">
		<p>Нажимая на кнопку, вы принимаете</p>
		<a href="#">условия пользовательского соглашения</a>
	</div>
	<button class="square-btn blue-square-btn" id='text-us-confirmation'>
		<span>отправить</span>
	</button>
</div>`;
const textUsConfirmationContent = `
<p class="heading2">Заявка отправлена</p>
<p class="modal__message">Мы ответим Вам в ближайщее время</p>
<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn">
		<span>закрыть</span>
	</button>
</div>`;

const textUsBtn = document.querySelectorAll('#text-us');

if (textUsBtn) {
	const modalClass = 'text-us';
	const confirmationClass = 'request-sended-modal';
	const secondBtn = '#text-us-confirmation';

	textUsBtn.forEach((btn) =>
		btn.addEventListener('click', () => {
			addModal(
				modalClass,
				textUsContent,
				confirmationClass,
				textUsConfirmationContent,
				secondBtn,
			);
			initTextvalueCounter();
		}),
	);
}

//модалка "Отзыв на вакансию"
const vacancyContent = `<button class="modal__close-btn"></button>

<p class="heading2">Отклик на вакансию</p>

<form class="modal__form">
	<div class="input-container modal__input-medium">
		<input
			type="text"
			id="name5"
			class="input input-name"
			placeholder="Имя" />
		<label
			for="name5"
			class="input-label">
			Имя
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-medium">
		<input
			type="number"
			id="vac-tel"
			class="input input-tel"
			placeholder="Номер телефона" />
		<label
			for="vac-tel"
			class="input-label">
			Номер телефона
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-large">
		<input
			type="text"
			id="vac-link"
			class="input"
			placeholder="Ссылка на резюме" />
		<label
			for="vac-link"
			class="input-label">
			Ссылка на резюме
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>
</form>

<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn" id="vacancy-confirmation-btn">
		<span>отправить</span>
	</button>
</div>`;
const vacancyConfirmationContent = `
		<p class="heading2">Сообщение отправлено</p>

		<p class="modal__message">Мы ответим Вам в ближайщее время</p>

		<div class="modal__btns modal__btns--center">
			<button class="square-btn blue-square-btn">
				<span>закрыть</span>
			</button>
</div>`;

const vacancyBtn = document.querySelectorAll('.vacancy-btn');

if (vacancyBtn) {
	const modalClass = 'vacancy-modal';
	const confirmationClass = 'message-sended-modal';
	const secondBtn = '#vacancy-confirmation-btn';

	vacancyBtn.forEach((btn) =>
		btn.addEventListener('click', () => {
			addModal(
				modalClass,
				vacancyContent,
				confirmationClass,
				vacancyConfirmationContent,
				secondBtn,
			);
		}),
	);
}

//модалка "ответ на заявку"
const requestContent = `<p class="heading2">Заявка отправлена!</p>
<p class="modal__message">Мы ответим Вам в ближайщее время</p>
<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn">
		<span>закрыть</span>
	</button>
</div>`;

const requestBtn = document.querySelectorAll('#request-btn');

if (requestBtn) {
	const modalClass = 'request-sended-modal';

	requestBtn.forEach((btn) =>
		btn.addEventListener('click', () => {
			addModal(modalClass, requestContent);
		}),
	);
}

//модалка "недоступные товары"
const unavailableContent = `<div class="modal__content-box">
<p class="heading2">Данные товары недоступны для заказа</p>
<div class="modal__beige-box">
	<li class="cart__main-item">
		<div class="cart__main-item-img">
			<img
				src="./src/images/cart-sample-img.png"
				alt="" />
		</div>

		<div class="cart__main-item-text">
			<a href="">Espresso Seasonal</a>
			<span class="text1">500 г</span>
			<p class="text1">Дополнительный текст</p>
		</div>

		<div class="cart__main-item-count">1 шт</div>

		<div class="cart__main-item-price">
			<div class="cart__main-item-value">
				<strong class="heading4">600</strong>
				<span class="text2">₽</span>
			</div>

			<span class="cart__main-cart-item"></span>
		</div>
	</li>

	<li class="cart__main-item">
		<div class="cart__main-item-img">
			<img
				src="./src/images/cart-sample-img.png"
				alt="" />
		</div>

		<div class="cart__main-item-text">
			<a href="">Espresso Seasonal</a>
			<span class="text1">500 г</span>
			<p class="text1">Дополнительный текст</p>
		</div>

		<div class="cart__main-item-count">1 шт</div>

		<div class="cart__main-item-price">
			<div class="cart__main-item-value">
				<strong class="heading4">600</strong>
				<span class="text2">₽</span>
			</div>

			<span class="cart__main-cart-item"></span>
		</div>
	</li>

	<li class="cart__main-item">
		<div class="cart__main-item-img">
			<img
				src="./src/images/cart-sample-img.png"
				alt="" />
		</div>

		<div class="cart__main-item-text">
			<a href="">Espresso Seasonal</a>
			<span class="text1">500 г</span>
			<p class="text1">Дополнительный текст</p>
		</div>

		<div class="cart__main-item-count">1 шт</div>

		<div class="cart__main-item-price">
			<div class="cart__main-item-value">
				<strong class="heading4">600</strong>
				<span class="text2">₽</span>
			</div>

			<span class="cart__main-cart-item"></span>
		</div>
	</li>
</div>
</div>

<div class="modal__content-box">
<p class="heading2">Похожие товары</p>
<div class="catalog__content-box">
	<div class="catalog-card-1">
		<a
			href="/"
			class="catalog-card-1__img">
			<img
				src="./src/images/lil-cake-sample-1.png"
				alt="" />
		</a>
		<div class="catalog-card-1__descr">
			<div class="catalog-card-1__imgless">
				<div class="catalog-card-1__imgless-box">
					<span>новинка</span>
					<strong>Блюдо на фотосессии прямо сейчас</strong>
				</div>
			</div>

			<div class="catalog-card-1__info">
				<a
					href="/"
					class="catalog-card-1__title heading4">
					Пироженое «Фруктовое»
				</a>

				<div class="catalog-card__price">
					<div class="catalog-card__sale">
						<div class="catalog-card__sale-price">
							240
							<span>₽</span>
						</div>
						<div class="catalog-card__weight">/ 100 г</div>
					</div>
				</div>
			</div>
			<div
				class="catalog-card__add-to-cart catalog-card-1__add-to-cart"></div>
		</div>
	</div>

	<div class="catalog-card-1">
		<a
			href="/"
			class="catalog-card-1__img">
			<img
				src="./src/images/lil-cake-sample-2.png"
				alt="" />
		</a>
		<div class="catalog-card-1__descr">
			<div class="catalog-card-1__imgless">
				<div class="catalog-card-1__imgless-box">
					<span>новинка</span>
					<strong>Блюдо на фотосессии прямо сейчас</strong>
				</div>
			</div>

			<div class="catalog-card-1__info">
				<a
					href="/"
					class="catalog-card-1__title heading4">
					Пироженое «Фруктовое»
				</a>

				<div class="catalog-card__price">
					<div class="catalog-card__sale">
						<div class="catalog-card__sale-price">
							240
							<span>₽</span>
						</div>
						<div class="catalog-card__weight">/ 100 г</div>
					</div>
				</div>
			</div>
			<div
				class="catalog-card__add-to-cart catalog-card-1__add-to-cart"></div>
		</div>
	</div>

	<div class="catalog-card-1">
		<a
			href="/"
			class="catalog-card-1__img">
			<img
				src="./src/images/lil-cake-sample-3.png"
				alt="" />
		</a>
		<div class="catalog-card-1__descr">
			<div class="catalog-card-1__imgless">
				<div class="catalog-card-1__imgless-box">
					<span>новинка</span>
					<strong>Блюдо на фотосессии прямо сейчас</strong>
				</div>
			</div>

			<div class="catalog-card-1__info">
				<a
					href="/"
					class="catalog-card-1__title heading4">
					Пироженое «Шоколадное»
				</a>

				<div class="catalog-card__price">
					<div class="catalog-card__sale">
						<div class="catalog-card__sale-price">
							240
							<span>₽</span>
						</div>
						<div class="catalog-card__weight">/ 100 г</div>
					</div>
				</div>
			</div>
			<div
				class="catalog-card__add-to-cart catalog-card-1__add-to-cart"></div>
		</div>
	</div>

	<div class="catalog-card-1">
		<a
			href="/"
			class="catalog-card-1__img">
			<img
				src="./src/images/lil-cake-sample-4.png"
				alt="" />
		</a>
		<div class="catalog-card-1__descr">
			<div class="catalog-card-1__imgless">
				<div class="catalog-card-1__imgless-box">
					<span>новинка</span>
					<strong>Блюдо на фотосессии прямо сейчас</strong>
				</div>
			</div>

			<div class="catalog-card-1__info">
				<a
					href="/"
					class="catalog-card-1__title heading4">
					Пироженое «сливочное»
				</a>

				<div class="catalog-card__price">
					<div class="catalog-card__sale">
						<div class="catalog-card__sale-price">
							240
							<span>₽</span>
						</div>
						<div class="catalog-card__weight">/ 100 г</div>
					</div>
				</div>
			</div>
			<div
				class="catalog-card__add-to-cart catalog-card-1__add-to-cart"></div>
		</div>
	</div>
</div>
</div>

<div class="modal__btns modal__btns--center">
<button class="square-btn blue-square-btn">
	<span>закрыть</span>
</button>
</div>`;

const unavailableBtn = document.querySelectorAll('#unavailable-btn');

if (unavailableBtn) {
	const modalClass = 'unavailable-modal';

	unavailableBtn.forEach((btn) =>
		btn.addEventListener('click', () => {
			addModal(modalClass, unavailableContent);
		}),
	);
}

//добавление модалки "Акция"
//пока кнопки не существует, добавьте нужный id к нужной кнопке или перепишите вызов функции addModal
const promotionContent = `
<p class="heading2">Акция</p>
			<div class="news-main__item">
				<img
					src="./src/images/news-img2.png"
					alt=""
					class="news-main__item-img" />
				<div class="news-main__item-text">
					<p class="news-main__item-heading heading4">
						Скидка для второго и следующего заказов
					</p>
					<div class="news-main__item-description menu">
						<p>
							Только в течение ограниченного времени мы предлагаем вам
							адреналиновую акцию: купите одну и получите вторую бесплатно на
							любой кофе среднего размера на ваш выбор! Пришло время действовать
							и погрузиться в мир смелых вкусов и бодрящих ароматов.
						</p>
					</div>
					<div class="news-main__item-bottom">
						<p class="news-main__item-date btns-caps">до 01.12.23</p>
						<a
							href="#"
							class="news-main__item-name btns-caps">
							Акции
						</a>
					</div>
				</div>
			</div>
`;

const promotionBtn = document.querySelectorAll('#promotion-btn');

if (promotionBtn) {
	const modalClass = 'promotion-modal';

	promotionBtn.forEach((btn) =>
		btn.addEventListener('click', () => {
			addModal(modalClass, promotionContent);
		}),
	);
}