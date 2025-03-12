import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../utils/firebase.utils';
import { onValue, ref } from 'firebase/database';
import ProductCard from '../components/ProductCard';
import ProductSort from '../components/ProductSort';

interface Product {
    id: string;
    imagen: string;
    nombre: string;
    precio: number;
    descripcion: string;
    categoria: string;
    stock: number;
    marca: string;
}

const SearchResults = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || '';
    const [products, setProducts] = useState<Product[]>([]);
    const [orderBy, setOrderBy] = useState<'alphabetical' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc'>('alphabetical');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsRef = ref(db, 'productos');
                onValue(productsRef, (snapshot) => {
                    const productsData = snapshot.val();
                    const productsArray: Product[] = [];

                    for (const category in productsData) {
                        for (const brand in productsData[category]) {
                            for (const productId in productsData[category][brand]) {
                                const product = productsData[category][brand][productId];
                                productsArray.push({
                                    id: productId,
                                    imagen: product.imagen || '',
                                    nombre: product.nombre || '',
                                    precio: product.precio || 0,
                                    descripcion: product.descripcion || '',
                                    categoria: product.categoria || '',
                                    stock: product.stock || 0,
                                    marca: product.marca || ''
                                });
                            }
                        }
                    }

                    const filteredProducts = productsArray.filter(product =>
                        product.nombre.toLowerCase().includes(query.toLowerCase()) ||
                        product.descripcion.toLowerCase().includes(query.toLowerCase())
                    );

                    setProducts(filteredProducts);
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [query]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(event.target.value as 'alphabetical' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc');
    };

    const sortedProducts = [...products].sort((a, b) => {
        switch (orderBy) {
            case 'alphabetical':
                return a.nombre.localeCompare(b.nombre);
            case 'price-asc':
                return a.precio - b.precio;
            case 'price-desc':
                return b.precio - a.precio;
            case 'stock-asc':
                return a.stock - b.stock;
            case 'stock-desc':
                return b.stock - a.stock;
            default:
                return 0;
        }
    });

    return (
        <div className="container-fluid w-75 px-4">
            <h1 className="fw-light text-center mt-4">"{query}"</h1>
            <h1 className='fw-light text-black-50 text-center '>{products.length} resultados</h1>

            <div className="row m-0 p-0 my-3 w-auto d-flex flex-row justify-content-between align-items-center">
                <div className="col-4 w-auto col-sm-12 d-flex align-items-center m-0 p-0">
                    <ProductSort orderBy={orderBy} handleSortChange={handleSortChange} />
                </div>
            </div>

            <div className="row w-100 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 g-0 z-0">
                {sortedProducts.map((product) => (
                    <div className="col" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;