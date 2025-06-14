import { Link } from "react-router-dom";
import { imageMap } from "../../utils/imageMap";
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
        <div className="producto-card h-100 w-100 d-flex flex-column">
            <Link to={`/${product.categoria}/${product.marca}/${product.id}`}
                className="text-decoration-none text-dark d-flex flex-column h-100">
                <div>
                    <img
                        className="producto-img img-fluid p-0 col-12 z-1"
                        src={product.imagen || imageMap[product.nombre]}
                        alt={product.nombre}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }}
                        style={{ objectFit: 'cover', maxHeight: '400px', maxWidth: '400px' }}
                    />
                </div>
                <div className="mt-auto">
                    <h6 className="mb-2 fw-light text-black-50">{product.marca} · {product.categoria}</h6>
                    <h5 className="text-truncate fw-light">{product.nombre}</h5>
                    <p className="m-0 p-0 fw-light text-black-50">{product.precio}€</p>
                </div>
            </Link>
        </div>
    );
}

export default ProductCard;