const nameLogin = document.getElementById("userName");
const btnLogin = document.getElementById("btnLogin");

const Users = document.getElementById("nameUser");

Users.textContent = localStorage.getItem("nombre");


btnLogin.addEventListener('click',()=>{

  const nameP = nameLogin.value
  localStorage.setItem("nombre", nameP);
  
  // console.log(nameP);

})