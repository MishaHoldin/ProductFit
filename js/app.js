'use strict';

document.addEventListener("DOMContentLoaded", function () {

	//----------------------HAMBURGER-----------------------
	const hamburger = (hamburgerButton, hamburgerNav, hamburgerHeader) => {
		const button = document.querySelector(hamburgerButton),
			nav = document.querySelector(hamburgerNav),
			header = document.querySelector(hamburgerHeader);

		button.addEventListener('click', (e) => {
			button.classList.toggle('hamburger--active');
			nav.classList.toggle('header__nav--active');
			header.classList.toggle('header--menu');
		});

	};
	hamburger('.hamburger', '.header__nav', '.header');

	//----------------------MODAL-----------------------
	const modals = (modalSelector) => {
		const modal = document.querySelectorAll(modalSelector);

		if (modal) {
			let i = 1;

			modal.forEach(item => {
				const wrap = item.id;
				const link = document.querySelectorAll('.' + wrap);

				link.forEach(linkItem => {
					let close = item.querySelector('.close');
					if (linkItem) {
						linkItem.addEventListener('click', (e) => {
							if (e.target) {
								e.preventDefault();
							}
							item.classList.add('active');
						});
					}

					if (close) {
						close.addEventListener('click', () => {
							item.classList.remove('active');
						});
					}

					item.addEventListener('click', (e) => {
						if (e.target === item) {
							item.classList.remove('active');
						}
					});
				});
			});
		}

	};
	modals('.modal');

	//----------------------FORM-----------------------
	const forms = (formsSelector) => {
		const form = document.querySelectorAll(formsSelector);
		let i = 1;
		let img = 1;
		let lebel = 1;
		let prev = 1;

		form.forEach(item => {
			const elem = 'form--' + i++;
			item.classList.add(elem);

			let formId = item.id = (elem);
			let formParent = document.querySelector('#' + formId);

			formParent.addEventListener('submit', formSend);

			async function formSend(e) {
				e.preventDefault();

				let error = formValidate(item);

				let formData = new FormData(item);

				if (error === 0) {
					item.classList.add('_sending');
					let response = await fetch('sendmail.php', {
						method: 'POST',
						body: formData
					});

					if (response.ok) {
						let modalThanks = document.querySelector('#modal__thanks');
						formParent.parentNode.style.display = 'none';

						modalThanks.classList.add('active');
						item.reset();
						item.classList.remove('_sending');
					} else {
						alert('Ошибка при отправке');
						item.classList.remove('_sending');
					}

				}
			}

			function formValidate(item) {
				let error = 0;
				let formReq = formParent.querySelectorAll('._req');

				for (let index = 0; index < formReq.length; index++) {
					const input = formReq[index];
					// formRemoveError(input);

					if (input.classList.contains('_email')) {
						if (emailTest(input)) {
							formAddErrorEmail(input);
							error++;
						}
					} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
						formAddErrorCheck(input);
						error++;
					} else {
						if (input.value === '') {
							formAddError(input);
							error++;
						}
					}
				}
				return error;
			}

			const formImgFile = formParent.querySelectorAll('.formImgFile');

			formImgFile.forEach(item => {
				const elem = 'formImgFile--' + i++;

				let formId = item.id = (elem);
				let formParent = document.querySelector('#' + formId);

				const formImage = formParent.querySelector('.formImage');
				const formLebel = formParent.querySelector('.formLebel');
				const formPreview = formParent.querySelector('.formPreview');

				//картинка в форме
				let formImageNumber = 'formImage--' + img++;
				let formPreviewNumber = 'formPreview--' + prev++;

				formImage.id = (formImageNumber);
				formLebel.htmlFor = ('formImage--' + lebel++);
				formPreview.id = (formPreviewNumber);
				const formImageAdd = document.querySelector('#' + formImageNumber);

				// изменения в инпуте файл
				formImageAdd.addEventListener('change', () => {
					uploadFile(formImage.files[0]);
				});

				function uploadFile(file) {

					if (!['image/jpeg', 'image/png', 'image/gif', 'image/ico', 'application/pdf'].includes(file.type)) {
						alert('Только изображения');
						formImage.value = '';
						return;
					}

					if (file.size > 2 * 1024 * 1024) {
						alert('Размер менее 2 мб.');
						return;
					}

					var reader = new FileReader();
					reader.onload = function (e) {
						if (['application/pdf'].includes(file.type)) {
							formPreview.innerHTML = `Файл выбран`;
						} else {
							formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
						}

					};
					reader.onerror = function (e) {
						alert('Ошибка');
					};
					reader.readAsDataURL(file);
				}
			})

			function formAddError(input) {
				let div = document.createElement('div');
				div.classList.add("form__error");
				div.innerHTML = "Введите данные в поле";

				input.parentElement.append(div);
				input.parentElement.classList.add('_error');
				input.classList.add('_error');
			}

			function formAddErrorEmail(input) {
				let div = document.createElement('div');
				div.classList.add("form__error");
				div.innerHTML = "Введите свою почту";

				input.parentElement.append(div);
				input.parentElement.classList.add('_error');
				input.classList.add('_error');
			}

			function formAddErrorCheck(input) {
				let div = document.createElement('div');
				div.classList.add("form__error");
				div.innerHTML = "Согласие на обработку персональных данных";

				input.parentElement.append(div);
				input.parentElement.classList.add('_error');
				input.classList.add('_error');
			}

			function emailTest(input) {
				return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value);
			}

		});
	};
	forms('.form');

});



