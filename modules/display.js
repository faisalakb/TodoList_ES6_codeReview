const listContainer = document.getElementById('ulId');
const checkBox = document.createElement('input');
const div = document.createElement('div');
const refres = document.getElementById('refres');
div.innerHTML = '<span class="delete-icon hide"><i class="fa fa-trash delEd"></i></span>';
div.classList.add('test');
checkBox.type = 'checkbox';
checkBox.classList.add('chbox');
const display = () => {
  listContainer.innerHTML = ''; // Clear the list container

  let itemData = [];
  if (localStorage.length !== 0) {
    const txt = localStorage.getItem('todoListItems');
    itemData = JSON.parse(txt);
  }

  itemData.forEach((element) => {
    const section = document.createElement('section');
    section.id = 'se';

    const liTag = document.createElement('li');
    const text = document.createTextNode(element.description);
    liTag.setAttribute('data-index', element.index);
    if (element.completed === true) {
      liTag.classList.add('completed');
    }
    liTag.appendChild(text);

    section.appendChild(checkBox.cloneNode(true));
    section.appendChild(liTag);
    section.appendChild(div.cloneNode(true));
    section.innerHTML += '<br><br>';

    listContainer.appendChild(section);

    liTag.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = element.description;
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          element.description = input.value;
          localStorage.setItem('todoListItems', JSON.stringify(itemData));
          display();
        }
      });

      liTag.textContent = '';
      liTag.appendChild(input);
      input.focus();
    });
  });

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const li = checkbox.closest('section').querySelector('li');
      const liId = parseInt(li.getAttribute('data-index'), 10);
      const completed = checkbox.checked;

      li.classList.toggle('completed', completed);

      itemData.forEach((item) => {
        if (item.index === liId) {
          item.completed = completed;
        }
      });

      localStorage.setItem('todoListItems', JSON.stringify(itemData));
    });
  });

  const divIcon = document.querySelectorAll('.test');
  divIcon.forEach((divItem) => {
    if (divItem) { // Add a null check before adding the event listener
      divItem.addEventListener('click', (event) => {
        const liTag = event.target.parentElement.querySelector('li');
        if (liTag) {
          const input = document.createElement('input');
          input.type = 'text';
          input.classList.add('dynInp');
          input.value = liTag.textContent;
          input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
              liTag.textContent = input.value;
              const index = parseInt(liTag.getAttribute('data-index'), 10);
              const itemToUpdate = itemData.find((element) => element.index === index);
              itemToUpdate.description = input.value;
              localStorage.setItem('todoListItems', JSON.stringify(itemData));
            }
          });
          liTag.textContent = '';
          liTag.appendChild(input);
          input.focus();
          const deleteIcon = divItem.querySelector('.delete-icon');
          if (deleteIcon) { // Add a null check before removing the 'hide' class
            deleteIcon.classList.remove('hide');
          }
          deleteIcon.addEventListener('click', () => {
            const index = parseInt(liTag.getAttribute('data-index'), 10);
            const itemIndex = itemData.findIndex((element) => element.index === index);
            if (itemIndex !== -1) {
              itemData.splice(itemIndex, 1);
              for (let i = itemIndex; i < itemData.length; i += 1) {
                itemData[i].index = i + 1;
              }
              localStorage.setItem('todoListItems', JSON.stringify(itemData));
              display(); // Re-render the list
            }
          });
          divItem.classList.remove('test');
        }
      });
    }
  });
  refres.onclick = () => {
    window.location.reload();
  };
  refres.addEventListener('mouseover', () => {
    refres.classList.add('fa-spin');
  });
  refres.addEventListener('mouseout', () => {
    refres.classList.remove('fa-spin');
  });
};

export default display;
