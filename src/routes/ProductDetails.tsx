import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebase.utils';
import { ref, onValue } from 'firebase/database';

import prohibido from '../assets/prohibido.png';
import { imageMap } from '../utils/imageMap';


const ProductDetails = () => {
    const { nombre } = useParams<{ nombre: string }>();
    const [product, setProduct] = useState<{ stock: number; id: string; categoria: string, imagen: string; marca: string; nombre: string; precio: number; descripcion: string } | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productsRef = ref(db, 'productos');
                onValue(productsRef, (snapshot) => {
                    const productsData = snapshot.val();
                    for (const category in productsData) {
                        for (const brand in productsData[category]) {
                            for (const productId in productsData[category][brand]) {
                                const product = productsData[category][brand][productId];
                                if (product.nombre === nombre) {
                                    setProduct({
                                        id: productId,
                                        imagen: product.imagen || '',
                                        nombre: product.nombre || '',
                                        precio: product.precio || 0,
                                        descripcion: product.descripcion || '',
                                        categoria: product.categoria || '',
                                        stock: product.stock || 0,
                                        marca: product.marca || ''
                                    });
                                    return;
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [nombre]);

    if (!product) {
        return <div>Cargando producto...</div>;
    }

    return (
        <div>
            <div className="row d-flex flex-row mt-5 mx-auto justify-content-center align-items-start gap-5">
                <div className="d-flex flex-column col-md-5 col-sm-12 p-0 m-0 ">
                    <img className='imagen-producto-detail' src={product.imagen || imageMap[product.nombre]} alt={product.nombre} onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }} />
                    <div className="imagenes d-flex flex-row  ">
                        <img
                            className="imagen-producto-detail"
                            src={product.imagen || imageMap[product.nombre]}
                            alt={product.nombre}
                            onError={(e) => {
                                e.currentTarget.src = imageMap[product.nombre];
                            }}
                        />                        
                        <img
                            className="imagen-producto-detail"
                            src={product.imagen || imageMap[product.nombre]}
                            alt={product.nombre}
                            onError={(e) => {
                                e.currentTarget.src = imageMap[product.nombre];
                            }}
                            style={{ transform: 'rotateY(180deg)' }}
                        />                         
                        <img
                            className="imagen-producto-detail"
                            src={product.imagen || imageMap[product.nombre]}
                            alt={product.nombre}
                            onError={(e) => {
                                e.currentTarget.src = imageMap[product.nombre];
                            }}
                            style={{ transform: 'rotateX(180deg)' }}

                        />                     
                    </div>
                </div>
                <div className="col-md-5 col-sm-12">
                    {product.stock > 0 ?
                        (product.stock <= 10 ? <h6 className='fw-bold text-danger'>Menos de {product.stock} unidades</h6> :
                            <h6 className='fw-bold text-success'>{product.stock} en stock</h6>) :
                        <h5 className='text-danger'>Agotado</h5>}
                    <h3 className='fw-regular'>{product.marca}</h3>
                    <h2 className='display-3 fw-bold'>{product.nombre}</h2>
                    <h4 className=' fw-medium'>{product.descripcion}</h4>
                    <p className='display-5 fw-bolder mt-3'>{product.precio}€</p>
                    {product.stock <= 0 ?

                        (<>
                            <a className='btn rounded-0 btn-dark text-danger p-3 mb-3'><img src={prohibido} className='mx-1' width={20}></img>Añadir a la cesta</a></>)
                        :
                        <a href="" className='btn rounded-0 text-white bg-dark p-3 mb-3'>Añadir a la cesta</a>
                    }


                    <br />
                    <a className="mt-5" data-toggle="modal" data-target="#myModal">
                        Guía de tallas
                    </a>


                    <details className="my-2">
                        <summary style={{ fontWeight: 'bold', cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
                            Envíos
                        </summary>
                        <p>Realizamos envíos a toda España, con un tiempo estimado de 24-48 horas.</p>
                    </details>

                    <details className="my-2">
                        <summary style={{ fontWeight: 'bold', cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
                            Devoluciones
                        </summary>
                        <p>Si no estás satisfecho con tu compra, puedes devolverla en un plazo de 15 días.</p>
                    </details>


                    <div id="myModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content p-3 rounded-0">
                                <div className="modal-header">
                                    <h4 className="text-start modal-title">Guía de Tallas {product.categoria}</h4>
                                    <button type="button" className="close" data-dismiss="modal">
                                        &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h5>{product.nombre}</h5>
                                    <img className='imagen-producto mx-auto m-0' width={400} src={product.imagen || imageMap[product.nombre]} alt={product.nombre} onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }} />
                                    {product.marca === 'Yeezy' && (

                                        <h5 className='my-4'>Para zapatillas yeezy se recomienda una talla más de la habitual.</h5>
                                    )}
                                    <>
                                        {product.categoria === 'zapatillas' ?
                                            (
                                                <>
                                                    <table className="table table-bordered table-striped">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>Talla EU</th>
                                                                <th>Talla US Hombre</th>
                                                                <th>Talla UK Hombre</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr><td>35.5</td><td>3.5</td><td>2.5</td></tr>
                                                            <tr><td>36</td><td>4</td><td>3</td></tr>
                                                            <tr><td>36.5</td><td>4.5</td><td>3.5</td></tr>
                                                            <tr><td>37.5</td><td>5</td><td>4</td></tr>
                                                            <tr><td>38</td><td>5.5</td><td>4.5</td></tr>
                                                            <tr><td>38.5</td><td>6</td><td>5</td></tr>
                                                            <tr><td>39</td><td>6.5</td><td>5.5</td></tr>
                                                            <tr><td>40</td><td>7</td><td>6</td></tr>
                                                            <tr><td>40.5</td><td>7.5</td><td>6.5</td></tr>
                                                            <tr><td>41</td><td>8</td><td>7</td></tr>
                                                            <tr><td>42</td><td>8.5</td><td>7.5</td></tr>
                                                            <tr><td>42.5</td><td>9</td><td>8</td></tr>
                                                            <tr><td>43</td><td>9.5</td><td>8.5</td></tr>
                                                            <tr><td>44</td><td>10</td><td>9</td></tr>
                                                            <tr><td>44.5</td><td>10.5</td><td>9.5</td></tr>
                                                            <tr><td>45</td><td>11</td><td>10</td></tr>
                                                            <tr><td>45.5</td><td>11.5</td><td>10.5</td></tr>
                                                            <tr><td>46</td><td>12</td><td>11</td></tr>
                                                            <tr><td>47</td><td>12.5</td><td>11.5</td></tr>
                                                            <tr><td>47.5</td><td>13</td><td>12</td></tr>
                                                            <tr><td>48.5</td><td>14</td><td>13</td></tr>
                                                            <tr><td>49.5</td><td>15</td><td>14</td></tr>
                                                        </tbody>
                                                    </table>
                                                </>
                                            )
                                            :
                                            (
                                                <>
                                                    <p>Para encontrar la talla correcta de camisetas, mide el contorno de tu pecho en su parte más ancha. Usa la tabla de tallas para encontrar la talla correspondiente.</p>
                                                </>
                                            )

                                        }
                                    </>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;