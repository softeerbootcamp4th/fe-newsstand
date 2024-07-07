import { showmysub } from "../displaynews/displaysubscribe.js";

const localpath = '../../news/allnews.json';
var filteredit = "";

document.addEventListener('DOMContentLoaded', function() {
    fetch('../../news/allnews.json')
        .then(response => response.json())
        .then(data => {
            filteredit = data;
            const datas1 = localStorage.getItem("mysubscribe");
            if (!datas1) {
                console.log('No data found in localStorage');
            }
            
            //필수
            const parsedData = JSON.parse(datas1);
            console.log(filteredit);

            parsedData.forEach(subscription => {
                var temp = filteredit.filter(item => item.pressName === subscription);
                showmysub(temp[0], subscription);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
    });


