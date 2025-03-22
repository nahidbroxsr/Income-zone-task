const tasks = [
    { id: 1, text: "Complete Task 1", img: "IMG_20250323_043838_834.png", link: "https://t.me/Earning_with_Nahid" },
    { id: 2, text: "Complete Task 2", img: "IMG_20250323_043838_834.png", link: "https://example.com/task2" },
    { id: 3, text: "Complete Task 3", img: "IMG_20250323_043838_834.png", link: "https://example.com/task3" },
    { id: 4, text: "Complete Task 4", img: "IMG_20250323_043838_834.png", link: "https://example.com/task4" }
];

const taskList = document.getElementById("task-list");

function saveTaskCompletion(id) {
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};
    completedTasks[id] = Date.now();
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function resetOldTasks() {
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};
    let now = Date.now();

    for (let id in completedTasks) {
        if (now - completedTasks[id] > 86400000) { // ২৪ ঘণ্টা পরে রিসেট
            delete completedTasks[id];
        }
    }
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function loadTasks() {
    taskList.innerHTML = "";
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};

    tasks.forEach(task => {
        let taskBox = document.createElement("div");
        taskBox.classList.add("task-box");

        let img = document.createElement("img");
        img.src = task.img;

        let taskContent = document.createElement("div");
        taskContent.classList.add("task-content");
        taskContent.innerText = task.text;

        let button = document.createElement("button");
        button.classList.add("get-task");
        button.innerText = completedTasks[task.id] ? "Completed" : "Get Task";

        button.addEventListener("click", () => {
            if (!completedTasks[task.id]) {
                window.location.href = task.link; // লিংকে যাওয়া
                button.innerText = "Loading...";
                button.classList.add("loading");

                setTimeout(() => {
                    saveTaskCompletion(task.id);
                    button.classList.remove("loading");
                    button.innerText = "Completed";
                }, 3000); // ৩ সেকেন্ড লোডিং
            }
        });

        taskBox.appendChild(img);
        taskBox.appendChild(taskContent);
        taskBox.appendChild(button);
        taskList.appendChild(taskBox);
    });
}

// স্ক্রল বন্ধ, জুম বন্ধ
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflow = 'hidden';
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
});

// ২৪ ঘণ্টার জন্য সেভ এবং রিসেট করা
resetOldTasks();
loadTasks();
