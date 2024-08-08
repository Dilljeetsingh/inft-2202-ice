import tmplContact from './contact.ejs';

export default async () => {
    const appElement = document.getElementById('app');
    appElement.innerHTML = ''; // Clear any existing content
    const strContact = tmplContact(); 
    appElement.insertAdjacentHTML("afterbegin", strContact);
};
