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


let userInput = document.querySelector("#userInput")
let addButton = document.querySelector("#add")
let tabs = document.querySelectorAll(".tabs div")
let taskList = []
let mode = 'all'
let filterList = []

const under_line = document.getElementById("under_line");
let tabLine = document.querySelectorAll(".tabs div")

addButton.addEventListener("click", addTask)

checkInput()
userInput.addEventListener("input", checkInput)

tabLine.forEach((menu) => {
    menu.addEventListener("click", (e) => moveTab(e));
})

function moveTab(e) {
    const selectedTab = document.querySelector('.selected');
    if (selectedTab) {
        selectedTab.classList.remove('selected');
    }

    under_line.style.left = e.currentTarget.offsetLeft + "px"
    under_line.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 10 + "px"
    under_line.style.width = e.currentTarget.offsetWidth + "px"

    e.currentTarget.classList.add('selected');
}

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event)
    })
}

function checkInput() {
    if (userInput.value == "") {
        addButton.disabled = true
    } else {
        addButton.disabled = false
    }
}

function addTask() {
    // let userInput_value = userInput.value
    let task = {
        id: newID(),
        taskContent: userInput.value,
        isComplete: false
    }
    taskList.push(task)
    userInput.value = ""
    console.log(taskList)
    render()
    checkInput()
}

function newID() {
    return Math.random().toString(36).substr(2, 16);
}

function render() {
    let resultHTML = '';
    List = []
    if (mode === 'all') {
        List = taskList
    } else if (mode === 'ongoing' || mode === 'done') {
        List = filterList
    }
    for (let i = 0; i < List.length; i++) {         // 아이템 추가 코드

        if (List[i].isComplete == true) {
            resultHTML += `
            <div class="tasks">
            <div class="content task-done">${List[i].taskContent}</div>
            <div>
                <button onclick="toggle('${List[i].id}')"><img src="./image/done_box.png"></button>            <!--클릭되는 아이디를 확인하기 위해 id값 넘기기-->
                <button onclick="deleteTask('${List[i].id}')"><img src="./image/delete.png"></button>
            </div>
        </div>`
        } else {
            resultHTML += `
            <div class="tasks">
            <div class="content">${List[i].taskContent}</div>
            <div>
                <button onclick="toggle('${List[i].id}')"><img src="./image/going_box.png"></button>            <!--클릭되는 아이디를 확인하기 위해 id값 넘기기-->
                <button onclick="deleteTask('${List[i].id}')"><img src="./image/delete.png"></button>
            </div>
        </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML
}


function toggle(id) {
    for (let i of taskList) {
        if (i.id == id) {
            i.isComplete = !i.isComplete
            break;          // for 문 종료
        }
    }
    filter()
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1)
            break;
        }
    }
    filter()
}


function filter(event) {

    if (event) {
        mode = event.target.id
    }

    filterList = []

    if (mode == 'all') {
        render()        // 전체 리스트 출력
    } else if (mode == 'ongoing') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i])
            }
        }
        render()
    } else if (mode == 'done') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

userInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        addButton.click()
    }
})
