import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-negro w-100 mt-5 border-top border-1 border-dark pb-5">
            <div className="container w-100 mx-auto d-flex flex-column flex-md-row align-items-center justify-content-between pt-5">
                <div className="col-12 col-md-3 mb-4 mb-md-0">
                    <h5 className="fw-light text-white">Informacion</h5>
                    <ul className="list-unstyled">
                        <li className='fw-light text-white-50'>
                            <Link to="/cookies-policy" className="text-white-50 text-decoration-none">Política de cookies</Link>
                        </li>
                        <li className='fw-light text-white-50'>
                            <Link to="/privacy-policy" className="text-white-50 text-decoration-none">Política de privacidad</Link>
                        </li>
                        <li className='fw-light text-white-50'>
                            <Link to="/returns-policy" className="text-white-50 text-decoration-none">Política de devoluciones</Link>
                        </li>
                        <li className='fw-light text-white-50'>
                            <Link to="/shipping-policy" className="text-white-50 text-decoration-none">Política de envío</Link>
                        </li>
                    </ul>
                </div>

                <div className="col-12 col-md-3 mb-4 mb-md-0">
                    <details className="my-2">
                        <summary className='p-2 fw-light text-white'>
                            Envíos
                        </summary>
                        <h6 className='m-3 text-white-50 fw-light'>
                            Una vez que realice su pedido, espere de 1 a 2 días hábiles para procesar sus pedidos. Después de eso,
                            tomará entre 1 y 2 días hábiles para la entrega en España, y entre 3 y 5 días hábiles para los pedidos
                            Unión Europea (según la ubicación).
                        </h6>
                    </details>

                    <details className="my-2">
                        <summary className='p-2 fw-light text-white'>
                            Cambios Y Devoluciones
                        </summary>
                        <h6 className='m-3 fw-light text-white-50'>
                            En SneakVault nos esforzamos por asegurar la plena satisfacción de nuestros clientes. Si no está completamente
                            satisfecho con su compra, le ofrecemos la opción de devolver los artículos bajo las siguientes condiciones:
                            <br /><li>Plazo para devoluciones:</li> Debe retornar los artículos dentro de los 14 días hábiles siguientes a la fecha de recepción.
                            <br /><li>Condición del artículo:</li> Los productos devueltos deben estar sin usar, en su embalaje original y en estado completo.
                            <br /><li>Coste de devolución:</li> No se reembolsarán los costos de envío iniciales. La devolución tiene un coste de etiqueta de envío
                            de 4,95€.
                            Adicionalmente, para facilitar un proceso de cambio sin complicaciones, ofrecemos envío gratuito en todos los cambios
                            de productos dentro de nuestro marco de devoluciones. Esto asegura que pueda elegir el producto más adecuado sin
                            preocuparse por costos adicionales.
                            Para más información o asistencia con su devolución, no dude en contactarnos. Estamos aquí para ayudarle.
                        </h6>
                    </details>
                    <details className="my-2">
                        <summary className='p-2 fw-light text-white'>
                            Autenticidad
                        </summary>
                        <h6 className='m-3 fw-light text-white-50'>
                            Cada producto disponible en SneakVault está respaldado por nuestra garantía de autenticidad. Antes de
                            ser entregados, nuestros especialistas verifican minuciosamente cada artículo para asegurarse de que sea genuino.
                            Nuestra colección de productos proviene directamente de una red de distribuidores asociados que han sido elegidos
                            cuidadosamente debido a su experiencia en la industria. Cada artículo es seleccionado individualmente y se te enviará
                            en su caja original, completa con todos los accesorios necesarios. Además, lo recibirás con el sello distintivo de
                            SneakVault, que confirma que el producto ha sido inspeccionado y enviado por nuestro equipo.
                            En SneakVault, nos esforzamos por garantizar la calidad y autenticidad de cada producto que ofrecemos. Queremos que
                            tengas la confianza de saber que estás adquiriendo productos genuinos y de alta calidad. Si tienes alguna pregunta
                            sobre la autenticidad de nuestros productos, no dudes en ponerte en contacto con nosotros. Estamos aquí para b
                            rindarte la mejor experiencia de compra posible.
                        </h6>
                    </details>
                </div>

                <div className="col-12 col-md-3 mb-4 mb-md-0">
                    <h5 className="fw-light text-white">Contacto</h5>
                    <ul className="list-unstyled">
                        <li className='fw-light text-white-50'>
                            <a href="mailto:
                            " className="text-white-50 text-decoration-none">Contacto</a>
                        </li>
                        <li className='fw-light text-white-50'>
                            <a href="mailto:
                            " className="text-white-50 text-decoration-none">Soporte</a>
                        </li>
                    </ul>

                </div>
            </div>
        </footer>
    );
};

export default Footer;