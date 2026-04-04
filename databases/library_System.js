const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
.then(()=>console.log("Library DB Connected"))
.catch(err=>console.log(err));


// ---------- SCHEMA ----------
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    available: { type: Boolean, default: true },
    borrowedBy: { type: String, default: null }
});

const Book = mongoose.model("Book", bookSchema);


// ---------- OPERATIONS ----------

// 1. Add new book
async function addBook() {
    const book = new Book({
        title: "DBMS",
        author: "Korth"
    });
    await book.save();
    console.log("Book Added");
}


// 2. Find books by author
async function findByAuthor(authorName) {
    const books = await Book.find({ author: authorName });
    console.log(books);
}


// 3. Update book availability
async function updateAvailability(title, status) {
    await Book.updateOne(
        { title: title },
        { available: status }
    );
    console.log("Availability Updated");
}


// 4. Track borrowed books
async function borrowBook(title, user) {
    await Book.updateOne(
        { title: title, available: true },
        { available: false, borrowedBy: user }
    );
    console.log("Book Borrowed");
}

const order = {
    orderId: NumberInt(12345),                 // Integer
    orderDate: new Date("2024-01-15"),         // Date type
    totalAmount: NumberDecimal("99.99"),       // Decimal
    items: ["item1", "item2"]                  // Array (same)
};

console.log(order);