if (document.documentElement.clientWidth < 992) {
	var mySwiper = new Swiper('.swiper-brand', {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		speed: 1000,
		navigation: {
			nextEl: '.brands__next',
			prevEl: '.brands__prev',
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			767: {
				slidesPerView: 3,
				spaceBetween: 10
			},
		},
		autoplay: {
			delay: 1500,
			disableOnInteraction: false,
		},
	});
};

const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
	const header = document.querySelector(headerSelector),
		tab = document.querySelectorAll(tabSelector),
		content = document.querySelectorAll(contentSelector);
	if (header) {
		if (tab) {
			function hideTabContent() {
				content.forEach(item => {
					item.style.display = "none";
				});

				tab.forEach(item => {
					item.classList.remove(activeClass);
				});
			}

			function showTabContent(i = 0) {
				content[i].style.display = "grid";
				tab[i].classList.add(activeClass);
			}

			hideTabContent();
			showTabContent();

			header.addEventListener('click', (e) => {
				const target = e.target;
				if (target &&
					(target.classList.contains(tabSelector.replace(/\./, '')) ||
						target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
					tab.forEach((item, i) => {
						if (target == item || target.parentNode == item) {
							hideTabContent();
							showTabContent(i);
						}
					});
				}
			});
		}
	}
};
tabs('.interview__tabs', '.interview__item', '.interview__wrap', 'active');

if (document.documentElement.clientWidth < 767) {
	var tabSwiper = new Swiper('.swiper-interview', {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		centeredSlides: true,
		navigation: {
			nextEl: '.interview__next',
			prevEl: '.interview__prev',
		},
		breakpoints: {
			576: {
				slidesPerView: 1.4,
				spaceBetween: 10
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},
	});
};

if (document.documentElement.clientWidth < 767) {
	var tabSwiper = new Swiper('.swiper-product', {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		centeredSlides: true,
		navigation: {
			nextEl: '.product__next',
			prevEl: '.product__prev',
		},
		pagination: {
			el: '.product-pagination',
			clickable: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 1.4,
				spaceBetween: 10
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},
	});
};

if (document.documentElement.clientWidth < 992) {
	var orderSwiper = new Swiper('.swiper-order', {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		centeredSlides: true,
		navigation: {
			nextEl: '.order__next',
			prevEl: '.order__prev',
		},
		breakpoints: {
			767: {
				slidesPerView: 2,
				spaceBetween: 15
			},
			576: {
				slidesPerView: 1.5,
				spaceBetween: 40
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 30,
			},
		},
	});
};

var softwareSwiper = new Swiper('.swiper-software', {
	slidesPerView: 1,
	spaceBetween: 10,
	loop: true,
	autoplay: true,
	speed: 600,
	navigation: {
		nextEl: '.software__next',
		prevEl: '.software__prev',
	},
	pagination: {
		el: '.software-pagination',
		clickable: true,
	},
});

var caseSwiper = new Swiper('.swiper-case', {
	slidesPerView: 1,
	spaceBetween: 100,
	loop: true,
	navigation: {
		nextEl: '.case__next',
		prevEl: '.case__prev',
	},
	pagination: {
		el: '.case-pagination',
		clickable: true,
	},
});

var newsSwiper = new Swiper('.swiper-news', {
	slidesPerView: 3,
	spaceBetween: 100,
	loop: true,
	navigation: {
		nextEl: '.news__next',
		prevEl: '.news__prev',
	},
	pagination: {
		el: '.news-pagination',
		clickable: true,
	},
	breakpoints: {
		992: {
			slidesPerView: 3,
			spaceBetween: 100,
		},
		576: {
			slidesPerView: 2,
			spaceBetween: 50,
		},
		315: {
			slidesPerView: 1,
			spaceBetween: 50,
		},
	},
});