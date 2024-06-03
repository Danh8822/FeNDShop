import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import './Home.css'
import { addToCart } from "../../features/cartSlice";
import banner_web from "../Assets/1.jpg"
import { Link } from "react-router-dom";
import Chatbot from './Chatbot/Chatbot';
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { useState } from "react";


const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visibleProducts, setVisibleProducts] = useState(12);



  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 12);
  };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <div className="banner">
            <img src={banner_web} alt="" />
          </div>
          <div className="title">
            <h1>All products</h1>
            <hr />
          </div>
          <div className="products">
            {data &&
              data.slice(0, visibleProducts).map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image.url} alt={product.name} />
                  </Link>
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price?.toLocaleString()}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
            <div className="loadmore" onClick={loadMoreProducts}>
              Explore More
            </div>
          <ScrollToTop />
          <Chatbot />
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
