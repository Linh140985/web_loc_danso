document.getElementById("phanTichBtn").addEventListener("click", async function () {
  const input = document.getElementById("danInput").value;
  const danso = input.split(/[\s,]+/).map(s => s.trim()).filter(s => s !== "");

  try {
    const res = await fetch("js/data.json");
    const data = await res.json();

    let maxTruot = 0;
    let currentTruot = 0;
    let lastTrung = "Chưa có";

    for (let i = data.length - 1; i >= 0; i--) {
      const ngay = data[i].ngay;
      const kq = data[i].kq;

      const trung = kq.some(num => danso.includes(num));

      if (trung) {
        lastTrung = ngay;
        break;
      } else {
        currentTruot++;
      }
    }

    // Tính max trượt lịch sử
    let maxCount = 0;
    let tempCount = 0;
    for (let i = 0; i < data.length; i++) {
      const kq = data[i].kq;
      const trung = kq.some(num => danso.includes(num));
      if (!trung) {
        tempCount++;
        maxCount = Math.max(maxCount, tempCount);
      } else {
        tempCount = 0;
      }
    }

    let nhanDinh = "BÌNH THƯỜNG";
    if (currentTruot >= maxCount) nhanDinh = "VƯỢT MAX";
    else if (currentTruot >= maxCount - 1) nhanDinh = "GẦN MAX";

    document.getElementById("ngayGanNhat").textContent = lastTrung;
    document.getElementById("soNgayTruot").textContent = currentTruot;
    document.getElementById("maxLichSu").textContent = maxCount;
    document.getElementById("nhanDinh").textContent = nhanDinh;

  } catch (err) {
    alert("Lỗi khi đọc dữ liệu: " + err);
  }
});
