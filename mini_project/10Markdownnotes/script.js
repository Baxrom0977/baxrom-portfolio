const titleInput = document.querySelector(".titleInput");
const noteInput = document.querySelector(".noteInput");
const addBtn = document.querySelector(".addBtn");
const notesList = document.querySelector(".notesList");
const searchInput = document.querySelector(".searchInput");

let notes = [];
let editingNote = null;
const NOTES_STORAGE_KEY = "markdownNotes.notes.v1";

// Добавление заметки по кнопке
addBtn.addEventListener("click", function () {
  addNote();
});

// Ctrl + Enter — сохранить заметку
// Обычный Enter — новая строка
noteInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && event.ctrlKey) {
    event.preventDefault();
    addNote();
  }
});

// Поиск заметок
searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.trim().toLowerCase();

  const result = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchText) ||
      note.text.toLowerCase().includes(searchText)
    );
  });

  renderNotes(result);
});

function addNote() {
  const title = titleInput.value.trim();
  const text = noteInput.value.trim();

  if (title === "" || text === "") {
    return;
  }

  // Создаём новую заметку
  if (editingNote === null) {
    const newNote = {
      title: title,
      text: text,
    };

    notes.push(newNote);
  } else {
    const noteIndex = notes.indexOf(editingNote);

    if (noteIndex === -1) {
      notes.push({
        title: title,
        text: text,
      });
    } else {
      notes[noteIndex].title = title;
      notes[noteIndex].text = text;
    }
  }

  editingNote = null;

  addBtn.textContent = "Добавить заметку";

  titleInput.value = "";
  noteInput.value = "";

  saveNotes();
  renderCurrentNotes();
}

function renderNotes(notesToRender) {
  notesList.innerHTML = "";

  if (notesToRender.length === 0) {
    notesList.textContent = "Заметки не найдены";
    return;
  }

  notesToRender.forEach((note) => {
    const noteBox = document.createElement("div");
    const title = document.createElement("h4");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    title.textContent = note.title;

    deleteBtn.textContent = "Удалить";
    editBtn.textContent = "Редактировать";

    const noteContent = createMarkdownElement(note.text);

    noteBox.append(title);
    noteBox.append(noteContent);
    noteBox.append(deleteBtn);
    noteBox.append(editBtn);

    notesList.append(noteBox);

    // Удаление заметки
    deleteBtn.addEventListener("click", function () {
      const noteIndex = notes.indexOf(note);

      if (noteIndex === -1) return;

      notes.splice(noteIndex, 1);

      if (editingNote === note) {
        editingNote = null;

        titleInput.value = "";
        noteInput.value = "";

        addBtn.textContent = "Добавить заметку";
      }

      saveNotes();
      renderCurrentNotes();
    });

    // Редактирование заметки
    editBtn.addEventListener("click", function () {
      editingNote = note;

      titleInput.value = note.title;
      noteInput.value = note.text;

      addBtn.textContent = "Обновить заметку";

      titleInput.focus();
    });
  });
}

// Простая обработка Markdown
function createMarkdownElement(text) {
  let content = text;

  // Заголовок первого уровня
  if (content.startsWith("# ")) {
    const element = document.createElement("h2");

    element.textContent = content.replace("# ", "");

    return element;
  }

  // Заголовок второго уровня
  if (content.startsWith("## ")) {
    const element = document.createElement("h3");

    element.textContent = content.replace("## ", "");

    return element;
  }

  // Заголовок третьего уровня
  if (content.startsWith("### ")) {
    const element = document.createElement("h4");

    element.textContent = content.replace("### ", "");

    return element;
  }

  // Жирный текст
  if (content.startsWith("**") && content.endsWith("**")) {
    const element = document.createElement("strong");

    element.textContent = content.replace(/\*\*/g, "");

    return element;
  }

  // Курсив
  if (
    content.startsWith("*") &&
    content.endsWith("*") &&
    !content.startsWith("**")
  ) {
    const element = document.createElement("em");

    element.textContent = content.replace(/\*/g, "");

    return element;
  }

  // Список
  if (content.startsWith("- ")) {
    const list = document.createElement("ul");

    const lines = content.split("\n");

    lines.forEach(function (line) {
      if (line.trim() === "") {
        return;
      }

      const listItem = document.createElement("li");

      listItem.textContent = line.replace("- ", "");

      list.append(listItem);
    });

    return list;
  }

  // Обычный текст
  const paragraph = document.createElement("p");

  paragraph.textContent = content;

  return paragraph;
}

function renderCurrentNotes() {
  const searchText = searchInput.value.trim().toLowerCase();

  const result = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchText) ||
      note.text.toLowerCase().includes(searchText)
    );
  });

  renderNotes(result);
}

// Сохранение заметок
function saveNotes() {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

function isValidMarkdownNote(note) {
  return (
    note &&
    typeof note === "object" &&
    typeof note.title === "string" &&
    typeof note.text === "string"
  );
}

function isOldMarkdownNote(note) {
  return (
    isValidMarkdownNote(note) &&
    !("id" in note) &&
    !("folderId" in note) &&
    !("createdAt" in note)
  );
}

function migrateOldNotes() {
  const oldNotes = localStorage.getItem("notes");

  if (!oldNotes) {
    return [];
  }

  try {
    const parsedNotes = JSON.parse(oldNotes);

    if (!Array.isArray(parsedNotes)) {
      return [];
    }

    const markdownNotes = parsedNotes.filter(isOldMarkdownNote);

    if (markdownNotes.length > 0) {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(markdownNotes));
    }

    return markdownNotes;
  } catch (error) {
    console.error("Ошибка миграции Markdown Notes:", error);

    return [];
  }
}

// Загрузка заметок
function loadNotes() {
  const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);

  if (savedNotes === null) {
    notes = migrateOldNotes();
    return;
  }

  try {
    const parsedNotes = JSON.parse(savedNotes);

    if (!Array.isArray(parsedNotes)) {
      notes = [];
      return;
    }

    notes = parsedNotes.filter(isValidMarkdownNote);
  } catch (error) {
    console.error("Ошибка загрузки Markdown Notes:", error);

    notes = [];
  }
}

loadNotes();
renderNotes(notes);
