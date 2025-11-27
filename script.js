// =======================
// BÀI 1 - CAROUSEL
// =======================
let images = [
  "https://picsum.photos/id/1015/600/350",
  "https://picsum.photos/id/1025/600/350",
  "https://picsum.photos/id/1035/600/350",
  "https://picsum.photos/id/1045/600/350",
  "https://picsum.photos/id/1055/600/350",
  "https://picsum.photos/id/1065/600/350"
];

let index = 0;

function showSlide() {
  let slide = document.getElementById("slide");
  if (!slide) return; 
  slide.src = images[index];
}

function nextSlide() {
  index = (index + 1) % images.length;
  showSlide();
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showSlide();
}

setInterval(nextSlide, 3000);

// =======================
// BÀI 2 - TODO LIST
// =======================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  let list = document.getElementById("todoList");
  if (!list) return;

  list.innerHTML = "";
  tasks.forEach((task, i) => {
    list.innerHTML += `
      <li>
        ${task}
        <button onclick="deleteTask(${i})">X</button>
      </li>
    `;
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (!input || input.value.trim() === "") return;

  tasks.push(input.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();

// =======================
// BÀI 3 - GAME ĐOÁN SỐ
// =======================
let number = Math.floor(Math.random() * 100) + 1;
let tries = 0;

function check() {
  let input = document.getElementById("guess");
  let result = document.getElementById("result");
  let count = document.getElementById("count");
  let confetti = document.getElementById("confetti");

  if (!input || !result || !count) return;

  let guess = Number(input.value);
  if (guess < 1 || guess > 100 || isNaN(guess)) {
    result.innerText = "Vui lòng nhập số từ 1 đến 100!";
    return;
  }

  tries++;

  if (guess === number) {
    result.innerText = "🎉 Chúc mừng! Bạn đã đoán đúng!";
    confetti.classList.add("show");
  } 
  else if (guess > number) {
    result.innerText = "Quá cao!";
  } 
  else {
    result.innerText = "Quá thấp!";
  }

  count.innerText = "Số lần đoán: " + tries;
}
