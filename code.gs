<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <?!= include('Styles'); ?>
  </head>
  <body>

  
  <button onclick="toggleSidebar()" id="sidebarToggleBtn" class="toggle-sidebar-floating-btn" title="Mở rộng menu">▶</button>
<!-- Thêm ID cho thanh Sidebar trái của bạn -->
<div class="sidebar" id="mySidebar">
      <div class="logo">⚡ Trader UI</div>
      <div class="menu-item active" id="menu-new-order" onclick="switchPage('new-order')">📦 Quản lý đơn</div>
      <!-- <div class="menu-item">➕ Tạo Order</div>
      <div class="menu-item">⏳ Đang hoạt động</div>-->
      <div class="menu-item" id="menu-bao-cao" onclick="switchPage('bao-cao')">📊 Báo cáo lợi nhuận</div>
      <div class="menu-item" id="menu-thanh-toan" onclick="switchPage('thanh-toan')">💳 Thanh toán</div>
      <!-- BỘ TÍNH NHANH GIÁ BÁN TRÊN SIDEBAR -->
      <div class="sidebar-calc-container" style="margin-top: 15px; padding: 0 15px;">
        <!-- Nút bấm Đóng/Mở bộ tính -->
        <div onclick="toggleCalcDropdown()" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: #1a1f2c; border: 1px solid #2d3748; border-radius: 4px; cursor: pointer; color: #a0aec0; font-size: 12px; font-weight: bold; transition: all 0.2s;">
          <span>🧮TÍNH GIÁ NHANH</span>
          <span id="calc-arrow-icon" style="transition: transform 0.2s;">▼</span>
        </div>

        <!-- Vùng nội dung các công thức (Mặc định mở ra, bấm sẽ thu gọn ẩn đi) -->
        <div id="calc-content-box" style="display: block; background: #11151e; border: 1px solid #2d3748; border-top: none; border-radius: 0 0 4px 4px; padding: 12px; font-family: sans-serif;">
          <!-- Ô nhập giá trị ban đầu -->
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 11px; color: #a0aec0; margin-bottom: 5px;">Nhập Giá Trị (USD):</label>
            <input type="number" id="quick-input-value" oninput="runQuickCalculator()" placeholder="Ví dụ: 0.25" style="width: 100%; padding: 6px 8px; background: #2d3748; border: 1px solid #4a5568; border-radius: 4px; color: #fff; font-size: 13px; box-sizing: border-box; outline: none;">
          </div>

          <!-- Kết quả Công thức 1: G2G Min -->
          <div style="margin-bottom: 10px; border-bottom: 1px dashed #2d3748; padding-bottom: 6px;">
            <div style="font-size: 11px; color: #e67e22; font-weight: bold; margin-bottom: 2px;">G2G Min</div>
            <div style="font-size: 12px; color: #fff; display: flex; justify-content: space-between;">
              <span style="color: #718096;">Kết quả:</span>
              <strong id="res-g2g-min" style="color: #4ade80;">0đ</strong>
            </div>
          </div>

          <!-- Kết quả Công thức 2: G2G Max -->
          <div style="margin-bottom: 10px; border-bottom: 1px dashed #2d3748; padding-bottom: 6px;">
            <div style="font-size: 11px; color: #3182ce; font-weight: bold; margin-bottom: 2px;">G2G Max</div>
            <div style="font-size: 12px; color: #fff; display: flex; justify-content: space-between;">
              <span style="color: #718096;">Kết quả:</span>
              <strong id="res-g2g-max" style="color: #4ade80;">0đ</strong>
            </div>
          </div>

          <!-- Kết quả Công thức 3: Odealo -->
          <div style="padding-bottom: 2px;">
            <div style="font-size: 11px; color: #ed64a6; font-weight: bold; margin-bottom: 2px;">Khác</div>
            <div style="font-size: 12px; color: #fff; display: flex; justify-content: space-between;">
              <span style="color: #718096;">Kết quả:</span>
              <strong id="res-odealo" style="color: #4ade80;">0đ</strong>
            </div>
          </div>
        </div>
      </div>

    </div>
   
    </div>
    <!-- CẤU TRÚC CHỨA CÁC TRANG DI ĐỘNG TRÊN DASHBOARD -->
    <div class="main-content">
             <!-- TRANG 1: GIAO DIỆN NEW ORDER (MẶC ĐỊNH HIỂN THỊ) -->
            <div id="page-new-order">
            <div class="header">
              <div>
                <h2>QUẢN LÝ ĐƠN</h2>
                <p style="color: #a0aec0; font-size: 13px;">Tổng quan về đơn hàng (Tự động cập nhật dữ liệu...)</p>
              </div>
              <div id="global-status" style="margin-right: auto; margin-left: 20px;"></div>
              <div>
                <button class="btn" onclick="openSettingModal()">+ ĐIỀU CHỈNH</button>
                <button class="btn" onclick="exportCurrentTableToExcel()" style="background-color: #4f46e5;">📊 Xuất Excel</button>
                <button class="btn btn-orange">CONVERSION</button>
              </div>
            </div>

            <div class="filter-container">
              <div class="filter-tab active" id="tab-all" onclick="changeFilter('all')">Tất cả đơn <span class="badge-count badge-purple" id="all-count">0</span></div>
              <div class="filter-tab" id="tab-new" onclick="changeFilter('new')">Đơn mới về 🔔 <span class="badge-count" id="p-count">0</span></div>
              <div class="filter-tab" id="tab-unconfirm" onclick="changeFilter('unconfirm')">Đơn chưa confirm ⏳ <span class="badge-count badge-orange" id="d-count">0</span></div>
              <div class="filter-tab" id="tab-confirm" onclick="changeFilter('confirm')">Đơn đã confirm 🚀<span class="badge-count badge-green" id="c-count">0</span></div>
            </div>
              <!-- CONTAINER TỔNG: Sắp xếp mọi thứ thành 1 hàng ngang cân đối, chuyên nghiệp -->
              
      <div class="dashboard-toolbar">
        
        <!-- KHỐI BÊN TRÁI: Các công cụ tìm kiếm và điều khiển -->
        <div class="toolbar-controls">
          <select id="month-select" class="select-inline" style="width: 130px; font-weight: bold; border-color: #4ade80;" onchange="onMonthChange()">
          <!-- Danh sách T7.2026, T6.2026... sẽ tự động đổ vào đây -->
          </select>
          <div class="search-box">
            <input type="text" id="search-input" oninput="handleFilterChange()" placeholder="🔍 Nhập mã đơn, tên game...">
          </div>
          
          <div class="date-box" style="display: flex; gap: 5px; align-items: center;">
            <input type="date" id="date-filter-from" onchange="handleFilterChange()" placeholder="Từ ngày">
            <span style="color: #666;">-</span>
            <input type="date" id="date-filter-to" onchange="handleFilterChange()" placeholder="Đến ngày">
            <button onclick="clearDateFilter()" class="btn-clear-date" title="Xóa ngày lọc">X</button>
          </div>

          
          <button onclick="refreshDataFromServer()" id="btn-refresh" class="btn-glow-refresh">🔄 Làm mới</button>
        </div>

            <!-- KHỐI BÊN PHẢI: Khung thống kê doanh thu phát sáng sáng tạo -->
              <div class="revenue-card-glow">
                <div class="stat-item">
                  <span class="stat-label">Tổng đơn</span>
                  <span id="sum-count" class="stat-value val-blue">0</span>
                </div>
                
                <div class="divider"></div>
                <!-- THÊM Ô USD NHẬN VÀO ĐÂY -->
                <div class="stat-item">
                  <span class="stat-label">USD Nhận</span>
                  <span id="sum-usd" class="stat-value val-cyan">$0.00</span>
                </div>
                
                <div class="divider"></div>
                <div class="stat-item">
                  <span class="stat-label">VND Nhận</span>
                  <span id="sum-vnd" class="stat-value val-orange">0đ</span>
                </div>
                
                <div class="divider"></div>
                <div class="stat-item">
                  <span class="stat-label">Tiền Lời</span>
                  <span id="sum-profit" class="stat-value val-green">0đ</span>
                </div>
              </div>


          </div>


            
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 70px;">Ngày</th>
                  <th style="width: 160px;">Game</th>
                  <th>Order No.</th>
                  <th style="width: 100px;">Xác nhận</th>
                  <th>Order Amount</th>
                  <th style="width: 110px;">Nghĩa/k</th>
                  <th style="width: 110px;">Nhân/k</th>
                  <th style="width: 110px;">Tax EU</th>
                  <th style="width: 120px;">VND Nhận</th>
                  <th style="width: 120px;">Tiền lời</th>
                  <th style="width: 100px;">Đơn mới</th>
                </tr>
              </thead>
              <tbody id="table-body">
                <tr>
                  <td id="error-display-cell" colspan="11" style="text-align: center; color: #a0aec0; padding: 40px; font-size: 15px;">Đang tải dữ liệu đơn hàng từ hệ thống...</td>
                </tr>
              </tbody>
              
            </table>
            <div id="pagination-container"></div>
            </div>

             <!-- TRANG 2: GIAO DIỆN BÁO CÁO LỢI NHUẬN (MẶC ĐỊNH ẨN) -->
            <div id="page-bao-cao" style="display: none;">
              <?!= include('BaoCao'); ?>
            </div>

            <!-- Trang 3: THANH TOÁN (Thêm mới phân vùng này) -->
            <div id="page-thanh-toan" style="display: none;">
              <?!= include('ThanhToan'); ?>
            </div>

    </div>

    <script>
      
      let CURRENT_SELECTED_SHEET = "";

      let currentPage = 1;      // Trang hiện tại đang xem (mặc định bắt đầu từ trang 1)
      const rowsPerPage = 20;   // Số lượng đơn hàng hiển thị tối đa trên mỗi trang

      let searchQuery = ''; 
      let filterDate = ''; // Lưu ngày chọn để lọc
      let isUserTyping = false;
      let globalGameList = []; 
      let globalOrdersData = [];    
       let currentFilterMode = 'all'; 
      // Đoạn code tự động lấy lại cấu hình bộ lọc cũ trước khi F5
        // --- THAY THẾ ĐOẠN KHỞI TẠO BỘ LỌC NGÀY MỚI KHI F5 ---
        const savedFilter = localStorage.getItem('saved_filter');
        const savedDateFrom = localStorage.getItem('saved_date_from') || '';
        const savedDateTo = localStorage.getItem('saved_date_to') || '';
        const savedSearch = localStorage.getItem('saved_search');

        if (savedFilter) currentFilterMode = savedFilter;
        if (savedSearch) searchQuery = savedSearch;

        // Đưa giá trị lên giao diện hiển thị tương ứng
        document.addEventListener("DOMContentLoaded", function() {
          if (document.getElementById('date-filter-from')) {
            document.getElementById('date-filter-from').value = savedDateFrom;
          }
          if (document.getElementById('date-filter-to')) {
            document.getElementById('date-filter-to').value = savedDateTo;
          }
          if (document.getElementById('search-input')) {
            document.getElementById('search-input').value = searchQuery;
          }
          
          // Đồng bộ class active cho các tab bộ lọc của bạn
          document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
          const activeTab = document.getElementById('tab-' + currentFilterMode);
          if (activeTab) activeTab.classList.add('active');
        });


        window.onload = function() {
      // 1. Gọi Server để lấy danh sách các tab tháng về
      google.script.run.withSuccessHandler(function(response) {
        let select = document.getElementById("month-select") || document.querySelector(".select-inline") || document.getElementsByTagName("select")[0];
        
        if (select && response.monthSheets && response.monthSheets.length > 0) {
          select.innerHTML = "";
          
          // Đổ danh sách T7.2026, T6.2026 vào menu chọn
          response.monthSheets.forEach(function(sheetName) {
            let option = document.createElement("option");
            option.value = sheetName;
            option.text = sheetName;
            select.appendChild(option);
          });
          
          // SỬA LỖI TẠI ĐÂY: Gán giá trị tháng mặc định từ Server trả về vào biến toàn cục
          CURRENT_SELECTED_SHEET = response.defaultSheet || response.monthSheets[0];
          select.value = CURRENT_SELECTED_SHEET;
        } else {
          // Fallback nếu không quét được tab nào, tự lấy tháng năm hiện tại
          let now = new Date();
          CURRENT_SELECTED_SHEET = "T" + (now.getMonth() + 1) + "." + now.getFullYear();
        }
        
        // 2. KÍCH HOẠT: Gọi hàm fetch dữ liệu sau khi biến CURRENT_SELECTED_SHEET đã có giá trị
        fetchData(); 
        
        if (typeof loadGameList === "function") loadGameList();
        
      }).getAllMonthSheets();
    };


      function onMonthChange() {
      let select = document.getElementById("month-select") || document.querySelector(".select-inline") || document.getElementsByTagName("select");
      if (select) {
        CURRENT_SELECTED_SHEET = select.value;
        currentPage = 1; // Reset về trang số 1 khi đổi tháng
        
        // Gọi chính xác hàm tải dữ liệu gốc của bạn để bốc dữ liệu mới từ Server về
        if (typeof fetchData === "function") {
          fetchData(); 
        } else if (typeof loadStockData === "function") {
          loadStockData();
        } else if (typeof refreshDataFromServer === "function") {
          refreshDataFromServer();
        }
      }
    }





      function fetchData() {
        if (isUserTyping) return;
        google.script.run
          .withSuccessHandler(processIncomingData)
          .withFailureHandler(showError)
          .getStockData(CURRENT_SELECTED_SHEET);
      }
      function changePage(pageNumber) {
  currentPage = pageNumber;
  renderTable(); // Vẽ lại bảng của trang mới chọn
  
  // Cuộn mượt màn hình lên đầu bảng dữ liệu để dễ theo dõi
  const tableContainer = document.querySelector('.table-container');
  
  if (tableContainer) tableContainer.scrollTop = 0;
}
      function processIncomingData(result) {
        const errorCell = document.getElementById('error-display-cell');
        
        if (result && result.error) {
          if (errorCell) {
            errorCell.style.color = "#f87171";
            errorCell.innerHTML = "❌ LỖI HỆ THỐNG: " + result.error;
          }
          return; 
        }
        
        globalOrdersData = (result && result.successData) ? result.successData : [];
        
        let countP = 0, countD = 0, countC = 0;
        globalOrdersData.forEach(item => {
          if (!item.statusP) countP++;
          if (item.statusP && !item.statusD) countD++;
          if (item.statusD) countC++;
        });
        
        if (document.getElementById('p-count')) document.getElementById('p-count').innerText = countP;
        if (document.getElementById('d-count')) document.getElementById('d-count').innerText = countD;
        if (document.getElementById('c-count')) document.getElementById('c-count').innerText = countC;
        
        let totalCount = globalOrdersData.length;
        if (document.getElementById('all-count')) document.getElementById('all-count').innerText = totalCount;
        renderTable();
      }

      function changeFilter(mode) {
        currentFilterMode = mode;
        currentPage = 1;
        localStorage.setItem('saved_filter', mode); // Lưu tab đang chọn
        document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
        document.getElementById('tab-' + mode).classList.add('active');
        renderTable();
      }

      function exportCurrentTableToExcel() {
  // 1. Thu thập dữ liệu các bộ lọc hiện tại trên UI của bạn
  const sheetName = typeof CURRENT_SELECTED_SHEET !== 'undefined' ? CURRENT_SELECTED_SHEET : 'Không rõ';
  const dateFrom = document.getElementById('date-filter-from') ? document.getElementById('date-filter-from').value : '';
  const dateTo = document.getElementById('date-filter-to') ? document.getElementById('date-filter-to').value : '';
  const searchInput = document.getElementById('search-input') ? document.getElementById('search-input').value.trim() : '';
  
  // 🛠 SỬA LỖI ĐẾM 0 ĐƠN: Tìm nút Tab đang được chọn (active) để lấy chính xác con số hiển thị ngầm
  let totalCount = 0;
  
  // Tìm thẻ Tab đang có màu xanh (active) trên giao diện của bạn
  const activeTabEl = document.querySelector('.filter-tab.active, [class*="active"]'); 
  if (activeTabEl) {
    // Trích xuất tất cả các con số có trong nội dung chữ của Tab đó (Ví dụ: "Tất cả đơn 27" -> bốc được số 27)
    const matches = activeTabEl.innerText.match(/\d+/);
    if (matches) {
      totalCount = parseInt(matches[0]) || 0;
    }
  }

  // Phương án dự phòng nếu không tìm thấy Tab Active: Quét tìm ô chứa số tổng doanh thu ở góc phải
  if (totalCount === 0) {
    const backupElements = document.querySelectorAll('div, span, p');
    for (let i = 0; i < backupElements.length; i++) {
      // Nếu có ô nào chứa chữ số nằm ngay dưới tiêu đề "TỔNG ĐƠN"
      if (backupElements[i].innerText === "TỔNG ĐƠN" && backupElements[i+1]) {
        totalCount = parseInt(backupElements[i+1].innerText) || 0;
        break;
      }
    }
  }

  // 2. Đổ tên Sheet lên bảng thông báo
  document.getElementById('modal-sheet-name').innerText = sheetName;

  // 3. Phân tích trạng thái Tab đang bấm chọn và hiển thị số lượng chuẩn
  let tabText = "";
  if (currentFilterMode === 'all') tabText = `Tất cả đơn (${totalCount} đơn)`;
  else if (currentFilterMode === 'new') tabText = `Đơn mới về (${totalCount} đơn)`;
  else if (currentFilterMode === 'unconfirm') tabText = `Đơn chưa confirm (${totalCount} đơn)`;
  else if (currentFilterMode === 'confirm') tabText = `Đơn đã confirm (${totalCount} đơn)`;
  document.getElementById('modal-tab-info').innerText = tabText;

  // 4. Kiểm tra bộ lọc khoảng ngày (Giữ nguyên đoạn xử lý ngày giờ phía dưới của bạn...)
  if (dateFrom || dateTo) {
    document.getElementById('modal-date-row').style.display = 'flex';
    let textFrom = dateFrom ? dateFrom.split('-').reverse().join('/') : 'Đầu tháng';
    let textTo = dateTo ? dateTo.split('-').reverse().join('/') : 'Cuối tháng';
    document.getElementById('modal-date-info').innerText = `${textFrom} - ${textTo}`;
  } else {
    document.getElementById('modal-date-row').style.display = 'none';
  }

  if (searchInput) {
    document.getElementById('modal-game-row').style.display = 'flex';
    document.getElementById('modal-game-info').innerText = searchInput;
  } else {
    document.getElementById('modal-game-row').style.display = 'none';
  }

  document.getElementById('export-modal').style.display = 'flex';
}



