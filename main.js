'use strict';

const URL = 'https://randomuser.me/api/?results=10';

let usuarios = document.querySelector (".usuarioslist");
let card= document.querySelector (".cardid");
let userstorage =[]



console.log(localStorage.getItem('user'))
if(localStorage.getItem('user')!='undefined'){
  userstorage = JSON.parse(localStorage.getItem ('user'));
}


function extraerdatos() {
    fetch (URL)
.then ((response) => response.json())
.then((data) => {
    console.log(data)
    for (let i = 0; i < data.results.length; i++) {
        let datouser = {}
        datouser = {
            picture:data.results[i].picture.thumbnail,
            title:data.results[i].name.title,
            first:data.results[i].name.first,
            last:data.results[i].name.last,
            country:data.results[i].location.country,
            username:data.results[i].login.username,
            id_name:data.results[i].id.name,
            id_value:data.results[i].id.value,

            isFriend:false
        }

        guardarusuario(datouser)
        mostrarusuario(datouser)
}});
  }

function guardarusuario(datos){
    localStorage.setItem('user', JSON.stringify(datos));
  }

function mostrarusuario(datos){
    console.log(datos)
   
    usuarios.innerHTML += 
    `<li class="cardid">
     <img class="card" src="${datos.picture}">
    <p>
    ${datos.title}
    ${datos.first}
    ${datos.last}
    </p>
    <p> ${datos.country}</p>
    <p>${datos.username}</p> 
    </li>`
  }


guardarusuario()
extraerdatos()

const button = document.querySelector('.alert');

button.addEventListener('click', (event) => {
  console.log('Alert');
});




