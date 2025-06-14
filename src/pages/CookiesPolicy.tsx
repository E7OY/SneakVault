import React from 'react';
import '../index.css';

const CookiesPolicy = () => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="fw-light mb-4">Política de Cookies</h1>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">¿Qué son las cookies?</h2>
                        <p className="fw-light text-black-50">
                            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tableta o móvil) cuando visita un sitio web.
                            Las cookies nos ayudan a mejorar nuestro sitio web y a proporcionar un servicio más personalizado.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">¿Qué cookies utilizamos?</h2>
                        <p className="fw-light text-black-50">En SneakVault utilizamos los siguientes tipos de cookies:</p>

                        <h3 className="fw-light fs-5 mt-3">Cookies Necesarias</h3>
                        <p className="fw-light text-black-50">
                            Estas cookies son esenciales para permitirle navegar por nuestro sitio web y utilizar sus funciones, como acceder a áreas seguras del sitio.
                            Sin estas cookies, no podemos proporcionar algunos servicios que ha solicitado.
                        </p>

                        <h3 className="fw-light fs-5 mt-3">Cookies de Preferencias</h3>
                        <p className="fw-light text-black-50">
                            Estas cookies permiten que nuestro sitio web recuerde información que cambia la forma en que se comporta o se ve el sitio, como su idioma preferido o la región en la que se encuentra.
                        </p>

                        <h3 className="fw-light fs-5 mt-3">Cookies Estadísticas</h3>
                        <p className="fw-light text-black-50">
                            Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando y reportando información de forma anónima.
                        </p>

                        <h3 className="fw-light fs-5 mt-3">Cookies de Marketing</h3>
                        <p className="fw-light text-black-50">
                            Estas cookies se utilizan para rastrear a los visitantes en los sitios web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">¿Cómo controlar las cookies?</h2>
                        <p className="fw-light text-black-50">
                            Puede controlar y/o eliminar las cookies como desee. Puede eliminar todas las cookies que ya están en su dispositivo y puede configurar la mayoría de los navegadores para evitar que se coloquen.
                            Si lo hace, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite un sitio y algunos servicios y funcionalidades pueden no funcionar.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Cambios en nuestra política de cookies</h2>
                        <p className="fw-light text-black-50">
                            Cualquier cambio que podamos hacer en nuestra política de cookies en el futuro se publicará en esta página. Por favor, compruebe con frecuencia para ver cualquier actualización o cambio.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-light fs-4">Contacto</h2>
                        <p className="fw-light text-black-50">
                            Si tiene alguna pregunta sobre nuestra política de cookies, por favor contáctenos en: <a href="mailto:info@sneakvault.com" className="text-decoration-none">info@sneakvault.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookiesPolicy;
