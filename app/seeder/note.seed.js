const mongoose = require("mongoose");
const Note = require("../models/note.model");
const dbConfig = require("../../config/database.config");

const notes = [];

for(let i=1;i<10000;i++) {
    notes.push(new Note({
        title: `Title ${i+1}`,
        content: `Content ${i+1}`
    }))
}

mongoose
    .connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
        console.log(err.stack);
        process.exit(1);
    })
    .then(async () => {
        await console.log("connected to db in development environment in seeder file");
    });

notes.map(async (n, index) => {
    await n.save((err, result) => {
        if (index === notes.length - 1) {
            console.log("DONE!");
            mongoose.disconnect();
        }
    });
});