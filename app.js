let ul = document.querySelector('#list')
let addBtn = document.querySelector('#addBtn')
let input = document.querySelector('#taskInput')
let tasks = []

if (localStorage.getItem('htmls')) {
    tasks = JSON.parse(localStorage.getItem('htmls'))
}

tasks.forEach(task => {
    const cssClass = task.complete ? "item done" : "item"

    ul.insertAdjacentHTML("beforeend",
    `<li class="${cssClass}" id="${task.id}">${task.text}
        <div class="item__btns">
            <i class="fa-solid fa-trash" data-action="delete"></i>
            <i class="fa-solid fa-check" data-action="complete"></i>
        </div>
    </li>
    `)
});

ul.addEventListener('click', e=>{
    if (e.target.dataset.action == 'complete') checkTask(e.target)
    if (e.target.dataset.action == 'delete') removeTask(e.target)
    writeLS()
})

addBtn.addEventListener('click', e=> {
    const newItem = document.createElement('li')
    createItem(newItem)
    ul.append(newItem)
    input.value = ''
    writeLS()
})

input.addEventListener('keypress', e=> {
    if (e.key === 'Enter') {
        const newItem = document.createElement('li')
        createItem(newItem)
        ul.append(newItem)
        input.value = ''
        writeLS()
    }
})

function createItem(i) {
    if (input.value == '') return
    let itemsdiv = document.createElement('div')
    let deleteBtn = document.createElement('i')
    let checkBtn = document.createElement('i')

    i.classList.add('item')
    i.textContent = input.value

    itemsdiv.classList.add('item__btns')
    i.append(itemsdiv)

    deleteBtn.setAttribute("class","fa-solid fa-trash")
    deleteBtn.setAttribute('data-action','delete')
    itemsdiv.append(deleteBtn)

    checkBtn.setAttribute("class","fa-solid fa-check")
    checkBtn.setAttribute('data-action','complete')
    itemsdiv.append(checkBtn)

    let newTask = {
        id: Date.now(),
        text: input.value,
        complete: false
    }

    tasks.push(newTask)
    i.setAttribute('id', newTask.id)
}

function removeTask(i) {
    i.closest('li').remove()
    input.value = ''

    const index = tasks.findIndex((task) =>{
        return task.id == i.closest('li').id
    })

    tasks.splice(index, 1)
}

function checkTask(i) {
    i.closest('li').classList.toggle('done')
    let currentId = i.closest('li').id

    const index = tasks.findIndex((task)=>{
        return task.id == currentId
    })
    
    if (tasks[index].complete == false) tasks[index].complete = true
    else tasks[index].complete = false
}

function writeLS() {
    localStorage.setItem('htmls', JSON.stringify(tasks))
}