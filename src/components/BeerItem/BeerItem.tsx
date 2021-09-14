import React from "react";
import beerBottleIcon from "../../assets/images/beerBottleIcon.png";
import { NavLink } from "react-router-dom";
import { BeerItemsType } from "../../Api/BeerApi";
import Preloader from "../Preloader/Preloader";
import FavouriteButton from "./../FavouriteButton/FavouriteButton";
import classes from "./BeerItem.module.css";

type PropsType = {
  onFavClick: (u: BeerItemsType) => void;
  favBeerList: Array<BeerItemsType>;
  list: Array<BeerItemsType>;
};

const BeerItem: React.FC<PropsType> = (props) => {
  if (!props.list) {
    return <Preloader />;
  }

  return (
    <>
      {props.list.map((u: BeerItemsType) => (
        <div key={u.id} className={classes.beerItem}>
          <div>
            <NavLink to={"/beercard/" + u.id}>
              <img
                src={
                  u.image_url == null ||
                  u.image_url == "https://images.punkapi.com/v2/keg.png"
                    ? beerBottleIcon
                    : u.image_url
                }
                className={classes.beerItemImage}
              />

              <div>{u.name}</div>
              <div>ABV {u.abv} %</div>
            </NavLink>
          </div>
          <div
            onClick={() => {
              props.onFavClick(u);
            }}
            className={classes.favouriteButton}
          >
            <FavouriteButton favBeerList={props.favBeerList} beer={u} />
          </div>
        </div>
      ))}
    </>
  );
};

export default BeerItem;
