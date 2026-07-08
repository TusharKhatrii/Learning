import bookController from '../controllers/bookController.js';

const bookRoutes = async (fastify, options) => {
    fastify.get('/books', bookController.getAllBooks);
    // fastify.get('/books/:title', bookController.getBookByTitle);
    fastify.post('/addbook', bookController.addBook);
    fastify.delete('/deletebookbytitle', bookController.deleteBookByTitle);
    fastify.patch('/editbookbytitle', bookController.editBookByTitle);
};

export default bookRoutes;