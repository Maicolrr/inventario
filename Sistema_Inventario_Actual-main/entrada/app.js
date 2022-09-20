import { getProducts, sendProduct } from '../entrada/firebase.js';

const countTotal = document.getElementById("countTotal")
const envioRegistro = document.getElementById("envioRegistro")
const filtroName = document.getElementById("filtroName")
const filtroEmbalaje = document.getElementById("filtroEmbalaje")
const carrito = []
const ContNameAccount=[]

let sumas = 0;


window.addEventListener('DOMContentLoaded', async () => {
  console.log(ContNameAccount)
  
  
  // const Prcdt = {}
  getProducts((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      createCards(doc.data())
      
      // carrito(doc.data())
      carrito.push(doc.data())
      carrito.map(data => {
        sumas+=Number(data.quantity)
        countTotal.textContent = sumas
        ContNameAccount.push(data.nameAccount)
      })
    })
    const admi= [...new Set(ContNameAccount)];
    console.log(admi);
    const listName=()=>{
      admi.map(data=>{
            const option = document.createElement('option');
            option.textContent = data;
            option.value=data;
            console.log(option.value);
            filtroName.appendChild(option);
      })

      
      
      resFilter.map(Prcdt=> createCards(Prcdt))

    }
    listName()
    filtroNameACC(doc.data())

    listEmbalaje(doc.data())
  })
})

filtroEmbalaje.addEventListener('change',listEmbalaje);
filtroName.addEventListener('change',filtroNameACC);

const fecha = document.getElementById("date")
const name = document.getElementById("name")
const cantidadProducto = document.getElementById("cantidad")
const embalaje = document.getElementById("option")
const table = document.getElementById("containerList")
const containerTBLS = document.getElementById("CTtd")
const producto = document.getElementById("producto")

const newImage = document.getElementById("image")
const contador = document.getElementById("contador")


let conteo = 0
let imgSelected = ""

if (newImage) {
  newImage.addEventListener('change', (event) => {
    const currentImg = event.target.files[0]
    const objectURL = URL.createObjectURL(currentImg)
    imgSelected = objectURL
  })
}


// uploadImage
// let imgSelected = ""
newImage.addEventListener('click', () => {
  widget_cloudinary.open();
}, false);



// funcion para entregarme la imagen para el nuevo elemento.

let widget_cloudinary = cloudinary.createUploadWidget({
  cloudName: 'b9',
  uploadPreset: 'Inventario'
}, (err, result) => {
  if (!err && result && result.event === 'success') {
    console.log('Imagen subida con éxito', result.info);
    newImage.src = result.info.secure_url;
    imgSelected = result.info.secure_url
    console.log(imgSelected);
  }
});



// +++++++++++++++++++
if (envioRegistro) {
  envioRegistro.addEventListener('click', async () => {
    const product = {
      nameAccount: localStorage.getItem("nombre"),
      name: name.value,
      date: fecha.value,
      quantity: cantidadProducto.value,
      packages: producto.options[producto.selectedIndex].text,
      img: imgSelected,
      contArticulo: conteo
    }

        // validaciones
  
        if (name.value === '' && fecha.value === '' && cantidadProducto.value === '' && producto.value === '') {
          alert("Los campos estan vacios");
        } 
        
        else if (name.value === '') {
          alert("Por favor agregue nombre del producto");
        }
        
        else if (fecha.value === '') {
          alert("Por favor agregue la fecha");
        }
    
        else if (cantidadProducto.value <0) {
          alert("No se permiten valores negativos")
          cantidadProducto.value=""
        }
    
        else if (cantidadProducto.value == 0) {
          alert("No se permiten valores vacios")
          cantidadProducto.value=""
        }
      
        else if (cantidadProducto.value === '') {
          alert("Por favor inserte la cantidad de productos");
        }
      
        else if (producto.value === 'Selecciona el embalaje') {
          alert("Por favor elija el tipo de embalaje");
        } 
    
        else if (imgSelected === '') {
          alert('Por favor agregue una imagen');
        }
    
        else{
          alert("Producto registrado con exito");
          await sendProduct(product);
          name.value= ""
          fecha.value=""
          cantidadProducto.value=""
          producto.value="Selecciona el embalaje"
          location.reload(imgSelected);
        }

  })
}

