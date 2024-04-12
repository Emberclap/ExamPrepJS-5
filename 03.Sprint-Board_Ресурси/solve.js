
function attachEvents() {
    const baseURL = 'http://localhost:3030/jsonstore/tasks'
    const loadBtnElement = document.getElementById('load-board-btn')
    const createTaskBtnElement = document.getElementById('create-task-btn');
    const titleElement = document.getElementById('title')
    const descriptionElement = document.getElementById('description')

    const statusToTextContent = {
        'ToDo': 'Move to In Progress',
        'In Progress': 'Move to Code Review',
        'Code Review': 'Move to Done',
        'Done': 'Close',
    };
    const statusToElement = {
        'ToDo': document.querySelector('#todo-section ul'),
        'In Progress': document.querySelector('#in-progress-section ul'),
        'Code Review': document.querySelector('#code-review-section ul'),
        'Done': document.querySelector('#done-section ul'),
    };
    
    const boardLoader = async () => {
        const response = await fetch(baseURL);
        const tasks = await response.json();


        statusToElement['ToDo'].innerHTML = '';
        statusToElement['In Progress'].innerHTML = '';
        statusToElement['Code Review'].innerHTML = '';
        statusToElement['Done'].innerHTML = '';
        for (const task of Object.values(tasks)) {

            const title = task.title;
            const description = task.description;
            const status = task.status;
            const taskID = task._id;

            const h3Element = document.createElement('h3');
            h3Element.textContent = title;

            const PElement = document.createElement('p');
            PElement.textContent = description;

            const newBtnElement = document.createElement('button');
            newBtnElement.textContent = statusToTextContent[status];
            if (newBtnElement.textContent === 'Close') {
                newBtnElement.addEventListener('click', async () => {
                    fetch(`${baseURL}/${task._id}`, {
                        method: 'DELETE'
                    });
                    boardLoader()
                })
            }
            newBtnElement.addEventListener('click', () => {
                moveToNextStep(title, description, status, taskID)

            })
            const liElement = document.createElement('li');
            liElement.classList.add('task')
            liElement.appendChild(h3Element);
            liElement.appendChild(PElement);
            liElement.appendChild(newBtnElement);

            statusToElement[status].appendChild(liElement);
            titleElement.value = '';
            descriptionElement.value = '';
        }
    }

    loadBtnElement.addEventListener('click', boardLoader)

    
    createTaskBtnElement.addEventListener('click', async () => {
        if (titleElement.value === ''  || descriptionElement.value === '') {
            return;
        }
        
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: titleElement.value,
                description: descriptionElement.value,
                status: 'ToDo',
            })
        })

        if (!response.ok) {
            return
        }
        titleElement.value = '';
        descriptionElement.value = '';

        boardLoader()
    })
    function moveToNextStep(title, description, status, taskID) {
        const response = fetch(`${baseURL}/${taskID} `, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                status: statusToNextStepStatus[status],
                _id: taskID,
            })
        })
        boardLoader()
        if (!response.ok) {
            return;
        }

    }

    const statusToNextStepStatus = {
        'ToDo': 'In Progress',
        'In Progress': 'Code Review',
        'Code Review': 'Done',
        'Done': 'Done',
    };
}

attachEvents();