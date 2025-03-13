import { useState, useContext } from 'react';
import { db } from '../utils/firebase.utils';
import { ref, set } from 'firebase/database';
import UserContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const AdminView = () => {
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        id: '',
        nombre: '',
        precio: 0,
        imagen: '',
        stock: 0,
        categoria: '',
        marca: '',
        descripcion: '',
        color: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        //set para actualizar el estado del producto
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            //ref para la ubicación del producto en la base de datos
            const productRef = ref(db, `productos/${product.categoria}/${product.marca}/${product.id}`);
            //set para sobreescribir el producto si ya existe
            await set(productRef, product);
            alert('Producto subido con éxito');
        } catch (error) {
            console.error('Error al subir el producto:', error);
        }
    };

    if( user?.email !== 'admin@gmail.com') {
        navigate('/home');       
        return <div className='text-center h1'>prohibido</div>; 
    }

    return (



            <div className="container my-5 w-75 ">
            <h2 className="fw-light mb-4">Subir Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID del Producto</label>
                    <input type="text" placeholder='nike-air-jordan' className="form-control" id="id" name="id" value={product.id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre del Producto</label>
                    <input type="text" placeholder='Nike Air Jordan' className="form-control" id="name" name="nombre" value={product.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input type="number" placeholder='69,90' className="form-control" id="price" name="precio" value={product.precio} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">URL de la Imagen</label>
                    <input type="text" placeholder='https://res.cloudinary.com/key/image/upload/key/id_producto_key.webp' className="form-control" id="image" name="imagen" value={product.imagen} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input type="number" className="form-control" id="stock" name="stock" value={product.stock} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <input type="text" placeholder='zapatillas || camisetas' className="form-control" id="categoria" name="categoria" value={product.categoria} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca</label>
                    <input type="text" placeholder='nike || adidas || off-white || palace || stüssy || supreme' className="form-control" id="marca" name="marca" value={product.marca} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea className="form-control" placeholder='texto desxriptivo del producto' id="descripcion" name="descripcion" value={product.descripcion} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="color" className="form-label">Color</label>
                    <input type="text" placeholder='rojo || azul || naranja || amarillo || verde' className="form-control" id="color" name="color" value={product.color} onChange={handleChange} required />
                </div>
                <button type="submit" className="button">Subir Producto</button>
            </form>
        </div>


    );
};

export default AdminView;