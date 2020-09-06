const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value; ///this es el form
    const item = {
        text,
        done: 'false'
    };
    items.push(item);
    addToList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}
function addToList(items = [], itemsList) {
    itemsList.innerHTML = items.map((item, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${(item.done == true) ? 'checked' : ''} />
                <label for="item${i}">${item.text}</label>
            </li>
        `;
    }).join('');//uniendolo en un string 
}
function toggleDone(e) {
    if (!e.target.matches('input')) return;
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    addToList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone); //event delegation. Los LI no existen cuando llamo al event listener, por lo que tengo que llamar a su elemento padre y este le "avisara" a los elementos hijos qué hacer al ser clickeados
addToList(items, itemsList);
