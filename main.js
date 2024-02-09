//유저가 값을 입력한다
//+버튼을 클릭하면, 할일이 추가된다
//delete 버튼을 누르면 할 일이 삭제된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다 (아래 1~3번 순서대로)
//1. check 버튼을 클릭하는 순간 true인지 false인지 판별
//2. true이면 끝난 걸로 간주하고 밑줄 긋기
//3. false이면 안 끝난 걸로 간주하고 그대로 놔두기
//진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList=[]
let tabs = document.querySelectorAll(".task-tabs div")
let mode='all'
let filterList=[]

addButton.addEventListener("click", addTask)

for(let i=1;i<tabs.length;i++){
       tabs[i].addEventListener("click", function(event){filter(event)});
};
console.log(tabs);
function addTask(){
       let task = {
       id:randomIDGenerate(),
           taskContent: taskInput.value,
           isComplete:false
       }
       taskList.push(task)
       console.log(taskList)
       render();
}

function render(){
       //***개정사항
       let list=[]
       //1. 내가 선택한 탭에 따라서
       if(mode === "all"){
              list = taskList;
              // all taskList를 보여준다.
       }else if(mode === "ongoing" || mode === "done"){
              list = filterList;
              //ongoing, done일 경우 filter list를 보여준다.
       }
              
       //2. 리스트를 달리 보여준다
       // all인 경우 taskList를 보여준다.
       // ongoing, done일 경우 filterList를 보여준다.
       let resultHTML = "";
       for (let i = 0; i < list.length; i++){
              if(list[i].isComplete == true){
                     resultHTML+=`<div class="task">
                     <div class="task-done">${list[i].taskContent}</div>
                     <div>
                         <button onclick="toggleComplete('${list[i].id}')">Check</button>
                         <button onclick="deleteTask('${list[i].id}')">Delete</button>
                     </div>
                 </div>`;
              }else{ 
                     resultHTML += `<div class="task">
              <div>${list[i].taskContent}</div>
              <div>
                  <button onclick="toggleComplete('${list[i].id}')">Check</button>
                  <button onclick="deleteTask('${list[i].id}')">Delete</button>
              </div>
          </div>`;

              }
       }


       document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
       
       for(let i=0;i<taskList.length;i++){
            if(taskList[i].id == id){
                     taskList[i].isComplete = !taskList[i].isComplete;
                     break;
            }  
       }
       render();
       console.log(taskList);
}

function deleteTask(id){
       for(let i=0;i<taskList.length; i++){
              if(taskList[i].id == id){
                     taskList.splice(i,1)
                     break;
              }
       }
       render();
}
function filter(event){
       mode = event.target.id
       filterList = []
       if(mode === "all"){
              //전체 리스트를 보여준다
              render();
       }else if(mode === "ongoing"){
              //진행중인 아이템을 보여준다.
              //task.isComplete=false
              for(let i=0;i<taskList.length;i++){
                if(taskList[i].isComplete === false){
                  filterList.push(taskList[i])
                }
              }
              render();
              console.log("진행중", filterList)
       }else if(mode === "done"){
              //끝나는 케이스
              //task.isComplete=true
              for(let i=0;i<taskList.length;i++){
                     if(taskList[i].isComplete === true){
                       filterList.push(taskList[i])
                     }
       }
       render();
}
}
function randomIDGenerate(){
       return '_' + Math.random().toString(36).substr(2, 9);
}

