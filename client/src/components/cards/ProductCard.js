import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  
  const { images, title, description, slug } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      dispatch({
        type: "SET_VIZIBLE",
        payload:true
      })
    }
  };
  return (
    <Card
      cover={<img src={images && images.length ? images[0].url : laptop} style={{ height: "150px", objectFit: "cover" }} className="p-1"/>}
      actions={[
        <Link to={`/product/${slug}`}><EyeOutlined className="text-warning" /> <br /> View Product</Link>,
        <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity<1}> <ShoppingCartOutlined className="text-danger" /> <br />{product.quantity<1?'Out of Stock':'Add to Cart '}  </a>
        </Tooltip>,
      ]}>
      <Meta title={title} description={`${description && description.substring(0, 40)}...`}/>
    </Card>
  );
};

export default ProductCard;
