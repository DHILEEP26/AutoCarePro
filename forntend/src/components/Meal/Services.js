import React,{Fragment} from "react";
import ServicesSummary from "./ServicesSummary";
import AvailableServices from "./AvailableServices";
const Services=()=>{
  return(
    <Fragment>
        <ServicesSummary/>
        <AvailableServices/>
    </Fragment>

  );
}
export default Services;