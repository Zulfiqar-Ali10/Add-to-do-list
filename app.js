
const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");


let localTodoList = [];

const getTodoListFromLocal = () => {
    return  JSON.parse(localStorage.getItem("youtubeTodoList"));
};

const addTodoListLocalStorage = (localTodoList) => {
    return localStorage.setItem("youtubeTodoList", JSON.stringify(localTodoList));
}

localTodoList = getTodoListFromLocal() || [];
const addTodoDynamicElement = (currElem) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main_todo_div");
    divElement.innerHTML = `<li>${currElem}</li> <button
     class="deleteBtn">Delete</button>`;
     mainTodoElem.append(divElement);
}

const addTodoList = (e) => {
    e.preventDefault();

     const todoListValue = inputValue.value.trim();
     inputValue.value = "";

     if(todoListValue !== "" && !localTodoList.includes(todoListValue)){

     localTodoList.push(todoListValue);
     localTodoList = [... new Set(localTodoList)];
     console.log(localTodoList);
     localStorage.setItem("youtubeTodoList", JSON.stringify(localTodoList));

     addTodoDynamicElement(todoListValue);
     }
};

const showTodoList = () => {
 console.log(localTodoList);
 localTodoList.forEach((currElem) => {
    addTodoDynamicElement(currElem);
 })
}
showTodoList();

const removeTodoElem = (e) =>{
 const todoToRemove = e.target;
 let todoListContent = todoToRemove.previousElementSibling.innerText;
 let parentElem = todoToRemove.parentElement;
 console.log(todoListContent);

 localTodoList = localTodoList.filter((curTodo) => {
    return curTodo !== todoListContent.toLowerCase();
 });

   addTodoListLocalStorage(localTodoList);
   parentElem.remove();

 console.log(localTodoList);9
}

mainTodoElem.addEventListener('click', (e) => {
    e.preventDefault()
    // console.log(e.target.classList.contains("deleteBtn"));
    if(e.target.classList.contains("deleteBtn")){
        removeTodoElem(e);
    }
 })

document.querySelector(".btn").addEventListener("click", (e) => {
    addTodoList(e);
});
