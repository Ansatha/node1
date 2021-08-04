const fs = require('fs');
const readline = require('readline');

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
                console.log('\n2. Archivo "' + fileJson + '" creado. (2/4 OK)');
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
                console.log(('\n3. Archivo "' + fileJson + '" leido. (3/4 OK)'));
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
                console.log(('\n4. Archivo "' + fileJson + '" eliminado. (4/4 OK)' + '\n'));
            };
        });
    };
};

//Reto3.
console.log('\n\x1b[36m%s\x1b[0m', 'Reto 3.');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question ('Nombre: ', (answer1) => {
    rl.question ('Apellido: ', (answer2) => {
        rl.question ('Edad: ', (answer3) => {
            let myPerson = new Person (answer1, answer2, answer3);
            rl.close();
            console.log('\n1. objeto Person \'myPerson\' creado por consola. (1/4 OK)');
            console.log(myPerson);
            let contactsFile = 'contactsFile.json';
            myPerson.writeNReadJson(contactsFile);
        });
    });
});