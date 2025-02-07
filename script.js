document.addEventListener("DOMContentLoaded", function() {
  let checklistData = null;
  let codeReader = null;

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

    // Kiểm tra cơ bản: nếu nhập đủ username và password, chuyển sang phần checklist
    if (usernameInput && passwordInput) {
      // Bạn có thể kiểm tra xác thực với dữ liệu trong checklistData.login nếu cần
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

  // Xử lý quét QR Code với ZXing Browser
  const startScanButton = document.getElementById("startScan");
  const stopScanButton = document.getElementById("stopScan");
  const qrScannerDiv = document.getElementById("qrScanner");
  const qrResult = document.getElementById("qrResult");

  startScanButton.addEventListener("click", function() {
    // Hiển thị khu vực quét
    qrScannerDiv.style.display = "block";
    // Khởi tạo đối tượng BrowserQRCodeReader nếu chưa có
    if (!codeReader) {
      codeReader = new ZXing.BrowserQRCodeReader();
    }
    // Sử dụng camera mặc định để quét QR Code và gán kết quả vào video element có id "video"
    codeReader.decodeOnceFromVideoDevice(undefined, 'video')
      .then(result => {
        console.log(result);
        qrResult.textContent = "Kết quả: " + result.text;
        // Sau khi quét thành công, có thể thực hiện kiểm tra hay xử lý kết quả (ví dụ: đối chiếu với dữ liệu checklist)
      })
      .catch(err => {
        console.error(err);
        qrResult.textContent = "Lỗi: " + err;
      });
  });

  stopScanButton.addEventListener("click", function() {
    if (codeReader) {
      codeReader.reset();
      qrScannerDiv.style.display = "none";
      qrResult.textContent = "";
    }
  });
});
