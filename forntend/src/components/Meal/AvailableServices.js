import React,{useState,useEffect} from "react";
import classes from "./AvailableServices.module.css";
import Card from "../UI/Card";
import ServiceItem from "./ServiceItems/ServiceItem";
import axios from "axios";

const AvailableServices = () => {
  const [serviceFromDataBase,setServiceFromDataBase]=useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/services");
    setServiceFromDataBase(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);
  const serviceList = serviceFromDataBase.map((service) => (
    <ServiceItem
      key={service.id}
      id={service.id}
      name={service.name}
      description={service.description}
      price={service.price}
    />
  ));

  return (
    <section className={classes.services}>
      <Card>
        <ul>{serviceList}</ul>
      </Card>
    </section>
  );
};
export default AvailableServices;
