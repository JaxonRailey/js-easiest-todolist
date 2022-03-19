$ = document.querySelector.bind(document);

class Todo {

    items = [];

    constructor() {
        this.items = JSON.parse(localStorage.getItem('items')) || [];
        this.show();
    }

    show() {
        $('ul').innerHTML = '';
        this.items.forEach(item => {
            let li = '<li>' + this.sanitize(item.text) + '<button onclick="todo.delete(\'' + item.id + '\')"><span></span></button></li>';
            $('ul').innerHTML += li;
        });
    }

    add(text) {
        this.items.unshift({id: Date.now(), text:text});
        localStorage.setItem('items', JSON.stringify(this.items));
        $('input').value = '';
        this.show();
    }

    delete(id) {
        this.items = this.items.filter(item => item.id != id);
        localStorage.setItem('items', JSON.stringify(this.items));
        this.show();
    }

    sanitize(string) {
        return string.replace(/[^\w. ]/gi, function(letter) {
            return '&#' + letter.charCodeAt(0) + ';';
        });
    };
}

const todo = new Todo();

$('input').addEventListener('keypress', function(e) {
    if (this.value.length && e.key === 'Enter') {
        e.preventDefault();
        todo.add(this.value);
    }
});
