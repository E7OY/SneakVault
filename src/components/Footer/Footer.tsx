import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import '../../index.css'; // Importa el archivo CSS personalizado
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-negro w-100 mt-5 border-top border-2 border-dark">

            <div className="row w-75 mx-auto d-flex align-items-center flex-row justify-content-between pt-5">

                <div className="col-3 w-auto">
                    <h5 className="fw-bold text-white">Informacion</h5>
                    <h6 className="text-white-50">+34-000-000-000</h6>
                    <h6 className="text-white-50">C/Liceo La Paz</h6>
                </div>


                <div className="col-3  ">
                    <details className=" my-2 mt-5">
                        <summary className='p-2 fw-medium text-white'>
                            Envíos
                        </summary>
                        <h6 className='m-3 text-white-50'>
                            Una vez que realice su pedido, espere de 1 a 2 días hábiles para procesar sus pedidos. Después de eso,
                            tomará entre 1 y 2  días hábiles para la entrega en España, y entre 3 y 5 días hábiles para los pedidos
                            Unión Europea (según la ubicación).
                        </h6>
                    </details>

                    <details className="my-2">
                    <summary className='p-2 fw-medium text-white'>
                        Cambios Y Devoluciones
                        </summary>
                        <h6 className='m-3 text-white-50'>
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
                    <summary className='p-2 fw-medium text-white'>
                        Autenticidad
                        </summary>
                        <h6 className='m-3 text-white-50'>
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




                <div className="col-3 w-auto">
                    <iframe style={{ filter: 'grayscale(100%)' }} className="border border-2 border-black" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.015043169616!2d-8.405034523376406!3d43.34134147254437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2e7d4a34bbee7d%3A0xfdbb82aae0a76987!2sLiceo%20La%20Paz!5e1!3m2!1ses!2ses!4v1738693589568!5m2!1ses!2ses" width="200" height="200" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </div>

            <div className="mt-5">
                <p className="texto-footer fw-bolder">SNEAKVAULT</p>
            </div>
        </footer>
    );
};

export default Footer;