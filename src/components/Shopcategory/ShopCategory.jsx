import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../../features/cartSlice";
import './ShopCategory.css';
import dropdown_icon from '../Assets/dropdown_icon.png';





const ShopCategory = (props) => {
    const { items: data } = useSelector((state) => state.products);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    // const { data, error, isLoading } = useGetAllProductsQuery();
  
    const handleAddToCart = (product) => {
      dispatch(addToCart(product));
      navigate("/cart");
    }
    // const {all_product} = useContext(ShopContext);
    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                 {data &&
              data?.map((product) => {
                    if(props.brand === product.brand) {
                        return (<div key={product._id} className="product">
                        <h3>{product.name}</h3>
                        <img src={product.image.url} alt={product.name} />
                        <div className="details">
                          <span>{product.desc}</span>
                          <span className="price">${product.price?.toLocaleString()}</span>
                        </div>
                        <button onClick={() => handleAddToCart(product)}>
                          Add To Cart
                        </button>
                      </div>)
                    }
                    
                    else {
                        return null;
                    }
                 })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory