const taskContainer = document.querySelector(".task_container");


const globalStore = [];

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" id=${taskData.id}>
      <div class="card">
        <div class="card-header d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
          <button type="button" class="btn btn-outline-danger"><i class="fas fa-dumpster-fire"></i></button>
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
  cards.map((cardObject) =>
  {
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
   
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


