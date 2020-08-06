'use strict';

console.clear();

{
  const today = new Date();
  let year = today.getFullYear(')');
  let month = today.getMonth();

  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  function getCalendarBody() {
    const dates = [];
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }
    return dates;
  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  function clearCalendar() {
    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function rendertitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function renderweeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  function createCalendar() {
    clearCalendar();
    rendertitle();
    renderweeks();
  }

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCalendar();
  });
  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    createCalendar();
  });

  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalendar();
  });

  createCalendar();
}

setInterval('clock()', 500);

function clock() {
  document.getElementById("display").innerHTML = getNow();
}

function getNow() {
  var now = new Date();
  var year = now.getFullYear();
  var mon = ("0" + (now.getMonth() + 1)).slice(-2);
  var day = ("0" + now.getDate()).slice(-2);
  var hour = ("0" + now.getHours()).slice(-2);
  var min = ("0" + now.getMinutes()).slice(-2);
  var sec = ("0" + now.getSeconds()).slice(-2);

  var s = `${year}年${mon}月${day}日${hour}時${min}分${sec}秒`;
  return s;
}