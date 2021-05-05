module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    app.get('/notes', notes.findAll);
}