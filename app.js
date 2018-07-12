const form = document.querySelector('#task-form');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const btnAdd = document.querySelector('#btn-add');

loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    btnAdd.addEventListener('click', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTask);
}

function getTasks(){

    let taskValues;
    if(localStorage.getItem('tasks') === null){
        taskValues = [];
    } else {
        taskValues = JSON.parse(localStorage.getItem('tasks'));
    }

    taskValues.forEach(function(taskValue){
         //Create li Element
        const li = document.createElement('li');
        li.className = 'list-group-item';

        //Create text node and append to li
        li.appendChild(document.createTextNode(taskValue));

        //Create new link
        const link = document.createElement('a');
        link.className = 'delete';
        link.innerHTML = '<i class="fa fa-remove text-info"></i>'

        li.appendChild(link);

        //Append LI to Ul   
        taskList.appendChild(li);

    });

}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
        return false;
    }

    //Create li Element
    const li = document.createElement('li');
    li.className = 'list-group-item';

    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link
    const link = document.createElement('a');
    link.className = 'delete';
    link.innerHTML = '<i class="fa fa-remove text-info"></i>'

    li.appendChild(link);

    //Append LI to Ul   
    taskList.appendChild(li);

    
    ///Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    
    taskInput.value = "";




    e.preventDefault();
}


function storeTaskInLocalStorage(taskValue){
    let taskValues;
    if(localStorage.getItem('tasks') === null){
        taskValues = [];
    } else {
        taskValues = JSON.parse(localStorage.getItem('tasks'));
    }
    
    taskValues.push(taskValue);

    localStorage.setItem('tasks', JSON.stringify(taskValues));
}

function removeTask(e){
   if(e.target.parentElement.classList.contains('delete')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLS(task){
    let taskValues;
    if(localStorage.getItem('tasks') === null){
        taskValues = [];
    } else {
        taskValues = JSON.parse(localStorage.getItem('tasks'));
    }

    taskValues.forEach(function(taskValue, index){
        if(task.textContent === taskValue){
            taskValues.splice(index, 1); 
        }
    });

    localStorage.setItem('tasks', JSON.stringify(taskValues));
}


function clearTasks(e){
    taskList.innerHTML = '';
    clearTaskFromLS();
}

function clearTaskFromLS(){
    localStorage.clear();
}

function filterTask(e){
    const text = e.target.value.toLowerCase();
   document.querySelectorAll('.list-group-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
            errorMsg = document.createElement('li');
            errorMsg.className = 'text-danger list-group-item';
            errorMsg.appendChild(document.createTextNode('No result found'));
            taskList.appendChild(errorMsg);
        }
    });
}