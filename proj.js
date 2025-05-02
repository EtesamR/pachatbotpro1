// مدیریت تب‌ها
const tabs = document.querySelectorAll('.tab');
const trainGroup = document.getElementById('train-group');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const type = tab.dataset.type;
    if (type === 'train') {
      trainGroup.style.display = 'block';
    } else {
      trainGroup.style.display = 'none';
    }
  });
});

// فرم جستجو
const form = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const date = document.getElementById('date').value;
  const type = document.querySelector('.tab.active').dataset.type;
  const trainType = document.getElementById('train-type')?.value || '';

  displayResults(from, to, date, type, trainType);
});

function displayResults(from, to, date, type, trainType) {
  resultsDiv.innerHTML = `
        <h3>نتایج جستجو (${type === 'plane' ? 'پرواز' : 'قطار'})</h3>
        <p>مبدا: ${from}</p>
        <p>مقصد: ${to}</p>
        <p>تاریخ: ${date}</p>
        ${type === 'train' ? `<p>نوع سفر: ${trainType}</p>` : ''}
        <p>نتایج فرضی در این قسمت نمایش داده می‌شود.</p>
    `;
}

// تابع تغییر نوع سفر
function setTravelType(type, element) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  element.classList.add('active');
  // بر اساس نوع سفر، عملیات موردنظر رو انجام بدهید
  document.getElementById('ticket-type-group').style.display = 'block'; // یا هر چیزی که نیاز دارید
}

// تغییر نوع بلیط داخلی/خارجی
function toggleExternalOption() {
  const select = document.getElementById('ticket-type');
  // می‌تونید بر اساس مقدار این قسمت تغییرات لازم رو انجام بدهید
}

// جستجو نمونه
function searchFlights() {
  const container = document.getElementById('results-container');
  container.innerHTML = '';
  for (let i = 1; i <= 3; i++) {
    const div = document.createElement('div');
    div.className = 'result-item';
    div.innerHTML = `
        <h4>پرواز ${i} از تهران به مشهد</h4>
        <div class="result-details">
            <p>تاریخ: 1402/07/20</p>
            <p>ساعت: 10:00</p>
            <p>مدت سفر: 2 ساعت</p>
            <button onclick="selectTicket('تهران','مشهد','1402/07/20','اقتصادی')">انتخاب بلیط</button>
        </div>
    `;
    container.appendChild(div);
  }
  document.getElementById('results').style.display = 'block';
}

// انتخاب بلیط
function selectTicket(from, to, date, classType) {
  alert(`بلیط ${classType} از ${from} به ${to} در تاریخ ${date} انتخاب شد.`);
}

// اعمال فیلترها
function applyFilters() {
  const startTime = document.getElementById('filter-time-start').value;
  const endTime = document.getElementById('filter-time-end').value;
  alert(`فیلتر ساعت:\nاز: ${startTime || 'همه'}\nتا: ${endTime || 'همه'}`);
}

// بخش FAQ: باز و بسته کردن سوالات
// این بخش تنها یک بار اجرا می‌شود و رویدادها رو به سوالات می‌افزاید
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';

    // بستن همه
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.faq-answer').forEach(ans => {
      ans.classList.remove('show');
    });

    // اگر سوال کلیک شده بسته نبوده، باز می‌شود
    if (!isExpanded) {
      btn.setAttribute('aria-expanded', 'true');
      const answerId = btn.getAttribute('aria-controls');
      const answerEl = document.getElementById(answerId);
      answerEl.classList.add('show');
    }
  });
});
