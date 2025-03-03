import React from 'react';

interface ProductSortProps {
    orderBy: string;
    handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProductSort = ({ orderBy, handleSortChange }: ProductSortProps) => {

    return (
        <>
            <select id="sortOrder" value={orderBy} onChange={handleSortChange} className="py-2 form-select fw-light rounded-0 border border-1 border-dark w-auto">
                <option value="alphabetical">Alfabéticamente A - Z</option>
                <option value="price-asc">Precio ascendente</option>
                <option value="price-desc">Precio descendente</option>
                <option value="stock-asc">Stock ascendente</option>
                <option value="stock-desc">Stock descendente</option>
            </select>
        </>
    );

}


export default ProductSort;