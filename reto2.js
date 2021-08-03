const fs = require('fs');

class Person {
    
    name;
    surname;
    age;

    constructor(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    };

    writeNReadJson(fileJson) {
        let data = JSON.stringify(this);
        fs.writeFile(fileJson, data, error => {
            if (error) {
                console.log('Error: Fallo de escritura');
            }
            else {
                console.log('1. Archivo "' + fileJson + '" creado. (1/3 OK)');
                this.readJson(fileJson);
            };
        });
    };

    readJson(fileJson) {
        fs.readFile(fileJson, (error, readData) => {
            if (error) {
                console.log('Error: Fallo de lectura.');
            }
            else {
                console.log(('\n2. Archivo "' + fileJson + '" leido. (2/3 OK)'));
                console.log(JSON.parse(readData));
                this.removeJson(fileJson);
            };
        });
    };

    removeJson(fileJson) {
        fs.rm(fileJson, (err) => {
            if(err) {
                console.log('Error: Fallo de eliminación.');
            }
            else {
                console.log(('\n3. Archivo "' + fileJson + '" eliminado. (3/3 OK)' + '\n'));
            };
        });
    };
};

//Reto2.
console.log('\n\x1b[36m%s\x1b[0m', 'Reto 2.');
let myPerson = new Person ('Thomas', 'Anderson', 39);
let contactsFile = 'contactsFile.json';
myPerson.writeNReadJson(contactsFile);