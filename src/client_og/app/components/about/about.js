import tmplAbout from './about.ejs';

export default async () => {
    // Get the template content
    const strAbout = tmplAbout();

    // Clear existing content in the app div
    const appElement = document.getElementById('app');
    appElement.innerHTML = ''; // Clear the previous content

    // Insert the About content
    appElement.insertAdjacentHTML("afterbegin", strAbout);
}
