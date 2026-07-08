// const getAllBooks = async (mysql) => {
//     const [rows] = await mysql.execute('SELECT * FROM books');
//     return rows;
// }

// src/models/books.js
import { DataTypes } from "sequelize";

const defineBooks = (sequelize) => {
    return sequelize.define(
        "Books",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: { type: DataTypes.STRING(255), allowNull: false },
            author: { type: DataTypes.STRING(255), allowNull: false },
            price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        },
        {
            tableName: "books",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: false,
        }
    );
}
const getBookByTitle = async (db, title) => {
    // const [book] = await db.sequelize.query("SELECT title FROM books");
    const book = await db.Books.findOne({ where: { title } });
    return book;
}
const getAllBooks = async (db) => {
    const books = await db.Books.findAll();
    return books;
}

// const addBook = async (mysql, bookData) => {
//     const { title, author, price, stock } = bookData;

//     const [result] = await mysql.execute(
//         'INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)',
//         [title, author, price, stock]
//     );

//     return result;
// };

// const editBookByTitle = async (mysql, newTitle, oldTitle) => {
//     const [row] = await mysql.execute(
//         'UPDATE books SET title = ? where title = ?', [newTitle, oldTitle]
//     );

//     return row;
// }

const editBookByTitle = async (db, newTitle, oldTitle) => {
    const [result] = await db.Books.update(
        { title: newTitle },
        { where: { title: oldTitle } }
    );
    return result;
};

const addBook = async (db, bookData) => {
    const book = await db.Books.create(bookData);
    return book;
};

const deleteBookByTitle = async (db, title) => {
    return await db.Books.destroy({
        where: { title }
    });
};

export default { defineBooks, getAllBooks, addBook, editBookByTitle, deleteBookByTitle, getBookByTitle };