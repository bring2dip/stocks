import format from 'date-fns/fp/format';
import { mean, min, max, median, std } from 'mathjs';
import subDays from 'date-fns/fp/subDays';
import round from 'lodash/round';
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { css } from '@emotion/css';

import * as finnhub from 'finnhub';

const API_KEY= process.env.FINHUB_KEY;

const finhubAuthentication = finnhub.ApiClient.instance.authentications['api_key'];
finhubAuthentication.apiKey = API_KEY

const finnhubClient = new finnhub.DefaultApi();

const getById = (id) => document.getElementById(id);

function bold(text) {
    return h('b', {}, text);
}

function  getData(symbol, startTime, endTime) {
  return new Promise((resolve, reject) => {
    finnhubClient.stockCandles(symbol, "D", startTime, endTime, {}, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });   
  });
}

const statsFunctionsMap = {    
  min,
  max,
  mean,
  median,  
  std,
};

const getUnixTime = (date) => {
    return Math.floor(date.getTime()/1000);
}

const MAX_NUMS = 40;

async function displayTable(stockGrid, symbolInput) {
    const today = new Date();
    const subtractMaxDays = subDays(MAX_NUMS);
    const formatDate = format('dd MMM');
    const startDate = subtractMaxDays(today);
    const endDate = today;
    const loadingDiv = getById('stocks-loading-container');
    loadingDiv.innerHTML = 'Loading...';
    const responseData = await getData(
        symbolInput.toUpperCase(),
        getUnixTime(startDate), getUnixTime(endDate),
    );
    responseData.hlDiff = [];
    responseData.coDiff = [];
    loadingDiv.innerHTML = '';

    console.log(responseData);
    let data = [];
    const totalDays = responseData.c.length;
    for(let i=0; i < totalDays; i++) {
        const hlDiff = responseData.h[i] - responseData.l[i];
        const coDiff = responseData.c[i] - responseData.o[i];
        responseData.hlDiff.push(hlDiff);
        responseData.coDiff.push(coDiff);
        data.push([
            formatDate(new Date(responseData.t[i] * 1000)),
            round(responseData.o[i], 2),
            round(responseData.h[i], 2),
            round(responseData.l[i], 2),
            round(responseData.c[i], 2),
            round(responseData.v[i], 2),
            round(hlDiff, 2),
            round(coDiff,2), 
        ]);
    }
    data.push(['-', '-', '-', '-', '-', '-', '-', '-']);
    const stats = ['max', 'min', 'mean', 'median', 'std'];
    stats.forEach(statItem => {
        data.push([
            bold(statItem),
            round(statsFunctionsMap[statItem](responseData.o), 2),
            round(statsFunctionsMap[statItem](responseData.h), 2),
            round(statsFunctionsMap[statItem](responseData.l), 2),
            round(statsFunctionsMap[statItem](responseData.c), 2),
            round(statsFunctionsMap[statItem](responseData.v), 2),
            round(statsFunctionsMap[statItem](responseData.hlDiff), 2),
            round(statsFunctionsMap[statItem](responseData.coDiff), 2),
        ]);
    });    
    stockGrid.updateConfig({        
        data,        
    }).forceRender();    
}

const styles = {
    container: css`
      * {
        font-family: 'Tahoma';
      }
    `,
    table: css`
      tr:hover td {
        background-color: rgba(0, 0, 0, 0.1);
      }
    `,
    th: css`
      text-align: right;
      &:hover {
        background-color: #999;
        color: #fff;
      }
    `,
    td: css`
      color: #555;
      text-align: right;
      &:hover {
        color: #000;
      }
    `
  };

window.addEventListener('load', () => {
    const fetchBtn = getById('stocks-fetch-btn');
    const symbolInput = getById('stocks-symbol');
    const dataContainer = getById('stocks-table-container');

    const stockGrid = new Grid({
        columns: ['Date', 'Open', 'High', 'Low', 'Close', 'Volume', 'HLDiff', 'CODiff'],
        data: [['-', '-', '-', '-', '-', '-', '-', '-']],
        className: styles,
    });

    stockGrid.render(dataContainer);
    displayTable(stockGrid, symbolInput.value);

    fetchBtn.addEventListener('click', () => {  
        const { value } = symbolInput;                  
        if (!value) return;
        displayTable(stockGrid, value);
    });

    symbolInput.addEventListener('keydown', (e) => { 
        const { value } = symbolInput;       
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (!value) return;
            displayTable(stockGrid, value);
        }    
    });

});
