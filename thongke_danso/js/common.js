
document.getElementById('phanTichBtn').addEventListener('click', function () {
  const input = document.getElementById('danInput').value;
  const dan = input.split(/[\s,]+/).map(s => s.trim()).filter(s => s !== '');

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      let maxTruot = 0;
      let dangTruot = 0;
      let demTruot = 0;
      let ngayGanNhat = null;

      for (let i = data.length - 1; i >= 0; i--) {
        const somes = data[i].somes.map(String);
        const trung = somes.some(so => dan.includes(so));

        if (trung) {
          if (!ngayGanNhat) ngayGanNhat = data[i].ngay;
          if (demTruot > maxTruot) maxTruot = demTruot;
          demTruot = 0;
        } else {
          demTruot++;
        }
      }

      dangTruot = demTruot;
      if (demTruot > maxTruot) maxTruot = demTruot;

      // Nhận định
      let nhanDinh = '';
      if (dangTruot === maxTruot) {
        nhanDinh = 'Đang vượt max, khả năng sắp về cao';
      } else if (dangTruot >= maxTruot * 0.8) {
        nhanDinh = 'Tiệm cận max, có thể cân nhắc';
      } else {
        nhanDinh = 'Chưa đến max, cần theo dõi thêm';
      }

      document.getElementById('ngayGanNhat').textContent = ngayGanNhat || 'Không có';
      document.getElementById('soNgayTruot').textContent = dangTruot;
      document.getElementById('maxLichSu').textContent = maxTruot;
      document.getElementById('nhanDinh').textContent = nhanDinh;
    })
    .catch(err => {
      alert('Lỗi khi đọc dữ liệu: ' + err.message);
    });
});
