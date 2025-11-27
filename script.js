// ===================================
// BÀI 1: CAROUSEL [cite: 3]
// ===================================

let images = [
    "https://picsum.photos/id/1015/600/350",
    "https://picsum.photos/id/1025/600/350",
    "https://picsum.photos/id/1035/600/350",
    "https://picsum.photos/id/1045/600/350",
    "https://picsum.photos/id/1055/600/350",
    "https://picsum.photos/id/1065/600/350"
]; // Ít nhất 6 hình [cite: 3]
let index = 0;

function showSlide() {
    let slide = document.getElementById("slide");
    if (!slide) return;
    slide.src = images[index];
}

function nextSlide() {
    // Logic tư duy: Xử lý index để tránh out-of-bound (vượt quá giới hạn mảng) [cite: 6]
    // Sử dụng toán tử modulo (%) để index tự động quay về 0 khi đạt đến độ dài mảng.
    // Tối ưu performance bằng cách chỉ cập nhật thuộc tính 'src' của phần tử DOM đã có[cite: 6].
    index = (index + 1) % images.length;
    showSlide();
}

function prevSlide() {
    // Logic tư duy: Xử lý index để tránh out-of-bound khi lùi [cite: 6]
    // (index - 1) có thể ra số âm. Thêm images.length vào trước khi modulo (%)
    // đảm bảo kết quả luôn là số dương và nằm trong giới hạn [0, images.length - 1].
    index = (index - 1 + images.length) % images.length;
    showSlide();
}

// Tự động chuyển slide sau 3 giây [cite: 5]
if (document.getElementById("slide")) {
    showSlide(); // Hiển thị slide ban đầu
    setInterval(nextSlide, 3000);
}

// ===================================
// BÀI 2: TODO LIST [cite: 7]
// ===================================

// Khởi tạo mảng tasks và tải từ LocalStorage [cite: 8]
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    let list = document.getElementById("todoList");
    if (!list) return;

    // Logic tư duy: Xử lý mảng state và render lại DOM hiệu quả [cite: 9]
    // Cách 1 (Sử dụng innerHTML): Xóa toàn bộ nội dung cũ và chèn HTML mới.
    // Ưu điểm: Đơn giản, dễ code. Nhược điểm: Kém hiệu quả hơn khi danh sách rất lớn.
    list.innerHTML = "";
    tasks.forEach((task, i) => {
        // Hiện tại chỉ yêu cầu nút xóa. Nút edit có thể được thêm vào tương lai.
        list.innerHTML += `
            <li>
                <span>${task}</span>
                <button onclick="deleteTask(${i})">Xóa</button>
            </li>
        `;
    });
    
    // *Lưu ý: Để tối ưu hơn (cho bài tập thực tế), nên dùng document.createElement()
    // và DocumentFragment để tránh thao tác DOM trực tiếp nhiều lần (Reflow/Repaint).
}

function addTask() {
    let input = document.getElementById("taskInput");
    if (!input || input.value.trim() === "") return;

    tasks.push(input.value.trim()); // Thêm task vào mảng state
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Lưu vào LocalStorage
    input.value = "";
    renderTasks(); // Render lại DOM [cite: 9]
}

function deleteTask(i) {
    tasks.splice(i, 1); // Cập nhật mảng state
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Lưu vào LocalStorage
    renderTasks(); // Render lại DOM [cite: 9]
}

// Chỉ chạy renderTasks nếu trang baitap02.html đang được tải
if (document.getElementById("todoList")) {
    renderTasks();
}

// ===================================
// BÀI 3: GAME ĐOÁN SỐ [cite: 10]
// ===================================

let number; // Số ngẫu nhiên cần đoán
let tries;  // Số lần thử

function initGame() {
    // Logic tư duy: Cách generate random [cite: 13]
    // Math.random() cho ra số [0, 1). Nhân với 100 cho ra [0, 100).
    // Math.floor() làm tròn xuống cho ra [0, 99]. Cộng 1 cho ra [1, 100].
    number = Math.floor(Math.random() * 100) + 1;
    tries = 0;

    let result = document.getElementById("result");
    let count = document.getElementById("count");
    let input = document.getElementById("guess");
    let confetti = document.getElementById("confetti");

    // Reset giao diện
    if (result) result.innerText = "Hãy bắt đầu đoán!";
    if (count) count.innerText = "Số lần đoán: 0";
    if (input) {
        input.value = "";
        input.disabled = false;
    }
    if (confetti) confetti.classList.remove("show");
}

function check() {
    let input = document.getElementById("guess");
    let result = document.getElementById("result");
    let count = document.getElementById("count");
    let confetti = document.getElementById("confetti");

    if (!input || !result || !count) return;

    let guess = Number(input.value);

    // Logic tư duy: Xử lý input để tránh lỗi [cite: 13]
    if (input.value.trim() === "" || isNaN(guess) || guess < 1 || guess > 100) {
        result.innerText = "Vui lòng nhập số hợp lệ từ 1 đến 100!";
        return;
    }

    tries++; // Đếm số lần thử [cite: 11]

    if (guess === number) {
        result.innerText = " 🎉 Chúc mừng! Bạn đã đoán đúng!";
        confetti.classList.add("show"); // Hiển thị confetti animation [cite: 12]
        input.disabled = true; // Ngăn người dùng đoán tiếp khi đã thắng
        // Thêm nút chơi lại nếu muốn
        // result.innerHTML += '<button onclick="initGame()">Chơi lại</button>'; 
    }
    else if (guess > number) {
        result.innerText = "Quá cao!"; // So sánh [cite: 11]
    }
    else {
        result.innerText = "Quá thấp!"; // So sánh [cite: 11]
    }

    count.innerText = "Số lần đoán: " + tries;
}

// Khởi tạo game khi trang đoán số được tải
if (document.getElementById("guess")) {
    initGame();
}
