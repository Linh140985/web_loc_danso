const ketQuaDB = [{"ngay": "2024-12-30", "kq": ["23"]}, {"ngay": "2024-12-31", "kq": ["68"]}, {"ngay": "2025-01-01", "kq": ["14"]}, {"ngay": "2025-01-02", "kq": ["47"]}, {"ngay": "2025-01-03", "kq": ["39"]}, {"ngay": "2025-01-04", "kq": ["06"]}, {"ngay": "2025-01-05", "kq": ["41"]}, {"ngay": "2025-01-06", "kq": ["36"]}, {"ngay": "2025-01-07", "kq": ["93"]}, {"ngay": "2025-01-08", "kq": ["23"]}];

document.getElementById("phanTichBtn").addEventListener("click", function () {
  const input = document.getElementById("danInput").value;
  const danso = input.split(/[\s,]+/).map(s => s.trim()).filter(s => s !== "");

  let maxTruot = 0;
  let currentTruot = 0;
  let lastTrung = "Chưa có";

  for (let i = ketQuaDB.length - 1; i >= 0; i--) {
    const ngay = ketQuaDB[i].ngay;
    const kq = ketQuaDB[i].kq;

    const trung = kq.some(num => danso.includes(num));
    if (trung) {
      lastTrung = ngay;
      break;
    } else {
      currentTruot++;
    }
  }

  let maxCount = 0;
  let tempCount = 0;
  for (let i = 0; i < ketQuaDB.length; i++) {
    const trung = ketQuaDB[i].kq.some(num => danso.includes(num));
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
});
