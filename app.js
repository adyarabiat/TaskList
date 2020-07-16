// Define our UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// To run the events
loadEventListteners();

function loadEventListteners() {
  // Add task Event
  form.addEventListener("submit", addTask);

  // Remove task
  taskList.addEventListener("click", removeTask);

  //  Clear btn
  clearBtn.addEventListener("click", clearTasks);

  //  Filter Task
  filter.addEventListener("keyup", filterTasks);

  // Update the UI with the storage values:
  document.addEventListener("DOMContentLoaded", getTasks);
}

// Add Task

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  // 1
  // Create  li elment
  const li = document.createElement("li");
  // Create Class name
  li.className = "collection-item";
  // Add to it the value that we will wirte in the text
  li.appendChild(document.createTextNode(taskInput.value));

  // 2
  // Now here we are going to add the x elment and the style for it
  const link = document.createElement("a");
  // We give it a class
  link.className = "delete-item secondary-content";
  // We give it the icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Then after we did it we append it to the li
  li.appendChild(link);

  // 3
  // Then here we append the Li to the place where it going to added
  taskList.appendChild(li);

  // Added One here To store the tasks:
  storeTasks(taskInput.value);

  // 4
  // Clear the text area after we wrote the task
  taskInput.value = "";

  e.preventDefault();
}

function removeTask(e) {
  if (e.target.classList.contains("fa-remove")) {
    if (confirm("Are You Sure ?")) {
      e.target.parentElement.parentElement.remove();
    }
    removeItemsFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function clearTasks() {
  if (confirm("Are you sure that you want to clear the tasks?")) {
    taskList.innerHTML = "";

    clearTaskFromLocalStorage();
  }
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function storeTasks(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (tasks) {
    // 1
    // Create  li elment
    const li = document.createElement("li");
    // Create Class name
    li.className = "collection-item";
    // Add to it the value that we will wirte in the text
    li.appendChild(document.createTextNode(tasks));

    // 2
    // Now here we are going to add the x elment and the style for it
    const link = document.createElement("a");
    // We give it a class
    link.className = "delete-item secondary-content";
    // We give it the icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Then after we did it we append it to the li
    li.appendChild(link);
    // 3
    // Then here we append the Li to the place where it going to added
    taskList.appendChild(li);

    // 4
    // Clear the text area after we wrote the task
    taskInput.value = "";
  });
}

function removeItemsFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTaskFromLocalStorage() {
  localStorage.clear();
}
