import React,{useContext} from "react";
import classes from './ServiceItem.module.css';
import ServiceItemForm from "./ServiceItemForm";
import CartContext from "../../../store/Cart-context";

const ServiceItem=(props)=>{
    const cartCxt=useContext(CartContext)
    const price=`$${props.price.toFixed(2)}`;

    const addToCartHandler=(amount)=>{
        cartCxt.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        })
    }
    return(
        <li className={classes.service}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <ServiceItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}
export default ServiceItem;