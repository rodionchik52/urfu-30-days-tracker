(function(){
  "use strict";

  // ---------- данные категорий ----------
  var CATEGORIES = {
    docs:  {label:"Документы", color:"#0E4A85"},
    study: {label:"Учёба",     color:"#0E4A85"},
    byt:   {label:"Быт",       color:"#0E4A85"},
    sport: {label:"Спорт",     color:"#0E4A85"},
    social:{label:"Люди",      color:"#0E4A85"}
  };

  // ---------- список задач на 30 дней ----------
  var TASKS = [
    {id:"t1",  day:1,  cat:"docs",   title:"Получить студенческий билет",
      guide:["Прийти в деканат или учебный офис с паспортом и фото 3×4.","Заполнить заявление на месте, если попросят.","Забрать билет либо получить талон на повторное посещение."]},
    {id:"t2",  day:1,  cat:"docs",   title:"Оформить зачётную книжку",
      guide:["Обычно выдают в том же кабинете, что и студенческий.","Взять с собой копию паспорта и фото.","Проверить, что ФИО и номер группы в зачётке указаны верно."]},
    {id:"t3",  day:2,  cat:"study",  title:"Получить доступ в личный кабинет (ЭИОС)",
      guide:["Найти письмо от университета на личной почте или спросить логин в деканате.","Зайти на портал вуза и сменить временный пароль.","Проверить, что расписание и группа отображаются верно."]},
    {id:"t4",  day:2,  cat:"study",  title:"Посмотреть расписание на неделю",
      guide:["Открыть личный кабинет → раздел «Расписание».","Найти свою группу по номеру.","Сохранить расписание в заметки или календарь телефона."]},
    {id:"t5",  day:2,  cat:"social", title:"Найти чат своей группы",
      guide:["Спросить у старосты или одногруппников ссылку на чат.","Представиться и уточнить важные объявления.","Обменяться контактами хотя бы с парой человек."]},
    {id:"t6",  day:3,  cat:"social", title:"Узнать куратора группы и его контакты",
      guide:["Спросить в деканате, кто куратор вашей группы.","Записать телефон или почту куратора.","Прийти на первую кураторскую встречу, если она назначена."]},
    {id:"t7",  day:3,  cat:"study",  title:"Найти нужные корпуса и аудитории",
      guide:["Посмотреть в расписании номера корпусов по каждой паре.","Пройтись по кампусу заранее, до первой пары.","Уточнить у старших студентов короткие маршруты между корпусами."]},
    {id:"t8",  day:3,  cat:"byt",    title:"Заселиться в общежитие и получить ключи",
      guide:["Обратиться в студгородок с паспортом и направлением на заселение.","Подписать договор найма и получить пропуск.","Уточнить у коменданта правила и часы работы вахты."]},
    {id:"t9",  day:5,  cat:"byt",    title:"Пройти медосмотр и сдать справку 086-у",
      guide:["Уточнить в здравпункте вуза, какие анализы нужны именно у вас.","Пройти осмотр в поликлинике по месту жительства заранее.","Сдать оригинал справки в медицинский кабинет университета."]},
    {id:"t10", day:5,  cat:"byt",    title:"Оформить студенческий проездной",
      guide:["Уточнить в деканате или на сайте транспортной компании условия для студентов.","Подготовить студенческий билет и фото для оформления.","Подать заявление онлайн или в пункте обслуживания."]},
    {id:"t11", day:7,  cat:"sport",  title:"Записаться на физкультуру",
      guide:["Открыть список секций на сайте кафедры физвоспитания.","Выбрать секцию по интересу и уровню подготовки.","Записаться через личный кабинет или у преподавателя на первом занятии."]},
    {id:"t12", day:10, cat:"docs",   title:"Оформить карту студента для библиотеки",
      guide:["Прийти в главную библиотеку вуза со студенческим билетом.","Заполнить читательский формуляр.","Уточнить, как работает электронный каталог и продление книг онлайн."]},
    {id:"t13", day:10, cat:"docs",   title:"Разобраться со стипендией: сроки и условия",
      guide:["Найти положение о стипендиях на сайте вуза.","Уточнить в деканате даты первой выплаты.","Проверить, привязана ли карта для перевода стипендии."]},
    {id:"t14", day:15, cat:"social", title:"Записаться в клуб или секцию по интересам",
      guide:["Посмотреть список студенческих объединений на сайте вуза.","Прийти на пробную встречу одного-двух клубов.","Записаться туда, где было интереснее всего."]},
    {id:"t15", day:15, cat:"docs",   title:"Оформить справку для военкомата (если нужно)",
      guide:["Уточнить в деканате, положена ли вам отсрочка.","Собрать справку об обучении и копию студенческого.","Подать документы в военкомат по месту прописки в указанный срок."]},
    {id:"t16", day:18, cat:"social", title:"Сходить на встречу по адаптации первокурсников",
      guide:["Проверить расписание кураторских часов на инфостендах или в чате.","Прийти вовремя и подготовить вопросы, если они накопились.","Записать контакты, которые дадут на встрече."]},
    {id:"t17", day:22, cat:"study",  title:"Проверить успеваемость и посещаемость",
      guide:["Открыть личный кабинет → раздел «Успеваемость».","Сверить количество пропусков по каждому предмету.","При расхождениях уточнить у преподавателя или в деканате."]},
    {id:"t18", day:28, cat:"study",  title:"Изучить правила допуска к сессии",
      guide:["Найти положение о промежуточной аттестации на сайте вуза.","Уточнить у преподавателей условия допуска по их предметам.","Составить список задолженностей, если они есть, и сроки пересдач."]},
    {id:"t19", day:30, cat:"study",  title:"Узнать расписание зачётов и экзаменов",
      guide:["Открыть личный кабинет → раздел «Расписание сессии».","Выписать даты и аудитории всех зачётов и экзаменов.","Уточнить у старосты, если в расписании есть неясности."]}
  ];

  var DAYS_TOTAL = 30;
  var STORAGE_STATE = "ufu30_state";
  var STORAGE_START = "ufu30_start";

  // ---------- состояние ----------
  var state = loadState();
  var startDate = loadStartDate();
  var selectedDay = null;      // фильтр по дню (null = все дни)
  var selectedCat = null;      // фильтр по категории (null = все категории)

  function loadState(){
    try{
      var raw = localStorage.getItem(STORAGE_STATE);
      return raw ? JSON.parse(raw) : {};
    }catch(e){ return {}; }
  }
  function saveState(){
    try{ localStorage.setItem(STORAGE_STATE, JSON.stringify(state)); }catch(e){}
  }
  function loadStartDate(){
    try{
      var raw = localStorage.getItem(STORAGE_START);
      return raw ? new Date(raw) : new Date();
    }catch(e){ return new Date(); }
  }
  function saveStartDate(d){
    try{ localStorage.setItem(STORAGE_START, d.toISOString()); }catch(e){}
  }

  function currentDayNumber(){
    var msPerDay = 24*60*60*1000;
    var diff = Math.floor((stripTime(new Date()) - stripTime(startDate)) / msPerDay) + 1;
    if(diff < 1) diff = 1;
    if(diff > DAYS_TOTAL) diff = DAYS_TOTAL;
    return diff;
  }
  function stripTime(d){
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  }

  // ---------- рендер ----------
  var dayNumEl = document.getElementById("dayNum");
  var pctLabelEl = document.getElementById("pctLabel");
  var progressFillEl = document.getElementById("progressFill");
  var progressCaptionEl = document.getElementById("progressCaption");
  var dayStripEl = document.getElementById("dayStrip");
  var dayFilterWrapEl = document.getElementById("dayFilterWrap");
  var catRowEl = document.getElementById("catRow");
  var taskListEl = document.getElementById("taskList");

  function render(){
    renderHeader();
    renderDayStrip();
    renderDayFilterChip();
    renderCatRow();
    renderTaskList();
  }

  function renderHeader(){
    dayNumEl.textContent = currentDayNumber();
    var total = TASKS.length;
    var done = TASKS.filter(function(t){ return !!state[t.id]; }).length;
    var pct = total ? Math.round((done/total)*100) : 0;
    pctLabelEl.textContent = pct + "%";
    progressFillEl.style.width = pct + "%";
    progressCaptionEl.textContent = done + " из " + total + " задач выполнено";
  }

  function tasksForDay(day){
    return TASKS.filter(function(t){ return t.day === day; });
  }

  function renderDayStrip(){
    var today = currentDayNumber();
    var html = "";
    for(var d=1; d<=DAYS_TOTAL; d++){
      var dTasks = tasksForDay(d);
      var cls = "day-dot";
      if(dTasks.length){
        cls += " has-tasks";
        var doneCount = dTasks.filter(function(t){ return !!state[t.id]; }).length;
        if(doneCount === dTasks.length) cls += " done";
        else if(doneCount > 0) cls += " partial";
      }
      if(d === today) cls += " today";
      if(d === selectedDay) cls += " selected";
      html += '<div class="'+cls+'" data-day="'+d+'"><span class="n">'+d+'</span><span class="mark"></span></div>';
    }
    dayStripEl.innerHTML = html;
  }

  function renderDayFilterChip(){
    if(selectedDay === null){ dayFilterWrapEl.innerHTML = ""; return; }
    dayFilterWrapEl.innerHTML = '<button class="day-filter-chip" id="clearDayFilter">День '+selectedDay+' · показать все дни ✕</button>';
  }

  function renderCatRow(){
    var html = '<button class="cat-chip'+(selectedCat===null?" active":"")+'" data-cat="__all">Все</button>';
    Object.keys(CATEGORIES).forEach(function(key){
      html += '<button class="cat-chip'+(selectedCat===key?" active":"")+'" data-cat="'+key+'">'+CATEGORIES[key].label+'</button>';
    });
    catRowEl.innerHTML = html;
  }

  function renderTaskList(){
    var list = TASKS.slice();
    if(selectedDay !== null) list = list.filter(function(t){ return t.day === selectedDay; });
    if(selectedCat !== null) list = list.filter(function(t){ return t.cat === selectedCat; });

    if(!list.length){
      taskListEl.innerHTML = '<div class="empty-state">Задач с такими фильтрами нет. Попробуйте выбрать другой день или категорию.</div>';
      return;
    }

    list.sort(function(a,b){ return a.day - b.day; });

    var html = "";
    list.forEach(function(t){
      var isDone = !!state[t.id];
      var cat = CATEGORIES[t.cat];
      html += '<div class="task-card'+(isDone?" done":"")+'" style="--cat-color:'+cat.color+'">'
        + '<div class="checkbox-hit" data-toggle="'+t.id+'" role="checkbox" aria-checked="'+isDone+'">'
        +   '<div class="checkbox'+(isDone?" checked":"")+'">'
        +     '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        +   '</div>'
        + '</div>'
        + '<div class="task-body">'
        +   '<div class="task-title'+(isDone?" done":"")+'">'+t.title+'</div>'
        +   '<div class="task-meta">'
        +     '<span class="task-tag">День '+t.day+' · '+cat.label+'</span>'
        +     '<button class="guide-link" data-guide="'+t.id+'">Как это сделать?</button>'
        +   '</div>'
        + '</div>'
        + '</div>';
    });
    taskListEl.innerHTML = html;
  }

  // ---------- гайд (модалка) ----------
  var overlayEl = document.getElementById("overlay");
  var sheetCatEl = document.getElementById("sheetCat");
  var sheetTitleEl = document.getElementById("sheetTitle");
  var sheetStepsEl = document.getElementById("sheetSteps");

  function openGuide(id){
    var t = TASKS.filter(function(x){ return x.id === id; })[0];
    if(!t) return;
    sheetCatEl.textContent = CATEGORIES[t.cat].label;
    sheetTitleEl.textContent = t.title;
    sheetStepsEl.innerHTML = t.guide.map(function(s){ return "<li>"+s+"</li>"; }).join("");
    overlayEl.classList.add("open");
  }
  function closeGuide(){ overlayEl.classList.remove("open"); }

  // ---------- обработчики ----------
  document.getElementById("sheetClose").addEventListener("click", closeGuide);
  overlayEl.addEventListener("click", function(e){ if(e.target === overlayEl) closeGuide(); });

  dayStripEl.addEventListener("click", function(e){
    var dot = e.target.closest(".day-dot");
    if(!dot) return;
    var d = parseInt(dot.getAttribute("data-day"), 10);
    selectedDay = (selectedDay === d) ? null : d;
    render();
  });

  dayFilterWrapEl.addEventListener("click", function(e){
    if(e.target.id === "clearDayFilter"){ selectedDay = null; render(); }
  });

  catRowEl.addEventListener("click", function(e){
    var chip = e.target.closest(".cat-chip");
    if(!chip) return;
    var cat = chip.getAttribute("data-cat");
    selectedCat = (cat === "__all") ? null : cat;
    render();
  });

  taskListEl.addEventListener("click", function(e){
    var toggle = e.target.closest("[data-toggle]");
    var guideBtn = e.target.closest("[data-guide]");
    if(toggle){
      var id = toggle.getAttribute("data-toggle");
      state[id] = !state[id];
      saveState();
      render();
    } else if(guideBtn){
      openGuide(guideBtn.getAttribute("data-guide"));
    }
  });

  document.getElementById("startDateBtn").addEventListener("click", function(){
    var current = startDate.toISOString().slice(0,10);
    var input = prompt("Укажите дату начала отсчёта (ГГГГ-ММ-ДД):", current);
    if(!input) return;
    var parsed = new Date(input);
    if(isNaN(parsed.getTime())){ alert("Не получилось распознать дату. Формат: 2026-09-01"); return; }
    startDate = parsed;
    saveStartDate(startDate);
    render();
  });

  document.getElementById("resetBtn").addEventListener("click", function(){
    if(!confirm("Сбросить весь прогресс? Это действие нельзя отменить.")) return;
    state = {};
    saveState();
    render();
  });

  render();
})();
