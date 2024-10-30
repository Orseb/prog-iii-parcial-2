// render de vista categorias
import {handleGetProductLocalStorage} from "../persistence/localStorage.js";
import {categoriaActiva} from "../../main.js";
import {handleRenderList} from "../views/store.js";

const handleFilterProductsByCategory = (categoryIn) => {
    const products = handleGetProductLocalStorage();

    switch (categoryIn) {
        case categoriaActiva:
            handleRenderList(products);
            break;
        case 'Todo':
            handleRenderList(products);
            break;
        case 'Hamburguesas':
        case 'Papas':
        case 'Gaseosas':
            const result = products.filter(product => product.categoria === categoryIn);
            handleRenderList(result)
            break;
        case 'mayorPrecio':
            const resultMayor = products.sort((a, b) => b.precio - a.precio);
            handleRenderList(resultMayor);
            break;
        case 'menorPrecio':
            const resultMenor = products.sort((a, b) => a.precio - b.precio);
            handleRenderList(resultMenor);
            break;
        default:
            break;
    }
}


export const renderCategories = () => {
    const ulList = document.getElementById('listFilter')
    ulList.innerHTML = `
    <li id="Todo">Todos los productos</li>
    <li id="Hamburguesas">Hamburguesas</li>
    <li id="Papas">Papas</li>
    <li id="Gaseosas">Gaseosas</li>
    <li id="mayorPrecio">Mayor Precio</li>
    <li id="menorPrecio">Menor Precio</li>
    `;
    const liElements = ulList.querySelectorAll('li');
    liElements.forEach(li => {
        li.addEventListener('click', () => {
            handleClick(li);
        });
    });

    const handleClick = (element) => {
        handleFilterProductsByCategory(element.id);
        liElements.forEach(li => {
            if (li.classList.contains('liActive')) {
                li.classList.remove('liActive');
            } else {
                if (li === element) {
                    li.classList.add('liActive');
                }
            }
        });
    }
}