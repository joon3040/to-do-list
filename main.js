//유저가 값을 입력한다.
//+ 버튼을 클릭하면, 할일이 추가된다.
//delete 버튼을 누르면 할일이 삭제된다.
//check 버튼을 누르면 할일이 끝나면서 밑줄이 생긴다.
//1. check 버튼을 클릭하는 순간 true -> false
//2. true이면 끝난 걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난 걸로 간주하고 그대로
//진행 중, 끝남 탭을 누르면 언더바가 이동한다.
//끝남 탭은 끝난 아이템만
//진행 중 탭은 진행중인 아이템만
//전체 탭을 누르면 다시 전체 아이템으로 돌아옴

let taskList = []
let taskStatus = "all"

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let underLine = document.getElementById("under-line")
let tabs = document.querySelectorAll(".task-tabs div")

for (let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event) {filter(event)})
}

addButton.addEventListener("click", addTask)
document.addEventListener("keypress", handleEnterKeyPress)

function randomIDGenerate(){
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
}

function addTask(){
    let taskContent = taskInput.value

    if (taskInput.value == ""){
        return;
    }

    let task = {
        id: randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete: false
    }

    taskList.push(task)
    render(taskStatus)

    taskInput.value = ""
}

function handleEnterKeyPress(event){
    if (event.which === 13 || event.keyCode === 13){
        if (!addButton.disabled){
            addTask()
        }
    }
}

function render(status){
    taskStatus = status

    let completeCount = 0
    let resultHTML = ""

    for (let i = 0; i < taskList.length; i++){
        if ((taskList[i].isComplete == true)){
            
            if (status == "all"|| status == "finish"){
                resultHTML += `
                <div  class="task task-area-done">
                    <div class="task-done">                    
                        ${taskList[i].taskContent}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${taskList[i].id}')" class="btn btn-light"><i class="fa-solid fa-play"></i></button>
                        <button onclick="deleteTask('${taskList[i].id}')" id="delete-button" class="btn btn-light"><i class="fa-solid fa-stop"></i></button>
                    </div>
                </div>
                `
            }

            completeCount++
        }
        else if ((taskList[i].isComplete != true) && (status == "all"|| status == "ongoing")) {
            resultHTML += `
            <div class="task">
                <div>                    
                    ${taskList[i].taskContent}
                </div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')" class="btn btn-light"><i class="fa-solid fa-pause"></i></button>
                    <button onclick="deleteTask('${taskList[i].id}')" id="delete-button" class="btn btn-light"><i class="fa-solid fa-stop"></i></button>
                </div>
            </div>
            `
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML
    
}

function toggleComplete(id){
    for (let i = 0; i < taskList.length; i++){
        if (taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }

    render(taskStatus)
}

function deleteTask(id){
    for (let i = 0; i < taskList.length; i++){
        if (taskList[i].id == id){
            taskList.splice(i, 1)
            break;
        }
    }

    render(taskStatus)
}

function filter(event){
    if (event.target.id == "all"){
        underLine.style.left = "0px"
    }
    else if (event.target.id == "ongoing"){
        underLine.style.left = "75px"
    }
    else {
        underLine.style.left = "150px"
    }

    render(event.target.id)
}