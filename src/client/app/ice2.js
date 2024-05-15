console.log('hello world');

const myheading = document.getElementById('heading');
myheading.textContent = "this is my heading!";
console.log(myheading);

const myContent = document.getElementById('my-content');

const p = document.createElement('p');
p.textContent = 'I made this with javascript!';

myContent.append(p);

let container = document.createElement("div");

let p2 = document.createElement("p");
p2.textContent = "I am a paragraph";

container.appendChild(p2);

let span = document.createElement("span");
span.textContent = "new span";

p2.before(span);

console.log(container.outerHTML);

myContent.append(container);

const divbox2 = document.getElementById('div-02');
divbox2.remove();

const button = document.createElement('button');
button.innerText = 'Click Me!';

myContent.append(button);

const buttonClickHandler = (event) => {

    console.log(event.target.innerText);
    alert('i was clicked!!');

    const divbox1 = document.getElementById('div-01');

    divbox1.remove();
};

button.addEventListener('click', buttonClickHandler);