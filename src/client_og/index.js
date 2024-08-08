import Navigo from 'navigo';
import 'bootstrap';
import './scss/styles.scss';
import './img/nullundefient.jpg'
import HeaderComponent from './app/components/header/header.js';
import FooterComponent from './app/components/footer/footer.js';
import HomeComponent from './app/components/home/home.js';
import AboutComponent from './app/components/about/about.js';
import ContactComponet from './app/components/contact/contact.js';
import AddComponet from './app/components/add/add.js';
import ListComponet from './app/components/list/list.js';

console.log("Hello World!");

export const router = new Navigo('/');

window.addEventListener('load', () => {
    HeaderComponent();
    FooterComponent();

    router
        .on('/', HomeComponent)
        .on('/about', AboutComponent)
        .on('/contact', ContactComponet)
        .on('/add', AddComponet)
        .on('/list', ListComponet)
        .resolve();
});
