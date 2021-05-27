import format from 'date-fns/fp/format';
import logger from 'lib/logger';
import welcome from 'lib/welcome';

import buttonHTML from 'templates/button.html';

import logo from 'images/cardboard.png';
import heartSVG from 'images/heart.svg';

import 'css/global.css';
import styles from 'css/index.module.css';

function displayHello() {
    welcome.message();
    logger.log('This is an app');
    logger.log(welcome.credits);
    console.log('Today is', format('d MMM')(new Date()));
    document.body.innerHTML = `
        <img class="${styles.logo}" src=${logo} alt="logo"/>
        <h1 class=${styles.title}">App</h1>
        <h3 class=${styles.title}">This is an app.</h3>        
        ${buttonHTML}
        <div class=${styles.heart}>Made with ${heartSVG} by Deepak</div>
    `;
}

displayHello();
