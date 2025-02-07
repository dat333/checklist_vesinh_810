document.addEventListener("DOMContentLoaded", function() {
    let checklistData = null;
  
    // Lấy dữ liệu từ file checklist.json bằng fetch API
    fetch("checklist.json")
      .then(response => response.json())
      .then(data => {
        checklistData = data;
      })
      .catch(error => {
        console.error("Lỗi khi tải dữ liệu checklist:", error);
      });
  
    // Xử lý đăng nhập
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const usernameInput = document.getElementById("username").value;
      const passwordInput = document.getElementById("password").value;
  
      // Kiểm tra cơ bản: nếu nhập đủ username và password, chuyển qua phần checklist
      if (usernameInput && passwordInput) {
        // Nếu cần, bạn có thể kiểm tra xác thực với dữ liệu trong checklistData.login
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("checklistSection").style.display = "block";
        populateChecklist();
      }
    });
  
    // Hàm hiển thị checklist lên từng tab
    function populateChecklist() {
      if (!checklistData) return;
  
      // Hiển thị checklist cho Kho chính
      const mainWarehouseList = document.getElementById("mainWarehouseList");
      checklistData.checklist.mainWarehouse.forEach(function(item) {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = item;
        mainWarehouseList.appendChild(li);
      });
  
      // Hiển thị checklist cho Khuôn viên
      const campusList = document.getElementById("campusList");
      checklistData.checklist.campus.forEach(function(item) {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = item;
        campusList.appendChild(li);
      });
  
      // Hiển thị checklist cho Kho đông
      const coldStorageList = document.getElementById("coldStorageList");
      checklistData.checklist.coldStorage.forEach(function(item) {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = item;
        coldStorageList.appendChild(li);
      });
    }
  });
  