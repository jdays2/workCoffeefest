//обработка нескольких checkers в more-wrapper
const moreWrap = document.querySelector('.card-det__more-wrapper');

if (moreWrap) {
  const items = moreWrap.querySelectorAll('.card-det__more'); 
  items.forEach(element => {
    const input = element.querySelector('input[type="checkbox"]');
    input.addEventListener('input', () => {
      items.forEach(otherItem => {
        if (otherItem !== element) {
          const otherInput = otherItem.querySelector('input');
          otherInput.checked = false; 
        }
      });
    });
  });
}