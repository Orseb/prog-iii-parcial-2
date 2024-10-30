import {handleGetProductLocalStorage} from "../persistence/localStorage.js";
import {handleRenderList} from "../views/store.js";

export const handleSearchProductByName = (name) => {
    const inputHeader = document.getElementById('inputHeader');
    const products = handleGetProductLocalStorage();

    const result = products.filter(product => product.nombre.toLowerCase().includes(inputHeader.value.toLowerCase()));
    handleRenderList(result);
}