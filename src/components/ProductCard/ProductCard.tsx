import { Link } from "react-router-dom";
import { imageMap } from "../../utils/imageMap";
import productTendencia from '../../assets/hot-ptoduct.png';
import '../../index.css';

interface ProductCardProps {
    product: {
        id: string;
        categoria: string;
        marca: string;
        nombre: string;
        precio: number;
        stock: number;
        imagen: string;
    };
}


const ProductCard = ({ product }: ProductCardProps) => {
    return (

        <div className="producto-card h-100 w-100 p-3">
            <Link to={`/${product.categoria}/${product.marca}/${product.id}`}
                className="text-decoration-none text-dark">
                {product.stock <= 5 && (
                    <img src={productTendencia} className='col-6 col-md-5 producto-card-tendencia position-absolute' alt="" width={100} />
                )}
                <img
                    className="producto-img img-fluid p-3 col-12"
                    src={product.imagen || imageMap[product.nombre]}
                    alt={product.nombre}
                    onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }}
                />
                <h6 className="mb-2 fw-light text-black-50">{product.categoria}</h6>
                <h5 className="text-truncate fw-light">{product.nombre}</h5>
                <p className="m-0 p-0 fw-light text-black-50">{product.precio}€</p>
            </Link>
        </div>

    );
}

export default ProductCard;