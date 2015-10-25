'use strict';

function getPhoneForFind(phone) {
    var newPhone = phone.replace(/\-|\s|\(|\)/g, '');
    return newPhone;
}
function getPhoneForOut(phone) {
    phone = phone.replace(/\-|\s|\+|\(|\)/g, '');
    var regvalidPhoneForOut = /^(\d{1})?(\d{2})?(\d{3})(\d{3})(\d{2})(\d{2})$/;
    if (phone.length >= 11) {
        return phone.replace(regvalidPhoneForOut, '+$1$2 ($3) $4-$5-$6');
    }
    if (phone.length < 11) {
        return phone.replace(regvalidPhoneForOut, '+7 ($3) $4-$5-$6');
    }
}
function getEntryForOut(entry) {
    return entry[0] + ', ' + getPhoneForOut(entry[1]) + ', ' + entry[2];
}
var phoneBook = []; // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/

module.exports.add = function add(name, phone, email) {

    // Ваша невероятная магия здесь
    firstBracket = /\(/;
    if (firstBracket.test(phone)) {
        if (phone[phone.search(/\(/) + 4] != ')') {
            return;
        }
    }
    var regvalidPhone = /^\+?(\d{1})? ?\(?\d{3}\)? ?\d{3} ?-?\d{1} ?-?\d{3}$/;
    var validPhone = regvalidPhone.test(phone);
    var regvalidEmail = /^[0-9a-zа-яё_-]+@[0-9a-zа-яё_-]+\.[a-zа-яё]+\.[a-zа-яё]{2,6}$/;
    var validEmail = regvalidEmail.test(email);
    if (validEmail && validPhone) {
        phoneBook.push([name, phone, email]);
    }
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    // Ваша удивительная магия здесь
    if (query == undefined) {
        for (var entry = 0; entry < phoneBook.length; entry++) {
            console.log(getEntryForOut(phoneBook[entry]));
        }
        return;
    }
    for (var entry = 0; entry < phoneBook.length; entry++) {
        for (var field = 0; field < phoneBook[entry].length; field++) {
            if (phoneBook[entry][field].search(query) != -1) {
                console.log(getEntryForOut(phoneBook[entry]));
            }
        }
    }
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {

    // Ваша необьяснимая магия здесь

    var count = 0;
    for (var entry = 0; entry < phoneBook.length; entry++) {
        for (var field = 0; field < phoneBook[entry].length; field++) {
            if (phoneBook[entry] != undefined && phoneBook[entry][field].indexOf(query) != -1) {
                phoneBook.splice(entry, 1);
                count++;
            }
        }
    }

    if (count % 10 == 1 && count != 11) {
        console.log('Удалена ' + count + ' контакт');
    }
    if (count > 4 && count < 21 || count % 10 == 0 || count % 10 > 4 && count % 10 <= 9) {
        console.log('Удалено ' + count + ' контактов');
    }
    if (count % 10 > 1 && count % 10 < 5) {
        console.log('Удалено ' + count + ' контакта');
    }
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {

    // Ваша чёрная магия здесь

};