// Hàm đóng bảng cấu hình khi người dùng chọn bấm Hủy bỏ
function closeExportModal() {
  document.getElementById('export-modal').style.display = 'none';
}

// Hàm thực thi chính thức kích hoạt gửi lệnh lên Google Server khi người dùng bấm Xuất Excel
function confirmAndExecuteExport() {
  closeExportModal(); // Ẩn bảng cấu hình đi trước khi tải file

  const dateFrom = document.getElementById('date-filter-from') ? document.getElementById('date-filter-from').value : '';
  const dateTo = document.getElementById('date-filter-to') ? document.getElementById('date-filter-to').value : '';
  const searchText = document.getElementById('search-input') ? document.getElementById('search-input').value : '';
  
  // Đổi trạng thái nút bấm chính ngoài Dashboard để thông báo đang xử lý
  const btn = document.querySelector('button[onclick="exportCurrentTableToExcel()"]');
  const originalText = btn ? btn.innerHTML : "📊 Xuất Excel";
  if (btn) btn.innerHTML = "⏳ Đang xuất...";

  google.script.run
    .withSuccessHandler(function(base64Data) {
      if (btn) btn.innerHTML = originalText;
      if (!base64Data) {
        alert("Không có dữ liệu đơn hàng nào thỏa mãn để xuất file!");
        return;
      }

      const link = document.createElement('a');
      link.href = "data:text/csv;charset=utf-8;base64," + base64Data;
      
      let fileName = "Bao_Cao_Don_Hang";
      if (dateFrom || dateTo) {
        fileName += `_Tu_${dateFrom || 'dau'}_Den_${dateTo || 'nay'}`;
      }
      fileName += ".csv";
      
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .withFailureHandler(function(err) {
      if (btn) btn.innerHTML = originalText;
      alert("Lỗi xuất file: " + err.message);
    })
    .generateExcelBase64(CURRENT_SELECTED_SHEET, dateFrom, dateTo, searchText, currentFilterMode);
}



      function renderTable() {
  if (isUserTyping) return;
  const tbody = document.getElementById('table-body');
  if (!tbody) return;

  if (globalOrdersData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11" style="text-align:center; padding: 30px; color:#a0aec0;">Không có dữ liệu đơn hàng hoặc Sheet rỗng</td></tr>';
    return;
  }

  let filteredData = [];
  
  // 1. LẤY GIÁ TRỊ TỪ 2 Ô LỊCH LỌC KHOẢNG NGÀY MỚI
  let dateFrom = document.getElementById('date-filter-from') ? document.getElementById('date-filter-from').value : '';
  let dateTo = document.getElementById('date-filter-to') ? document.getElementById('date-filter-to').value : '';

  // 2. VÒNG LẶP LỌC CHUẨN ĐỒNG BỘ DỮ LIỆU ĐƠN HÀNG
  globalOrdersData.forEach(item => {
    // 2.1 Lọc theo các Tab trạng thái (Giữ nguyên logic cũ của bạn)
        // --- ĐỒNG BỘ LOGIC PHỐI HỢP 2 CỘT CHECKBOX CHO TABLE (DÒNG 214 - 219) ---
    if (currentFilterMode !== 'all') {
      // Ép giá trị về chuỗi chữ hoa để so sánh chuẩn xác (TRUE / FALSE)
      let isXacNhan = item.statusD ? item.statusD.toString().toUpperCase().trim() : 'FALSE'; // Cột D (Xác nhận)
      let isDonMoi = item.statusP ? item.statusP.toString().toUpperCase().trim() : 'FALSE';   // Cột P (Đơn mới)

      // 1. Tab "Đơn mới về" (New)
      if (currentFilterMode === 'new') {
        let dkChuan = (isXacNhan === 'FALSE' && isDonMoi === 'FALSE');
        let dkDacBiet = (isXacNhan === 'TRUE' && isDonMoi === 'FALSE');
        if (!dkChuan && !dkDacBiet) return; // Không khớp thì ẩn dòng này
      }
      
      // 2. Tab "Đơn chưa confirm" (Unconfirm)
      if (currentFilterMode === 'unconfirm') {
        if (!(isXacNhan === 'FALSE' && isDonMoi === 'TRUE')) return; // Không khớp thì ẩn dòng này
      }
      
      // 3. Tab "Đơn đã confirm" (Confirm)
      if (currentFilterMode === 'confirm') {
        if (!(isXacNhan === 'TRUE' && isDonMoi === 'TRUE')) return; // Không khớp thì ẩn dòng này
      }
    }


    // 2.2 Lọc theo ô tìm kiếm text (Mã đơn / Tên game)
    if (typeof searchQuery !== 'undefined' && searchQuery !== '') {
      let text = ((item.game || "") + " " + (item.orderNo || "")).toLowerCase();
      if (text.indexOf(searchQuery) === -1) return;
    }

    // 2.3 Chuẩn hóa ngày item.ngay về chuỗi dạng YYYY-MM-DD để so sánh với ô lịch
    let formattedItemDate = '';
    if (item.ngay) {
      let ngayStr = item.ngay.toString().trim();
      if (ngayStr.includes('/')) {
        let parts = ngayStr.split('/');
        if (parts.length === 3) {
          let dd = parts[0].trim().padStart(2, '0');
          let mm = parts[1].trim().padStart(2, '0');
          let yyyy = parts[2].trim();
          formattedItemDate = `${yyyy}-${mm}-${dd}`;
        }
      } else {
        let d = new Date(item.ngay);
        if (d instanceof Date && !isNaN(d.getTime())) {
          let dd = String(d.getDate()).padStart(2, '0');
          let mm = String(d.getMonth() + 1).padStart(2, '0');
          let yyyy = d.getFullYear();
          formattedItemDate = `${yyyy}-${mm}-${dd}`;
        } else {
          formattedItemDate = ngayStr;
        }
      }
    }

    // 2.4 Kiểm tra điều kiện khoảng ngày
    if (dateFrom !== '' && formattedItemDate < dateFrom) return;
    if (dateTo !== '' && formattedItemDate > dateTo) return;

    // Thỏa mãn tất cả điều kiện thì đưa vào mảng hiển thị
    filteredData.push(item);
  });


// ==========================================
// 2. VÒNG LẶP TÍNH TOÁN DOANH THU & LỢI NHUẬN (ĐẶT RA NGOÀI VÒNG LẶP LỌC)
// ==========================================
let totalVnd = 0;
let totalProfit = 0;
let totalUsd = 0; // Thêm dòng này

filteredData.forEach(item => {
  // Ép kiểu dữ liệu về dạng số để cộng tổng, loại bỏ ký tự đặc biệt
  let vnd = parseFloat((item.cotM || '0').toString().replace(/[^\d.-]+/g, ""));
  let profit = parseFloat((item.cotN || '0').toString().replace(/[^\d.-]+/g, ""));
  
  // SỬA DÒNG NÀY: Loại bỏ ký hiệu $ thuần túy, giữ lại số và dấu chấm thập phân độc lập
  let rawUsd = (item.amount || '0').toString().replace(/\$/g, "").trim();
  
  // Nếu là công thức chưa tính (ví dụ "=50*10"), tạm thời bỏ qua hoặc lấy giá trị mặc định để tránh NaN
  let usd = rawUsd.startsWith('=') ? 0 : parseFloat(rawUsd);

  if (!isNaN(vnd)) totalVnd += vnd;
  if (!isNaN(profit)) totalProfit += profit;
  if (!isNaN(usd)) totalUsd += usd; 
});


// Gán các con số chuẩn xác động 100% lên khung Dashboard bên phải của bạn
if (document.getElementById('sum-count')) {
  document.getElementById('sum-count').innerText = filteredData.length;
}
// THÊM ĐOẠN NÀY: Hiển thị định dạng tiền tệ USD (Ví dụ: $50.00)
if (document.getElementById('sum-usd')) {
  document.getElementById('sum-usd').innerText = "$" + totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
if (document.getElementById('sum-vnd')) {
  document.getElementById('sum-vnd').innerText = totalVnd.toLocaleString('vi-VN') + "đ";
}
if (document.getElementById('sum-profit')) {
  document.getElementById('sum-profit').innerText = totalProfit.toLocaleString('vi-VN') + "đ";
}

// ==========================================
// Phía dưới tiếp tục giữ nguyên đoạn code của bạn:
tbody.innerHTML = '';

if (filteredData.length === 0) {
  // ... đoạn hiển thị "Không có đơn hàng nào..." giữ nguyên ...
}



        tbody.innerHTML = ''; 

        if (filteredData.length === 0) {
          tbody.innerHTML = '<tr><td colspan="11" style="text-align:center; color: #a0aec0; padding: 30px;">Không có đơn hàng nào thuộc mục này</td></tr>';
          return;
        }
          // --- ĐOẠN CODE PHÂN TRANG: ĐẶT NGAY TRƯỚC VÒNG LẶP DỰNG HÀNG TR ---
  
  const totalRows = filteredData.length; // Tổng số đơn sau khi lọc
  const totalPages = Math.ceil(totalRows / rowsPerPage); // Tính tổng số trang
  
  // Đảm bảo số trang hiện tại không vượt quá giới hạn tối đa
  if (currentPage > totalPages) currentPage = Math.max(1, totalPages);
  
  // Tính toán vị trí cắt mảng dữ liệu để lấy đúng 20 đơn của trang hiện tại
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex); // Mảng dữ liệu thực tế sẽ vẽ lên bảng

  // ⚠️ BẠN HÃY ĐỔI TÊN VÒNG LẶP VẼ HÀNG CŨ: 
  // Thay vì chạy `filteredData.forEach(item => { ... })` 
  // Bạn hãy sửa chữ thành `paginatedData.forEach(item => { ... })`
  paginatedData.forEach(item => {
     // ... Giữ nguyên toàn bộ code dựng tr.innerHTML cũ của bạn bên trong ...
  });

  // --- ĐOẠN TỰ ĐỘNG SINH CÁC NÚT BẤM CHUYỂN TRANG THÔNG MINH ---
  const paginationContainer = document.getElementById('pagination-container');
  if (paginationContainer) {
  let paginationHtml = '';
  
  if (totalPages > 1) {
    // 1. Nút Trang trước (◀ hoặc ←)
    paginationHtml += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">&larr;</button>`;
    
    // Quy định số lượng trang hiển thị xung quanh trang hiện tại (Ví dụ: hiện 1 trang trước và 1 trang sau)
    const range = 1; 

    for (let i = 1; i <= totalPages; i++) {
      // Luôn hiển thị trang đầu (1) và trang cuối (totalPages)
      // Hoặc hiển thị các trang nằm trong khoảng xung quanh trang hiện tại (currentPage)
      if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
        paginationHtml += `<button class="page-btn ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
      } 
      // Hiển thị dấu ba chấm nếu có khoảng cách lớn giữa trang 1 và các trang xung quanh
      else if (i === 2 && currentPage - range > 2) {
        paginationHtml += `<span style="color: #a0aec0; padding: 0 5px; display: flex; align-items: center;">...</span>`;
      } 
      // Hiển thị dấu ba chấm nếu có khoảng cách lớn giữa các trang xung quanh và trang cuối
      else if (i === totalPages - 1 && currentPage + range < totalPages - 1) {
        paginationHtml += `<span style="color: #a0aec0; padding: 0 5px; display: flex; align-items: center;">...</span>`;
      }
    }
    
    // 2. Nút Trang sau (▶ hoặc →)
    paginationHtml += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">&rarr;</button>`;
  }
  
  paginationContainer.innerHTML = paginationHtml;
  }


        paginatedData.forEach(item => {
          const tr = document.createElement('tr');
          
          let linkDisplay = item.orderNo || '';
          if (linkDisplay.startsWith('http')) {
             try {
                let cleanUrl = linkDisplay.trim().replace(/\/$/, "");
                let urlSegments = cleanUrl.split('/');
                let orderId = urlSegments[urlSegments.length - 1]; 
                linkDisplay = `<a class="order-link" href="${item.orderNo}" target="_blank">🔗 ${orderId}</a>`;
             } catch (e) {
                linkDisplay = `<a class="order-link" href="${item.orderNo}" target="_blank">🔗 Xem Đơn</a>`;
             }
          }

          // ĐẶT ĐOẠN NÀY TRONG VÒNG LẶP TẠO HÀNG
            let gameOptions = `<option value="">-- Chọn Game --</option>`;
            if (CACHED_GAME_LIST && CACHED_GAME_LIST.length > 0) {
              CACHED_GAME_LIST.forEach(g => {
                // Tự động kiểm tra thuộc tính để giữ lại chữ game đã chọn (item.game hoặc item.cotD)
                let isSelected = (item.game === g || item.cotD === g) ? 'selected' : '';
                gameOptions += `<option value="${g}" ${isSelected}>${g}</option>`;
              });
            }

          
          
          tr.innerHTML = `
          
            <td style="color: #94a3b8;">${item.ngay.includes('-') ? item.ngay.split('-').reverse().join('/') : item.ngay}</td>
            <td>
              <select class="select-inline" onfocus="isUserTyping=true" onblur="isUserTyping=false" onchange="saveCell(${item.rowIndex}, 'B', this.value)">
                ${gameOptions}
              </select>
            </td>
            <td>${linkDisplay}</td>
            <td>
              <input type="checkbox" ${item.statusD ? 'checked' : ''} onchange="saveCell(${item.rowIndex}, 'D', this.checked)">
            </td>
            <!-- CỘT E (Order Amount) -->
            <td>
              <input type="text" class="input-inline" value="${item.amount}" onfocus="isUserTyping=true" onblur="isUserTyping=false" style="color: #4ade80; font-weight: 600; width: 80px;" onchange="saveCell(${item.rowIndex}, 'E', this.value, this)">
            </td>

            <!-- CỘT F (Nghĩa/K) -->
            <td>
              <input type="text" class="input-inline" value="${item.nghiaK}" onfocus="isUserTyping=true" onblur="isUserTyping=false" onchange="saveCell(${item.rowIndex}, 'F', this.value, this)" placeholder="...">
            </td>

            <!-- CỘT G (Nhận/K) -->
            <td>
              <input type="text" class="input-inline" value="${item.nhanK}" onfocus="isUserTyping=true" onblur="isUserTyping=false" onchange="saveCell(${item.rowIndex}, 'G', this.value, this)" placeholder="...">
            </td>

            <!-- CỘT H (TaxEu) -->
            <td>
              <input type="text" class="input-inline" value="${item.taxEu}" onfocus="isUserTyping=true" onblur="isUserTyping=false" onchange="saveCell(${item.rowIndex}, 'H', this.value, this)" placeholder="...">
            </td>

            <td>
              <input type="text" class="input-inline" value="${item.cotM}" readonly placeholder="...">
            </td>
            <td>
            <input type="text" class="input-inline" value="${item.cotN}" readonly placeholder="..." style="color: #4ade80; font-weight: 600;">
            </td>
            <td>
              <input type="checkbox" ${item.statusP ? 'checked' : ''} onchange="saveCell(${item.rowIndex}, 'P', this.checked)">
            </td>
            
          `;
          tbody.appendChild(tr);
        });
      }

      function saveCell(rowIndex, columnLetter, value, inputElement) {
      isUserTyping = false;
      
      // =========================================================================
      // 💡 TỐI ƯU: TÍNH TOÁN NHANH ĐỂ HIỂN THỊ KẾT QUẢ TRÊN GIAO DIỆN LẬP TỨC
      // =========================================================================
      if (value && value.toString().startsWith('=') && inputElement) {
        try {
          // Loại bỏ dấu = và các ký tự không hợp lệ, chỉ giữ lại số và phép tính toán học cơ bản
          let safeExpression = value.substring(1).replace(/[^0-9.+\-*/()]/g, '');
          let displayValue = new Function(`return ${safeExpression}`)();
          
          // Hiển thị ngay con số đã tính toán lên ô input để người dùng không phải đợi
          if (!isNaN(displayValue)) {
            inputElement.value = displayValue;
          }
        } catch(e) { 
          console.log("Không thể tính toán nhanh tại giao diện:", e); 
        }
      }
      // =========================================================================

      const statusDiv = document.getElementById('global-status');
      if (statusDiv) statusDiv.innerHTML = '<span class="status-saving">⏳ Đang lưu...</span>';

      google.script.run
        .withSuccessHandler(function() {
          if (statusDiv) statusDiv.innerHTML = '<span class="status-saved">✅ Đã lưu</span>';
          setTimeout(() => { if (statusDiv) statusDiv.innerHTML = ''; }, 1500);
          
          // Load lại dữ liệu để đồng bộ chính xác và tính lại các ô tổng (USD, VND, Lời) ở góc phải
          fetchData(); 
        })
        .withFailureHandler(function(err) {
          if (statusDiv) statusDiv.innerHTML = `<span style="color: #f87171;">❌ Lỗi: ${err.message}</span>`;
        })
        // Vẫn đẩy nguyên vẹn chuỗi công thức gốc (ví dụ: =50*10) lên để Google Sheet xử lý lưu trữ công thức
        .updateOrderRow(CURRENT_SELECTED_SHEET, rowIndex, columnLetter, value);
    }



      function showError(err) {
        if (!isUserTyping) {
          const tbody = document.getElementById('table-body');
          if (tbody) tbody.innerHTML = `<tr><td colspan="11" style="color: #f87171; text-align:center; padding: 30px; font-weight:600;">❌ LỖI KẾT NỐI SCRIPT: ${err.message}</td></tr>`;
        }
      }
      // Hàm chạy chung mỗi khi người dùng gõ chữ hoặc chọn ngày
      // // Hàm chạy chung mỗi khi người dùng gõ chữ hoặc chọn ngày
      function handleFilterChange() {
        searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
        
        // Đọc giá trị từ hai ô lịch lọc khoảng ngày mới
        let dateFrom = document.getElementById('date-filter-from') ? document.getElementById('date-filter-from').value : '';
        let dateTo = document.getElementById('date-filter-to') ? document.getElementById('date-filter-to').value : '';
        
        currentPage = 1; // // Reset về trang 1
        
        // // Lưu vào bộ nhớ máy để không bị mất khi F5
        localStorage.setItem('saved_date_from', dateFrom);
        localStorage.setItem('saved_date_to', dateTo);
        localStorage.setItem('saved_search', searchQuery);
        
        renderTable();
      }


      function clearDateFilter() {
      if (document.getElementById('date-filter-from')) {
        document.getElementById('date-filter-from').value = '';
      }
      if (document.getElementById('date-filter-to')) {
        document.getElementById('date-filter-to').value = '';
      }
      // Reset các biến toàn cục liên quan đến bộ lọc ngày về rỗng (nếu có dùng trong hệ thống của bạn)
      if (typeof filterDate !== 'undefined') filterDate = ''; 
      
      // Gọi hàm cập nhật lại bảng giao diện
      renderTable(); 
    }

      
    function refreshDataFromServer() {
      const btn = document.getElementById('btn-refresh');
      if (btn) {
        btn.innerText = "⏳ Đang tải...";
        btn.style.opacity = "0.6";
        btn.disabled = true;
      }

      google.script.run
        .withSuccessHandler(function(data) {
          // 🛡 Dùng hàm xử lý dữ liệu chuẩn của hệ thống để vẽ lại bảng
          if (data && data.successData) {
            processIncomingData(data);
          }
          
          // ✅ Nhả nút bấm
          if (btn) {
            btn.innerText = "🔄 Làm mới";
            btn.style.opacity = "1";
            btn.disabled = false;
          }
        })
        .withFailureHandler(function(error) {
          alert("Lỗi: " + error.message);
          if (btn) {
            btn.innerText = "🔄 Làm mới";
            btn.style.opacity = "1";
            btn.disabled = false;
          }
        })
        .getStockData(CURRENT_SELECTED_SHEET);
    }

 
          // 1. Khai báo biến toàn cục ở đầu vùng script để lưu danh sách game
      var CACHED_GAME_LIST = [];

      // 2. Hàm gọi lên Google Sheet để lấy danh sách game động
      function loadGameList() {
        google.script.run
          .withSuccessHandler(function(gameList) {
            if (gameList && gameList.length > 0) {
              CACHED_GAME_LIST = gameList;
              // Bắt buộc gọi fetchData() sau khi đã có danh sách game để hiển thị bảng không bị trống
              fetchData(); 
            }
          })
          .withFailureHandler(function(err) {
            console.error("Lỗi khi tải danh sách game:", err);
          })
          .getGameList();
      }

      // 3. Đảm bảo kích hoạt hàm này đầu tiên khi trang Web vừa tải xong
      document.addEventListener("DOMContentLoaded", function() {
        loadGameList();
      });

     function openSettingModal() {
      document.getElementById('setting-modal').style.display = 'flex';
      
      // 1. Tự động nhận diện tên Tab từ ô select trên giao diện Dashboard của bạn
      let currentSheetName = "";
      const sheetSelect = document.getElementById('selectedSheet') || document.getElementById('sheetSelect') || document.querySelector('select');
      
      if (sheetSelect) {
        currentSheetName = sheetSelect.value;
      } else if (typeof CURRENT_SELECTED_SHEET !== 'undefined') {
        currentSheetName = CURRENT_SELECTED_SHEET;
      }
      
      // Mặc định nếu không tìm thấy tên thì ghi chung là Hệ thống
      if (!currentSheetName) currentSheetName = "Hệ thống";

      // 2. Thay đổi dòng chữ Text để phân biệt rõ ràng Tab đang chỉnh
      const tabTextDiv = document.getElementById('modal-current-tab-text');
      if (tabTextDiv) {
        tabTextDiv.innerHTML = "📌 Đang điều chỉnh cho dữ liệu: <span style='color:#fff; font-weight:bold;'>" + currentSheetName + "</span>";
      }

      // 3. Gửi tên Tab hiện tại lên Server để load đúng dữ liệu Q1, R1 của Tab đó
      google.script.run.withSuccessHandler(function(data) {
        document.getElementById('modal-tax-order').value = data.taxOrder || '';
        document.getElementById('modal-rate-po').value = data.ratePo || '';
      }).getSystemSettings(currentSheetName);
    }


    function closeSettingModal() {
      document.getElementById('setting-modal').style.display = 'none';
    }


    // Hàm hiển thị thông báo Toast tự động biến mất sau 3 giây
function showToastNotification() {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  
  toast.style.display = 'block';
  
  // Tự động ẩn thông báo sau 3 giây
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

function saveSettingsFromServer() {
  const btn = document.getElementById('btn-save-modal');
  const taxOrderValue = document.getElementById('modal-tax-order').value;
  const ratePoValue = document.getElementById('modal-rate-po').value;
  
  btn.innerText = "⏳ Đang lưu...";
  btn.style.opacity = "0.6";
  btn.disabled = true;

  let sheetName = "";
  const sheetSelect = document.getElementById('selectedSheet') || document.getElementById('sheetSelect');
  if (sheetSelect) {
    sheetName = sheetSelect.value;
  } else if (typeof CURRENT_SELECTED_SHEET !== 'undefined') {
    sheetName = CURRENT_SELECTED_SHEET;
  }

  google.script.run
    .withSuccessHandler(function(response) {
      btn.innerText = "Lưu Lại";
      btn.style.opacity = "1";
      btn.disabled = false;
      
      if(response === "OK") {
        closeSettingModal(); // Đóng bảng cấu hình ngay lập tức
        showToastNotification(); // Bật thông báo Toast mượt mà ở góc phải
        if (typeof fetchData === "function") fetchData(); // Reload lại bảng dữ liệu
      } else {
        alert("Thông báo lỗi từ hệ thống: " + response);
      }
    })
    .withFailureHandler(function(err) {
      btn.innerText = "Lưu Lại";
      btn.style.opacity = "1";
      btn.disabled = false;
      alert("Lỗi kết nối đường truyền: " + err.message);
    })
    .saveSystemSettings(sheetName, taxOrderValue, ratePoValue);
}

    function toggleSidebar() {
  const sidebar = document.getElementById('mySidebar');
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  if (!sidebar || !toggleBtn) return;

  // Bật/tắt class ẩn
  sidebar.classList.toggle('collapsed');

  // Đổi chữ icon mũi tên tương ứng với trạng thái đóng mở
  if (sidebar.classList.contains('collapsed')) {
    toggleBtn.innerText = "▶"; // Menu đang ẩn -> Hiện mũi tên chỉ ra để mở
    toggleBtn.setAttribute('title', 'Mở rộng menu');
    localStorage.setItem('sidebar_hidden', 'yes');
  } else {
    toggleBtn.innerText = "◀"; // Menu đang hiện -> Hiện mũi tên chỉ vào để đóng
    toggleBtn.setAttribute('title', 'Thu gọn menu');
    localStorage.setItem('sidebar_hidden', 'no');
  }
}

// Giữ nguyên trạng thái đóng/mở của người dùng khi load lại trang
document.addEventListener("DOMContentLoaded", function() {
  const isHidden = localStorage.getItem('sidebar_hidden');
  const sidebar = document.getElementById('mySidebar');
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  
  if (isHidden === 'yes' && sidebar && toggleBtn) {
    sidebar.classList.add('collapsed');
    toggleBtn.innerText = "▶";
  } else if (toggleBtn) {
    toggleBtn.innerText = "◀";
  }
});

  // 1. Hàm Đóng/Mở (Thu gọn/Bật ra) khối tính nhanh trên UI Sidebar
function toggleCalcDropdown() {
  const contentBox = document.getElementById('calc-content-box');
  const arrowIcon = document.getElementById('calc-arrow-icon');
  if (!contentBox || !arrowIcon) return;

  if (contentBox.style.display === 'none') {
    contentBox.style.display = 'block';
    arrowIcon.style.transform = 'rotate(0deg)'; // Mũi tên chỉ xuống khi mở
  } else {
    contentBox.style.display = 'none';
    arrowIcon.style.transform = 'rotate(-90deg)'; // Mũi tên xoay ngang khi đóng gọn
  }
}

function runQuickCalculator() {
  // 1. Lấy giá trị thô từ ô nhập liệu
  const rawInput = parseFloat(document.getElementById('quick-input-value').value);
  
  // SỬA LỖI Chặn số lẻ: Chỉ trả về rỗng nếu người dùng không nhập số (hoặc số âm)
  if (isNaN(rawInput) || rawInput < 0) {
    document.getElementById('res-g2g-min').innerText = "0đ";
    document.getElementById('res-g2g-max').innerText = "0đ";
    document.getElementById('res-odealo').innerText = "0đ";
    return;
  }

  // Nếu bằng 0 thì hiển thị chuỗi 0 chuẩn 5 chữ số
  if (rawInput === 0) {
    document.getElementById('res-g2g-min').innerText = "0.00000đ";
    document.getElementById('res-g2g-max').innerText = "0.00000đ";
    document.getElementById('res-odealo').innerText = "0.00000đ";
    return;
  }

  // --- THỰC HIỆN TOÁN HỌC CHÍNH XÁC ---
  // Phép toán 1: G2G Min (Giá trị * 94.02% / 100% * 25.5)
  const g2gMin = rawInput * (94.02 / 100) * 25.5;

  // Phép toán 2: G2G Max (Giá trị * 94.02% / 100% * 25.7)
  const g2gMax = rawInput * (94.02 / 100) * 25.7;

  // Phép toán 3: Odealo (Giá trị * 90% / 100% * 25.7)
  const odealo = rawInput * (90 / 100) * 25.7;

  // Đổ dữ liệu chuẩn xác 5 chữ số thập phân ra giao diện Sidebar
  document.getElementById('res-g2g-min').innerText = g2gMin.toFixed(5) + 'đ';
  document.getElementById('res-g2g-max').innerText = g2gMax.toFixed(5) + 'đ';
  document.getElementById('res-odealo').innerText = odealo.toFixed(5) + 'đ';
}

function switchPage(pageTarget) {
  // 1. Khai báo các phân vùng nội dung trang con
  var pageNewOrder = document.getElementById('page-new-order');
    var pageBaoCao = document.getElementById('page-bao-cao');
  var pageThanhToan = document.getElementById('page-thanh-toan');
  
  // 2. Khai báo các phần tử nút bấm trên Sidebar
  var btnNewOrder = document.getElementById('menu-new-order');
   var btnBaoCao = document.getElementById('menu-bao-cao');
  var btnThanhToan = document.getElementById('menu-thanh-toan');

  // Mặc định ẩn toàn bộ các trang con trước khi chuyển
  pageNewOrder.style.display = 'none';
  pageBaoCao.style.display = 'none';
  pageThanhToan.style.display = 'none';

  // Mặc định gỡ bỏ hiệu ứng sáng màu tím trên tất cả các nút
  btnNewOrder.classList.remove('active');
   btnBaoCao.classList.remove('active');
  btnThanhToan.classList.remove('active');
  
  // 3. Thực thi kích hoạt trang và di chuyển khung màu tím dựa trên lựa chọn
  if (pageTarget === 'new-order') {
    pageNewOrder.style.display = 'block';
    btnNewOrder.classList.add('active');
  } 
   else if (pageTarget === 'bao-cao') {
    pageBaoCao.style.display = 'block';
    btnBaoCao.classList.add('active');
  }
  else if (pageTarget === 'thanh-toan') {
    pageThanhToan.style.display = 'block';
    btnThanhToan.classList.add('active');
  } 
}




      
    </script>

    <!-- BẢNG ĐIỀU CHỈNH POP-UP MODAL CHUYÊN NGHIỆP -->
<div id="setting-modal" class="config-modal-overlay" style="display: none;">
  <div class="config-modal-card">
    <div class="config-modal-header">
      <span class="config-modal-icon">⚙️</span>
      <h3 class="config-modal-title">Cấu Hình Hệ Thống</h3>
    </div>
    
    <!-- CHÈN THÊM DÒNG NÀY: Hiển thị tên Tab đang chỉnh sửa rõ ràng -->
    <div id="modal-current-tab-text" style="color: #4ade80; font-size: 14px; font-weight: 600; margin-top: -16px; margin-bottom: 20px; background: rgba(74, 222, 128, 0.1); padding: 6px 12px; border-radius: 6px; display: inline-block;">
      📌 Đang chỉnh cho: T6.2026
    </div>
    
    <div class="config-modal-body">
      <div class="config-form-group">
        <label for="modal-tax-order">Tax Order</label>
        <div class="config-input-wrapper">
          <input type="text" id="modal-tax-order" placeholder="Ví dụ: 95.01">
        </div>
      </div>
      
      <div class="config-form-group">
        <label for="modal-rate-po">Rate PO</label>
        <div class="config-input-wrapper">
          <input type="text" id="modal-rate-po" placeholder="Ví dụ: 25700">
        </div>
      </div>
    </div>
    
    <div class="config-modal-footer">
      <button type="button" class="config-btn config-btn-secondary" onclick="closeSettingModal()">Hủy bỏ</button>
      <button type="button" id="btn-save-modal" class="config-btn config-btn-primary" onclick="saveSettingsFromServer()">Lưu Lại</button>
    </div>
  </div>
</div>
<!-- THÔNG BÁO TOAST NOTIFICATION TỰ ĐỘNG -->
<div id="toast-notification" class="toast-container" style="display: none;">
  <div class="toast-content">
    <span class="toast-icon">✅</span>
    <span class="toast-message">Đã cập nhật thành công!</span>
  </div>
</div>

<!-- BẢNG CẤU HÌNH XÁC NHẬN XUẤT EXCEL -->
<div id="export-modal" style="display: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.6); align-items: center; justify-content: center;">
  <div style="background-color: #1a1f2c; border: 1px solid #2d3748; padding: 25px; border-radius: 8px; width: 420px; color: #fff; font-family: sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
    
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid #2d3748; padding-bottom: 12px;">
      <span style="font-size: 18px;">📊 Cấu Hình Xuất Excel</span>
    </div>

    <div style="background: rgba(16, 124, 65, 0.1); border: 1px solid #107c41; color: #4ade80; padding: 8px 12px; border-radius: 4px; font-size: 13px; margin-bottom: 15px;">
      📌 Đang chuẩn bị xuất dữ liệu: <strong id="modal-sheet-name">-</strong>
    </div>

    <div style="display: flex; flex-direction: column; gap: 12px; font-size: 14px; margin-bottom: 25px;">
      <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #2d3748; padding-bottom: 6px;">
        <span style="color: #a0aec0;">Trạng thái đơn:</span>
        <span id="modal-tab-info" style="font-weight: bold; color: #3182ce;">-</span>
      </div>
      <div id="modal-date-row" style="display: flex; justify-content: space-between; border-bottom: 1px dashed #2d3748; padding-bottom: 6px;">
        <span style="color: #a0aec0;">Khoảng ngày lọc:</span>
        <span id="modal-date-info" style="font-weight: bold; color: #ecc94b;">-</span>
      </div>
      <div id="modal-game-row" style="display: flex; justify-content: space-between; border-bottom: 1px dashed #2d3748; padding-bottom: 6px;">
        <span style="color: #a0aec0;">Bộ lọc game:</span>
        <span id="modal-game-info" style="font-weight: bold; color: #ed64a6;">-</span>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 10px;">
      <button onclick="closeExportModal()" style="background-color: #2d3748; color: #fff; border: 1px solid #4a5568; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold;">Hủy bỏ</button>
      <button onclick="confirmAndExecuteExport()" style="background-color: #107c41; color: #fff; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold;">Xuất Excel</button>
    </div>

  </div>
</div>

  </body>
</html>
