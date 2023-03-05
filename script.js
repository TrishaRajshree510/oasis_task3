
const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
taskBox = document.querySelector(".task-box"),
AddNew=document.querySelector(".add-btn");

let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(task_category => {
    task_category.addEventListener("click", () => {
       document.querySelector("span.active").classList.remove("active");
        task_category.classList.add("active");
        showTodo(task_category.id);
    });
});

function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                
                               
                                    <button onclick='editTask(${id}, "${todo.name}")' style=" border: none;
                                    outline: none;
                                    color: #fff;
                                    cursor: pointer;
                                    font-size: 13px;
                                    padding: 7px 13px;
                                    border-radius: 4px;
                                    letter-spacing: 0.3px;
                                    background: linear-gradient(135deg, #1798fb 0%, #2D5CFE 100%);
                                  "><i class="uil uil-pen"></i>Edit</button>
                                    <button onclick='deleteTask(${id}, "${filter}")'style=" border: none;
                                    outline: none;
                                    color: #fff;
                                    cursor: pointer;
                                    font-size: 13px;
                                    padding: 7px 13px;
                                    border-radius: 4px;
                                    letter-spacing: 0.3px;
                                    background: linear-gradient(135deg, #1798fb 0%, #2D5CFE 100%);
                                  "><i class="uil uil-trash"></i>Delete</button>
                                
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>No Task</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
   
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}



AddNew.addEventListener("click", e => {
    let userTask = taskInput.value.trim();
    if( userTask) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
    else{
        alert("Please Fill The Task To be Added")
    }
})
