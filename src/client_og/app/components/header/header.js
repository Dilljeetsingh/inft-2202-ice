import tmplHeader from './header.ejs';
export default async () => {
    const existingHeader = document.querySelector('.navbar');
    if (!existingHeader) {
        const strHeader = tmplHeader();
        document.getElementById('app').insertAdjacentHTML("beforebegin", strHeader);
    }
}
