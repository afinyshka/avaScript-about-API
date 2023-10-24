console.log(document.documentElement); // тег <html>
console.log(document.body); // тег <body> 
console.log(document.head); // ter <head>

console.log('firstChild: ', document.body.firstChild);
console.log('lastChild: ', document.body.lastChild);
console.log('childNodes: ', document.body.childNodes); // NodeList(14) [text, div, text, comment, text, br, text, span, text, script, text, div, text, script]
console.log('children: ', document.body.children); // HTMLCollection(6) [div, br, span, script, div, script]

// Сделаем в переборе коллекции вывод проверки, является ли он div
for (let val of document.body.children) {
    console.log(val.localName === 'div' ? "Это DIV" : "Это не DIV");
}

for (let val of document.body.childNodes) {
    console.dir(val.nodeType);
}
// https://dom.spec.whatwg.org/#node
for (let val of document.body.childNodes) {
    console.dir(val.nodeValue);
}