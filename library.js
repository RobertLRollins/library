function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? 'Yes' : 'No';
}

const books = [
    new Book("Neuromancer", "William Gibson", 271, false),
    new Book("Do Androids Dream of Electric Sheep?", "Philip K. Dick", 210, true),
    new Book("1984", "George Orwell", 328, true),
    new Book("Brave New World", "Aldous Huxley", 264, false),
    new Book("Fahrenheit 451", "Ray Bradbury", 194, true),
    new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 224, false),
    new Book("Dune", "Frank Herbert", 896, true),
    new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, false),
    new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, true)
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

        const notTitle = document.createElement('div');

        const bottomDiv = document.createElement('div');
        bottomDiv.className = 'bottomDiv';

        const readDiv = document.createElement('div');

        const readLabel = document.createElement('label');
        readLabel.textContent = 'Read: ';
        readLabel.htmlFor = 'read-status-' + index;

        const readDropdown = document.createElement('select');
        readDropdown.id = 'read-status-' + index;
        readDropdown.innerHTML =
            `
            <option value="Yes" ${book.read === 'Yes' ? 'selected' : ''}>Yes</option>
            <option value="No" ${book.read === 'No' ? 'selected' : ''}>No</option>
        `;
        readDropdown.onchange = (event) => toggleReadStatus(index, event.target.value);

        const removeButton = document.createElement('img');
        removeButton.src = 'delete.svg';
        removeButton.alt = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.setAttribute('data-index', index);
        removeButton.onclick = removeBook;

        readDiv.appendChild(readLabel);
        readDiv.appendChild(readDropdown);

        bottomDiv.appendChild(readDiv);
        bottomDiv.appendChild(removeButton);

        notTitle.appendChild(author);
        notTitle.appendChild(pages);
        notTitle.appendChild(bottomDiv);

        card.appendChild(title);
        card.appendChild(notTitle);

        container.appendChild(card);
    });
}

function addBook(event) {
    event.preventDefault(); // Prevent form submission

    const form = document.getElementById('new-book-form');
    const title = form.querySelector('[name="title"]').value;
    const author = form.querySelector('[name="author"]').value;
    const pages = form.querySelector('[name="pages"]').value;
    const read = form.querySelector('[name="read"]').value === 'Yes'; // Get the selected value of the read dropdown

    const newBook = new Book(title, author, pages, read)

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

function toggleReadStatus(bookIndex, newReadValue) {
    books[bookIndex].read = newReadValue;
    displayBooks();
}

document.getElementById('new-book-button').addEventListener('click', () => {
    document.getElementById('new-book-dialog').showModal();
});

document.getElementById('new-book-form').addEventListener('submit', addBook);

displayBooks();