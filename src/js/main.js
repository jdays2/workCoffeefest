// Пересчет rem в px
const rem = function (rem) {
   if (window.innerWidth > 768) {
      return 0.005208335 * window.innerWidth * rem;
   } else {
      // где 375 это ширина моб версии макета
      return (100 / 375) * (0.1 * window.innerWidth) * rem;
   }
};

document.addEventListener("DOMContentLoaded", function () {
   const header = document.querySelector("header");
   const body = document.body;
   const html = document.documentElement;

   // функция клика вне элемента
   function clickOutside(elem, needToClose) {
      document.addEventListener("click", function (e) {
         if (e.target !== elem && !elem.contains(e.target)) {
            needToClose.classList.remove("active");
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
      body.classList.add("lock", "dark", "blur");
      html.classList.add("lock");
      element.classList.add("active");
   }

   // функция закрытия попапа
   function closePopupElement(element) {
      body.classList.remove("lock", "dark", "blur");
      html.classList.remove("lock");
      element.classList.remove("active");
      if (window.innerWidth > 768) {
         body.style.paddingRight = "0";
         header.style.paddingRight = "0";
      }
   }

   if (document.querySelector(".popup__close")) {
      let popupCloseBtns = document.querySelectorAll(".popup__close");
      popupCloseBtns.forEach((btn) => {
         btn.addEventListener("click", function () {
            closePopupElement(btn.parentElement.parentElement);
         });
      });
   }

   // переключение табов на боковой панели в меню лк
   if (document.querySelector(".menu-tabs__item-btn")) {
   }

   // переключение тегов

   function initTags(tagButtons, tagBlocks) {
      tagButtons.forEach((btn) => {
         btn.addEventListener("click", function () {
            tagButtons.forEach((el) => el.classList.remove("active"));
            tagBlocks.forEach((el) => {
               el.classList.remove("active");
               el.classList.add("hide");
            });
            btn.classList.add("active");
            const path = btn.dataset.path;
            tagBlocks.forEach((block) => {
               if (block.dataset.target === path) {
                  block.classList.add("active");
                  block.classList.remove("hide");
               }
            });
         });
      });
   }

   // аккордеоны
   function initAccordion(accordion) {
      let accItems = accordion.querySelectorAll(".acc-item");
      accItems.forEach((item) => {
         let accHead = item.querySelector(".acc-head");
         let accContent = item.querySelector(".acc-content");
         accHead.addEventListener("click", function () {
            accItems.forEach((el) => {
               if (item !== el) {
                  el.classList.remove("active");
                  el.querySelector(".acc-content").style.maxHeight = null;
               }
            });

            item.classList.toggle("active");
            if (accContent.style.maxHeight) {
               accContent.style.maxHeight = null;
            } else {
               accContent.style.maxHeight = accContent.scrollHeight / 5 + "rem";
            }
         });
      });
   }

   // Аккордеон header

   const burgerMenuAccordion = document.querySelector(".burger-menu__accordion");
   initAccordion(burgerMenuAccordion);

   //показ и скрытие блока с информацией по заказу (корзина, после выбора карты)
   const ordersList = document.querySelector(".ordering__orders-wrapper");
   let orderFormAddressInput = document.getElementById("orderFormAddressInput");
   if (ordersList) {
      let accContents = ordersList.querySelector(".acc-content");
      let accItems = ordersList.querySelectorAll(".acc-item");
      accItems.forEach((item) => {
         let accHead = item.querySelector(".acc-head");
         let accContent = item.querySelector(".acc-content");
         accHead.addEventListener("click", function () {
            accItems.forEach((item1) => {
               item1.classList.toggle("active");
               let accContent1 = item1.querySelector(".acc-content");
               if (item != item1) {
                  if (accContent1.classList.contains("active")) {
                     accContent1.classList.remove("active");
                  } else {
                     accContent1.classList.add("active");
                     orderFormAddressInput.value = accContent1.getAttribute("data-id");
                     var inputEvent = new Event("input", { bubbles: true });
                     orderFormAddressInput.dispatchEvent(inputEvent);
                  }
               }
            });
            if (accContent.classList.contains("active")) {
               accContent.classList.remove("active");
            } else {
               accContent.classList.add("active");
               orderFormAddressInput.value = accContent.getAttribute("data-id");
               var inputEvent = new Event("input", { bubbles: true });
               orderFormAddressInput.dispatchEvent(inputEvent);
            }
         });
      });
   }

   // аккордеон в таблице заказов

   if (document.querySelector(".order-table__item-head")) {
      let orderTables = document.querySelectorAll(".order-table");
      const orderPopup = document.querySelector(".order-popup");
      const popupClose = document.querySelector(".popup__close");
      orderTables.forEach((item) => {
         if (window.innerWidth > 768) {
            initAccordion(item);
         } else {
            let orderTableItems = item.querySelectorAll(".order-table__item");
            orderTableItems.forEach((elem) => {
               let accHead = elem.querySelector(".acc-head");
               accHead.addEventListener("click", function () {
                  openPopupElement(orderPopup);
               });
            });
         }
      });

      popupClose.addEventListener("click", () => {
         orderPopup.classList.remove("active");
      });
   }

   // табы
   function initTabs(tabButtons, tabBlocks) {
      tabButtons.forEach((btn) => {
         btn.addEventListener("click", function () {
            tabButtons.forEach((el) => el.classList.remove("active"));
            tabBlocks.forEach((el) => el.classList.remove("active"));
            btn.classList.add("active");
            const path = btn.dataset.path;
            tabBlocks.forEach((block) => {
               if (block.dataset.target === path) {
                  block.classList.add("active");
                  if (window.innerWidth <= 768 && block.classList.contains("account-lk__right-content")) {
                     body.classList.add("lock");
                  }
               }
            });
         });
      });
   }

   // табы на сайдбаре в лк
   if (document.querySelector(".account-lk .sidebar-tabs__item-btn")) {
      const sidebarBtns = document.querySelectorAll(".account-lk .sidebar-tabs__item-btn");
      const accountBlocks = document.querySelectorAll(".account-lk__right-content");
      if (window.innerWidth > 768) {
         sidebarBtns[0].classList.add("active");
         accountBlocks[0].classList.add("active");
      }

      initTabs(sidebarBtns, accountBlocks);

      if (document.querySelector(".account-lk__right-back")) {
         const accountBlocksBackBtns = document.querySelectorAll(".account-lk__right-back");
         accountBlocksBackBtns.forEach((button) => {
            button.addEventListener("click", function () {
               button.parentElement.classList.remove("active");
               body.classList.remove("lock");
            });
         });
      }
   }

   // табы на вкладжке ЗАКАЗЫ в лк
   if (document.querySelector(".account-lk__right-content .section-tags")) {
      let ordersTags = document.querySelectorAll(".account-lk__right-content .section-tags__item-btn");
      let orderTables = document.querySelectorAll(".account-lk__right-content .order-table");
      initTabs(ordersTags, orderTables);
   }

   // аккордеон на странице Доставка и оплата
   if (document.querySelector(".delivery-main__accordion")) {
      document.querySelectorAll(".delivery-main__accordion").forEach((acc) => {
         initAccordion(acc);
      });
   }

   // теги на странице Доставка и оплата
   if (document.querySelector(".delivery-main .section-tags")) {
      const deliveryMainTags = document.querySelectorAll(".section-tags__item-btn");
      const deliveryMainTagsBlock = document.querySelectorAll(".delivery-main__accordion");
      initTags(deliveryMainTags, deliveryMainTagsBlock);
   }

   // теги на странице О компании
   if (document.querySelector(".about-info .section-tags")) {
      const aboutInfoTags = document.querySelectorAll(".about-info .section-tags__item-btn");
      const aboutInfoTagsBlock = document.querySelectorAll(".about-info .about-info__card");
      initTags(aboutInfoTags, aboutInfoTagsBlock);
   }

   //теги на странице Вакансии
   if (document.querySelector(".carrer-vacancies .section-tags")) {
      const aboutInfoTags = document.querySelectorAll(".carrer-vacancies .section-tags__item-btn");
      const aboutInfoTagsBlock = document.querySelectorAll(".carrer-vacancies .carrer-vacancies__accordion");
      initTags(aboutInfoTags, aboutInfoTagsBlock);
   }

   // аккордеон на странице Карьера
   if (document.querySelector(".carrer-vacancies__accordion")) {
      const careerBlocks = document.querySelectorAll(".carrer-vacancies__accordion");
      careerBlocks.forEach((block) => {
         initAccordion(block);
      });
   }
});

// Открытие и закрытие burger-menu header
const toggleBurgerMenuBtn = document.querySelector(".header__burger"),
   burgerMenu = document.querySelector(".header__burger-menu");

toggleBurgerMenuBtn.addEventListener("click", () => {
   toggleBurgerMenuBtn.classList.toggle("active");
   burgerMenu.classList.toggle("active");

   burgerMenu.classList.contains("active")
      ? (document.querySelector("body").style.overflow = "hidden")
      : (document.querySelector("body").style.overflow = "visible");
});

//показ и скрытие header__search-block
const searchBtn = document.querySelector("#header-search");
const searchCloseBtn = document.querySelector(".header__search-close-icon");
const searchBlock = document.querySelector(".header__search-block");
const headerList = document.querySelector(".header__top-list");

if (searchBtn && searchCloseBtn) {
   const activeClass = "active";
   searchBtn.addEventListener("click", () => {
      searchBlock.classList.toggle(activeClass);
      headerList.classList.toggle(activeClass);
   });
   searchCloseBtn.addEventListener("click", () => {
      searchBlock.classList.toggle(activeClass);
      headerList.classList.toggle(activeClass);
   });
}

//отключение всплытия для календаря
const popupBlocks = document.querySelectorAll(".popup-block");

if (popupBlocks) {
   popupBlocks.forEach((e) => {
      e.addEventListener("click", function (event) {
         if (event.target.closest(".calendar")) {
            event.stopPropagation();
            event.preventDefault();
         }
      });
   });
}

//показ нужного блока (выбор медота доставки) в карточке товара при оплате
// const allItems = document.querySelectorAll('.delivery-method');
// const deliveryCheckers = document.querySelectorAll(
// 	'.ordering__method-item input',
// );

// if (deliveryCheckers) {
// 	deliveryCheckers.forEach((checker) => {
// 		checker.addEventListener('input', () => {
// 			const id = checker.id;
// 			switch (id) {
// 				case 'self-delivery':
// 				case 'self-delivery-sdek':
// 					allItems.forEach((item) => {
// 						if (item.id === 'self-delivery-sdec-block') {
// 							item.classList.add('active');
// 						} else {
// 							item.classList.remove('active');
// 						}
// 					});
// 					break;
// 				case 'curier-delivery':
// 					allItems.forEach((item) => {
// 						if (item.id === 'curier-delivery-block') {
// 							item.classList.add('active');
// 						} else {
// 							item.classList.remove('active');
// 						}
// 					});
// 					break;
// 				default:
// 			}
// 		});
// 	});
// }

//обработка вставки изображения
const fileInput = document.querySelector(".catalog-inputs__file");
if (fileInput) {
   const inputParent = fileInput.closest(".catalog-inputs");
}

const removeFiles = document.querySelector(".catalog-inputs__file-remove-icon");
const fileName = document.querySelector("#file-name");
const fileSize = document.querySelector("#file-size");
//добавление
if (fileInput) {
   fileInput.addEventListener("input", function () {
      if (fileInput.files.length > 0) {
         const inputParent = fileInput.closest(".input-container");
         inputParent.classList.add("active");
         fileInput.disabled = true;
         fileName.textContent = fileInput.files[0].name;
         fileSize.textContent = (fileInput.files[0].size / 1024).toFixed(2) + " kb";
      }
   });
}
//удаление
if (removeFiles) {
   removeFiles.addEventListener("click", (e) => {
      if (fileInput.files.length > 0) {
         const inputParent = fileInput.closest(".input-container");
         fileInput.value = "";
         inputParent.classList.remove("active");
         fileName.textContent = "";
         fileSize.textContent = "";
         fileInput.disabled = false;
      }
   });
}

//

// if (document.querySelector('.swiper-wrapper') && window.screen.width > 768) {
// 	const swiperWrappers = document.querySelectorAll('.swiper-wrapper');

// 	swiperWrappers.forEach(swiperWrapper => {
// 		let swiper = swiperWrapper.parentElement;
// 		let swiperControlls = swiper.nextElementSibling;
// 		let swiperElements = swiper.querySelectorAll('.swiper-slide');
// 		let swiperWrapperWidth = swiperWrapper.clientWidth;

// 		if ((swiperElements[0].clientWidth * swiperElements.length) <= swiperWrapperWidth) {
// 			swiperControlls.style.display = "none";
// 		}
// 	})
// }

// Аккордион в футере

if (window.screen.width <= 768) {
   const foterBlocks = document.querySelectorAll(".footer__top-block");

   let blockMaxHeight = "5rem";

   foterBlocks.forEach((block) => {
      block.addEventListener("click", () => {
         block.classList.toggle("active");

         block.classList.contains("active")
            ? (blockMaxHeight = `${block.scrollHeight / 5}rem`)
            : (blockMaxHeight = "5rem");

         block.style.maxHeight = blockMaxHeight;
      });
   });
}

// Отступ от цены в корзине

if (document.querySelector(".cart__main-item-price") && window.screen.width <= 768) {
   const cards = document.querySelectorAll(".cart__main-item");

   cards.forEach((card) => {
      const cardWeight = card.querySelector(".cart__main-item-text").querySelector("span");
      const cardPriceWidth = card.querySelector(".cart__main-item-value").scrollWidth;

      cardWeight.style.marginLeft = `${cardPriceWidth / 5 + 4}rem`;
      console.log(cardPriceWidth);
   });
}
