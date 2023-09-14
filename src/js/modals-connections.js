//инициируем карту
const mapInitSecond = () => {
	const searchItems = document.querySelectorAll('.map-block__search-item');
	const mapModal = document.querySelector('.modal-map');
	const activeClass = 'active';

	//яндекс карта
	if (typeof ymaps !== 'undefined' && typeof ymaps !== 'null') {
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
			link.addEventListener('click', () => {
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
			});
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
};

// const connect = (btn, modal) => {
// 	btn.addEventListener('click', () => {
// 		modal.classList.add('active');
// 	});
// };

// const requestBtn = document.querySelectorAll('.request-vacancy-btn');
// const requestModal = document.querySelector('.vacancy-modal');

// if (requestBtn) {
// 	requestBtn.forEach((btn) => {
// 		connect(btn, requestModal);
// 	});
// }

// const redactProfBtns = document.querySelectorAll('#red-prof');
// const redactProfModal = document.querySelector('.personal-info-modal');

// if (redactProfBtns) {
// 	redactProfBtns.forEach((btn) => {
// 		connect(btn, redactProfModal);
// 	});
// }

// const changePasswordBtn = document.querySelectorAll('#change-pass');
// const changePasswordModal = document.querySelector('.chage-password-modal');

// if (changePasswordBtn) {
// 	changePasswordBtn.forEach((btn) => {
// 		connect(btn, changePasswordModal);
// 	});
// }

// const addAdressBtn = document.querySelectorAll('#add-adress');
// const addAdressModal = document.querySelector('.add-adress');

// if (addAdressBtn) {
// 	addAdressBtn.forEach((btn) => {
// 		connect(btn, addAdressModal);
// 	});
// }

// const addCreditCardBtns = document.querySelectorAll('.add-card');
// const addCreditCardModal = document.querySelector('.add-card-modal');

// if (addCreditCardBtns) {
// 	addCreditCardBtns.forEach((btn) => {
// 		connect(btn, addCreditCardModal);
// 	});
// }

//ВЫВОД МОДАЛОК ИЗ JS!!!

//модалка фильтр1 (новости)
const addModal = (name, child) => {
	const wrapper = document.querySelector(`.${name}`);
	if (!wrapper) return;
	const wrapperRoot = wrapper.querySelector('.modal__root');
	wrapper.classList.add('active');
	wrapperRoot.innerHTML = child;
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

//модалка с уточнением геолокации "Вы здесь находитесь?"
const geoContent = `<p class="heading2">Вы здесь находитесь?</p>
<div class="map-block__form-adress-wrapper">
	<div class="map-block__form-adress">
		<span class="map-block__form-adress-value">
			Москва, ул. 1-й Старомытищенский пр-д, 15к1,
		</span>

		<div class="map-block__form-adress-remove"></div>
	</div>
	<div class="map-block__identify-box">
		<p>Определить местоположение</p>
	</div>
</div>

<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn">
		<span>да</span>
	</button>

	<button class="arrow-link">
		<span>другое местоположение</span>
	</button>
</div>
`;

const geoBtn = document.querySelector('#geo');
if (geoBtn) {
	const modalClass = 'is-correct-adress';

	geoBtn.addEventListener('click', () => {
		addModal(modalClass, geoContent);
		clearFilter();
	});
}

//модалка с картой "Карта?" (находиться на странице)
const mapContent = `<div class="map-block">
<div class="map-block__search-box">
	<p class="heading4 map-block__search-title">Адреса ресторанов</p>
	<div class="search-block search-block--long">
		<label>
			<input
				class="search-block__input"
				type="text"
				placeholder="Поиск" />
			<button class="search-block__enter-icon"></button>
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
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

				<a
					href="#"
					class="arrow-link">
					<span>оставить отзыв</span>
					<svg class="arrow-link__icon">
						<use
							xlink:href="./src/images/svg/symbol/sprite.svg#standart-arrow-right" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</div>
</div>`;

const mapBtn = document.querySelector('#map');
if (mapBtn) {
	const modalClass = 'map-modal';

	mapBtn.addEventListener('click', () => {
		addModal(modalClass, mapContent);
		clearFilter();
		mapInitSecond();
	});
}
