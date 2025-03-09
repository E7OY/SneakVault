import React from 'react';
import { imageMap } from '../../utils/imageMap';

interface SizeGuideModalProps {
    product: {
        categoria: string;
        nombre: string;
        marca: string;
        imagen: string | undefined;
    };
}

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ product }) => {
    return (
        <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content p-3 rounded-0">
                    <div className="modal-header">
                        <h4 className="text-start modal-title fw-medium">Guía de Tallas {product.categoria}</h4>
                        <button type="button" className="close" data-dismiss="modal">
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <h5>{product.nombre}</h5>
                        <img
                            className="imagen-producto mx-auto m-0"
                            width={400}
                            src={product.imagen || imageMap[product.nombre]}
                            alt={product.nombre}
                            onError={(e) => {
                                e.currentTarget.src = imageMap[product.nombre];
                            }}
                        />
                        {product.marca === 'yeezy' && (
                            <h5 className="my-4 text-black-50 fw-light">Para zapatillas yeezy se recomienda una talla más de la habitual.</h5>
                        )}
                        <>
                            {product.categoria === 'zapatillas' ? (
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
                                            <tr>
                                                <td>35.5</td>
                                                <td>3.5</td>
                                                <td>2.5</td>
                                            </tr>
                                            <tr>
                                                <td>36</td>
                                                <td>4</td>
                                                <td>3</td>
                                            </tr>
                                            <tr>
                                                <td>36.5</td>
                                                <td>4.5</td>
                                                <td>3.5</td>
                                            </tr>
                                            <tr>
                                                <td>37.5</td>
                                                <td>5</td>
                                                <td>4</td>
                                            </tr>
                                            <tr>
                                                <td>38</td>
                                                <td>5.5</td>
                                                <td>4.5</td>
                                            </tr>
                                            <tr>
                                                <td>38.5</td>
                                                <td>6</td>
                                                <td>5</td>
                                            </tr>
                                            <tr>
                                                <td>39</td>
                                                <td>6.5</td>
                                                <td>5.5</td>
                                            </tr>
                                            <tr>
                                                <td>40</td>
                                                <td>7</td>
                                                <td>6</td>
                                            </tr>
                                            <tr>
                                                <td>40.5</td>
                                                <td>7.5</td>
                                                <td>6.5</td>
                                            </tr>
                                            <tr>
                                                <td>41</td>
                                                <td>8</td>
                                                <td>7</td>
                                            </tr>
                                            <tr>
                                                <td>42</td>
                                                <td>8.5</td>
                                                <td>7.5</td>
                                            </tr>
                                            <tr>
                                                <td>42.5</td>
                                                <td>9</td>
                                                <td>8</td>
                                            </tr>
                                            <tr>
                                                <td>43</td>
                                                <td>9.5</td>
                                                <td>8.5</td>
                                            </tr>
                                            <tr>
                                                <td>44</td>
                                                <td>10</td>
                                                <td>9</td>
                                            </tr>
                                            <tr>
                                                <td>44.5</td>
                                                <td>10.5</td>
                                                <td>9.5</td>
                                            </tr>
                                            <tr>
                                                <td>45</td>
                                                <td>11</td>
                                                <td>10</td>
                                            </tr>
                                            <tr>
                                                <td>45.5</td>
                                                <td>11.5</td>
                                                <td>10.5</td>
                                            </tr>
                                            <tr>
                                                <td>46</td>
                                                <td>12</td>
                                                <td>11</td>
                                            </tr>
                                            <tr>
                                                <td>47</td>
                                                <td>12.5</td>
                                                <td>11.5</td>
                                            </tr>
                                            <tr>
                                                <td>47.5</td>
                                                <td>13</td>
                                                <td>12</td>
                                            </tr>
                                            <tr>
                                                <td>48.5</td>
                                                <td>14</td>
                                                <td>13</td>
                                            </tr>
                                            <tr>
                                                <td>49.5</td>
                                                <td>15</td>
                                                <td>14</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            ) : (
                                <>
                                    <p>
                                        Para encontrar la talla correcta de camisetas, mide el contorno de tu pecho en su parte más ancha. Usa la tabla de
                                        tallas para encontrar la talla correspondiente.
                                    </p>
                                    <table className="table table-bordered table-striped">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Talla</th>
                                                <th>Medidas (Pecho x Torso x Pierna)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>XS</td>
                                                <td>3 x 10 x 12,5</td>
                                            </tr>
                                            <tr>
                                                <td>S</td>
                                                <td>4 x 12 x 15</td>
                                            </tr>
                                            <tr>
                                                <td>M</td>
                                                <td>5 x 15 x 17</td>
                                            </tr>
                                            <tr>
                                                <td>L</td>
                                                <td>6 x 17 x 20</td>
                                            </tr>
                                            <tr>
                                                <td>XL</td>
                                                <td>7 x 19 x 25</td>
                                            </tr>
                                            <tr>
                                                <td>XXL</td>
                                                <td>8 x 21 x 29</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            )}
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
    );
};

export default SizeGuideModal;