const url = 'https://www.reddit.com/r/funny.json';
const tableBody = document.querySelector('#tbody');
//global declaration
let response, children, data = null;

//creating table contents
function createElement(nameOfTag, text) {
    const element = document.createElement(nameOfTag);
    const content = document.createTextNode(text);
    element.appendChild(content);
    return element;
}

//sorting each field
function sortByField(field) {
    switch (field) {
        case ('title'):
            data = children.sort((a, b) => (a.data.title > b.data.title) ? 1 : (a.data.title < b.data.title) ? -1 : 0)
            break;
        case ('ups'):
            data = children.sort((a, b) => (a.data.ups > b.data.ups) ? 1 : (a.data.ups < b.data.ups) ? -1 : 0)
            break;
        case ('downs'):
            data = children.sort((a, b) => (a.data.downs > b.data.downs) ? 1 : (a.data.downs < b.data.downs) ? -1 : 0)
            break;
        case ('score'):
            data = children.sort((a, b) => (a.data.score > b.data.score) ? 1 : (a.data.score < b.data.score) ? -1 : 0)
            break;
        case ('num_comments'):
            data = children.sort((a, b) => (a.data.num_comments > b.data.num_comments) ? 1 : (a.data.num_comments < b.data.num_comments) ? -1 : 0)
            break;
        case ('created'):
            data = children.sort((a, b) => (a.data.created > b.data.created) ? 1 : (a.data.created < b.data.created) ? -1 : 0)
            break;
    }
    //replacing old elements with new ones
    const old_tbody = document.getElementById('tbody');
    const new_tbody = document.createElement('tbody');
    new_tbody.setAttribute('id', 'tbody');
    data.forEach(result => {
        const row = createTableRow(result.data);
        new_tbody.appendChild(row);
    });
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}


//counting proportion of votes
//score=ups/downs
//if the downvote is 0, don't account 
function getBest() {
    var score = [];
    for (let i = 0; i < children.length; i++) {
        if (children[Object.keys(children)[i]].data.downs != 0) {
            score[i] = children[Object.keys(children)[i]].data.ups / children[Object.keys(children)[i]].data.downs;
        } else {
            score[i] = children[Object.keys(children)[i]].data.ups;
        }
    }
    var maxOfArray = Math.max.apply(Math, score);
    for (let i = 0; i < children.length; i++) {
        if (children[Object.keys(children)[i]].data.downs != 0 && (children[Object.keys(children)[i]].data.ups * children[Object.keys(children)[i]].data.downs) == maxOfArray) {
            document.getElementById('sort').innerHTML = children[Object.keys(children)[i]].data.title;
        } else if (children[Object.keys(children)[i]].data.ups == maxOfArray) {
            document.getElementById('sort').innerHTML = children[Object.keys(children)[i]].data.title;
        }
    }
}


function sortData() {
    var timeNow = new Date().getTime();
    timeNow = Math.round(timeNow / 1000);
    var timeYesterday = timeNow - (24 * 3600);
    timeYesterday = Math.round(timeYesterday);
    var rightDate = [];
    var titleFrom24h = [];

    for (let i = 0; i < children.length; i++) {
        if (children[Object.keys(children)[i]].data.created <= timeNow && children[Object.keys(children)[i]].data.created >= timeYesterday) {
            rightDate[i] = children[Object.keys(children)[i]].data.created;
            titleFrom24h[i] = children[Object.keys(children)[i]].data.title;
        }
    }

    const element = document.getElementById("sort");

    //remove zeros from array
    var filtered = rightDate.filter(function(el) {
        return el != null;
    });
    //display of titles
    for (let m = 0; m < filtered.length; m++) {
        var content = document.createTextNode((m+1) + ") " + '"' + (titleFrom24h[Object.keys(titleFrom24h)[m]]) + '"'+ " ");
        element.appendChild(content);
    }

}

const createTableRow = (entry) => {
    const row = document.createElement('tr');
    const {
        title,
        ups,
        downs,
        score,
        num_comments,
        created,
    } = entry;

    //now
    var timeNow = new Date().getTime();
    var dateNow = new Date(timeNow);
    //yesterday
    var timeYesterday = timeNow - (24 * 3600);
    //data from API
    var d = new Date(entry.created * 1000);
    //converting
    var convertedDate = d.toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    // quotation marks
    var t = '"' + entry.title + '"';


    myJSON = {
        "posts": [{
            "title": t,
            "upvotes": entry.ups,
            "downvotes": entry.downs,
            "score": entry.score,
            "num_comments": entry.num_comments,
            "created": convertedDate,
        }, ],
        "count": "dontknow"
    }
    var stringify = JSON.stringify(myJSON);

    row.appendChild(createElement('td', t))
    row.appendChild(createElement('td', ups))
    row.appendChild(createElement('td', downs))
    row.appendChild(createElement('td', score))
    row.appendChild(createElement('td', num_comments))
    row.appendChild(createElement('td', convertedDate))
    return row;
}




const init = async() => {
    response = await fetch(url).then(resp => resp.json())
    children = response['data']['children'];
    const rows = children.map(entry => createTableRow(entry.data));
    rows.forEach(element => {
        tableBody.appendChild(element);
    });
}


init();
