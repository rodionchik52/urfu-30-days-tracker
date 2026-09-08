(function(){
  "use strict";

  var CATEGORIES = {
    docs:  {label:"Документы", color:"#0E4A85"},
    study: {label:"Учёба",     color:"#0E4A85"},
    byt:   {label:"Быт",       color:"#0E4A85"},
    sport: {label:"Спорт",     color:"#0E4A85"},
    social:{label:"Люди",      color:"#0E4A85"}
  };

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
    {id:"t15", day:15, cat:"docs", gender:"male", title:"Оформить справку для военкомата (если нужно)",
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
  var STORAGE_PROFILE = "ufu30_profile";
  var RU_MONTHS = ["января","февраля","марта","апреля","мая","июня",
    "июля","августа","сентября","октября","ноября","декабря"];

  var state = loadState();
  var startDate = loadStartDate();
  var profile = loadProfile();
  var selectedDay = null;
  var selectedCat = null;
  var pendingDay = null;
  var pendingTaskId = null;
  var pendingMode = null;

  function taskStatus(id){
    var s = state[id];
    return s ? s.status : null;
  }

  function taskVisibleForProfile(task){
    if(task.gender === "male") return !!(profile && profile.gender === "male");
    return true;
  }

  function visibleTasks(){
    return TASKS.filter(taskVisibleForProfile);
  }

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
  function loadProfile(){
    try{
      var raw = localStorage.getItem(STORAGE_PROFILE);
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  }
  function saveProfile(p){
    try{ localStorage.setItem(STORAGE_PROFILE, JSON.stringify(p)); }catch(e){}
  }

  /*
   * Synthetic-data generator for development/testing only.
   * It is intentionally not connected to the UI and never writes to localStorage.
   * Generated values are explicitly marked as synthetic, so they cannot be
   * presented as the student's real progress or real mentions.
   */
  function generateSyntheticDemoState(seed){
    var result = {};
    var n = Number(seed) || 1;
    visibleTasks().forEach(function(task, index){
      var value = (n * 31 + index * 17) % 100;
      if(value < 45){
        result[task.id] = {
          status:"done",
          note:"[СИНТЕТИКА] тестовое подтверждение для проверки интерфейса",
          ts:0
        };
      } else if(value < 58){
        result[task.id] = {
          status:"blocked",
          reasonType:(index % 2 === 0 ? "external" : "internal"),
          note:"[СИНТЕТИКА] тестовая причина для проверки интерфейса",
          ts:0
        };
      }
    });
    return result;
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

  var dayNumEl = document.getElementById("dayNum");
  var pctLabelEl = document.getElementById("pctLabel");
  var progressFillEl = document.getElementById("progressFill");
  var progressCaptionEl = document.getElementById("progressCaption");
  var paceCaptionEl = document.getElementById("paceCaption");
  var startDateCaptionEl = document.getElementById("startDateCaption");
  var dayStripEl = document.getElementById("dayStrip");
  var dayFilterWrapEl = document.getElementById("dayFilterWrap");
  var catRowEl = document.getElementById("catRow");
  var taskListEl = document.getElementById("taskList");
  var profileRowEl = document.getElementById("profileRow");
  var profileAvatarEl = document.getElementById("profileAvatar");
  var profileNameEl = document.getElementById("profileName");
  var profileSubEl = document.getElementById("profileSub");

  function formatStartDate(d){
    return "Отсчёт начался: " + d.getDate() + " " + RU_MONTHS[d.getMonth()] + " " + d.getFullYear() + " г.";
  }

  function dateForDay(day){
    var base = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    base.setDate(base.getDate() + (day - 1));
    return base;
  }
  function formatShortDate(d){
    var dd = String(d.getDate()).padStart(2, "0");
    var mm = String(d.getMonth() + 1).padStart(2, "0");
    return dd + "." + mm;
  }
  function formatFullDate(d){
    return d.getDate() + " " + RU_MONTHS[d.getMonth()];
  }

  function render(){
    renderProfile();
    renderHeader();
    renderDayStrip();
    renderDayFilterChip();
    renderCatRow();
    renderTaskList();
    startDateCaptionEl.textContent = formatStartDate(startDate);
  }

  function initials(name){
    var parts = name.trim().split(/\s+/).filter(Boolean);
    if(!parts.length) return "?";
    var first = parts[0].charAt(0);
    var second = parts.length > 1 ? parts[1].charAt(0) : "";
    return (first + second).toUpperCase();
  }
  function renderProfile(){
    if(profile && profile.name){
      profileNameEl.textContent = profile.name;
      var subParts = [];
      if(profile.group) subParts.push(profile.group);
      if(profile.direction) subParts.push(profile.direction);
      profileSubEl.textContent = subParts.length ? subParts.join(" · ") : "Профиль заполнен";

      if(profile.avatar){
        profileAvatarEl.classList.add("has-photo");
        profileAvatarEl.style.backgroundImage = "url(\"" + profile.avatar + "\")";
        profileAvatarEl.textContent = "";
      } else {
        profileAvatarEl.classList.remove("has-photo");
        profileAvatarEl.style.backgroundImage = "";
        profileAvatarEl.textContent = initials(profile.name);
      }
    } else {
      profileAvatarEl.classList.remove("has-photo");
      profileAvatarEl.style.backgroundImage = "";
      profileAvatarEl.textContent = "У";
      profileNameEl.textContent = "Студент ИРИТ-РТФ";
      profileSubEl.textContent = "УрФУ · Уральский федеральный университет";
    }
  }

  function renderHeader(){
    var today = currentDayNumber();
    dayNumEl.textContent = today;
    var visible = visibleTasks();
    var total = visible.length;
    var done = visible.filter(function(t){ return taskStatus(t.id) === "done"; }).length;
    var blocked = visible.filter(function(t){ return taskStatus(t.id) === "blocked"; }).length;
    var pct = total ? Math.round((done/total)*100) : 0;
    pctLabelEl.textContent = pct + "%";
    progressFillEl.style.width = pct + "%";
    progressCaptionEl.textContent = done + " из " + total + " задач засчитано"
      + (blocked ? " · " + blocked + " отмечено «не получается»" : "");

    var expectedByToday = visible.filter(function(t){ return t.day <= today; }).length;
    var doneByToday = visible.filter(function(t){ return t.day <= today && taskStatus(t.id) === "done"; }).length;
    var diff = doneByToday - expectedByToday;
    var paceText;
    if(diff > 0) paceText = "Темп: опережаете график на " + diff + (diff === 1 ? " шаг" : (diff < 5 ? " шага" : " шагов"));
    else if(diff < 0) paceText = "Темп: отстаёте от графика на " + Math.abs(diff) + (Math.abs(diff) === 1 ? " шаг" : (Math.abs(diff) < 5 ? " шага" : " шагов"));
    else paceText = "Темп: точно по графику";
    paceCaptionEl.textContent = paceText;
  }

  function tasksForDay(day){
    return visibleTasks().filter(function(t){ return t.day === day; });
  }

  function renderDayStrip(){
    var today = currentDayNumber();
    var html = "";
    for(var d=1; d<=DAYS_TOTAL; d++){
      var dTasks = tasksForDay(d);
      var cls = "day-dot";
      if(dTasks.length){
        cls += " has-tasks";
        var doneCount = dTasks.filter(function(t){ return taskStatus(t.id) === "done"; }).length;
        var touchedCount = dTasks.filter(function(t){ return taskStatus(t.id) !== null; }).length;
        if(doneCount === dTasks.length) cls += " done";
        else if(touchedCount > 0) cls += " partial";
      }
      if(d === today) cls += " today";
      if(d === selectedDay) cls += " selected";
      html += '<div class="'+cls+'" data-day="'+d+'"><span class="n">'+d+'</span><span class="d">'+formatShortDate(dateForDay(d))+'</span><span class="mark"></span></div>';
    }
    dayStripEl.innerHTML = html;
  }

  function renderDayFilterChip(){
    if(selectedDay === null){ dayFilterWrapEl.innerHTML = ""; return; }
    dayFilterWrapEl.innerHTML = '<button class="day-filter-chip" id="clearDayFilter">День '+selectedDay+' · '+formatFullDate(dateForDay(selectedDay))+' · показать все дни ✕</button>';
  }

  function renderCatRow(){
    var html = '<button class="cat-chip'+(selectedCat===null?" active":"")+'" data-cat="__all">Все</button>';
    Object.keys(CATEGORIES).forEach(function(key){
      html += '<button class="cat-chip'+(selectedCat===key?" active":"")+'" data-cat="'+key+'">'+CATEGORIES[key].label+'</button>';
    });
    catRowEl.innerHTML = html;
  }

  function renderTaskList(){
    var list = visibleTasks().slice();
    if(selectedDay !== null) list = list.filter(function(t){ return t.day === selectedDay; });
    if(selectedCat !== null) list = list.filter(function(t){ return t.cat === selectedCat; });

    if(!list.length){
      taskListEl.innerHTML = '<div class="empty-state">Задач с такими фильтрами нет. Попробуйте выбрать другой день или категорию.</div>';
      return;
    }

    list.sort(function(a,b){ return a.day - b.day; });

    var html = "";
    list.forEach(function(t){
      var s = state[t.id];
      var status = s ? s.status : null;
      var isDone = status === "done";
      var isBlocked = status === "blocked";
      var cardCls = "task-card" + (isDone ? " done" : "") + (isBlocked ? " blocked" : "");
      var boxCls = "checkbox" + (isDone ? " checked" : "") + (isBlocked ? " blocked" : "");
      var cat = CATEGORIES[t.cat];
      var noteHtml = "";
      if(isDone && s.note){
        noteHtml = '<div class="task-note artifact">Подтверждение: '+escapeHtml(s.note)+'</div>';
      } else if(isBlocked && s.note){
        noteHtml = '<div class="task-note reason">Не получается: '+escapeHtml(s.note)+'</div>';
      }
      html += '<div class="'+cardCls+'" style="--cat-color:'+cat.color+'">'
        + '<div class="checkbox-hit" data-toggle="'+t.id+'" role="checkbox" aria-checked="'+isDone+'">'
        +   '<div class="'+boxCls+'">'
        +     '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        +     '<span class="bang">!</span>'
        +   '</div>'
        + '</div>'
        + '<div class="task-body">'
        +   '<div class="task-title'+(isDone?" done":"")+'">'+t.title+'</div>'
        +   '<div class="task-meta">'
        +     '<span class="task-tag">День '+t.day+' · '+formatFullDate(dateForDay(t.day))+' · '+cat.label+'</span>'
        +     '<button class="guide-link" data-guide="'+t.id+'">Как это сделать?</button>'
        +   '</div>'
        +   noteHtml
        + '</div>'
        + '</div>';
    });
    taskListEl.innerHTML = html;
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  var overlayEl = document.getElementById("overlay");
  var sheetCatEl = document.getElementById("sheetCat");
  var sheetTitleEl = document.getElementById("sheetTitle");
  var sheetStepsEl = document.getElementById("sheetSteps");

  function openGuide(id, context){
    var t = TASKS.filter(function(x){ return x.id === id; })[0];
    if(!t) return;
    sheetCatEl.textContent = CATEGORIES[t.cat].label;
    sheetTitleEl.textContent = t.title;
    var introHtml = "";
    if(context === "external"){
      introHtml = '<p style="font-size:13.5px;color:#7A5B12;background:#F5E8C9;padding:8px 10px;border-radius:8px;margin:0 0 10px;">Похоже, вам нужна помощь другого человека. Не решайте это в одиночку — сначала свяжитесь с куратором или деканатом, а после уточните шаги ниже.</p>';
    } else if(context === "internal"){
      introHtml = '<p style="font-size:13.5px;color:var(--blue-dark);background:var(--blue-soft);padding:8px 10px;border-radius:8px;margin:0 0 10px;">Ничего страшного — вот с чего проще всего начать прямо сейчас, одним небольшим действием.</p>';
    }
    if(t.guide && t.guide.length){
      sheetStepsEl.innerHTML = introHtml + "<ol style='padding-left:20px;margin:0;'>" + t.guide.map(function(s){ return "<li>"+s+"</li>"; }).join("") + "</ol>";
    } else {
      sheetStepsEl.innerHTML = introHtml + '<p style="font-size:14px;color:var(--ink-soft);line-height:1.5;">Данных для точной инструкции сейчас нет. Мы не будем придумывать ответ или подменять отсутствие данных догадкой — уточните информацию у куратора или в деканате.</p>';
    }
    overlayEl.classList.add("open");
  }
  function closeGuide(){ overlayEl.classList.remove("open"); }

  var statusOverlayEl = document.getElementById("statusOverlay");
  var statusSheetCatEl = document.getElementById("statusSheetCat");
  var statusSheetTitleEl = document.getElementById("statusSheetTitle");
  var modeDoneBtn = document.getElementById("modeDoneBtn");
  var modeBlockedBtn = document.getElementById("modeBlockedBtn");
  var doneFieldsEl = document.getElementById("doneFields");
  var blockedFieldsEl = document.getElementById("blockedFields");
  var artifactInputEl = document.getElementById("artifactInput");
  var reasonInputEl = document.getElementById("reasonInput");
  var submitDoneBtn = document.getElementById("submitDoneBtn");
  var submitBlockedBtn = document.getElementById("submitBlockedBtn");
  var statusClearBtn = document.getElementById("statusClearBtn");
  var reasonExternalBtn = document.getElementById("reasonExternalBtn");
  var reasonInternalBtn = document.getElementById("reasonInternalBtn");
  var reasonTypeHintEl = document.getElementById("reasonTypeHint");
  var pendingReasonType = null;

  function openStatusModal(id){
    var t = TASKS.filter(function(x){ return x.id === id; })[0];
    if(!t) return;
    pendingTaskId = id;
    var existing = state[id];
    statusSheetCatEl.textContent = CATEGORIES[t.cat].label;
    statusSheetTitleEl.textContent = t.title;
    artifactInputEl.value = (existing && existing.status === "done") ? existing.note : "";
    reasonInputEl.value = (existing && existing.status === "blocked") ? existing.note : "";
    setReasonType(existing && existing.status === "blocked" ? (existing.reasonType || null) : null);
    statusClearBtn.style.display = existing ? "block" : "none";
    setStatusMode(existing ? existing.status : "done");
    updateSubmitState();
    statusOverlayEl.classList.add("open");
  }
  function closeStatusModal(){
    statusOverlayEl.classList.remove("open");
    pendingTaskId = null;
    pendingMode = null;
  }
  function setStatusMode(mode){
    pendingMode = mode;
    modeDoneBtn.classList.toggle("active-done", mode === "done");
    modeBlockedBtn.classList.toggle("active-blocked", mode === "blocked");
    doneFieldsEl.style.display = mode === "done" ? "block" : "none";
    blockedFieldsEl.style.display = mode === "blocked" ? "block" : "none";
  }
  function setReasonType(type){
    pendingReasonType = type;
    reasonExternalBtn.classList.toggle("active", type === "external");
    reasonInternalBtn.classList.toggle("active", type === "internal");
    if(type === "external"){
      reasonTypeHintEl.textContent = "Нужна информация о том, кто может помочь — куратор или деканат. Это не жалоба, а понятная просьба о поддержке.";
    } else if(type === "internal"){
      reasonTypeHintEl.textContent = "Без проблем: подскажем один маленький первый шаг, чтобы сдвинуться с места.";
    } else {
      reasonTypeHintEl.textContent = "Выберите, что точнее описывает ситуацию — это нужно, чтобы дать подходящую подсказку, а не общий совет.";
    }
    updateSubmitState();
  }
  function updateSubmitState(){
    /*
     * A step is counted only when the user supplies a confirmation/artifact.
     * The field is deliberately required; without it the "done" action is unavailable.
     */
    submitDoneBtn.disabled = artifactInputEl.value.trim().length < 3;
    submitBlockedBtn.disabled = reasonInputEl.value.trim().length < 3 || !pendingReasonType;
  }

  modeDoneBtn.addEventListener("click", function(){ setStatusMode("done"); });
  modeBlockedBtn.addEventListener("click", function(){ setStatusMode("blocked"); });
  reasonExternalBtn.addEventListener("click", function(){ setReasonType("external"); });
  reasonInternalBtn.addEventListener("click", function(){ setReasonType("internal"); });
  artifactInputEl.addEventListener("input", updateSubmitState);
  reasonInputEl.addEventListener("input", updateSubmitState);

  submitDoneBtn.addEventListener("click", function(){
    if(!pendingTaskId || artifactInputEl.value.trim().length === 0) return;
    var before = snapshotProgress();
    state[pendingTaskId] = { status: "done", note: artifactInputEl.value.trim(), ts: Date.now() };
    saveState();
    closeStatusModal();
    render();
    var after = snapshotProgress();
    showCompare(before, after, "Шаг засчитан только сейчас — потому что появилось подтверждение (артефакт).");
  });
  submitBlockedBtn.addEventListener("click", function(){
    if(!pendingTaskId || reasonInputEl.value.trim().length === 0 || !pendingReasonType) return;
    var id = pendingTaskId;
    var reasonType = pendingReasonType;
    var before = snapshotProgress();
    state[id] = { status: "blocked", reasonType: reasonType, note: reasonInputEl.value.trim(), ts: Date.now() };
    saveState();
    closeStatusModal();
    render();
    var after = snapshotProgress();
    showCompare(before, after, reasonType === "external"
      ? "Прогресс не изменился — шаг помечен как требующий помощи."
      : "Прогресс не изменился — ниже маленький шаг, чтобы начать.");
    openGuide(id, reasonType);
  });
  statusClearBtn.addEventListener("click", function(){
    if(!pendingTaskId) return;
    delete state[pendingTaskId];
    saveState();
    closeStatusModal();
    render();
  });
  document.getElementById("statusCancelBtn").addEventListener("click", closeStatusModal);
  statusOverlayEl.addEventListener("click", function(e){ if(e.target === statusOverlayEl) closeStatusModal(); });

  var compareOverlayEl = document.getElementById("compareOverlay");
  var compareBeforeEl = document.getElementById("compareBefore");
  var compareAfterEl = document.getElementById("compareAfter");
  var compareNoteEl = document.getElementById("compareNote");
  var compareExplainEl = document.getElementById("compareExplain");

  function snapshotProgress(){
    return { pct: pctLabelEl.textContent, pace: paceCaptionEl.textContent };
  }
  function showCompare(before, after, note){
    compareBeforeEl.textContent = before.pct;
    compareAfterEl.textContent = after.pct;
    compareNoteEl.textContent = note + " " + (before.pace !== after.pace ? ("Темп: было «" + before.pace.replace("Темп: ","") + "», стало «" + after.pace.replace("Темп: ","") + "».") : "");
    compareExplainEl.value = "";
    compareOverlayEl.classList.add("open");
  }
  document.getElementById("compareCloseBtn").addEventListener("click", function(){
    compareOverlayEl.classList.remove("open");
  });
  compareOverlayEl.addEventListener("click", function(e){ if(e.target === compareOverlayEl) compareOverlayEl.classList.remove("open"); });

  var startOverlayEl = document.getElementById("startOverlay");
  var startSheetTitleEl = document.getElementById("startSheetTitle");
  var startSheetTextEl = document.getElementById("startSheetText");

  function openStartPopup(day, count){
    pendingDay = day;
    startSheetTitleEl.textContent = "День " + day + " · " + formatFullDate(dateForDay(day));
    startSheetTextEl.textContent = "На этот день запланировано задач: " + count +
      ". Отметьте, что уже сделано, или посмотрите, с чего начать.";
    startOverlayEl.classList.add("open");
  }
  function closeStartPopup(){
    startOverlayEl.classList.remove("open");
    pendingDay = null;
  }

  document.getElementById("sheetClose").addEventListener("click", closeGuide);
  overlayEl.addEventListener("click", function(e){ if(e.target === overlayEl) closeGuide(); });

  document.getElementById("startSheetGo").addEventListener("click", function(){
    if(pendingDay !== null){ selectedDay = pendingDay; }
    closeStartPopup();
    render();
  });
  document.getElementById("startSheetCancel").addEventListener("click", closeStartPopup);
  startOverlayEl.addEventListener("click", function(e){ if(e.target === startOverlayEl) closeStartPopup(); });

  dayStripEl.addEventListener("wheel", function(e){
    if(dayStripEl.scrollWidth <= dayStripEl.clientWidth) return;
    var delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if(delta === 0) return;
    e.preventDefault();
    dayStripEl.scrollLeft += delta;
  }, {passive:false});

  dayStripEl.addEventListener("click", function(e){
    var dot = e.target.closest(".day-dot");
    if(!dot) return;
    var d = parseInt(dot.getAttribute("data-day"), 10);
    if(selectedDay === d){
      selectedDay = null;
      render();
      return;
    }
    var dTasks = tasksForDay(d);
    if(dTasks.length){
      openStartPopup(d, dTasks.length);
    } else {
      selectedDay = d;
      render();
    }
  });

  dayFilterWrapEl.addEventListener("click", function(e){
    if(e.target.id === "clearDayFilter"){ selectedDay = null; render(); }
  });

  catRowEl.addEventListener("wheel", function(e){
    if(catRowEl.scrollWidth <= catRowEl.clientWidth) return;
    var delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if(delta === 0) return;
    e.preventDefault();
    catRowEl.scrollLeft += delta;
  }, {passive:false});

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
      openStatusModal(toggle.getAttribute("data-toggle"));
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
    if(!confirm("Удалить весь профиль? Прогресс, отметки, дата начала и личные данные будут стёрты без возможности восстановления.")) return;
    state = {};
    profile = null;
    try{
      localStorage.removeItem(STORAGE_STATE);
      localStorage.removeItem(STORAGE_START);
      localStorage.removeItem(STORAGE_PROFILE);
    }catch(e){}
    startDate = new Date();
    render();
  });

  var profileOverlayEl = document.getElementById("profileOverlay");
  var profileNameInputEl = document.getElementById("profileNameInput");
  var profileGenderInputEl = document.getElementById("profileGenderInput");
  var profileGroupInputEl = document.getElementById("profileGroupInput");
  var profileDirInputEl = document.getElementById("profileDirInput");
  var profileEducationInputEl = document.getElementById("profileEducationInput");
  var profileStudyFormInputEl = document.getElementById("profileStudyFormInput");
  var profileEmailInputEl = document.getElementById("profileEmailInput");
  var profileAvatarInputEl = document.getElementById("profileAvatarInput");
  var profileAvatarChangeBtnEl = document.getElementById("profileAvatarChangeBtn");

  function openProfileModal(){
    profileNameInputEl.value = profile && profile.name ? profile.name : "";
    profileGenderInputEl.value = profile && profile.gender ? profile.gender : "";
    profileGroupInputEl.value = profile && profile.group ? profile.group : "";
    profileDirInputEl.value = profile && profile.direction ? profile.direction : "";
    profileEducationInputEl.value = profile && profile.education ? profile.education : "";
    profileStudyFormInputEl.value = profile && profile.studyForm ? profile.studyForm : "";
    profileEmailInputEl.value = profile && profile.email ? profile.email : "";

    var cabinetNameEl = document.getElementById("profileCabinetName");
    var cabinetAvatarEl = document.getElementById("profileCabinetAvatar");
    var infoGroupEl = document.getElementById("profileInfoGroup");
    var infoDirectionEl = document.getElementById("profileInfoDirection");

    var displayName = profile && profile.name ? profile.name : "Студент ИРИТ-РТФ";
    var displayGroup = profile && profile.group ? profile.group : "Учебная группа не указана";
    var displayDirection = profile && profile.direction ? profile.direction : "Направление подготовки не указано";

    if(cabinetNameEl) cabinetNameEl.textContent = displayName;
    if(cabinetAvatarEl){
      var first = displayName.trim().charAt(0);
      cabinetAvatarEl.textContent = first ? first.toUpperCase() : "А";
    }
    if(infoGroupEl) infoGroupEl.textContent = displayGroup;
    if(infoDirectionEl) infoDirectionEl.textContent = displayDirection;

    var cabinetAvatar = document.getElementById("profileCabinetAvatar");
    if(cabinetAvatar){
      if(profile && profile.avatar){
        cabinetAvatar.classList.add("has-photo");
        cabinetAvatar.style.backgroundImage = "url(" + profile.avatar + ")";
        cabinetAvatar.textContent = "";
      } else {
        cabinetAvatar.classList.remove("has-photo");
        cabinetAvatar.style.backgroundImage = "";
        var firstAvatarLetter = displayName.trim().charAt(0);
        cabinetAvatar.textContent = firstAvatarLetter ? firstAvatarLetter.toUpperCase() : "А";
      }
    }

    profileOverlayEl.classList.add("open");
  }
  function closeProfileModal(){
    profileOverlayEl.classList.remove("open");
  }
  profileRowEl.addEventListener("click", openProfileModal);
  document.getElementById("profileCancelBtn").addEventListener("click", closeProfileModal);
  profileOverlayEl.addEventListener("click", function(e){ if(e.target === profileOverlayEl) closeProfileModal(); });
  
  if(profileAvatarChangeBtnEl && profileAvatarInputEl){
    profileAvatarChangeBtnEl.addEventListener("click", function(){
      profileAvatarInputEl.click();
    });

    profileAvatarInputEl.addEventListener("change", function(){
      var file = profileAvatarInputEl.files && profileAvatarInputEl.files[0];
      if(!file) return;

      if(file.type.indexOf("image/") !== 0){
        alert("Выберите файл изображения.");
        profileAvatarInputEl.value = "";
        return;
      }

      var reader = new FileReader();
      reader.onload = function(e){
        if(!profile) profile = {};
        profile.avatar = e.target.result;
        saveProfile(profile);

        var avatar = document.getElementById("profileCabinetAvatar");
        if(avatar){
          avatar.classList.add("has-photo");
          avatar.style.backgroundImage = "url(" + e.target.result + ")";
          avatar.textContent = "";
        }

        var mainAvatar = document.getElementById("profileAvatar");
        if(mainAvatar){
          mainAvatar.classList.add("has-photo");
          mainAvatar.style.backgroundImage = "url(\"" + e.target.result + "\")";
          mainAvatar.textContent = "";
        }
        renderProfile();
      };
      reader.readAsDataURL(file);
      profileAvatarInputEl.value = "";
    });
  }

  document.getElementById("profileSaveBtn").addEventListener("click", function(){
    var name = profileNameInputEl.value.trim();
    var gender = profileGenderInputEl.value;
    var group = profileGroupInputEl.value.trim();
    var direction = profileDirInputEl.value.trim();
    var education = profileEducationInputEl.value;
    var studyForm = profileStudyFormInputEl.value;
    var email = profileEmailInputEl.value.trim();

    var existingAvatar = profile && profile.avatar ? profile.avatar : "";
    if(!name && !gender && !group && !direction && !education && !studyForm && !email && !existingAvatar){
      profile = null;
      try{ localStorage.removeItem(STORAGE_PROFILE); }catch(e){}
    } else {
      profile = {
        name: name,
        gender: gender,
        group: group,
        direction: direction,
        education: education,
        studyForm: studyForm,
        email: email,
        avatar: profile && profile.avatar ? profile.avatar : ""
      };
      saveProfile(profile);
    }
    closeProfileModal();
    render();
  });


  render();
})();
