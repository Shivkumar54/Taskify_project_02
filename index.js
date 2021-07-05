const taskContainer = document.querySelector(".task_container");


let globalStore = [];

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" >
      <div class="card">
        <div class="card-header d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-outline-success" id=${taskData.id} onclick="editCard.apply(this, arguments)">
          <i class="fas fa-pencil-alt" id=${taskData.id} onclick="editCard.apply(this, arguments)"></i></button>
          
          
          <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
          <i class="fas fa-dumpster-fire" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
        </div>
        <img src="${taskData.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${taskData.tastTitle}</h5>
          <p class="card-text">${taskData.taskDescription}</p>
          <a href="#" class="btn btn-primary">${taskData.taskType}</a>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
        </div>
      </div>
    </div>
`;

const loadInitialCardData = () => {

  const getCardData = localStorage.getItem("taskify");


  const {cards} = JSON.parse(getCardData);
  cards.map((cardObject) =>{
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
   
    globalStore.push(cardObject);
  })
};

const saveChanges = () =>{
    const taskData = {
        id: `${(Date.now)}`, //unique number for id
        imageUrl: document.getElementById("imageurl").value,
        tastTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));
   
    globalStore.push(taskData);

    localStorage.setItem("taskify", JSON.stringify({cards:globalStore}));
};

// delete card
const deleteCard = (event) => {

  event = window.event;

  //extract the id

  const targetID = event.target.id;
  const tagname = event.target.tagName;

  // we have to match

  globalStore  = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("taskify", JSON.stringify({cards:globalStore}));
  
  // contact parent to remove
  if(tagname ==="BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode)
  }
  else
  {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }


  // taskContainer.removeChild(document.getElementById(targetID));
};


const editCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if(tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  }else{
    parentElement = event.target.parentNode.parentNode.parentNode;
  }


  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];
  //set attributes to chnage names

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.innerHTML="Save Changes";
}