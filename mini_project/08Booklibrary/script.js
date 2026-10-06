const bookInput = document.querySelector(".bookInput");
const authorInput = document.querySelector(".authorInput");
const searchInput = document.querySelector(".searchInput");
const addBtn = document.querySelector(".addBtn");
const bookList = document.querySelector(".bookList");

let books = [];

addBtn.addEventListener("click", function () {
  addBook();
});

bookInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addBook();
  }
});

authorInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addBook();
  }
});

function addBook() {
  const bookTitle = bookInput.value.trim();
  const authorName = authorInput.value.trim();

  if (bookTitle === "" || authorName === "") {
    return;
  }

  const newBook = {
    title: bookTitle,
    author: authorName,
  };

  books.push(newBook);

  saveBooks();
  renderCurrentBooks();

  bookInput.value = "";
  authorInput.value = "";

  bookInput.focus();
}

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.trim().toLowerCase();

  const result = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText)
    );
  });

  renderBooks(result);
});

function renderBooks(booksToRender) {
  bookList.innerHTML = "";

  if (booksToRender.length === 0) {
    bookList.textContent = "Книги не найдены";
    return;
  }

  booksToRender.forEach((book) => {
    const bookBox = document.createElement("div");
    const name = document.createElement("h3");
    const authorName = document.createElement("p");
    const deleteBtn = document.createElement("button");

    name.textContent = "Название: " + book.title;
    authorName.textContent = "Автор: " + book.author;
    deleteBtn.textContent = "Удалить";

    bookBox.append(name);
    bookBox.append(authorName);
    bookBox.append(deleteBtn);

    bookList.append(bookBox);

    deleteBtn.addEventListener("click", function () {
      const bookIndex = books.indexOf(book);

      if (bookIndex === -1) return;

      books.splice(bookIndex, 1);

      saveBooks();
      renderCurrentBooks();
    });
  });
}

function renderCurrentBooks() {
  const searchText = searchInput.value.trim().toLowerCase();

  const result = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText)
    );
  });

  renderBooks(result);
}

function isValidBook(book) {
  return (
    book &&
    typeof book === "object" &&
    typeof book.title === "string" &&
    typeof book.author === "string"
  );
}

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBooks() {
  const savedBooks = localStorage.getItem("books");

  if (savedBooks === null) {
    books = [];
    return;
  }

  try {
    const data = JSON.parse(savedBooks);

    if (!Array.isArray(data)) {
      books = [];
      return;
    }

    books = data.filter(isValidBook);
  } catch (error) {
    console.log("Book Library load error:", error);

    books = [];
  }
}

loadBooks();
renderCurrentBooks();
