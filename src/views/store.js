import {handleGetProductLocalStorage} from "../persistence/localStorage.js";
import {setProductoActivo} from "../../main.js";
import {openModal} from "../../main.js";

export const handleGetProductToStore = () => {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
    return products;
}

export const handleRenderList = (products) => {
    const hamburguesas = products.filter(product => product.categoria === 'Hamburguesas');
    const papas = products.filter(product => product.categoria === 'Papas');
    const gaseosas = products.filter(product => product.categoria === 'Gaseosas');
    const renderProductGroup = (products, title) => {
        if (products.length <= 0) {
            return '';
        }
        const productsHtml = products.map((product, index) => {
            return `
                <div class="containerTargetItem" id="product-${product.categoria}-${index}">
                    <div>
                        <img src='${product.imagen}' alt="producto">
                        <div>
                            <h2>${product.nombre}</h2>
                        </div>
                        <div class="targetProps">
                            <p><b>Precio:</b> $ ${product.precio}</p>
                        </div>
                    </div>
                </div>
                `;
        });
        return `
            <section class="sectionStore">
                <div class="containerTitleSection">
                    <h3>${title}</h3>          
                </div>
                <div class="containerProductStore">
                    ${productsHtml.join('')}
                </div>
            </section>
            `;
    }
    const appContainer = document.getElementById('storeContainer');
    appContainer.innerHTML = `
        ${renderProductGroup(hamburguesas, 'Hamburguesas')}
        ${renderProductGroup(papas, 'Papas')}
        ${renderProductGroup(gaseosas, 'Gaseosas')}
    `;
    const addEvents = (productsIn) => {
        if (productsIn) {
            productsIn.forEach((product, index) => {
                const productContainer = document.getElementById(`product-${product.categoria}-${index}`);
                productContainer.addEventListener('click', () => {
                    setProductoActivo(product);
                    openModal();
                });
            });
        }
    }
    addEvents(hamburguesas);
    addEvents(papas);
    addEvents(gaseosas);
}