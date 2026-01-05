let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = () => {
    displayTasks();
};

document.getElementById("task").addEventListener("keypress", (event) => {
    if (event.key === "Enter") addTask();
});
document.getElementById("dueDate").addEventListener("keypress", (event) => {
    if (event.key === "Enter") addTask();
});

document.querySelector(".js-addtask-button").addEventListener("click", addTask);

function addTask() {
    let taskText = document.getElementById("task").value;
    let dueDate = document.getElementById("dueDate").value;

    if (taskText === "") {
        alert("Please enter a Task!");
        return;
    } else if (dueDate === "") {
        dueDate = new Date().toISOString().split("T")[0];
    }

    tasks.push({ text: taskText, date: dueDate });
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    // 👇 Save in Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

    document.getElementById("task").value = "";
    document.getElementById("dueDate").value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);

    // 👇 Update Local Storage after delete
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    // Group tasks by date
    let grouped = {};
    tasks.forEach(task => {
        if (!grouped[task.date]) grouped[task.date] = [];
        grouped[task.date].push(task);
    });

    // Sort dates ascending
    let sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));

    // Display date headings + tasks under each date
    sortedDates.forEach(date => {
        let dateHeader = document.createElement("h4");
        dateHeader.textContent = `📅 ${date}`;
        list.appendChild(dateHeader);

        grouped[date].forEach((task, index) => {
            let li = document.createElement("li");
            li.innerHTML = `
        <div>
          <strong>${task.text}</strong>
        </div>
        <button class="delete" onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
      `;
            list.appendChild(li);
        });
    });
}