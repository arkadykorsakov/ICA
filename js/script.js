/* <АДАПТИВНОЕ МЕНЮ> */
const iconMenu = document.querySelector('.icon-menu')
const menuBody = document.querySelector('.menu__body')
const body = document.body

if (iconMenu) {
  iconMenu.addEventListener('click', function () {
    menuBody.classList.toggle('active')
    iconMenu.classList.toggle('active')
    body.classList.toggle('lock')
  })
}
/* </АДАПТИВНОЕ МЕНЮ> */

// <SELECT>
const selects = document.querySelectorAll('.select')

if (selects.length) {
  selects.forEach((select) => {
    const selectLabel = select.querySelector('.select__label')
    const selectTitle = selectLabel.querySelector('.select__title')
    const selectArrow = select.querySelector('.select__arrow')
    const selectOptions = select.querySelector('.select__options')
    const options = selectOptions.querySelectorAll('.select__option')
    const selectInput = select.querySelector('.select__input')

    selectLabel.addEventListener('click', function () {
      if (select.closest('.menu__lang')) {
        menuBody.classList.remove('active')
        iconMenu.classList.remove('active')
        body.classList.remove('lock')
      }

      selectOptions.classList.toggle('active')
      selectArrow.classList.toggle('active')
    })

    if (options.length) {
      options.forEach((option) =>
        option.addEventListener('click', function (e) {
          e.stopPropagation()
          selectTitle.innerText = this.innerText
          selectInput.value = this.dataset.value
          if (select.classList.contains('menu__lang')) {
            selectInput.click()
          }
          selectOptions.classList.remove('active')
          selectArrow.classList.remove('active')
        })
      )
    }

    document.addEventListener('click', function (e) {
      if (
        !e.target.closest('.select') ||
        !(e.target.closest('.select') === select)
      ) {
        selectOptions.classList.remove('active')
        selectArrow.classList.remove('active')
      }
    })

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        selectOptions.classList.remove('active')
        selectArrow.classList.remove('active')
      }
    })
  })
}
// </SELECT>

// <FORM>
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form')

  if (form) {
    form.addEventListener('submit', formSend)
  }

  async function formSend(e) {
    e.preventDefault()

    let error = formValidate(form)

    let formData = new FormData(form)

    if (error === 0) {
      document.querySelector('.question').classList.add('_sending')
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        form.reset()
        if (form.name) {
          const service = document.querySelector("[name='service']")
          service.value = ''
          const select = service.closest('.select')
          select.querySelector('.select__title').innerHTML = 'Выберете услугу'
        }
        document.querySelector('.question').classList.remove('_sending')
        alert('Данные отправлены!')
      } else {
        document.querySelector('.question').classList.remove('_sending')
        alert('Ошибка!')
      }
    }
  }

  function formValidate(form) {
    let error = 0
    let formReq = document.querySelectorAll('._req')

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index]
      const formItem = input.closest('.form__item')
      const formError = formItem.querySelector('.form__error')
      let currentLang = localStorage.getItem('lang') ?? checkBrowserLang()

      formRemoveError(input)
      formError.innerHTML = ''
      if (input.value === '') {
        formAddError(input)
        if (currentLang === 'ru') {
          formError.innerHTML = 'Поле должно быть заполнено'
        } else if (currentLang === 'en') {
          formError.innerHTML = 'Required field'
        }
        error++
      } else {
        if (input.classList.contains('_email')) {
          if (emailTest(input)) {
            formAddError(input)
            if (currentLang === 'ru') {
              formError.innerHTML = 'Некорректный email'
            } else if (currentLang === 'en') {
              formError.innerHTML = 'Invalid Email'
            }
            error++
          }
        } else if (input.classList.contains('_tel')) {
          if (telTest(input)) {
            formAddError(input)
            if (currentLang === 'ru') {
              formError.innerHTML = 'Некорректный номер'
            } else if (currentLang === 'en') {
              formError.innerHTML = 'Invalid Phone Number'
            }
            error++
          }
        }
      }
    }
    return error
  }

  function formAddError(input) {
    input.closest('.form__item').classList.add('_error')
  }

  function formRemoveError(input) {
    input.closest('.form__item').classList.remove('_error')
  }

  // Функция проверки email
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
  }

  // Функция проверки телефона
  function telTest(input) {
    return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(
      input.value
    )
  }
})
// </FORM>

/* <SLIDER> */
const imageSlider = document.querySelector('.image-slider')

