import { useState, useContext, useEffect } from 'react';
import { db } from '../utils/firebase.utils';
import { ref, set, get } from 'firebase/database';
import UserContext from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';

const AdminView = () => {
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const navigate = useNavigate();
    const { categoria: paramCategoria, marca: paramMarca, productId: paramProductId } = useParams();

    const [isEditing, setIsEditing] = useState(false);
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

    useEffect(() => {
        if (paramCategoria && paramMarca && paramProductId) {
            setIsEditing(true);
            const fetchProductData = async () => {
                try {
                    const productRef = ref(db, `productos/${paramCategoria}/${paramMarca}/${paramProductId}`);
                    const snapshot = await get(productRef);
                    if (snapshot.exists()) {
                        const productData = snapshot.val();
                        setProduct({
                            ...productData,
                            id: paramProductId || productData.id || '',
                            categoria: paramCategoria || productData.categoria || '',
                            marca: paramMarca || productData.marca || ''
                        });
                    } else {
                        console.error("No se encontró el producto");
                        alert('Producto no encontrado para editar.');
                        navigate('/admin');
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            fetchProductData();
        } else {
            setProduct({
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
            setIsEditing(false);
        }
    }, [paramCategoria, paramMarca, paramProductId, navigate]);


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
        if (!product.id.trim() || !product.categoria.trim() || !product.marca.trim()) {
            alert('ID, Categoría y Marca son campos obligatorios y no pueden estar vacíos.');
            return;
        }
        
        try {
            let productPath;
            if (isEditing && paramProductId && paramCategoria && paramMarca) {
                productPath = `productos/${paramCategoria}/${paramMarca}/${paramProductId}`;
            } else {
                productPath = `productos/${product.categoria}/${product.marca}/${product.id}`;
            }
            
            const productRef = ref(db, productPath);
            const productToSave = { 
                ...product,
                precio: Number(product.precio),
                stock: Number(product.stock)
            };
            
            await set(productRef, productToSave);
            alert(isEditing ? 'Producto actualizado con éxito' : 'Producto subido con éxito');
            
            if (isEditing) {
                navigate(`/${product.categoria}/${product.marca}/${product.id}`);
            } else {
                setProduct({
                    id: '', nombre: '', precio: 0, imagen: '', stock: 0,
                    categoria: '', marca: '', descripcion: '', color: ''
                });
            }
        } catch (e) {
            console.error(isEditing ? 'Error al actualizar el producto:' : 'Error al subir el producto:', e);
            alert(isEditing ? 'Error al actualizar el producto.' : 'Error al subir el producto.');
        }
    };

    if( user?.email !== 'admin@gmail.com') {
        navigate('/home');       
        return <div className='text-center h1'>prohibido</div>; 
    }

    return (

            <div className="container my-5 w-75">
            <h2 className="fw-light mb-4">{isEditing ? 'Editar Producto' : 'Subir Producto'}</h2>
            {isEditing && (
                <div className="alert alert-info">
                    Editando producto: {paramProductId} en {paramCategoria}/{paramMarca}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID del Producto</label>
                    <input type="text" placeholder='nike-air-jordan' className="form-control" id="id" name="id" value={product.id} onChange={handleChange} required readOnly={isEditing} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre del Producto</label>
                    <input type="text" placeholder='Nike Air Jordan' className="form-control" id="name" name="nombre" value={product.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input type="number" step="0.01" placeholder='69.90' className="form-control" id="price" name="precio" value={product.precio} onChange={handleChange} required />
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
                    <input type="text" placeholder='zapatillas || camisetas' className="form-control" id="categoria" name="categoria" value={product.categoria} onChange={handleChange} required readOnly={isEditing} />
                </div>
                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca</label>
                    <input type="text" placeholder='nike || adidas || off-white || palace || stüssy || supreme' className="form-control" id="marca" name="marca" value={product.marca} onChange={handleChange} required readOnly={isEditing} />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea className="form-control" placeholder='texto desxriptivo del producto' id="descripcion" name="descripcion" value={product.descripcion} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="color" className="form-label">Color</label>
                    <input type="text" placeholder='rojo || azul || naranja || amarillo || verde' className="form-control" id="color" name="color" value={product.color} onChange={handleChange} required />
                </div>
                <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="button">
                        {isEditing ? 'Actualizar Producto' : 'Subir Producto'}
                    </button>
                    
                    <button type="button" className="button bg-danger" onClick={() => navigate(-1)}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>


    );
};

export default AdminView;