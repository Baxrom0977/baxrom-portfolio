const themeBtn = document.querySelector(".themeBtn");

const savedTheme = localStorage.getItem("notes-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️ Light theme";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️ Light theme";
    localStorage.setItem("notes-theme", "dark");
  } else {
    themeBtn.textContent = "🌙 Dark theme";
    localStorage.setItem("notes-theme", "light");
  }
});

let activeFolderId = "all";
let editingNoteId = null;

const NOTES_STORAGE_KEY = "notesFolders.notes.v1";
const FOLDERS_STORAGE_KEY = "notesFolders.folders.v1";

//ОТКРИТИЕ И ЗАКРИТИЕ Modal//
const addNoteBtn = document.querySelector(".addNoteBtn");
const closeBtn = document.querySelector(".closeBtn");
const modal = document.querySelector(".modal");

addNoteBtn.addEventListener("click", () => {
  editingNoteId = null;
  noteTitleInput.value = "";
  noteTextInput.value = "";
  folderSelect.value = "";
  saveNoteBtn.textContent = "Save Note";
  modal.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.remove("active");
});
//СОЗДАНИЕ ПАПОК//

let folders = [];

const addFolderBtn = document.querySelector(".addFolderBtn");
const foldersContainer = document.querySelector(".folders");
const folderSelect = document.querySelector(".folderSelect");

addFolderBtn.addEventListener("click", () => {
  let folderName = prompt("Название папки");
  if (folderName === null || folderName.trim() === "") return;
  const folder = {
    id: Date.now(),
    name: folderName.trim(),
    createdAt: new Date().toISOString(),
  };
  folders.push(folder);
  saveData();
  renderFolders();
  renderFolderSelect();
});

function renderFolders() {
  foldersContainer.innerHTML = "";

  const allNotes = document.createElement("div");
  allNotes.classList.add("folder");

  if (activeFolderId === "all") {
    allNotes.classList.add("active");
  }

  allNotes.dataset.id = "all";

  const allNotesTitle = document.createElement("p");
  allNotesTitle.textContent = "📚 All Notes";

  allNotes.append(allNotesTitle);
  foldersContainer.append(allNotes);

  folders.forEach((element) => {
    const folder = document.createElement("div");
    folder.classList.add("folder");

    if (String(element.id) === activeFolderId) {
      folder.classList.add("active");
    }

    folder.dataset.id = element.id;

    const folderName = document.createElement("p");
    folderName.textContent = element.name;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteFolderBtn");
    deleteButton.type = "button";
    deleteButton.dataset.id = element.id;
    deleteButton.textContent = "×";

    const folderDate = document.createElement("span");
    folderDate.classList.add("folderDate");

    folderDate.textContent = element.createdAt
      ? new Date(element.createdAt).toLocaleDateString("ru-RU")
      : "";

    folder.append(folderName, deleteButton, folderDate);

    foldersContainer.append(folder);
  });
}

function renderFolderSelect() {
  folderSelect.innerHTML = "";

  const emptyOption = document.createElement("option");

  emptyOption.value = "";
  emptyOption.textContent = "Без папки";

  folderSelect.append(emptyOption);

  folders.forEach((element) => {
    const option = document.createElement("option");

    option.value = element.id;
    option.textContent = element.name;

    folderSelect.append(option);
  });
}

//СОЗДАНИЕ ЗАМЕТОК//
let notes = [];

const searchInput = document.querySelector(".searchInput");
const noteTitleInput = document.querySelector(".noteTitleInput");
const noteTextInput = document.querySelector(".noteTextInput");
const saveNoteBtn = document.querySelector(".saveNoteBtn");
const notesList = document.querySelector(".notesList");
const emptyMessage = document.querySelector(".emptyMessage");
const notesCount = document.querySelector(".notesCount");

saveNoteBtn.addEventListener("click", () => {
  const noteTitleInfo = noteTitleInput.value.trim();
  const noteTextInfo = noteTextInput.value.trim();
  if (noteTitleInfo === "" || noteTextInfo === "") {
    alert("Введите название и текст заметки");
    return;
  }

  if (editingNoteId !== null) {
    const noteToEdit = notes.find((note) => {
      return note.id === editingNoteId;
    });
    noteToEdit.title = noteTitleInfo;
    noteToEdit.text = noteTextInfo;
    noteToEdit.folderId = folderSelect.value;
    saveData();
    editingNoteId = null;
    saveNoteBtn.textContent = "Save Note";
    renderNotes();
    modal.classList.remove("active");
    return;
  }

  const note = {
    id: Date.now(),
    title: noteTitleInfo,
    text: noteTextInfo,
    folderId: folderSelect.value,
    createdAt: new Date().toISOString(),
  };
  notes.push(note);
  noteTitleInput.value = "";
  noteTextInput.value = "";
  saveData();
  renderNotes();
  modal.classList.remove("active");
});

