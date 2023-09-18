//обработка анимаций в блоке хронологии
const chronItems = document.querySelectorAll('.chronology__timeline-list__item');

if(chronItems) {
  
  chronItems.forEach((item, id) => {
    const activeClass = 'active'
    item.addEventListener('click', ()=> {
      if(item.classList.contains(activeClass)) {
        return
      } else {
        chronItems.forEach((element, index) => {
          if(id === index) {
            element.classList.add(activeClass)
          } else {
            if(element.classList.contains(activeClass)) {
              element.classList.remove(activeClass)
            }
          }
        })
      }
    })
  })
}