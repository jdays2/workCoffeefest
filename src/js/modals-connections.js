const connect = (btn, modal) => {
	btn.addEventListener('click', () => {
		modal.classList.add('active');
	});
};

const requestBtn = document.querySelectorAll('.request-vacancy-btn');
const requestModal = document.querySelector('.vacancy-modal');

if (requestBtn) {
	requestBtn.forEach((btn) => {
		connect(btn, requestModal);
	});
}

const redactProfBtns = document.querySelectorAll('#red-prof');
const redactProfModal = document.querySelector('.personal-info-modal');

if (redactProfBtns) {
	redactProfBtns.forEach((btn) => {
		connect(btn, redactProfModal);
	});
}

const changePasswordBtn = document.querySelectorAll('#change-pass');
const changePasswordModal = document.querySelector('.chage-password-modal');

if (changePasswordBtn) {
	changePasswordBtn.forEach((btn) => {
		connect(btn, changePasswordModal);
	});
}

const addAdressBtn = document.querySelectorAll('#add-adress');
const addAdressModal = document.querySelector('.add-adress');

if (addAdressBtn) {
	addAdressBtn.forEach((btn) => {
		connect(btn, addAdressModal);
	});
}

const addCreditCardBtns = document.querySelectorAll('.add-card');
const addCreditCardModal = document.querySelector('.add-card-modal');

if (addCreditCardBtns) {
	addCreditCardBtns.forEach((btn) => {
		connect(btn, addCreditCardModal);
	});
}
