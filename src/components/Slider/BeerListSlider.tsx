import React from "react";

import { BeerItemsType } from "../../Api/BeerApi";
import classes from "./BeerListSlider.module.css";
import beerBottleIcon from "../../assets/images/beerBottleIcon.png";
import { NavLink } from "react-router-dom";
import FavouriteButton from "../../components/FavouriteButton/FavouriteButton";

type SliderPropsType = {
  elem: BeerItemsType;
  onFavClick: (u: BeerItemsType) => void;
  favBeerList: Array<BeerItemsType>;
};

const BeerListSlider: React.FC<SliderPropsType> = (props) => {
  const { elem } = props;

  return (
    <div className={classes.slider_item}>
      <div>
        <NavLink to={"/beercard/" + elem.id}>
          <img
            src={
              elem.image_url == null ||
              elem.image_url === "https://images.punkapi.com/v2/keg.png"
                ? beerBottleIcon
                : elem.image_url
            }
            className={classes.slider_image_beerList}
          />
          <div>{elem.name}</div>
        </NavLink>
      </div>

      <div
        onClick={() => {
          props.onFavClick(elem);
        }}
      >
        <FavouriteButton
          favBeerList={props.favBeerList}
          beer={elem}
        />
      </div>
    </div>
  );
};
export default BeerListSlider;
