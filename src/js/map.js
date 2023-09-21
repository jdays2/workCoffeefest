const mapInit = () => {
	const activeClass = 'active';
	const searchItems = document.querySelectorAll('.map-block__search-item');
	const mapModal = document.querySelector('.modal-map');
	const root = document.querySelector('#root');

	let iconWidth = 0,
		iconHeight = 0;

	if (window.screen.width > 768) {
		iconWidth = 66;
		iconHeight = 74;
	} else {
		iconWidth = 31;
		iconHeight = 35;
	}

	//яндекс карта
	if (typeof ymaps !== 'undefined' && typeof ymaps !== 'null' && root) {
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
					iconImageSize: [iconWidth, iconHeight],
				},
			);

			const myBiegeIcon = new ymaps.Placemark(
				[55.810479, 37.570991],
				{},
				{
					iconLayout: 'default#image',
					iconImageHref: './src/images/svg/generic/geo-map-biege.svg',
					iconImageSize: [iconWidth, iconHeight],
				},
			);

			const myGreenIcon = new ymaps.Placemark(
				[55.820479, 37.578991],
				{},
				{
					iconLayout: 'default#image',
					iconImageHref: './src/images/svg/generic/geo-map-green.svg',
					iconImageSize: [iconWidth, iconHeight],
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
};

document.addEventListener('DOMContentLoaded', mapInit);
