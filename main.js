import {handleGetProductToStore, handleRenderList} from "./src/views/store.js";
import {renderCategories} from "./src/services/categories.js";
import './style.css';
import {handleGetProductLocalStorage, setInLocalStorage} from "./src/persistence/localStorage.js";
import {handleSearchProductByName} from "./src/services/searchBar.js";
import Swal from "sweetalert2";

export let categoriaActiva = null;
export const setCategoriaActiva = (categoriaIn) => {
    categoriaActiva = categoriaIn;
}

export let productoActivo = null;
export const setProductoActivo = (productoIn) => {
    productoActivo = productoIn;
}
handleGetProductToStore()
renderCategories();


// PRODUCT
const buttonAdd = document.getElementById('buttonAddElement');
buttonAdd.addEventListener('click', () => {
    openModal();
});

// POPUP
const buttonCancel = document.getElementById('cancelButton');
buttonCancel.addEventListener('click', () => {
    closeModal();
});

export const openModal = () => {
    const modal = document.getElementById('modalPopUp');
    modal.style.display = 'flex';
    if (!productoActivo) {
        document.getElementById('nombre').value = productoActivo.nombre;
        document.getElementById('img').value = productoActivo.imagen;
        document.getElementById('precio').value = productoActivo.precio;
        document.getElementById('categoria').value = productoActivo.categoria;
    }
};

export const closeModal = () => {
    const modal = document.getElementById('modalPopUp');
    modal.style.display = 'none';
    setProductoActivo(null);
    resetModal();
};

export const resetModal = () => {
    document.getElementById('nombre').value = '';
    document.getElementById('img').value = '';
    document.getElementById('precio').value = 0;
    document.getElementById('categoria').value = 'Seleccione una categoria';
    productoActivo = null;
}

const buttonAccept = document.getElementById('acceptButton');
buttonAccept.addEventListener('click', () => {
    handleSaveOrModifyElements();
});

const handleSaveOrModifyElements = () => {
    const nombre = document.getElementById('nombre').value;
    const imagen = document.getElementById('img').value;
    const precio = document.getElementById('precio').value;
    const categoria = document.getElementById('categoria').value;
    let product = null;
    if (productoActivo) {
        product = {
            ...productoActivo,
            nombre: nombre,
            imagen: imagen,
            precio: precio,
            categoria: categoria
        };
    } else {
        product = {
            id: new Date().toISOString(),
            nombre: nombre,
            imagen: imagen,
            precio: precio,
            categoria: categoria
        };
    }

    setInLocalStorage(product);
    handleGetProductToStore()
    Swal.fire({
        title: "Producto guardado!",
        text: "El producto fue modificado/guardado con exito!",
        icon: "success"
    });
    closeModal();
}

const buttonDelete = document.getElementById('deleteButton');
buttonDelete.addEventListener('click', () => {
    handleDeleteProduct();
});
export const handleDeleteProduct = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter(product => product.id !== productoActivo.id);
            localStorage.setItem('products', JSON.stringify(result));
            handleRenderList(result);
            handleGetProductToStore();
            closeModal();
        }
    });
}

const buttonSearch = document.getElementById('buttonSearch');
buttonSearch.addEventListener('click', () => {
    handleSearchProductByName();
});