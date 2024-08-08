import tmplHome from './home.ejs';

export default async () => {
    const appElement = document.getElementById('app');
    appElement.innerHTML = ''; // Clear any existing content
    const strHome = tmplHome();
    appElement.insertAdjacentHTML("afterbegin", strHome);
}
