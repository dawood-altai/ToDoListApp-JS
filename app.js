const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = () => {
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
    const task = `
        <div class="task">
            <input type="checkbox" class="task-check">
            <span class="taskName">${taskName}</span>
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-delete-left"></i></button>
        </div>
    `;
    tasksContainer.insertAdjacentHTML("beforeend", task);

    taskCount++;
    displayCount();

    newTaskInput.value = "";

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount--;
            displayCount();
        };
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            const targetElement = e.target.closest(".task");
            newTaskInput.value = targetElement.querySelector(".taskName").textContent;
            targetElement.remove();
            taskCount--;
            displayCount();
        };
    });
};

tasksContainer.addEventListener("change", (e) => {
    if (e.target.classList.contains("task-check")) {
        const taskElement = e.target.closest(".task");
        taskElement.querySelector(".taskName").classList.toggle("completed");

        if (e.target.checked) {
            taskCount--;
        } else {
            taskCount++;
        }
        displayCount();
    }
});

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount();
    newTaskInput.value = "";
};
