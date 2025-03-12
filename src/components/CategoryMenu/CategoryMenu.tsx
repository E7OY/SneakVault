import React from 'react';
import { NavDropdown, NavLink } from 'react-bootstrap';

interface Category {
    name: string;
    brands: string[];
}

interface CategoryMenuProps {
    categories: Category[];
    handleNavLinkClick: (path: string) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories, handleNavLinkClick }) => {
    return (
        <>
            {categories.map((category) => (
                <NavDropdown title={category.name.toUpperCase()} id={`${category.name}-dropdown`} key={category.name} className="fw-light">
                    {category.brands.map((brand) => (
                        <NavDropdown.Item
                            as={NavLink}
                            to={`/${category.name}/${brand}`}
                            className="fw-light px-3"
                            onClick={() => handleNavLinkClick(`/${category.name}/${brand}`)}
                            key={brand}>
                            {brand}
                        </NavDropdown.Item>
                    ))}
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                        as={NavLink}
                        to={`/${category.name}`}
                        className="fw-light px-3"
                        onClick={() => handleNavLinkClick(`/${category.name}`)}>
                        Ver todas
                    </NavDropdown.Item>
                </NavDropdown>
            ))}
        </>
    );
};

export default CategoryMenu;