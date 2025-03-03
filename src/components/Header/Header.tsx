import 'bootstrap/dist/css/bootstrap.min.css';

const Header: React.FC = () => {
    return (
        <>
            <div className="row bg-black text-white w-100 text-center py-4 moving-container m-0 p-0">
                <span className="moving-text">
                    <h6 className='fw-light'>Últimas Rebajas de invierno hasta -60%</h6>
                    <h6 className='fw-light'>Off-White -45% en productos seleccionados</h6>
                    <h6 className='fw-light'>Envíos Gratis a partir de 50€</h6>
                    <h6 className='fw-light'>Jordan x Cactus jack disponibles</h6>
                </span>
            </div>
        </>
    );
};

export default Header;