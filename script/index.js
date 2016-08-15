'use strict';

function loadArticleList() {
    var ul = document.getElementById('index-article-list');

    function success(response) {
        var resData = JSON.parse(response);
        resData.forEach((title) => {
            var newLine = document.createElement('li');
            newLine.innerHTML = `<a href="javascript:loadArticleContent('${title}');">${title}</a>`;
            ul.appendChild(newLine);
        });
    }

    function fail(code) {
        var newLine = document.createElement('li');
        newLine.innerText = `List Load Faild: Please Refresh Page And Try Again.`;
        ul.appendChild(newLine);
    }

    var request = new XMLHttpRequest(); // New XMLHttpRequest Object

    request.onreadystatechange = () => { // invoked when readyState changes
        if (request.readyState === 4) { // request succeed
            // response result:
            if (request.status === 200) {
                // succeed: update article
                return success(request.response);
            } else {
                // failed: show error code
                return fail(request.status);
            }
        }
    }

    // send request
    request.open('GET', '/api/index-article-list');
    request.send();
}

function loadArticleContent(articleTitle) {
    var bq = document.getElementById('index-article-content');

    function success(response) {
        bq.innerText = response;
    }

    function fail(code) {
        bq.innerText = 'Article Load Faild: Please Refresh Page And Try Again.';
        bq.innerText += `Error Code: ${code}`;
    }

    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                return success(request.response);
            } else {
                return fail(request.status);
            }
        }
    }

    request.open('GET', `/archive/${articleTitle}`);
    request.send();
}

function loadMusicRecord() {
    var ul = document.getElementById('index-music-record');

    function success(data) {
        var rawList = data.listenedSongs;
        rawList.forEach((value, index) => {
            if(index>9) return;
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerText = `${value.name} - ${value.artists[0].name}`;
            a.setAttribute('href', `http://music.163.com/#/song?id=${value.id}`);
            a.setAttribute('target', '_blank');
            li.appendChild(a);
            ul.appendChild(li);
        });
    }

    function fail(code) {
        ul.innerText = 'Article Load Faild: Please Refresh Page And Try Again.';
        ul.innerText += `Error Code: ${code}`;
    }

    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                return success(JSON.parse(request.response)['/api/user/detail/76980626']);
            } else {
                return fail(request.status);
            }
        }
    }

    request.open('GET', `/api/music-record`);
    request.send();
}

window.onload = () => {
    console.log('Welcome to Rocka\'s Node Blog! ');
    loadArticleList();
    loadMusicRecord();
}