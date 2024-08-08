import tmplList from './list.ejs';

export default async () => {
    const appElement = document.getElementById('app');
    appElement.innerHTML = ''; // Clear any existing content
    const strList = tmplList(); 
    appElement.insertAdjacentHTML("afterbegin", strList);
};
