// Challenge: Create a let variable called 'scrimbaUsersEmails' and use one of Object
// methods to set it equal to an array with the values
const scrimbaUsers = {
    "01": "carlos.encarnacion@adexperu.org.pe",
    "02": "sebastian.diaz@adexperu.org.pe",
    "03": "gabriela.blas@adexperu.org.pe"
}

let scrimbaUsersEmails =  Object.values(scrimbaUsers)
console.log(scrimbaUsersEmails);


// Challenge: Create a let variable called 'scrimbaUsersIDs' and use one of Object methods to
// set it equal to an array with the keys
let scrimbaUsersIDs = Object.keys(scrimbaUsers);
console.log(scrimbaUsersIDs);

// Challenge: Create a let variable called 'scrimbaUsersEntries' and use one of Object 
// methods to set it equal to an array with the both the keys and values
let scrimbaUsersEntries = Object.entries(scrimbaUsers);
console.log(scrimbaUsersEntries);