// инициализация
if (imageSlider) {
  new Swiper('.image-slider', {
    // стрелки
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },

    // включение/отключение перетаскивания на ПК
    simulateTouch: false,

    // чувствительность свайпа
    touchRatio: 1,

    // угол срабатывания свайпа/перетаскивания
    touchAngle: 45,

    // курсор перетаскивания
    grabCursor: false,

    // преключение при клике на слайд
    slideToClickedSlide: false,

    // навигация по хэшу
    hashNavigation: {
      // отслеживать состояние
      watchState: true
    },

    //переключение слайдов клавиатурой
    keyboard: {
      // включить/выключить
      enabled: true,
      // включить/выключить, когда слайдер в зоне видимости
      onlyInViewport: false,
      //управление клавшами pageUp pageDown
      pageUpDown: true
    },

    // переключение слайдов мышью
    mousewheel: {
      // чувствительность колеса мыши
      sensitivity: 1,

      //объект, на котором будет срабатывать прокрутка мышью
      eventsTarget: '.image-slider'
    },

    // автовысота
    autoHeight: true,

    //отключение функционала, если слайдов меньше, чем нужно
    watchOverflow: true,

    //отступы между слайдами
    spaceBetween: 90,

    //количество пролистываемых слайдов
    slidesPerGroup: 1,

    //активный слайд по центру
    //   centeredSlides: true,

    // активный слайд с 0
    initialSlide: 0,

    //мультирядность
    slidesPerColumn: 1, //при autoHeight:false

    //бесконечный слайдер
    loop: false, //скролл не работает, отключить

    //количество дублирующих слайдов
    loopedSlides: 0,

    //свободный режим
    freeMode: true,

    breakpoints: {
      1440: {
        //отступы между слайдами
        spaceBetween: 30,
        slidesPerView: 3
      },
      1200: {
        //отступы между слайдами
        spaceBetween: 50,
        slidesPerView: 3
      },
      991.98: {
        //отступы между слайдами
        spaceBetween: 60,
        // количество слайдов для показа
        slidesPerView: 3
      },
      767.98: {
        // количество слайдов для показа
        slidesPerView: 2
      }
    }
  })
}

/* </SLIDER> */

// <УВЕЛИЧЕНИЕ ФОТОГРАФИЙ>
const fsLightbox = document.querySelectorAll('[data-fslightbox]')

if (fsLightbox.length) {
  new FsLightbox()
}
// </УВЕЛИЧЕНИЕ ФОТОГРАФИЙ>

// <МУЛЬТИЯЗЫЧНОСТЬ>
const allLangs = ['ru', 'en']
let currentLang = localStorage.getItem('lang') ?? checkBrowserLang()
const menuLang = document.querySelector('.menu__lang')
const currentPath = window.location.pathname
let currentText = {}

checkPagePathName()
changeLang()

if (menuLang) {
  menuLang.querySelector('.select__title').textContent = currentLang
  const menuLangInput = menuLang.querySelector('.select__input')
  if (menuLangInput) {
    menuLangInput.addEventListener('click', function () {
      menuLang.querySelector('.select__title').textContent = menuLangInput.value
      currentLang = menuLangInput.value
      localStorage.setItem('lang', menuLangInput.value)
      changeLang()
    })
  }
}

