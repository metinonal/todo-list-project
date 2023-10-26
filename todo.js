//Tüm elementler seçilir.

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {// Tüm event listenerlar.
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
}

function deleteTodo(e){

    if (e.target.className === "fa fa-remove")
{
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success","İşlem başarıyla tamamlandı.");
}}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);  //Arrayden değer silinir.
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo === "") {
        showAlert("danger", "Lütfen kutucuğu boş bırakmayınız.");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Madde Eklemesi Başarıyla Tamamlanmıştır.");
    }
    e.preventDefault();
}

function getTodosFromStorage(){ //Storagedan butun todolar alınır.
   
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type, message) {//İşlemin sonucunu gösteren uyarı kutucuğu eklenir.
    removeAlerts();
    const alert = document.createElement("div");
    const closeButton = document.createElement("button");

    alert.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alert.textContent = message;

    closeButton.className = "close";
    closeButton.type = "button";
    closeButton.ariaLabel = "Close";
    closeButton.setAttribute("data-dismiss", "alert");
    closeButton.innerHTML = "<span aria-hidden='true'>&times;</span>"

    firstCardBody.appendChild(alert);
    alert.appendChild(closeButton);

    setTimeout(function () {
        alert.remove();
    }, 5000)
}

function addTodoToUI(newTodo) {// String değerini list item olarak UI'a ekler.
    removeAlerts();
    // <!-- <li class="list-group-item d-flex justify-content-between">
    //                         <span id="kral">Todos</span>
    //                         <a href = "#" class ="delete-item">
    //                             <i class = "fa fa-remove"></i>
    //                         </a>
    //                     </li> -->

    //List Item oluşturulur.
    const listItem = document.createElement("li");
    // Link oluşturulur.
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between"

    //Text Note
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Todo Liste'e List Item eklenir.
    todoList.appendChild(listItem);
    todoInput.value = "";
}

function removeAlerts() {
    const errorAlert = document.querySelector(".alert-danger");
    const successAlert = document.querySelector(".alert-success");
    if (errorAlert) {
        errorAlert.remove();
    }
    if (successAlert) {
        successAlert.remove();
    }
}
