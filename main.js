
// Array de cursos
const courses = [
    {
        courseName:"Teen Yoga Course", 
        id:"001",  
        price:500, 
        vacancies: 100, 
        ageGroup:"10 to 18 years old"
    },
    {courseName:"Adult Yoga Course", id:"002", price:"700", vacancies: 100, ageGroup:"19 to 40 years old"},
    ]

//formUsuario
const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = nameInput.value;
    const age = ageInput.value;
    const email = emailInput.value;

    const userInfo = { name, age, email };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    form.reset()
});

const userData = JSON.parse(localStorage.getItem('userInfo'));
let carrito = JSON.parse(localStorage.getItem("carrito"))|| []


//renderCarrito
const totalCarritoRender = ()=>{
    const carritoTotal = document.getElementById("carritoTotal")
    let total = carrito.reduce((acumulador, {price, quantity})=>{
        return acumulador + (price*quantity)
    }, 0)
    carritoTotal.innerHTML=`Total amount: $ ${total}`
}

//agregar al carrito
const agregarCarrito = (objetoCarrito)=>{
    carrito.push(objetoCarrito)
    totalCarritoRender()
}

//renderCarrito
const renderizarCarrito = ()=>{
    const listaCarrito = document.getElementById("basketList")
    listaCarrito.innerHTML=""
    carrito.forEach(({courseName, price, quantity, id}) =>{
        let elementoLista = document.createElement("li")
        elementoLista.innerHTML=`Course:${courseName} Price: $${price}  Quantity:${quantity} <button id="eliminarCarrito${id}">X</button>`
        listaCarrito.appendChild(elementoLista)
        const botonBorrar = document.getElementById(`eliminarCarrito${id}`)
        botonBorrar.addEventListener("click",()=>{
            carrito = carrito.filter((elemento)=>{
                if(elemento.id !== id){
                    return elemento
                }
            })
            let carritoString = JSON.stringify(carrito)
            localStorage.setItem("carrito", carritoString)
            renderizarCarrito()
        })
        let carritoString = JSON.stringify(carrito)
        localStorage.setItem("carrito", carritoString)
    })
}
//borrarCarrito
const borrarCarrito = ()=>{
    carrito = []
    let carritoString = JSON.stringify(carrito)
    localStorage.setItem("carrito", carritoString)
    renderizarCarrito()
    totalCarritoRender()
}

//renderCursos
const courseRender = ()=>{
    const courseContainer = document.getElementById("courseContainer")
    courses.forEach(({courseName, id, price, vacancies, ageGroup})=>{
        const courseCard = document.createElement("div")
        courseCard.innerHTML = `
            <div class="card" style="width: 18rem;" id="producto${id}">
                <img src="../media/${courseName+id}.jpg" class="card-img-top" alt="${courseName}">
                <div class="card-body">
                    <h5 class="card-title">${courseName}</h5>
                    <p class="card-text">${ageGroup}</p>
                    <span>Vacancies: ${vacancies}</span>
                    <br>
                    <span>Price $${price}</span>
                    <form id="form${id}">
                        <label for="contador${id}">Cantidad</label>
                        <input type="number" placeholder="0" id="contador${id}">
                        <button class="btn btn-primary" id="botonProd${id}">Agregar</button>
                    </form>
                </div>
            </div>`
        courseContainer.appendChild(courseCard)
        const btn = document.getElementById(`botonProd${id}`)
        // Funcionalidad al boton de agregar para agregar prods al carrito
        btn.addEventListener("click",(e)=>{
            e.preventDefault()
            const contadorQuantity = Number(document.getElementById(`contador${id}`).value)
            if(contadorQuantity>0){
                agregarCarrito({courseName, id, price, vacancies, ageGroup, quantity:contadorQuantity})
                renderizarCarrito()
                const form = document.getElementById(`form${id}`)
                form.reset()
            }
        }) 
    })
}

//finCompra
const finalizarCompra = ()=>{
    borrarCarrito()
    let mensaje = document.getElementById("carritoTotal")
    mensaje.innerHTML = `Yay! ${userData.name}, see you soon in our Yoga Course!`

}
const compraFinal = document.getElementById("btnBuy")
compraFinal.addEventListener("click",(()=>{finalizarCompra()}))


courseRender()
renderizarCarrito()