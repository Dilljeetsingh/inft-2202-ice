import tmplAdd from './add.ejs';

export default async () => {
    const appElement = document.getElementById('app');
    appElement.innerHTML = ''; // Clear any existing content
    const strAdd = tmplAdd(); 
    appElement.insertAdjacentHTML("afterbegin", strAdd);
};
