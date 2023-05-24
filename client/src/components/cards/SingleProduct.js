import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Laptop from '../../images/defaultImage.png';
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";

const { TabPane } = Tabs;
const { Meta } = Card;

const handleAddToWishlist = (e) => {
  e.preventDefault();
  addToWishlist(product._id, user.token).then((res) => {
    console.log("ADDED TO WISHLIST", res.data);
    toast.success("Added to wishlist");
    history.push("/user/wishlist");
  });
};

const SingleProduct = ({ product, onStarClick, star  }) => {
  const { title, images, description, _id } = product;

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <Tooltip placement="top" title={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                {product.quantity < 1 ? "Out of Stock" : "Add To Cart"}
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist}><HeartOutlined className="text-info" /> <br /> Add to Wishlist</a>,
            <RatingModal>
              <StarRating name={_id} numberOfStars={5} rating={star} changeRating={onStarClick} isSelectable={true} starRatedColor="red"/>
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
