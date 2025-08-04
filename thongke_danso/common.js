
let data = {};

fetch('data.json')
  .then(res => res.json())
  .then(json => data = json);

function chuanHoaDan(input) {
  const raw = input.split(/[^0-9]+/).filter(x => x !== '');
  const formatted = [...new Set(raw.map(x => x.padStart(2, '0')))].sort();
  return formatted;
}

function dinhDangNgay(isoDate) {
  const [yyyy, mm, dd] = isoDate.split('-');
  return `${dd}/${mm}/${yyyy}`;
}

function tinhChuoiTruot(dan, data) {
  const days = Object.keys(data).sort();
  const result = [];

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const kq = data[day];
    result.push({ day, match: dan.includes(kq) });
  }

  // Tính max trượt
  let max = 0, currentStreak = 0;
  let currentStart = '', currentEnd = '';
  let maxStart = '', maxEnd = '';

  for (let i = 0; i < result.length; i++) {
    if (!result[i].match) {
      currentStreak++;
      if (currentStreak === 1) currentStart = result[i].day;
      currentEnd = result[i].day;
      if (currentStreak > max) {
        max = currentStreak;
        maxStart = currentStart;
        maxEnd = currentEnd;
      }
    } else {
      currentStreak = 0;
    }
  }

  // Tính chuỗi trượt hiện tại
  let cur = 0, curStart = '';
  for (let i = result.length - 1; i >= 0; i--) {
    if (!result[i].match) {
      cur++;
      curStart = result[i].day;
    } else {
      break;
    }
  }

  const curEnd = result[result.length - 1].day;

  return {
    maxTruot: max,
    maxFrom: maxStart,
    maxTo: maxEnd,
    curTruot: cur,
    curFrom: cur > 0 ? curStart : '',
    curTo: cur > 0 ? curEnd : ''
  };
}

function phanTichDanSo() {
  const input = document.getElementById('inputDan').value;
  const dan = chuanHoaDan(input);

  if (dan.length === 0) {
    document.getElementById('ketqua').innerText = 'Vui lòng nhập ít nhất 1 số.';
    return;
  }

  const thongke = tinhChuoiTruot(dan, data);
  const out = [
    '<span>📊 <b>Dàn chuẩn:</b><br>' + dan.join(',') + '</span>',
    '<span>🔵 <b>Số lượng:</b> ' + dan.length + ' số</span>',
    '<span>📅 <b>Đang trượt:</b> ' + thongke.curTruot + ' ngày' + (thongke.curTruot > 0 ? ` (từ ${dinhDangNgay(thongke.curFrom)} đến ${dinhDangNgay(thongke.curTo)})` : '') + '</span>',
    '<span>🏆 <b>Max trượt:</b> ' + thongke.maxTruot + ' ngày' + (thongke.maxTruot > 0 ? ` (từ ${dinhDangNgay(thongke.maxFrom)} đến ${dinhDangNgay(thongke.maxTo)})` : '') + '</span>'
  ];

  document.getElementById('ketqua').innerHTML = out.join('<br><br>');
}
