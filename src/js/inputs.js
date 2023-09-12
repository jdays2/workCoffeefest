//обработка скрытия и показа пароля для input
const passBtns = document.querySelectorAll('.password-btn');

if (passBtns) {
	passBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const wrapper = btn.closest('.input-container');
			const input = wrapper.querySelector('input');
			if (input.type === 'password') {
				input.type = 'text';
			} else {
				input.type = 'password';
			}
		});
	});
}

//обработка ввода даты рождения в input по шаблону
