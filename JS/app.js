//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Functions
addTodo = (event) =>{
    //Prevent from submitting
    event.preventDefault();

    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add to localStorage
    saveLocalTodos(todoInput.value);
    
    //Check MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //Append to LIST
    todoList.appendChild(todoDiv);

     
    //Clear Input
    todoInput.value ="";
}

deleteCheck = (event) => {
    const item = event.target;

    //DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',() =>{
            todo.remove(); 
        })
        
    }

    //CHECK MARK
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed');
    }

}

filterTodo = (event) => {
    const todos = todoList.childNodes;  
    for(i = 1 ; i<todos.length ; i++){
        let todo = todos[i];
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                } 
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;                        
        }
}
}

//---------------LOCAL STORAGE OPERATION  ---------------------------//

//Saving Todos to Local Storage
saveLocalTodos = (todo) => {
    //check we have the todo already
    let todos ;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));

    } 
    todos.push(todo);
    localStorage.setItem("todos" ,JSON.stringify(todos));
}


//Getting Todos on relaodinf of  Page for this we need action Listener on event DOMContentLoaded

getTodos = () => {
    let todos ;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));

    } 
    todos.forEach( (todo) => {
        
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //Append to LIST
    todoList.appendChild(todoDiv);

    });
}


//Deleting todo from the Local Storage when the Todo is deleted from the webpage.
removeLocalTodos = (todo) => {
    let todos ;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    } 
    const todoIndex = todo.children[0].innerText;
    
    todos.splice(todos.indexOf(todoIndex) , 1);
    localStorage.setItem("todos",JSON.stringify(todos))
}

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click' , addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);



