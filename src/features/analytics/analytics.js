import mean from 'lodash/mean';
import sum from 'lodash/sum';

import logger from 'lib/logger';
import reports from 'lib/reports';

import 'css/global.css';
import styles from './analytics.module.css';

function displayHello() {
    logger.log('This is an Admin app');
    logger.log('mean', mean([5, 5, 10, 15, 20]));
    logger.log('mean', sum([5, 5, 10, 15, 20]));
    logger.log(reports.data());
    document.body.innerHTML = `
        
        <h1 class=${styles.title}">Analytics</h1>
        <h3 class=${styles.title}">This is analytics.</h3>        
    `;
}

displayHello();