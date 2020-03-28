/*
** https://jsonplaceholder.typicode.com
*/

/* 
** 1. XMLHttpRequest
** npm install xmlhttprequest
*/

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function reqListener() {
    console.log(this.responseText);
    console.log(JSON.parse(this.responseText)['userId']);
}

const xhr = new XMLHttpRequest();
/*
** GET request
*/
//xhr.addEventListener("load", reqListener);
//req.open("GET", "http://localhost:3000");

/*xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
xhr.onreadystatechange = function() {
    if (xhr.readyState = xhr.DONE) {
	let status = xhr.status;
	if (0 === status || (200 <= status && 400 > status))
	    console.log(xhr.responseText);
	else
	    console.log('Something has gone wrong...');
    }
};
xhr.send();*/

/*
** POST request
*/
/*
xhr.onreadystatechange = () => {
    if (xhr.DONE == xhr.readyState && 200 == xhr.status) {
	token = JSON.parse(xhr.responseText)['access_token'];
	console.log(`token: ${token}`);
    }
    else if (xhr.DONE == xhr.readyState)
	console.log(xhr.responseText);
};
xhr.open('POST', 'https://developer.api.autodesk.com/authentication/v1/authenticate');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(`client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}\
&grant_type=client_credentials&scope=data:read`);
*/

/*
** 2. Fetch
** npm install node-fetch
*/
/*
const fetch = require('node-fetch');

fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.json())
    .then(json => console.log(json))

fetch('https://api.github.com/users/bimmanager')
    .catch(err => console.error(err))
    .then(res => res.json())
    .then(json => console.log(json))

fetch('https://developer.api.autodesk.com/authentication/v1/authenticate',
      { method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	body: `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}\
&grant_type=client_credentials&scope=data:read` })
    .then(res => res.json())
    .then(json => console.log(json))
*/

/*
** 3. Axios
** npm install axios
*/

const axios = require('axios');
const querystring = require('querystring')

axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => { console.log(res.data) })
    .catch((err) => { console.error(err) })
    .finally(() => { console.log('finally')})

axios({
    method: 'post',
    url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
    data: querystring.stringify({
	client_id: `${process.env.CLIENT_ID}`,
	client_secret: `${process.env.CLIENT_SECRET}`,
	grant_type: 'client_credentials',
	scope: 'data:read' })
})
    .then((res) => { console.log(res.data) })
    .catch((err) => { console.error(err) })
    .finally(() => { console.log('done') })

