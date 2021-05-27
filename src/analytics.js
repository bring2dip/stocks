import mean from 'lodash/mean';
import sum from 'lodash/sum';

import logger from 'lib/logger';
import reports from 'lib/reports';

import 'css/global.css';
import 'css/analytics.module.css';

function displayHello() {
    logger.log('This is an Admin app');
    logger.log('mean', mean([5, 5, 10, 15, 20]));
    logger.log('mean', sum([5, 5, 10, 15, 20]));
    logger.log(reports.data());    
}

displayHello();