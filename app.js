const inputText = document.querySelector('#textInput');
const formButton = document.querySelector('#formButton');
const noTask = document.querySelector('#noResults');
const resultsList = document.querySelector('#resultsList');
const taskArrary = JSON.parse(localStorage.getItem('tasks')) || [];

function createTaskElement(taskElement){
    const liElement = document.createElement('li');
    const inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.setAttribute('data-id', taskElement.id);
    liElement.id = taskElement.id;
    inputElement.checked = taskElement.selected;
    inputElement.addEventListener('click', markElementAsDone);
    liElement.appendChild(inputElement);
    const textElement = document.createTextNode(taskElement.text);
    liElement.appendChild(textElement);

    if(taskElement.selected){
        liElement.classList.add('selected');
    }

    return liElement;
};

function markElementAsDone(event){
    const taskId = event.target.getAttribute('data-id');
    const liElement = document.getElementById(`${taskId}`);
    
    taskArrary.forEach(item => {
        if(item.id == taskId){
            item.selected = !item.selected;
        }
    })

    liElement.classList.toggle('selected')

    localStorage.setItem('tasks', JSON.stringify(taskArrary));
};

if (taskArrary.length > 0){
    hideNoResultsContainer();    
    drawList();
};

formButton.addEventListener("click", () => {
    saveTask();
});

function drawList(){
    resultsList.innerHTML = '';
        taskArrary.forEach( (task) => {
            const taskElement = createTaskElement(task);
            resultsList.appendChild(taskElement)
        });
};


function hideNoResultsContainer () {
    noTask.classList.remove('visible')
    noTask.classList.add('noVisible')
};

function showNoResultsContainer () {
    noTask.classList.add('visible')
    noTask.classList.remove('noVisible')
};

function saveTask () {
    const idValue = Math.floor(Math.random()*1000000000000000);
    const taskName =  {text: inputText.value, selected: false, id: idValue};

    if (!inputText.value.length > 0) {
        const textMessage = noTask.getElementsByTagName('span')[0];
        textMessage.innerText = 'Task cannot be empty!';
        showNoResultsContainer();
        return;
    };

    taskArrary.push(taskName);
    localStorage.setItem ('tasks', JSON.stringify(taskArrary));
    if (taskArrary.length > 0){
        inputText.value ='';
        hideNoResultsContainer();
        drawList();
    };
}
