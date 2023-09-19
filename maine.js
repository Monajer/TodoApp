let form = document.getElementById("form")

let titleInput = document.getElementById("titleInput")
let dueDateInput = document.getElementById("dueDateInput")
let descriptionInput = document.getElementById("descriptionInput")

let msg = document.getElementById("msg")
let todos = document.getElementById("todos")
let add = document.getElementById("add")

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    formValidation()
})

let formValidation = () => {
    
    let title = titleInput.value
    let dueDate = dueDateInput.value
    let description = descriptionInput.value

    if ( title == "" ){
        msg.innerHTML = "Please put the task name"
    } else {
        let todo = {
            title: title,
            due: dueDate,
            description: description
        }
        msg.innerHTML = ""
        clearForm()
        closeForm()
        createTodo(todo)
        
    }
}

const clearForm = () => {
    titleInput.value = ""
    dueDateInput.value = ""
    descriptionInput.value = ""
}

const closeForm = () => {
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    add.setAttribute("data-bs-dismiss", "");
}


let database = []


const createTodo = (todo) => {
    database.push(todo)
    console.log(database);

    refreshUi()
}

const deleteTodo = (e) => {
    let deleteIndex = e.parentElement.id
    database.splice(deleteIndex, 1)

    refreshUi()
}

const editTodo = (e)=>{
    let editIndex = e.parentElement.id

    let editTodo = database[editIndex]
    
    titleInput.value = editTodo.title
    dueDateInput.value = editTodo.due
    descriptionInput.value = editTodo.description

    console.log(editTodo);

    database.splice(editIndex, 1)

}

const refreshUi = () => {
    let todosHtml = ""

    for (let i = 0; i < database.length; i++){
        let todo = database[i]
        todosHtml = todoObjectToHtmlElement(todo, i) + todosHtml 
    }

    todos.innerHTML = todosHtml
}

const todoObjectToHtmlElement = (todo, i) => {
    return `
    <div>
        <span class="fw-bold">${todo.title}</span>........................
        
        <span class="small text-secondary">${todo.due}</span>
        <p>${todo.description}</p>

        <span class="options" id="${i}">
         <i onClick ="editTodo(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
         <i onClick ="deleteTodo(this)" class="fa-solid fa-trash"></i>                    
        </span>
    </div>
    `
}





















