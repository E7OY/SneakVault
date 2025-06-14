import React from 'react';
import '../index.css';

const PrivacyPolicy = () => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="fw-light mb-4">Política de Privacidad</h1>

                    <div className="mb-4">
                        <p className="fw-light text-black-50">
                            En SneakVault, nos comprometemos a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos su información personal.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Información que recopilamos</h2>
                        <p className="fw-light text-black-50">
                            Podemos recopilar la siguiente información:
                        </p>
                        <ul className="fw-light text-black-50">
                            <li>Nombre y apellidos</li>
                            <li>Información de contacto, incluyendo dirección de correo electrónico y número de teléfono</li>
                            <li>Información demográfica como código postal, preferencias e intereses</li>
                            <li>Otra información relevante para encuestas de clientes y/o ofertas</li>
                            <li>Historial de compras y productos visualizados</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">¿Qué hacemos con la información que recopilamos?</h2>
                        <p className="fw-light text-black-50">
                            Requerimos esta información para entender sus necesidades y proporcionarle un mejor servicio, y en particular por las siguientes razones:
                        </p>
                        <ul className="fw-light text-black-50">
                            <li>Procesamiento de pedidos y gestión de cuentas</li>
                            <li>Mejora de nuestros productos y servicios</li>
                            <li>Envío de correos promocionales sobre nuevos productos, ofertas especiales u otra información que creemos puede resultarle interesante</li>
                            <li>Para contactarle con fines de investigación de mercado</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Seguridad</h2>
                        <p className="fw-light text-black-50">
                            Estamos comprometidos a garantizar que su información esté segura. Para evitar el acceso o la divulgación no autorizados, hemos implementado procedimientos físicos, electrónicos y administrativos adecuados para salvaguardar y asegurar la información que recopilamos en línea.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Sus derechos</h2>
                        <p className="fw-light text-black-50">
                            Tiene derecho a solicitar una copia de la información que tenemos sobre usted. Si desea una copia de parte o toda su información personal, escríbanos o envíenos un correo electrónico. Podemos cobrar una pequeña tarifa por este servicio.
                        </p>
                        <p className="fw-light text-black-50">
                            Queremos asegurarnos de que su información personal sea precisa y esté actualizada. Puede solicitarnos que corrijamos o eliminemos cualquier información que crea que es incorrecta.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Cambios en nuestra política de privacidad</h2>
                        <p className="fw-light text-black-50">
                            Revisamos periódicamente nuestra política de privacidad y cualquier actualización se publicará en esta página web. Esta política de privacidad se actualizó por última vez el 1 de agosto de 2023.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Contacto</h2>
                        <p className="fw-light text-black-50">
                            Si tiene alguna pregunta sobre nuestra política de privacidad, por favor contáctenos en: <a href="mailto:info@sneakvault.com" className="text-decoration-none">info@sneakvault.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
