import bookModel from "../models/book.model.js";
import mysqlPlugin from "../connection/conn.js";
const getAllBooks = async (req, reply) => {
    try {
        const bookTitle = req.query.title;
        if (bookTitle) {
            const books = await bookModel.getBookByTitle(req.server.db, bookTitle);
            if(!books) {
                reply.status(404).send({
                    error: 'Book not found'})
                    return;
            }
            reply.status(200).send(books);
        }
        else {
            const books = await bookModel.getAllBooks(req.server.db);
            console.log("all books")
            reply.status(200).send(books);
        }
    } catch (err) {
        reply.status(500).send({
            error: err.message
        });
    }
};

const addBook = async (req, reply) => {
    try {
        const books = await bookModel.addBook(req.server.db, req.body);
        reply.status(201).send({
            'Success': `A new book with title ${req.body.title} added successfully`
        })
    }
    catch (err) {
        reply.status(500).send({
            error: err.message
        })
    }
};

const editBookByTitle = async (req, reply) => {
    try {
        const newTitle = req.body.newTitle;
        const oldTitle = req.query.title;

        const result = await bookModel.editBookByTitle(req.server.db, newTitle, oldTitle);

        if (result === 0) {
            reply.status(404).send({
                error: 'Book not found'
            });
            return;
        }
        reply.status(200).send({
            'Status Code': 200,
            'Success': 'success',
            'result':result,
            'message': `Book title updated from ${oldTitle} to ${newTitle} successfully`

        });
    } catch (error) {
        reply.status(500).send({
            error: error.message
        });
    }
};

const deleteBookByTitle = async (req, reply) => {
    try {
        const title = req.body.title;
        const result = await bookModel.deleteBookByTitle(req.server.db, title);
        if (result === 0) {
            reply.status(404).send({
                error: 'Book not found'
            });
            return;
        }
        reply.send({
            Status_Code: '200',
            'Success': 'Book deleted successfully'
        });
    } catch (error) {
        reply.status(500).send({
            error: error.message
        });
    }
};

export default { getAllBooks, addBook, editBookByTitle, deleteBookByTitle };