/* <АДАПТИВНОЕ МЕНЮ> */
const iconMenu = document.querySelector('.icon-menu')
const menuBody = document.querySelector('.menu__body')
const body = document.body

if (iconMenu) {
  iconMenu.addEventListener('click', function () {
    selectOptions.classList.remove('active')
    arrow.classList.remove('active')

    menuBody.classList.toggle('active')
    iconMenu.classList.toggle('active')
    body.classList.toggle('lock')
  })
}
/* </АДАПТИВНОЕ МЕНЮ> */

// <SELECT>
const selectLabel = document.querySelector('.select__label')
const selectOptions = document.querySelector('.select__options')
const selectTitle = document.querySelector('.select__title')
const arrow = document.querySelector('.select__arrow')
const options = document.querySelectorAll('.option')

if (selectLabel) {
  selectLabel.addEventListener('click', function () {
    menuBody.classList.remove('active')
    iconMenu.classList.remove('active')
    body.classList.remove('lock')

    selectOptions.classList.toggle('active')
    arrow.classList.toggle('active')
  })
}

if (options.length) {
  options.forEach((option) =>
    option.addEventListener('click', () => {
      selectTitle.innerHTML = option.querySelector('label').innerHTML
      selectOptions.classList.remove('active')
      arrow.classList.remove('active')
    })
  )
}

window.addEventListener('click', function (event) {
  if (!event.target.closest('.select')) {
    selectOptions.classList.remove('active')
    arrow.classList.remove('active')
  }
})
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
      const errorItem = input.nextElementSibling

      formRemoveError(input)
      errorItem.innerHTML = ''
      if (input.value === '') {
        formAddError(input)
        errorItem.innerHTML = 'Поле должно быть заполено'
        error++
      } else {
        if (input.classList.contains('_email')) {
          if (emailTest(input)) {
            formAddError(input)
            errorItem.innerHTML = 'Некорректный email'
            error++
          }
        } else if (input.classList.contains('_tel')) {
          if (telTest(input)) {
            formAddError(input)
            errorItem.innerHTML = 'Некорректный номер'
            error++
          }
        }
      }
    }
    return error
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error')
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error')
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
