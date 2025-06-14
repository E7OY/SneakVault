import React from 'react';
import '../index.css';

const ShippingPolicy = () => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="fw-light mb-4">Política de Envío</h1>

                    <div className="mb-4">
                        <p className="fw-light text-black-50">
                            En SneakVault, nos esforzamos por entregar sus productos de manera rápida y segura. A continuación, encontrará información detallada sobre nuestros servicios de envío.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Procesamiento de pedidos</h2>
                        <p className="fw-light text-black-50">
                            Una vez que realice su pedido, espere de 1 a 2 días hábiles para procesar sus pedidos. Durante este tiempo, verificamos la autenticidad de los productos, preparamos su paquete y lo entregamos al servicio de mensajería.
                        </p>
                        <p className="fw-light text-black-50">
                            Recibirá un correo electrónico de confirmación cuando su pedido haya sido procesado y otro cuando haya sido enviado, que incluirá un número de seguimiento.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Tiempos de entrega</h2>
                        <p className="fw-light text-black-50">
                            Los tiempos de entrega estimados son:
                        </p>
                        <ul className="fw-light text-black-50">
                            <li><strong>España peninsular:</strong> 1-2 días hábiles</li>
                            <li><strong>Islas Baleares:</strong> 2-3 días hábiles</li>
                            <li><strong>Islas Canarias, Ceuta y Melilla:</strong> 3-5 días hábiles</li>
                            <li><strong>Unión Europea:</strong> 3-5 días hábiles (según la ubicación)</li>
                            <li><strong>Internacional (fuera de la UE):</strong> 5-10 días hábiles</li>
                        </ul>
                        <p className="fw-light text-black-50">
                            Tenga en cuenta que estos tiempos son estimaciones y pueden variar según factores externos como condiciones climáticas, festividades o situaciones excepcionales.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Costes de envío</h2>
                        <p className="fw-light text-black-50">
                            Los costes de envío son los siguientes:
                        </p>
                        <ul className="fw-light text-black-50">
                            <li><strong>España peninsular:</strong> 4,95€</li>
                            <li><strong>Islas Baleares:</strong> 7,95€</li>
                            <li><strong>Islas Canarias, Ceuta y Melilla:</strong> 12,95€ (pueden aplicarse tasas aduaneras adicionales)</li>
                            <li><strong>Unión Europea:</strong> 9,95€</li>
                            <li><strong>Internacional (fuera de la UE):</strong> 19,95€ (pueden aplicarse tasas aduaneras adicionales)</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Envío gratuito</h2>
                        <p className="fw-light text-black-50">
                            Ofrecemos envío gratuito en pedidos superiores a:
                        </p>
                        <ul className="fw-light text-black-50">
                            <li><strong>España peninsular e Islas Baleares:</strong> 100€</li>
                            <li><strong>Unión Europea:</strong> 150€</li>
                        </ul>
                        <p className="fw-light text-black-50">
                            El envío gratuito no se aplica a Islas Canarias, Ceuta, Melilla o destinos internacionales fuera de la UE.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Seguimiento de pedidos</h2>
                        <p className="fw-light text-black-50">
                            Todos nuestros envíos incluyen un número de seguimiento que le permitirá monitorizar el estado de su pedido. Puede acceder a esta información a través de:
                        </p>
                        <ul className="fw-light text-black-50">
                            <li>Su cuenta en nuestra web, sección "Mis Pedidos"</li>
                            <li>El correo electrónico de confirmación de envío</li>
                            <li>Contactando con nuestro servicio de atención al cliente</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Problemas con la entrega</h2>
                        <p className="fw-light text-black-50">
                            Si hay algún problema con la entrega de su pedido (retrasos significativos, paquete dañado, producto incorrecto), por favor contáctenos inmediatamente para que podamos resolverlo.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Envíos internacionales e impuestos</h2>
                        <p className="fw-light text-black-50">
                            Para envíos fuera de la Unión Europea, el destinatario es responsable de todos los impuestos, aranceles y tasas aduaneras aplicables. Estos cargos no están incluidos en el precio de compra ni en los gastos de envío, y variarán según el país de destino.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Contacto</h2>
                        <p className="fw-light text-black-50">
                            Si tiene alguna pregunta sobre el estado de su pedido o nuestra política de envío, no dude en contactarnos en: <a href="mailto:shipping@sneakvault.com" className="text-decoration-none">shipping@sneakvault.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
