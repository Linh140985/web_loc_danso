document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("phanTichBtn").addEventListener("click", async () => {
    const input = document.getElementById("danInput").value;
    const danSo = input.split(/[,\n\s]+/).map(s => s.trim()).filter(Boolean);

    try {
      const response = await fetch("js/data.json");
      const data = await response.json();
      const ngayList = data.map(d => d.ngay);
      const ketquaList = data.map(d => d.kq);

      let ngayTrungGanNhat = null;
      let soNgayTruot = 0;
      let maxTruot = 0;
      let dem = 0;

      for (let i = ketquaList.length - 1; i >= 0; i--) {
        const kq = ketquaList[i];
        if (danSo.includes(kq)) {
          ngayTrungGanNhat = ngayList[i];
          break;
        } else {
          dem++;
          soNgayTruot++;
        }
      }

      let temp = 0;
      for (let i = 0; i < ketquaList.length; i++) {
        if (danSo.includes(ketquaList[i])) {
          maxTruot = Math.max(maxTruot, temp);
          temp = 0;
        } else {
          temp++;
        }
      }
      maxTruot = Math.max(maxTruot, temp);

      let nhanDinh = "Chưa rõ";
      if (soNgayTruot >= maxTruot) nhanDinh = "Đang vượt max, khả năng sắp về cao";
      else if (soNgayTruot >= maxTruot - 2) nhanDinh = "Tiệm cận max, nên cân nhắc";
      else nhanDinh = "Còn xa, chưa nên đánh";

      document.getElementById("ngayGanNhat").textContent = ngayTrungGanNhat || "Chưa từng trúng";
      document.getElementById("soNgayTruot").textContent = soNgayTruot;
      document.getElementById("maxLichSu").textContent = maxTruot;
      document.getElementById("nhanDinh").textContent = nhanDinh;
    } catch (err) {
      alert("Lỗi khi đọc dữ liệu: " + err.message);
    }
  });
});
