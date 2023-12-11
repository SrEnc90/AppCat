import { add } from "./functions.js"; //! para que se vaya el error de: Uncaught SyntaxError: Cannot use import statement outside a module debo indicarle al llamado de mi script que es de tipo module, en mi archivo html: <script type="module" src="index.js"></script>
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js'

// console.log(add(1, 2)); //! Importando la function que se encuentra dentro de functions.js

const appSettings = {
    databaseURL: "https://drogueria-7070f-default-rtdb.europe-west1.firebasedatabase.app/"
}
// console.log(typeof appSettings);

const app = initializeApp(appSettings);
// console.log(app)
const database = getDatabase(app);
const moviesInDB = ref(database, "movies");

const by = {
    Id: (x) => {
        return document.getElementById(x);
    }
}

const inputFieldEl = by.Id("input-field");
const addButtonEl = by.Id("add-button");
const shoppingListEl = by.Id("shopping-list");

onValue(moviesInDB, function(snapshot) {

    if(snapshot.exists()) { //! el exists es un método de firebase que valida si hay data dentro de nuestra bbdd.
        let moviesArray = Object.entries(snapshot.val()); //! Object.entries convierte el objeto en una array de valores y llaves (ver carpeta retos 1.Object to Array.js)
        //let moviesArray = Object.values(snapshot.val()); //! Object.values convierte el objeto en una array de valores (ver carpeta retos 1.Object to Array.js)
        // console.log(moviesArray);
        clearShoppingListEl();
        moviesArray.forEach(element => {
            // console.log(element[0]);
            //! estas dos variables era para ver solo el Id que genera firebase y el valor que nosotros ingresamos  
            let currentItemID = element[0]; 
            let currentItemValue = element[1];
            appendItemToShoppingListEl(element);
        });
    } else {
        shoppingListEl.innerHTML = `<span class='alert'>No Items ... Here</span>`;
    }
    
});

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value.trim();
    if(inputValue.length !== 0) {
        push(moviesInDB, inputValue);
        // console.log(`${inputValue} added to database`);
        clearInputFieldEl(inputFieldEl);
        // appendItemToShoppingListEl(inputValue);
    }
});



const clearInputFieldEl = (element) => {
    element.value = '';
}

const appendItemToShoppingListEl = (item) => {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
    let itemID = item[0];
    let itemValue = item[1]
    let newEl = document.createElement("li");
    newEl.Id = itemID;
    newEl.textContent = itemValue;
    shoppingListEl.append(newEl);
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `movies/${itemID}`); //Especificamos la ruta para eliminar el registro específico según su Id(movies es el nombre de la bbdd nosotros podemos tener varias bbdd en una misma ruta)
        remove(exactLocationOfItemInDB);
    });
}

const clearShoppingListEl = () => {
    shoppingListEl.innerHTML = "";
}




