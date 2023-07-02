const container = document.getElementById('container');
const addButton = document.getElementById('addButton');
const deleteButton = document.getElementById('deleteButton');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');
const modal = document.getElementById('modal');
const input = document.getElementById('input');
const todoList = [];

const onConfirmClick = e => {
    const value = input.value;
    addToList(value);
    clear();
    renderList(todoList);
    input.value = "";
    modal.classList.remove("show");
}

const onCancelClick = e => {
    modal.classList.remove("show");
    input.value = "";
}

const onAddClick = e => {
    modal.classList.add("show");
    input.focus();
}

const onDeleteClick = e => {
    todoList.length = 0;
    localStorage.removeItem("list");
    clear();
}

const addToList = value => {
    todoList.push({
        value: value,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("list", JSON.stringify(todoList));
}

const createItem = (text, className) => {
    const d = document.createElement("div");
    d.classList.add(className);
    d.innerText = text;

    return d;
}

const clear = () => {
    container.innerHTML = "";
}

const renderList = list => {
    list.forEach(item => {
        const value = createItem(item.value, "value");
        const date = createItem(item.date, "date");

        const div = document.createElement("div");
        div.appendChild(value);
        div.appendChild(date);
        div.classList.add("listItem");

        container.appendChild(div);
    });
}

addButton.addEventListener("click", onAddClick);
deleteButton.addEventListener("click", onDeleteClick);
confirmButton.addEventListener("click", onConfirmClick);
cancelButton.addEventListener("click", onCancelClick);

window.onload = () => {
    const ls = JSON.parse(localStorage.getItem("list"));
    
    if(ls !== null){
        todoList.push(...ls);
        renderList(todoList);
    }
}
