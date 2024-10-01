import React from 'react';
import Product from './Product';

const ProductList = ({ products, onCommentSubmit }) => {
  return (
    <div>
      {products.map(product => (
        <Product
          key={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          onCommentSubmit={onCommentSubmit}
        />
      ))}
    </div>
  );
};

export default ProductList;
