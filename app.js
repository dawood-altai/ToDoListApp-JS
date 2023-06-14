const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const updateTaskCount = (change) => {
    taskCount += change;
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }
    const task = `<div class="task">
<input type="checkbox" class="task-check">
<span class="taskName">${taskName}</span>

<button class="edit">    <i class="fa-solid fa-pen-to-square"></i> </button>
<button class="delete">  <i class="fa-solid fa-delete-left"></i>  </button>

</div>`;
    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button => {
        button.onclick = () => {
            button.parentNode.remove();
            updateTaskCount(-1);
        };
    });

    updateTaskCount(1);
};

addBtn.addEventListener("click", addTask);