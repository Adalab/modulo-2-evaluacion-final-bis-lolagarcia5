'use strict';
const list = document.querySelector('.js_listUl');
const buttonSave = document.querySelector('.js_buttonSave');
const buttonRecoverData = document.querySelector('.js_recoverData');
let userData = [];

let friends = [];

function paintUsers() {
  let html = '';
  let classFriend = "";
  for (const user of userData) {
    
    const friendFoundIndex = friends.findIndex(friend => {
      return friend.login.uuid === user.login.uuid;
    });
    console.log(friendFoundIndex);
    if (friendFoundIndex !== -1) {
      classFriend = "isFriend";
    }
    else {
      classFriend = "user";
    }
    html += `<li class="li_user js_liUser ${classFriend}" id=${user.login.uuid}>`;
    html += `<img class="img" src="${user.picture.medium}"/>`;
    html += `<h2> ${user.name.first} ${user.name.last}</h2>`;
    html += `<p>${user.location.city}</p>`;
    html += `<p>${user.login.username}</p>`;
    html += `</li>`;
    list.innerHTML = html;
    listener()
  }
};

const url = 'https://randomuser.me/api/?results=10'

function listener() {
  function listener() {
  }
  const liUser = document.querySelectorAll(".js_liUser");
  for (const item of liUser) {
    item.addEventListener("click", handleClickUser);
  };
};

function handleClickUser(event) {
  console.log(event.currentTarget.id)
  event.preventDefault();
 
  const idUserSelected = event.currentTarget.id;
 
  const userFriend = userData.find(friend => {
    return friend.login.uuid === idUserSelected;
  });
  
  const friendFoundIndex = friends.findIndex(friend => { 
    return friend.login.uuid === idUserSelected;
  });
  if (friendFoundIndex === -1) { 
    friends.push(userFriend);
  }
  else { 
    friends.splice(friendFoundIndex, 1);
  }
  paintUsers();
  console.log(friends);
};

function saveUserData() {
  localStorage.setItem('userData', JSON.stringify(userData));
}
function loadUserData() {
  const usersString = localStorage.getItem('userData');
  if (usersString !== null) {
    userData = JSON.parse(usersString);
    paintUsers();
  }
  else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        userData = data.results;
        paintUsers()
        listener()
      });
  }
}

buttonSave.addEventListener('click', saveUserData);

buttonRecoverData.addEventListener('click', loadUserData);