function listEmbalaje(event){
  
  const responseFilter = event.target.value === 'Papel'
  ?carrito.filter(Prcdt=> Prcdt.packages==='Papel')
  
  : event.target.value === 'Carton'
  ?carrito.filter(Prcdt=> Prcdt.packages==='Carton')
  
  : event.target.value === 'Metal'
  ?carrito.filter(Prcdt=> Prcdt.packages==='Metal')
  
  : event.target.value === 'Plastico'
  ?carrito.filter(Prcdt=> Prcdt.packages==='Plastico')
  
  : event.target.value === 'Vidrio'
  ?carrito.filter(Prcdt=> Prcdt.packages==='Vidrio')
  : null;
  containerTBLS.innerHTML= '';
  
  responseFilter.map(Prcdt=> createCards(Prcdt))
   

  // responseFilter.map(prcdt=>{
  //   createCards(prcdt)

  // })
// console.log(event.target.value === 'carton');
}
function filtroNameACC(event){

  
  // const resFilter = event.target.value === Prcdt.nameAccount
  // ?carrito.filter(Prcdt=> Prcdt.nameAccount===option.value)
  // : null;
  // containerTBLS.innerHTML= '';
  // resFilter.map(Prcdt=> createCards(Prcdt))
  
  
  // responseFilter.map(Prcdt=> createCards(Prcdt))
  // const resFilter = event.target.value === option.data
  // ?carrito.filter(Prcdt=> Prcdt.nameAccount===option.data)
  // : null;
  // containerTBLS.innerHTML= '';
  

}
// function  listName() {
//   // ContNameAccount.map(data=>{
//   //   const option = document.createElement('option');
//   //   option.textContent = data.nameAccount;
//   //   console.log(ContNameAccount);
//   //   filtroName.appendChild(option);
//   console.log('entrando a list name');
//   }


//---------------------------------------------------
  // let existe=0
  // ContNameAccount.map(()=>{
  //   existe++
  //   if(existe ==1){
  //     const option = document.createElement('option');
  //     option.textContent = nameAccount;
  //     filtroName.appendChild(option)
  //   }
  // })

//-----------------------------------------------

  // const personas = carrito.filter(p=>p.nameAccount);
  // console.log(personas)
  // personas.map(()=>{
  //   const option = document.createElement('option');
  //   option.textContent = nameAccount;
  //   filtroName.appendChild(option)
  // })

//-----------------------------------------

function rendersCarts(){
  carrito.map(Prcdt => {Prcdt.nameAccount === filtroName.value ? createCards(Prcdt) : null})
}

function createCards(Prcdt) {

  const { name, img, quantity, date, nameAccount, packages } = Prcdt

  conteo++
  contador.textContent = conteo
  

  const containerT = document.createElement('tr');

  const tdImg = document.createElement('td');
  tdImg.className += "tdImg"
  const imgP = document.createElement('img');
  imgP.setAttribute('src', img);
  imgP.className += "productImg"

  const nameP = document.createElement('td');
  nameP.textContent = name;
  nameP.className += "nameP"


  const quantityP = document.createElement('td')
  quantityP.textContent = quantity

  const dateP = document.createElement('td');
  dateP.textContent = date;

  const account = document.createElement('td');
  account.textContent = nameAccount;

  const packagesP = document.createElement('td');
  packagesP.textContent = packages;

  table.appendChild(containerTBLS);
  containerTBLS.appendChild(containerT);
  containerT.appendChild(account);
  containerT.appendChild(tdImg);
  tdImg.appendChild(imgP);
  containerT.appendChild(nameP);
  containerT.appendChild(dateP);
  containerT.appendChild(quantityP);
  containerT.appendChild(packagesP);
}

// -------------

set

