import React from "react";
import classes from "./BannerSlider.module.css";
import { BannerImagesType } from "../../Api/BeerApi";


type SliderPropsType = {
  elem: BannerImagesType;
};

const BannerSlider: React.FC<SliderPropsType> = (props) => {
  const { elem } = props;

  return (
    <div className={classes.slider_item}>
      <img src={elem.img}  className={classes.slider_image} />
    </div>
  );
};

export default BannerSlider;
