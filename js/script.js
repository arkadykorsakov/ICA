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
const selectes = document.querySelectorAll('.select')

if (selectes.length) {
  selectes.forEach((select) => {
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
    console.log(e)
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
        let result = await response.json()
        alert(result.message)
        form.reset()
        document.querySelector('.question').classList.remove('_sending')
      } else {
        document.querySelector('.question').classList.remove('_sending')
        alert('Ошибка')
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

      console.log(formError)

      formRemoveError(input)
      formError.innerHTML = ''
      if (input.value === '') {
        formAddError(input)
        formError.innerHTML = 'Поле должно быть заполнено'
        error++
      } else {
        if (input.classList.contains('_email')) {
          if (emailTest(input)) {
            formAddError(input)
            formError.innerHTML = 'Некорректный email'
            error++
          }
        } else if (input.classList.contains('_tel')) {
          if (telTest(input)) {
            formAddError(input)
            formError.innerHTML = 'Некорректный номер'
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

  const lightbox = new FsLightbox()
  fsLightboxInstances[''].props.onOpen = () => {
    console.log(fsLightboxInstances)
  }
  //   lightbox.props.sources = ['img/gallery/1.jpg']
  //   lightbox.close()
  //   lightbox.open(1)
}

/* </SLIDER> */

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
      console.log('ghnjm,s')
      menuLang.querySelector('.select__title').textContent = menuLangInput.value
      currentLang = menuLangInput.value
      localStorage.setItem('lang', menuLangInput.value)
      changeLang()
    })
  }
}

function checkPagePathName() {
  switch (currentPath) {
    case '/index.html':
      currentText = {
        title: {
          ru: 'Мы делаем то, <br /> чего не могут другие',
          en: "We do what others can't do"
        },
        social: {
          ru: ` <a href="https://vk.com/domoratskiymaxim" class="social__link vk" target="_blank"></a>`,
          en: ` <a href="https://www.facebook.com/DomoratskiyMaxim" class="social__link facebook" target="_blank"></a>
			 <a href="https://www.instagram.com/domoratskiy_maxim/" class="social__link inst" target="_blank"></a>`
        }
      }
      break
    case '/about.html':
      currentText = {
        title: {
          ru: 'Международное IR-Агентство Инвестиционных Коммуникаций «ICA»',
          en: 'International IR Agency for Investment Communications  «ICA»'
        }
      }
      break
    case '/investitions.html':
      break
    case '/services.html':
      break
    case '/siberian_falconry.html':
      currentText = {}
      break
    default:
      currentText = {
        title: {
          ru: 'Мы делаем то, <br /> чего не могут другие',
          en: "We do what others can't do"
        },
        social: {
          ru: ` <a href="https://vk.com/domoratskiymaxim" class="social__link vk" target="_blank"></a>`,
          en: ` <a href="https://www.facebook.com/DomoratskiyMaxim" class="social__link facebook" target="_blank"></a>
			  <a href="https://www.instagram.com/domoratskiy_maxim/" class="social__link inst" target="_blank"></a>`
        }
      }
      break
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
  const result = allLangs.some((elem) => {
    return elem === navLang
  })
  if (result) {
    return navLang
  } else {
    return 'en'
  }
}
// </МУЛЬТИЯЗЫЧНОСТЬ>
