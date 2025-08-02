// Chuyển chuỗi thành mảng số: "01,03,10" => ["01","03","10"]
function tachSo(str) {
  return str.split(/[\s,\n]+/).map(s => s.trim()).filter(s => /^\d{1,2}$/.test(s)).map(s => s.padStart(2, '0'));
}

// Hàm fetch dữ liệu kết quả từ RSS miền Bắc
async function fetchKetQua() {
  const proxy = "https://api.allorigins.win/get?url=";
  const url = encodeURIComponent("https://kqxs.net.vn/rss/mien-bac");
  const res = await fetch(`${proxy}${url}`);
  const data = await res.json();
  const parser = new DOMParser();
  const xml = parser.parseFromString(data.contents, "text/xml");
  const items = [...xml.querySelectorAll("item")];

  return items.map(item => {
    const title = item.querySelector("title").textContent;
    const desc = item.querySelector("description").textContent;
    const matchDate = title.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    const yyyy_mm_dd = `${matchDate[3]}-${matchDate[2]}-${matchDate[1]}`;
    const matchNum = desc.match(/Giải đặc biệt: (\d{2})/);
    return { ngay: yyyy_mm_dd, ketqua: matchNum ? matchNum[1] : null };
  });
}

// Hàm phân tích dàn khi nhấn nút
async function phanTichDan() {
  const dan = tachSo(document.getElementById("dan").value);
  const data = await fetchKetQua();

  let ngayTrung = null;
  let soNgayTruot = 0;
  let maxTruot = 0;
  let dem = 0;

  for (let i = 0; i < data.length; i++) {
    const kq = data[i].ketqua;
    if (dan.includes(kq)) {
      if (!ngayTrung) ngayTrung = data[i].ngay;
      maxTruot = Math.max(maxTruot, dem);
      dem = 0;
    } else {
      dem++;
      if (!ngayTrung) soNgayTruot++;
    }
  }
  maxTruot = Math.max(maxTruot, dem); // cập nhật lần cuối nếu chưa gặp trúng

  // Gán kết quả lên giao diện
  document.getElementById("ngayTrung").textContent = ngayTrung || "Chưa có";
  document.getElementById("soNgayTruot").textContent = soNgayTruot;
  document.getElementById("maxTruot").textContent = maxTruot;

  const nd = soNgayTruot > maxTruot ? "VƯỢT MAX" : soNgayTruot >= maxTruot - 2 ? "GẦN MAX" : "CHƯA ĐẾN MAX";
  document.getElementById("nhanDinh").textContent = nd;
}
