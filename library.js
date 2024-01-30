function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? 'Yes' : 'No';
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

const books = [
    new Book("1984", "George Orwell", 328, true),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false),
    new Book("To Kill a Mockingbird", "Harper Lee", 281, true)
];

function displayBooks() {
    const container = document.getElementById('books-container');
    container.innerHTML = ''; // Clear existing content

    books.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;

        const read = document.createElement('p');
        read.textContent = `Read: ${book.read}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('data-index', index);
        removeButton.onclick = removeBook;

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Toggle Read Status';
        toggleReadButton.setAttribute('data-index', index);
        toggleReadButton.onclick = toggleReadStatus;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(removeButton);
        card.appendChild(toggleReadButton);

        container.appendChild(card);
    });
}

function addBook(event) {
    event.preventDefault(); // Prevent form submission

    const form = document.getElementById('new-book-form');
    const newBook = new Book(
        form.title.value,
        form.author.value,
        form.pages.value,
        form.read.checked
    );

    books.unshift(newBook); // Add the new book to the start of the array
    displayBooks(); // Update the display
    form.reset(); // Reset the form for the next entry
    document.getElementById('new-book-dialog').close(); // Close the modal
}

function removeBook(event) {
    const index = event.target.getAttribute('data-index');
    books.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(event) {
    const index = event.target.getAttribute('data-index');
    books[index].toggleRead();
    displayBooks();
}

// Event listener for the new book form submission
document.getElementById('new-book-form').addEventListener('submit', addBook);

// Event listener for the new book button
document.getElementById('new-book-button').addEventListener('click', () => {
    document.getElementById('new-book-dialog').showModal();
});

displayBooks();