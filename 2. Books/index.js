import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js'

const appSettings = {
    databaseURL: "https://drogueria-7070f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const booksInDB = ref(database, "books");

const booksEl = document.getElementById("books");

//el onValue es para leer la data y escuchar cualquier cambio para actualizarlo a la vista(creo, leer la documentación)
onValue(booksInDB, function (snapshot) {
    clearBooksListEL();
    let booksArray = Object.values(snapshot.val()); 
    // console.log(booksArray);
    booksArray.forEach(element => {
        console.log(element);
        appendBookToBooksListEl(element);
    })
});

function clearBooksListEL() {
    booksEl.innerHTML = "";
}

function appendBookToBooksListEl(bookValue) {
    booksEl.innerHTML += `<li>${bookValue}</li>`;
}