function renderNotes() {
  let visibleNotes;

  if (activeFolderId === "all") {
    visibleNotes = notes;
  } else {
    visibleNotes = notes.filter((note) => {
      return note.folderId === activeFolderId;
    });
  }

  const searchText = searchInput.value.trim().toLowerCase();

  visibleNotes = visibleNotes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchText) ||
      note.text.toLowerCase().includes(searchText)
    );
  });

  notesList.innerHTML = "";

  if (visibleNotes.length > 0) {
    emptyMessage.style.display = "none";
  } else {
    emptyMessage.style.display = "grid";
  }

  visibleNotes.forEach((element) => {
    const noteCard = document.createElement("div");
    noteCard.classList.add("noteCard");

    const noteTitle = document.createElement("h3");
    noteTitle.classList.add("noteTitle");
    noteTitle.textContent = element.title;

    const noteText = document.createElement("p");
    noteText.classList.add("noteText");
    noteText.textContent = element.text;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteNoteBtn");
    deleteButton.type = "button";
    deleteButton.dataset.id = element.id;
    deleteButton.textContent = "🗑️ Удалить";

    const editButton = document.createElement("button");
    editButton.classList.add("editNoteBtn");
    editButton.type = "button";
    editButton.dataset.id = element.id;
    editButton.textContent = "✏️ Изменить";

    const noteDate = document.createElement("p");
    noteDate.classList.add("noteDate");

    noteDate.textContent = new Date(element.createdAt).toLocaleDateString(
      "ru-RU",
    );

    noteCard.append(noteTitle, noteText, deleteButton, editButton, noteDate);

    notesList.append(noteCard);
  });

  notesCount.textContent = visibleNotes.length + " notes";
}

foldersContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteFolderBtn")) {
    const folderId = Number(event.target.dataset.id);

    folders = folders.filter((folder) => {
      return folder.id !== folderId;
    });
    notes = notes.map((note) => {
      if (note.folderId === String(folderId)) {
        return { ...note, folderId: "" };
      }

      return note;
    });

    if (activeFolderId === String(folderId)) {
      activeFolderId = "all";
    }
    saveData();
    renderFolders();
    renderFolderSelect();
    renderNotes();
    return;
  }

  const folderElement = event.target.closest(".folder");

  if (!folderElement) return;

  activeFolderId = folderElement.dataset.id;
  renderFolders();
  renderNotes();
});

//delete ans edit//

notesList.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteNoteBtn")) {
    const noteId = Number(event.target.dataset.id);

    notes = notes.filter((note) => {
      return note.id !== noteId;
    });
    saveData();

    renderNotes();
  }

  if (event.target.classList.contains("editNoteBtn")) {
    const noteId = Number(event.target.dataset.id);

    const noteToEdit = notes.find((note) => {
      return note.id === noteId;
    });

    noteTitleInput.value = noteToEdit.title;
    noteTextInput.value = noteToEdit.text;
    folderSelect.value = noteToEdit.folderId;

    modal.classList.add("active");
    editingNoteId = noteToEdit.id;
    saveNoteBtn.textContent = "Save Changes";
  }
});

//save and load//
function saveData() {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));

  localStorage.setItem(FOLDERS_STORAGE_KEY, JSON.stringify(folders));
}

function isValidNote(note) {
  return (
    note &&
    typeof note === "object" &&
    typeof note.id === "number" &&
    typeof note.title === "string" &&
    typeof note.text === "string" &&
    typeof note.folderId === "string" &&
    typeof note.createdAt === "string"
  );
}

function isValidFolder(folder) {
  return (
    folder &&
    typeof folder === "object" &&
    typeof folder.id === "number" &&
    typeof folder.name === "string" &&
    typeof folder.createdAt === "string"
  );
}

function migrateOldData() {
  const oldNotes = localStorage.getItem("notes");
  const oldFolders = localStorage.getItem("folders");

  if (oldNotes) {
    try {
      const parsedNotes = JSON.parse(oldNotes);

      if (Array.isArray(parsedNotes)) {
        notes = parsedNotes.filter(isValidNote);
      }
    } catch (error) {
      console.error("Ошибка миграции старых заметок:", error);
    }
  }

  if (oldFolders) {
    try {
      const parsedFolders = JSON.parse(oldFolders);

      if (Array.isArray(parsedFolders)) {
        folders = parsedFolders.filter(isValidFolder);
      }
    } catch (error) {
      console.error("Ошибка миграции старых папок:", error);
    }
  }

  if (notes.length > 0 || folders.length > 0) {
    saveData();
  }
}

function loadData() {
  const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);

  const savedFolders = localStorage.getItem(FOLDERS_STORAGE_KEY);

  if (savedNotes === null && savedFolders === null) {
    migrateOldData();
  } else {
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);

        if (Array.isArray(parsedNotes)) {
          notes = parsedNotes.filter(isValidNote);
        }
      } catch (error) {
        console.error("Ошибка загрузки заметок:", error);

        notes = [];
      }
    }

    if (savedFolders) {
      try {
        const parsedFolders = JSON.parse(savedFolders);

        if (Array.isArray(parsedFolders)) {
          folders = parsedFolders.filter(isValidFolder);
        }
      } catch (error) {
        console.error("Ошибка загрузки папок:", error);

        folders = [];
      }
    }
  }

  renderFolders();
  renderFolderSelect();
  renderNotes();
}

loadData();

//search//

searchInput.addEventListener("input", () => {
  renderNotes();
});