function checkPagePathName() {
  currentText = {
    menu: {
      ru: `
			<li class="menu__item">
				<a href="/" class="menu__link">
					Главная
				</a>
			</li>
			<li class="menu__item">
				<a href="/about.html" class="menu__link">О нас</a>
			</li>
			<li class="menu__item">
				<a href="/siberian_falconry.html" class="menu__link"
				>Siberian Falconry
				</a>
			</li>
			<li class="menu__item">
				<a href="/investment.html" class="menu__link">Инвестиции</a>
			</li>
			<li class="menu__item">
				<a href="/services.html" class="menu__link">Услуги</a>
			</li>`,
      en: `
			<li class="menu__item">
				<a href="/" class="menu__link">
				Homepage
				</a>
			</li>
			<li class="menu__item">
				<a href="/about.html" class="menu__link">About us</a>
			</li>
			<li class="menu__item">
				<a href="/siberian_falconry.html" class="menu__link"
				>Siberian Falconry
				</a>
			</li>
			<li class="menu__item">
				<a href="/investment.html" class="menu__link">Investment</a>
			</li>
			<li class="menu__item">
				<a href="/services.html" class="menu__link">Services </a>
			</li>
			`
    },
    contactsTitle: {
      ru: `Контакты`,
      en: `Contact info`
    },
    contactsAddress: {
      ru: `
		<h3 class="item-contacts__title">Адрес</h3>
		<div class="item-contacts__info">
		  <p>
			 18th Floor, Office No. 1805, ADCP Tower D, Building No. 21,
			 Al
		  </p>
		  <p>Danah Area, Abu Dhabi, UAE</p>
		</div>`,
      en: `
		<h3 class="item-contacts__title">Where to find us</h3>
		<div class="item-contacts__info">
		  <p>
			 18th Floor, Office No. 1805, ADCP Tower D, Building No. 21,
			 Al
		  </p>
		  <p>Danah Area, Abu Dhabi, UAE</p>
		</div>`
    },
    contactsTime: {
      ru: `  
		 <h3 class="item-contacts__title">Время работы</h3>
		 <div class="item-contacts__info">
		  <p>Пн—Пт: 10:00—19:00</p>
		  <p>Сб—Вс: выходной</p>
		 </div>`,
      en: `  
		 <h3 class="item-contacts__title">Working hours</h3>
		 <div class="item-contacts__info">
		  <p>Mon—Fri: 10:00-19:00</p>
		  <p>Sat—Sun: Day off</p>
		 </div>`
    },
    contactsContact: {
      ru: ` 
		<h3 class="item-contacts__title">Связаться</h3>
		 <div class="item-contacts__info">
			<a href="tel:+79135329160" class="item-contacts__link">
			  т. +7 (913) 532-91-60</a
			>
			<a
			  href="mailto:ica.biz.uae@gmail.com"
			  class="item-contacts__link"
			>
			  ica.biz.uae@gmail.com
			</a>
		 </div>`,
      en: `
		<div class="item-contacts__info">
			<h3 class="item-contacts__title">Call us at</h3>
			<a href="tel:+79135329160" class="item-contacts__link">
			  т. +7 (913) 532-91-60</a
			>
			<h3 class="item-contacts__title">Email us at</h3>

			<a
			  href="mailto:ica.biz.uae@gmail.com"
			  class="item-contacts__link"
			>
			  ica.biz.uae@gmail.com
			</a>
		 </div>`
    }
  }

  const form = document.querySelector('#form')
  if (form) {
    currentText = {
      ...currentText,
      inputName: { ru: `Имя`, en: `Name` },
      inputTel: { ru: `Телефон`, en: `Phone number` },
      inputMessage: { ru: `Сообщение`, en: `Message` },
      inputBtn: { ru: `Отправить`, en: `Submit` }
    }
  }
  const partners = document.querySelector('.partners')
  if (partners) {
    currentText = {
      ...currentText,
      partnersTitle: {
        ru: `Наши партнеры`,
        en: `Partners`
      },
      partnersCG: {
        ru: `    
		<div class="item__body">
		 <div class="item__image">
			 <img src="img/partners/cg.svg" alt="Continental Group" />
		 </div>
		 <div class="item__description">
			 Международный строительный холдинг «Continental Group»
			 Абу-Даби, ОАЭ
		 </div>
		</div>`,
        en: `    
		<div class="item__body">
		<div class="item__image">
		  <img src="img/partners/cg.svg" alt="Continental Group" />
		</div>
		<div class="item__description">
		  International construction holding «Continental Group», Abu Dhabi, UAE
		</div>
	 </div>`
      },
      partnersAI: {
        ru: `
		<div class="item__body">
		 <div class="item__image">
			<img src="img/partners/aa.svg" alt="Aston Alliance" />
		 </div>
		 <div class="item__description">
			Международный консорциум по защите и монетизации
			Интеллектуальной Собственности Дубаи, ОАЭ
		 </div>
	  </div>`,
        en: `
	  <div class="item__body">
		<div class="item__image">
		  <img src="img/partners/aa.svg" alt="Aston Alliance" />
		</div>
		<div class="item__description">
			International Consortium for the Protection and Monetization of Intellectual Property, Dubai, UAE
		</div>
	 </div>`
      },
      partnersSF: {
        ru: `
		<div class="item__body">
		 <div class="item__image">
			 <img src="img/partners/sf.svg" alt="Continental Group" />
		 </div>
		 <div class="item__description">
			 Соколиный питомник «Siberian Falconry» РФ, Красноярский край
		 </div>
		</div>`,
        en: `
		<div class="item__body">
		<div class="item__image">
			<img src="img/partners/sf.svg" alt="Siberian Falconry" />
		</div>
		<div class="item__description">
			Falconry «Siberian Falconry», Krasnoyarsk Region, Russian Federation
		</div>
	  </div>`
      },
      partnersARIF: {
        ru: `
		<div class="item__body">
		 <div class="item__image">
			 <img src="img/partners/arif.svg" alt="Arab-Russian Investment Fund" />
		 </div>
		 <div class="item__description">
			 Арабо-Российский Инвестиционный Фонд Инвестирование в
			 недвижимость и бизнес-проекты ОАЭ
		 </div>
		</div>`,
        en: `
		<div class="item__body">
			 <div class="item__image">
				 <img src="img/partners/arif.svg" alt="Arab-Russian Investment Fund" />
			 </div>
			 <div class="item__description">
			  Arab-Russian Investment Fund Investing in real estate and UAE business projects
			 </div>
		 </div>`
      }
    }
  }

  if (currentPath === '/') {
    currentText = {
      ...currentText,
      homeTitle: {
        ru: `Мы делаем то, <br /> чего не могут другие`,
        en: `We do what <br/> others can't`
      },
      homeSubtitle: {
        ru: `
		   Объединенные Арабские Эмираты
			<br />
			Бизнес и инвестиции
			`,
        en: `
		  	United Arab Emirates
		   <br/>
			Business and investment
			`
      },
      homeBtn: {
        ru: `Оставить заявку`,
        en: `Apply now`
      },
      icaDescription: {
        ru: `IR-агентство инвестиционных коммуникаций полного цикла`,
        en: `IR-Full-cycle Investment Communications Agency`
      },
      arifDescription: {
        ru: `АРИФ, Арабо-Российский Инвестиционный Фонд -
		  представительство частных инвесторов Объединенных Арабских
		  Эмиратов, Саудовской Аравии и Катара в Российской
		  Федерации`,
        en: `Arab-Russian Investment Fund (ARIF) is a representative office of private investors of the United Arab Emirates, Saudi Arabia and Qatar in the Russian Federation `
      },
      infoTitle: {
        ru: `Доморацкий Максим`,
        en: `MAXIM DOMORATSKI`
      },
      infoDescription: {
        ru: `    
		  <p>
			<b>Основатель и директор</b> международного агентства
			инвестиционных коммуникаций «ICA»
		 </p>
		 <p>
			<b>Управляющий Партнер</b> сети соколиных питомников и центра
			соколиной охоты «Siberian Falconry», г. Красноярск
		 </p>
		 <p>
			<b>Официальный представитель</b> шейха Мубарака аль Мансури
			(ОАЭ) в Российской Федерации
		 </p>
		 <p>
			<b>Эксперт по инвестиционным проектам</b> международного
			холдинга «Continental Group» (Абу-Даби, ОАЭ)
		 </p>
		 <p>
			<b>Управляющий Партнер</b> консорциума «Aston Alliance» (Дубай,
			ОАЭ)
		 </p>`,
        en: `    
		<p>
			<b>Founder and Head</b> of  the International Investment Communications Agency «ICA»
		 </p>
		 <p>
			<b>Managing Partner</b> of the chain of falconry nurseries and falconry center «Siberian Falconry», Krasnoyarsk
		 </p>
		 <p>
			<b>Official Representative</b> of Sheikh Mubarak Al Mansouri (UAE) in the Russian Federation
		 </p>
		 <p>
			<b>Expert on investment projects</b> of the international holding «Continental Group» (Abu Dhabi, UAE)
		 </p>
		 <p>
			<b>Managing Partner</b> of the «AstonAlliance» Consortium (Dubai, UAE)
		 </p>`
      },
      infoSocial: {
        ru: `
		  <a href="https://vk.com/domoratskiymaxim" class="social__label" target="_blank">
		   DomoratskiyMaxim
		  </a>
		  <div class="social__links">
		    <a href="https://vk.com/domoratskiymaxim" class="social__link vk" target="_blank"></a>
		  </div> 
		 `,
        en: `
		  <div class="social__label">
		  DomoratskiyMaxim
		 </div>
		 <div class="social__links">
		  <a href="https://www.facebook.com/DomoratskiyMaxim" class="social__link facebook" target="_blank"></a>
		  <a href="https://www.instagram.com/domoratskiy_maxim/" class="social__link inst" target="_blank"></a>
		 </div> `
      },
      whyTitle: {
        ru: `Почему именно мы`,
        en: `Why us?`
      },
      whyExperience: {
        ru: `
		  <div class="item-why__image">
			<img src="img/why/01.svg" alt="experience" />
		  </div>
		  <h3 class="item-why__title">Опыт</h3>
		  <div class="item-why__description">
			Наша команда работает на рынке международных услуг с 2016
			года
		  </div>`,
        en: `
		  <div class="item-why__image">
		   <img src="img/why/01.svg" alt="experience" />
		  </div>
		  <h3 class="item-why__title">Experience</h3>
		  <div class="item-why__description">
		  Our team has been working in the international services market since 2016
		  </div>`
      },
      whyPartnership: {
        ru: `
			<div class="item-why__body">
			<div class="item-why__image">
			  <img src="img/why/02.svg" alt="partnership" />
			</div>
			<h3 class="item-why__title">Связи</h3>
			<div class="item-why__description">
			  Мы работаем с самыми высокими семьями ОАЭ
			</div>
		 </div>`,
        en: `
			<div class="item-why__body">
			<div class="item-why__image">
			  <img src="img/why/02.svg" alt="partnership" />
			</div>
			<h3 class="item-why__title">Partnership</h3>
			<div class="item-why__description">
			  We work with the elite families of the UAE
			</div>
		 </div>`
      },
      whyName: {
        ru: `
		  <div class="item-why__body">
			<div class="item-why__image">
			  <img src="img/why/03.svg" alt="name" />
			</div>
			<h3 class="item-why__title">Имя</h3>
			<div class="item-why__description">
			  Имя и доверительные отношения на Востоке - это самое главное
			  в сотрудничестве. Нас знают и рекомендуют
			</div>
		 </div>`,
        en: `
		  <div class="item-why__body">
			<div class="item-why__image">
			  <img src="img/why/03.svg" alt="name" />
			</div>
			<h3 class="item-why__title">Name</h3>
			<div class="item-why__description">
			 A name and trustful relations in the East are the most important points in cooperation. ICA is known and recommended
			</div>
		 </div>
		 `
      },
      documentsTitle: {
        ru: `Документы`,
        en: `Documentation`
      },
      questionTitle: {
        ru: `Вопрос`,
        en: `Any questions?`
      },
      questionSubtitle: {
        ru: `Задайте вопрос и получите бесплатную консультацию онлайн`,
        en: `Send us a message get a free consultation online`
      }
    }
    return
  }
  if (currentPath === '/about.html') {
    currentText = {
      ...currentText,
      aboutTitle: {
        ru: `Международное IR-Агентство Инвестиционных Коммуникаций «ICA»`,
        en: `IR-Full-cycle Investment Communications Agency`
      },
      aboutDescription: {
        ru: `  Мы занимаем лидирующие позиции по качеству оказываемых
                консалтинговых услуг в Объединенных Арабских Эмиратах. Более 5
                лет мы помогаем Российским предпринимателям в вопросах экспорта,
                импорта, релокации и масштабированию Российского бизнеса в
                странах Персидского залива`,
        en: `We hold a leading position in the qualified consulting services provided in the United Arab Emirates. For more than 5 years, we have been helping Russian entrepreneurs with issues of export, import, relocation and scaling of Russian business in the Persian Gulf countries`
      },
      uniqueTitle: {
        ru: `Уникальность нашей компании`,
        en: `Why is our company unique?`
      },
      uniqueContent: {
        ru: ` Уникальность нашей компании – индивидуальная работа на результат и
		  отсутствие «конвейерного подхода». В переговорах мы используем
		  «восточные» инструменты, менталитет арабских локалов и выстроенные
		  долгосрочные надёжные связи с влиятельными арабскими семьями. В
		  том числе, мы активно выстраиваем деловые контакты за счет
		  Партнерских отношений с сокольничими первых лиц стран Персидского
		  залива (ОАЭ, КСА, Катар, Кувейт, Бахрейн). Наш соколиный питомник
		  «Siberia Falconry» является постоянным участником международных
		  фестивалей соколов имени короля Абдул Азиза г. Эр-Рияд королевства
		  Саудовская Аравия, а наши сокола занимают призовые места
		  фестиваля, что обеспечивает деловую коммуникацию с большим
		  количеством арабских шейхов, крупных предпринимателей, инвесторов
		  и высоких чиновников вышеперечисленных стран.`,
        en: `Our company is unique because we individually work on the result and the absence of a «conveyor approach». In negotiations, we use "Eastern" methods, the mentality of Arab locals and long-term reliable relationship with elite Arab families. In addition to this, we are actively making business contacts through partnerships with falconers of the top officials of the Persian Gulf countries (UAE, KSA, Qatar, Kuwait, Bahrain). Our falconry "Siberia Falconry" is a regular participant of the international falcon festivals named after King Abdul Aziz of the city of Riyadh, the Kingdom of Saudi Arabia. Our falcons take the awards of the festival, which helps us to get a large number of Arab sheikhs, large entrepreneurs, investors and high officials for business partnership.`
      },
      galleryTitle: {
        ru: `#Фотогалерея`,
        en: `#Gallery`
      }
    }
    return
  }
  if (currentPath === '/siberian_falconry.html') {
    currentText = {
      ...currentText,
      siberianTitle: {
        ru: `Открытие соколиного питомника и центра соколиной охоты «Siberian
		  Falconry» в Красноярском крае (2020 - ${new Date().getFullYear()})`,
        en: `Opening of the falcon nursery and centre «Siberian
		  Falconry» in the Krasnoyarsk Region (2020 - ${new Date().getFullYear()})`
      },
      siberianFalconryContent: {
        ru: `Сокол - показатель элитарности и верх престижа для любого
		  арабского шейха. Сокол является признанным символом Объединенных
		  Арабских Эмиратов. Сокол изображен на государственном гербе ОАЭ и
		  на бумажных купюрах. Семь Эмиратов символизируют семь перьев
		  хвостового оперения сокола. Наш соколиный питомник является
		  уникальным инструментом для выстраивания любых деловых и личных
		  отношений с арабскими инвесторами и предпринимателями, вплоть до
		  самого высокого уровня. Что позволяет нашему агентству достигать
		  успеха в решении любых вопросов для наших клиентов.`,
        en: `The falcon is a sign of elitism and 
		  prestige for any Arab sheikh. The falcon is a recognized symbol of the United Arab Emirates – this bird is depicted on the state emblem of the UAE and on paper bills. The seven Emirates symbolize the seven feathers of the tail of the falcon. Our nursery is a unique tool for building strong business and personal relationship with Arab investors and entrepreneurs. It allows our agency to achieve success in solving any issues for our clients.
		  `
      },
      participationTitle: {
        ru: `участие в крупнейшем международном фестивале соколов имени короля
		  абдулазиза в саудовской аравии`,
        en: `Participation in the largest international falcon festival named after King Abdulaziz in Saudi Arabia`
      }
    }
    return
  }
  if (currentPath === '/investment.html') {
    currentText = {
      ...currentText,
      investmentTitle: {
        ru: `Инвестиции`,
        en: `Investment`
      },
      investmentSubtitle: {
        ru: `Инвестиции в различные направления от 1 000 000 ₽
			<br />
			Доходность от 10% годовых
			`,
        en: `
			Investments in various directions from 1,000,000 ₽ 
			<br/>
			Income from 10% per annum
			`
      },
      investmentIndustrial: {
        ru: `
		  <div class="item-investment__body">
			<div class="item-investment__image">
				<img src="img/investment/01.png" alt="investment-01" />
			</div>
			<div class="item-investment__content">
				<h3 class="item-investment__title">
					Промышленная недвижимость ОАЭ
				</h3>
				<div class="item-investment__description">
					Складские помещения, цеха и линии производства, строящиеся
					под заказ. Минимальные риски с максимальной стабильной
					доходностью.
				</div>
			</div>
		  </div>`,
        en: `
		  <div class="item-investment__body">
			<div class="item-investment__image">
				<img src="img/investment/01.png" alt="investment-01" />
			</div>
			<div class="item-investment__content">
				<h3 class="item-investment__title">
				 UAE Industrial Real Estate
				</h3>
				<div class="item-investment__description">
				Warehouses, workshops and production lines that are built to order. Minimal risks with maximum stable income.
				</div>
			</div>
			</div>`
      },
      investmentInnovative: {
        ru: `   
			<div class="item-investment__body">
			 <div class="item-investment__image">
				 <img src="img/investment/02.png" alt="investment-02" />
			 </div>
			 <div class="item-investment__content">
				 <h3 class="item-investment__title">
					 Инновационные проекты
				 </h3>
				 <div class="item-investment__description">
					 Проекты имеющие высокий финансовый потенциал, но требующие
					 дополнительного финансирования. Высокие риски и высокая
					 доходность.
				 </div>
				 </div>
			 </div>`,
        en: `   
			 <div class="item-investment__body">
			  <div class="item-investment__image">
				  <img src="img/investment/02.png" alt="investment-02" />
			  </div>
			  <div class="item-investment__content">
				  <h3 class="item-investment__title">
				  Innovative projects
				  </h3>
				  <div class="item-investment__description">
				  Projects with a high financial potential, which require additional funding. High risks and high income.
				  </div>
				  </div>
			  </div>`
      },
      investmentOpening: {
        ru: `
			<div class="item-investment__body">
				<div class="item-investment__image">
					<img src="img/investment/03.png" alt="investment-03" />
				</div>
				<div class="item-investment__content">
					<h3 class="item-investment__title">
						Открытие Проектного Офиса компании в Дубаи
					</h3>
					<div class="item-investment__description">
						Открытие технологического хаба в Объединенных Арабских
						Эмиратах. Большой потенциал и высокая доходность.
					</div>
				</div>
			</div>`,
        en: `
			<div class="item-investment__body">
				<div class="item-investment__image">
					<img src="img/investment/03.png" alt="investment-03" />
				</div>
				<div class="item-investment__content">
					<h3 class="item-investment__title">
					 Opening of the company's Project Office in Dubai
					</h3>
					<div class="item-investment__description">
					 Opening of a technology hub in the United Arab Emirates. Great potential and high income.
					</div>
				</div>
			</div>`
      },
      questionTitle: {
        ru: `Получите бесплатную консультацию онлайн`,
        en: `Get a free consultation online`
      }
    }
  }

  if (currentPath === '/services.html') {
    currentText = {
      ...currentText,
      questionTitle: {
        ru: `Заказать услугу`,
        en: `Apply for a service`
      },
      questionSubtitle: {
        ru: `Выберете услугу и получите бесплатную консультацию онлайн`,
        en: `Choose a service and get a free consultation online`
      },
      inputService: {
        ru: `Услуга`,
        en: `Service `
      },
      serviceOptions: {
        en: `<li
		  class="select__option"
		  data-value="Инвестирование в промышленную, коммерческую и жилую
		недвижимость ОАЭ"
		>
		Investing in industrial, commercial and residential real estate in the UAE
		</li>
		<li
		  class="select__option"
		  data-value="Презентация вашей продукции и вывод на рынок ОАЭ"
		>
		Presentation and launching your products to the UAE market
		</li>
		<li
		  class="select__option"
		  data-value="Решение административных вопросов в ОАЭ"
		>
		Solving administrative issues in the UAE
		</li>
		<li
		  class="select__option"
		  data-value="Привлечение инвестиций (в стартапы, действующий бизнес,
		инновационные разработки, технологии)"
		>
		Attracting investments (in startups, operating businesses, innovative developments, technologies)
		</li>
		<li
		  class="select__option"
		  data-value="Нетворкинг, бизнес-сообщества, в том числе закрытые и
		ТОПовые бизнес-клубы Дубаи"
		>
		Networking, business communities, including closed and top business clubs in Dubai
		</li>
		<li
		  class="select__option"
		  data-value="Стратегический маркетинг"
		>
		Strategic marketing
		</li>
		<li
		  class="select__option"
		  data-value="Функции представительства вашей компании в ОАЭ"
		>
		Representative office of your company in the UAE
		</li>
		<li
		  class="select__option"
		  data-value="Релокация (масштабирование) бизнеса"
		>
		Business relocation (scaling)
		</li>
		<li
		  class="select__option"
		  data-value="Инвестирование в инновационные бизнес-проекты,
		реализуемые в ОАЭ"
		>
		Investing in innovative business projects launched in the UAE
		</li>
		<li
		  class="select__option"
		  data-value="Организация бизнес-миссий, инвест-туров, индивидуальных
		деловых встреч"
		>
		Organization of business missions, investment tours, individual business meetings
		</li>
		<li
		  class="select__option"
		  data-value="Маркетинговые исследования в ОАЭ"
		>
		Marketing research in the UAE
		</li>
		<li
		  class="select__option"
		  data-value="Приобретение земли и строительство в ОАЭ"
		>
		Land acquisition and construction in the UAE
		</li>`,
        ru: `<li
		class="select__option"
		data-value="Инвестирование в промышленную, коммерческую и жилую
	 недвижимость ОАЭ"
	 >
		Инвестирование в промышленную, коммерческую и жилую
		недвижимость ОАЭ
	 </li>
	 <li
		class="select__option"
		data-value="Презентация вашей продукции и вывод на рынок ОАЭ"
	 >
		Презентация вашей продукции и вывод на рынок ОАЭ
	 </li>
	 <li
		class="select__option"
		data-value="Решение административных вопросов в ОАЭ"
	 >
		Решение административных вопросов в ОАЭ
	 </li>
	 <li
		class="select__option"
		data-value="Привлечение инвестиций (в стартапы, действующий бизнес,
	 инновационные разработки, технологии)"
	 >
		Привлечение инвестиций (в стартапы, действующий бизнес,
		инновационные разработки, технологии)
	 </li>
	 <li
		class="select__option"
		data-value="Нетворкинг, бизнес-сообщества, в том числе закрытые и
	 ТОПовые бизнес-клубы Дубаи"
	 >
		Нетворкинг, бизнес-сообщества, в том числе закрытые и
		ТОПовые бизнес-клубы Дубаи
	 </li>
	 <li
		class="select__option"
		data-value="Стратегический маркетинг"
	 >
		Стратегический маркетинг
	 </li>
	 <li
		class="select__option"
		data-value="Функции представительства вашей компании в ОАЭ"
	 >
		Функции представительства вашей компании в ОАЭ
	 </li>
	 <li
		class="select__option"
		data-value="Релокация (масштабирование) бизнеса"
	 >
		Релокация (масштабирование) бизнеса
	 </li>
	 <li
		class="select__option"
		data-value="Инвестирование в инновационные бизнес-проекты,
	 реализуемые в ОАЭ"
	 >
		Инвестирование в инновационные бизнес-проекты,
		реализуемые в ОАЭ
	 </li>
	 <li
		class="select__option"
		data-value="Организация бизнес-миссий, инвест-туров, индивидуальных
	 деловых встреч"
	 >
		Организация бизнес-миссий, инвест-туров, индивидуальных
		деловых встреч
	 </li>
	 <li
		class="select__option"
		data-value="Маркетинговые исследования в ОАЭ"
	 >
		Маркетинговые исследования в ОАЭ
	 </li>
	 <li
		class="select__option"
		data-value="Приобретение земли и строительство в ОАЭ"
	 >
		Приобретение земли и строительство в ОАЭ
	 </li>`
      },
      inputSelect: {
        ru: `Выберите услугу`,
        en: `Choose a service`
      },
      servicesTitle: {
        ru: `Наши услуги`,
        en: `Our services`
      },
      servicesSubtitle: {
        ru: `в Объединенных Арабских Эмиратах`,
        en: `in the United Arab Emirates`
      },
      servicesItems: {
        ru: `   <div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/01.svg" alt="services-01" />
			 </div>
			 <div class="item__description">
				Инвестирование в промышленную, коммерческую и жилую
				недвижимость ОАЭ
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/02.svg" alt="services-02" />
			 </div>
			 <div class="item__description">
				Решение административных вопросов в ОАЭ
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/03.svg" alt="services-03" />
			 </div>
			 <div class="item__description">
				Привлечение инвестиций (в стартапы, действующий бизнес,
				инновационные разработки, технологии)
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/04.svg" alt="services-04" />
			 </div>
			 <div class="item__description">
				Презентация вашей продукции и вывод на рынок ОАЭ
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/05.svg" alt="services-05" />
			 </div>
			 <div class="item__description">Стратегический маркетинг</div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/06.svg" alt="services-06" />
			 </div>
			 <div class="item__description">
				Функции представительства вашей компании в ОАЭ
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/07.svg" alt="services-07" />
			 </div>
			 <div class="item__description">
				Релокация (масштабирование) бизнеса
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/08.svg" alt="services-08" />
			 </div>
			 <div class="item__description">
				Нетворкинг, бизнес-сообщества, в том числе закрытые и
				ТОПовые бизнес-клубы Дубаи
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/09.svg" alt="services-09" />
			 </div>
			 <div class="item__description">
				Инвестирование в инновационные бизнес-проекты, реализуемые в
				ОАЭ
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/10.svg" alt="services-10" />
			 </div>
			 <div class="item__description">
				Организация бизнес-миссий, инвест-туров, индивидуальных
				деловых встреч
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/11.svg" alt="services-11" />
			 </div>
			 <div class="item__description">
				Маркетинговые исследования в ОАЭ
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/12.svg" alt="services-12" />
			 </div>
			 <div class="item__description">
				Приобретение земли и строительство в ОАЭ
			 </div>
		  </div>
		</div>`,
        en: `   <div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/01.svg" alt="services-01" />
			 </div>
			 <div class="item__description">
			 Investing in industrial, commercial and residential real estate in the UAE
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/02.svg" alt="services-02" />
			 </div>
			 <div class="item__description">
			 Solving administrative issues in the UAE
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/03.svg" alt="services-03" />
			 </div>
			 <div class="item__description">
			 Attracting investments (in startups, operating businesses, innovative developments, technologies)
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/04.svg" alt="services-04" />
			 </div>
			 <div class="item__description">
			 Presentation and launching your products to the UAE market
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/05.svg" alt="services-05" />
			 </div>
			 <div class="item__description">Strategic marketing</div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/06.svg" alt="services-06" />
			 </div>
			 <div class="item__description">
			 Representative office of your company in the UAE
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/07.svg" alt="services-07" />
			 </div>
			 <div class="item__description">
			 Business relocation (scaling)
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/08.svg" alt="services-08" />
			 </div>
			 <div class="item__description">
			 Networking, business communities, including closed and top business clubs in Dubai
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/09.svg" alt="services-09" />
			 </div>
			 <div class="item__description">
			 Investing in innovative business projects launched in the UAE
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/10.svg" alt="services-10" />
			 </div>
			 <div class="item__description">
			 Organization of business missions, investment tours, individual business meetings
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/11.svg" alt="services-11" />
			 </div>
			 <div class="item__description">
			 Marketing research in the UAE
			 </div>
		  </div>
		</div>
		<div class="services__item item">
		  <div class="item__body">
			 <div class="item__image">
				<img src="img/services/12.svg" alt="services-12" />
			 </div>
			 <div class="item__description">
			Land acquisition and construction in the UAE
			 </div>
		  </div>
		</div>`
      },
      servicePartnersTitle: {
        ru: `Услуги наших партнеров`,
        en: `Our partners’ services`
      },
      servicePartnersItems: {
        ru: `
		<div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/01.svg"
				alt="services-partners-01"
			 />
		  </div>
		  <div class="item__description">
			 Приобретение жилой, коммерческой и промышленной недвижимости
		  </div>
		</div>
	 </div>
	 <div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/02.svg"
				alt="services-partners-02"
			 />
		  </div>
		  <div class="item__description">
			 Защита и монетизация Интелaлектуальной Собственности
		  </div>
		</div>
	 </div>
	 <div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/03.svg"
				alt="services-partners-03"
			 />
		  </div>
		  <div class="item__description">
			 Открытие компаний, получение лицензий в ОАЭ
		  </div>
		</div>
	 </div>
	 <div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/04.svg"
				alt="services-partners-04"
			 />
		  </div>
		  <div class="item__description">Резидентские визы</div>
		</div>
	 </div>
	 <div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/05.svg"
				alt="services-partners-05"
			 />
		  </div>
		  <div class="item__description">
			 Сертификация ввозимой продукции
		  </div>
		</div>
	 </div>
	 <div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/06.svg"
				alt="services-partners-06"
			 />
		  </div>
		  <div class="item__description">
			 Криптосделки, транзакции и т.п.
		  </div>
		</div>
	 </div>
		`,
        en: `
		  <div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/01.svg"
				alt="services-partners-01"
			 />
		  </div>
		  <div class="item__description">
		  Acquisition of residential, commercial and industrial real estate
		  </div>
		</div>
	 </div>
	 <div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/02.svg"
				alt="services-partners-02"
			 />
		  </div>
		  <div class="item__description">
		  Intellectual property protection and monetization
		  </div>
		</div>
	 </div>
	 <div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/03.svg"
				alt="services-partners-03"
			 />
		  </div>
		  <div class="item__description">
		  Opening companies, obtaining licenses in the UAE
		  </div>
		</div>
	 </div>
	 <div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/04.svg"
				alt="services-partners-04"
			 />
		  </div>
		  <div class="item__description">Resident visas</div>
		</div>
	 </div>
	 <div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/05.svg"
				alt="services-partners-05"
			 />
		  </div>
		  <div class="item__description">
		  Certification of imported products
		  </div>
		</div>
	 </div>
	 <div class="services-partners__item item">
		<div class="item__body">
		  <div class="item__image">
			 <img
				src="img/services/partners/06.svg"
				alt="services-partners-06"
			 />
		  </div>
		  <div class="item__description">
		  Transactions, crypto transactions, etc.
		  </div>
		</div>
	 </div>
		  `
      }
    }
  }
}

function changeLang() {
  for (const key in currentText) {
    const elem = document.querySelector(`[data-lang-${key}]`)
    if (elem) {
      elem.innerHTML = currentText[key][currentLang]
    }
  }
}

function checkBrowserLang() {
  const navLang = navigator.language.slice(0, 2).toLowerCase()
  const result = allLangs.some((elem) => elem === navLang)
  return result ? navLang : 'en'
}
// </МУЛЬТИЯЗЫЧНОСТЬ>
