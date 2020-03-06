const fs = require('fs')
const chalk = require('chalk');

//addNote function
const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    }else {
        console.log(chalk.red.inverse('Note title taken'))
    }
}

//removeNote function
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    saveNotes(notesToKeep)
    if(notes.length === notesToKeep.length){
        console.log(chalk.red.inverse("No note found!"))
    }else{
        console.log(chalk.green.inverse("Note removed!"))
    }
}

//saveNotes function
//writes JSON object to json file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//loadNotes function
//returns JSON object of all notes
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    }catch(err){
        return []
    }
}

//listNotes
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow.bold('Your Notes:'))
    notes.forEach((note) => { console.log(note.title)
    })
}

//readNote
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.yellow(note.title +':'))
        console.log(note.body)
    }else{
        console.log(chalk.red('No note found'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}