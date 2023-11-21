const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; 
/* 
    This JavaScript code retrieves data with the key "items" from local storage
    and converts this data into a JavaScript object (Json.parse).  
    If there is no data with the key "items" or parsing the data fails, 
    an empty array ([]) is assigned by default.
*/

function addItem(e){
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item= {
        text,  // same idea with "text: text"
        done: false
    }
    items.push(item); 
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items)); // we adding our items to local storage to when we refresh the page our list will be there, not going to reset.
    // because of local storage store String, we cant just send there our "items" because it is an array, so we converted that to String with "JSON.stringify"
    this.reset(); // after enterin an input and creating an object, reseting the input

}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
}


function toggleDone(e) {
    if (!e.target.matches('input')) return; // in normally when we click we take 2 targer bcs of in populateList we return 2 html labels
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items)); // updating local storage (is checked or not)
    populateList(items, itemsList); // updatig the list (is checked or not)
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList); // when tha page loads.