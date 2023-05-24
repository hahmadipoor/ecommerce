import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import { getRelated } from "../functions/product";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  const { slug } = match.params;


  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find((ele) => ele.postedBy.toString() === user._id.toString());
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
      setStar(newRating);
      console.table(newRating, name);
      productStar(name, newRating, user.token).then((res) => {
        console.log("rating clicked", res.data);
        loadSingleProduct(); // if you want to show updated rating in real time
      });
  };

  return (
      <div className="container-fluid">
        <div className="row pt-4">
          <SingleProduct product={product} onStarClick={onStarClick} star={star} />
        </div>
  
        <div className="row pb-5">
          {related.length ? (
            related.map((rp) => (
              <div key={r._id} className="col-md-4">
                <ProductCard product={rp} />
              </div>
            ))
           ) 
          : 
           ( <div className="text-center col">No Products Found</div>)}
       </div>
      </div>
  );
};

export default Product;
