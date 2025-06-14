import React from 'react';
import '../index.css';

const ReturnsPolicy = () => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="fw-light mb-4">Política de Devoluciones</h1>

                    <div className="mb-4">
                        <p className="fw-light text-black-50">
                            En SneakVault nos esforzamos por asegurar la plena satisfacción de nuestros clientes. Si no está completamente satisfecho con su compra, le ofrecemos la opción de devolver los artículos bajo las siguientes condiciones.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Plazo para devoluciones</h2>
                        <p className="fw-light text-black-50">
                            Debe retornar los artículos dentro de los 14 días hábiles siguientes a la fecha de recepción. Pasado este período, lamentablemente no podremos aceptar devoluciones.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Condición del artículo</h2>
                        <p className="fw-light text-black-50">
                            Los productos devueltos deben estar sin usar, en su embalaje original y en estado completo. Esto incluye todas las etiquetas, accesorios, y cualquier material promocional que pudiera venir con el producto.
                        </p>
                        <p className="fw-light text-black-50">
                            Los artículos que muestren signos de uso, daño o modificación no serán aceptados para devolución.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Proceso de devolución</h2>
                        <p className="fw-light text-black-50">
                            Para iniciar una devolución, siga estos pasos:
                        </p>
                        <ol className="fw-light text-black-50">
                            <li>Acceda a su cuenta en nuestro sitio web y vaya a la sección "Mis Pedidos".</li>
                            <li>Seleccione el pedido que contiene el artículo que desea devolver.</li>
                            <li>Elija la opción "Solicitar Devolución" y siga las instrucciones proporcionadas.</li>
                            <li>Recibirá un correo electrónico con una etiqueta de devolución que deberá imprimir y adjuntar al paquete.</li>
                            <li>Lleve el paquete a la oficina de correos o punto de recogida indicado.</li>
                        </ol>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Coste de devolución</h2>
                        <p className="fw-light text-black-50">
                            No se reembolsarán los costos de envío iniciales. La devolución tiene un coste de etiqueta de envío de 4,95€, que será deducido del importe a reembolsar.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Reembolsos</h2>
                        <p className="fw-light text-black-50">
                            Una vez recibido y verificado el artículo devuelto, procesaremos su reembolso. El importe se devolverá al método de pago original utilizado para realizar la compra.
                        </p>
                        <p className="fw-light text-black-50">
                            El tiempo de procesamiento del reembolso puede variar según su entidad bancaria, pero generalmente se efectúa en un plazo de 5 a 10 días hábiles.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Cambios</h2>
                        <p className="fw-light text-black-50">
                            Para facilitar un proceso de cambio sin complicaciones, ofrecemos envío gratuito en todos los cambios de productos dentro de nuestro marco de devoluciones. Esto asegura que pueda elegir el producto más adecuado sin preocuparse por costos adicionales.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Productos defectuosos</h2>
                        <p className="fw-light text-black-50">
                            Si ha recibido un producto defectuoso, por favor póngase en contacto con nuestro servicio al cliente lo antes posible. En estos casos, cubriremos los gastos de devolución y le ofreceremos un reembolso completo o un reemplazo del producto.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Contacto</h2>
                        <p className="fw-light text-black-50">
                            Para más información o asistencia con su devolución, no dude en contactarnos en: <a href="mailto:returns@sneakvault.com" className="text-decoration-none">returns@sneakvault.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPolicy;
