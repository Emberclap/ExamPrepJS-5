window.addEventListener('load', solve);

function solve() {
    const [taskIdElement, titleElement, pointsElement, assigneeElement, createBtnElement, deleteTaskBtnElement]
        = document.querySelectorAll('input')
    const descriptionElement = document.getElementById('description');
    const labelElement = document.getElementById('label')
    const taskSectionElement = document.getElementById('tasks-section');
    const totalPointsElement = document.getElementById('total-sprint-points');

    let idCounter = 0;
    let totalPts = 0;
    let tasks = {};


    createBtnElement.addEventListener('click', () => {
        if (titleElement.value === ''
            || descriptionElement.value === ''
            || pointsElement.value === ''
            || assigneeElement.value === '') {
            return;
        }
        const title = titleElement.value;
        const description = descriptionElement.value
        const points = pointsElement.value
        const assignee = assigneeElement.value
        const label = labelElement.value

        totalPts += Number(points)
        idCounter++;

        let icon;
        let labelClass = '';

        if (labelElement.value === "Feature") {
            labelClass = 'feature'
            icon = '<i>&#8865</i>'
        } else if (labelElement.value === "Low Priority Bug") {
            labelClass = 'low-priority'
            icon = '<i>&#9737</i>';
        } else {
            labelClass = 'high-priority'
            icon = '<i>&#9888</i>';
        }
        const taskId = `task-${Object.keys(tasks).length + 1}`;


        const articleElement = document.createElement('article');
        articleElement.setAttribute('id', `${taskId}`)
        tasks[title] = taskId;
        console.log(tasks);
        articleElement.classList.add('task-card');
        articleElement.innerHTML = `
            <div class="task-card-label ${labelClass}">${labelElement.value} ${icon}</div>
            <h3 class="task-card-title">${titleElement.value}</h3>
            <p class="task-card-description">${descriptionElement.value}</p>
            <div class="task-card-points">Estimated at ${pointsElement.value} pts</div>
            <div class="task-card-assignee">Assigned to: ${assigneeElement.value}</div>`


        const divElement = document.createElement('div');
        divElement.classList.add('task-card-actions')
        const delBtnElement = document.createElement('button');
        delBtnElement.textContent = 'Delete'
        delBtnElement.addEventListener('click', () => {
            deleteButtonClicked(title, description, label, points, assignee)
            articleElement.remove()
        })
        divElement.appendChild(delBtnElement);
        articleElement.appendChild(divElement);
        taskSectionElement.appendChild(articleElement);
        totalPointsElement.textContent = `Total Points ${totalPts}pts`
        //clearInput()
    })

    function clearInput() {
        titleElement.value = '';
        descriptionElement.value = '';
        pointsElement.value = '';
        assigneeElement.value = '';
    }
    deleteTaskBtnElement.addEventListener('click', () => {
        titleElement.disabled = false;
        descriptionElement.disabled = false;
        labelElement.disabled = false;
        pointsElement.disabled = false;
        assigneeElement.disabled = false;
        totalPts -= Number(pointsElement.value);
        createBtnElement.disabled = false;
        deleteTaskBtnElement.disabled = true;
        totalPointsElement.textContent = `Total Points ${totalPts}pts`
        clearInput()

    })
    function deleteButtonClicked(title, description, label, points, assignee) {
        titleElement.value = title;
        descriptionElement.value = description;
        labelElement.value = label
        pointsElement.value = points;
        assigneeElement.value = assignee;

        titleElement.disabled = true;
        descriptionElement.disabled = true;
        labelElement.disabled = true;
        pointsElement.disabled = true;
        assigneeElement.disabled = true;

        createBtnElement.disabled = true;
        deleteTaskBtnElement.disabled = false;

        const forDelete = Object.keys(tasks).find(x => x.title = title)
        delete tasks[`${forDelete}`]
        
    }
    
}
function solve2() {
    const labelToIconMap = {
        'Feature': '&#8865;',
        'Low Priority Bug': '&#9737;',
        'High Priority Bug': '&#9888;',
    };
    const labelNameToClassMap = {
        'Feature': 'feature',
        'Low Priority Bug': 'low-priority',
        'High Priority Bug': 'high-priority',
    };
    const tasks = {};
    const inputDOMSelectors = {
        title: document.getElementById('title'),
        description: document.getElementById('description'),
        label: document.getElementById('label'),
        points: document.getElementById('points'),
        assignee: document.getElementById('assignee'),
    };

    const otherDOMSelectors = {
        createBtn: document.getElementById('create-task-btn'),
        deleteBtn: document.getElementById('delete-task-btn'),
        tasksSection: document.getElementById('tasks-section'),
        totalSprintPoints: document.getElementById('total-sprint-points')
    };

    otherDOMSelectors.createBtn.addEventListener('click', createTaskHandler);
    otherDOMSelectors.deleteBtn.addEventListener('click', deleteTaskHandler);

    function createTaskHandler() {
        const { title, description, label, points, assignee } = inputDOMSelectors;
        const hasInvalidInputValue = Object.values(inputDOMSelectors)
            .some((input) => input.value === '');
        if (hasInvalidInputValue) {
            return;
        }

        const taskId = `task-${Object.keys(tasks).length + 1}`;
        const article = createElement('article', null, otherDOMSelectors.tasksSection, ['task-card'], taskId);
        createElement('div', `${label.value} ${labelToIconMap[label.value]}`, article, ['task-card-label', labelNameToClassMap[label.value]], null, true);
        createElement('h3', `${title.value}`, article, ['task-card-title']);
        createElement('p', `${description.value}`, article, ['task-card-description']);
        createElement('div', `Estimated at ${points.value} pts`, article, ['task-card-points']);
        createElement('div', `Assigned to: ${assignee.value}`, article, ['task-card-assignee']);
        const taskCardActions = createElement('div', '', article, ['task-card-actions']);
        const deleteBtn = createElement('button', 'Delete', taskCardActions);
        deleteBtn.addEventListener('click', loadDeleteForm);
        tasks[taskId] = {
            title: title.value,
            description: description.value,
            label: label.value,
            points: points.value,
            assignee: assignee.value,
        };
        updateTotalPoints();
        clearInputFields();
    }

    function loadDeleteForm(e) {
        const taskId = e.target.parentNode.parentNode.getAttribute('id');
        document.getElementById('task-id').value = taskId;
        for (const key in inputDOMSelectors) {
            inputDOMSelectors[key].value = tasks[taskId][key];
        }
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.setAttribute('disabled', true);
            })
        otherDOMSelectors.createBtn.setAttribute('disabled', true);
        otherDOMSelectors.deleteBtn.removeAttribute('disabled');
    }

    function deleteTaskHandler() {
        const taskId = document.getElementById('task-id').value;
        const taskToRemove = document.getElementById(taskId);
        taskToRemove.remove();
        delete tasks[taskId];
        otherDOMSelectors.deleteBtn.setAttribute('disabled', true);
        otherDOMSelectors.createBtn.removeAttribute('disabled');
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.removeAttribute('disabled');
            });
        clearInputFields();
        updateTotalPoints();
    }

    function clearInputFields() {
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.value = '';
            });
    }

    function updateTotalPoints() {
        const totalSprintPoints = Object.values(tasks).map((t) => Number(t.points)).reduce((a, b) => a + b, 0);
        otherDOMSelectors.totalSprintPoints.textContent = `Total Points ${totalSprintPoints}pts`;
    }

    function createElement(type, content, parentNode, classes, id, useInnerHtml) {
        const element = document.createElement(type);

        if (content && useInnerHtml) {
            element.innerHTML = content;
        } else {
            if (content && type !== 'input') {
                element.textContent = content;
            }

            if (content && type === 'input') {
                element.value = content;
            }
        }

        if (classes && classes.length > 0) {
            element.classList.add(...classes);
        }

        if (id) {
            element.setAttribute('id', id);
        }

        if (parentNode) {
            parentNode.appendChild(element);
        }

        return element;
    }
}
