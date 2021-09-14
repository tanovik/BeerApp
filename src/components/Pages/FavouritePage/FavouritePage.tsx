import React, { useEffect, useState } from "react";
import classes from "./FavouritePage.module.css";
import { BeerItemsType } from "./../../../Api/BeerApi";
import Preloader from "../../Preloader/Preloader";
import BeerItem from "../../BeerItem/BeerItem";

import beersHorizontal from "../../../assets/images/beersHorizontal.jpg";

type PropsType = {
  onFavClick: (u: BeerItemsType) => void;
  favBeerList: Array<BeerItemsType>;
  list: Array<BeerItemsType>;
};

const FavouritePage: React.FC<PropsType> = (props) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  if (!props.list) {
    return <Preloader />;
  }

  return (
    <div className={classes.favouritePage}>
      {props.list.length === 0 ? (
        <div className={classes.emptyFavouritesList}>
          There are no beers in your favourites list
          <div>
            <img src={beersHorizontal} className={classes.beerImage} />
          </div>
        </div>
      ) : (
        <div className={classes.beerItems}>
          <BeerItem
            onFavClick={props.onFavClick}
            list={props.favBeerList}
            favBeerList={props.favBeerList}
          />
        </div>
      )}
    </div>
  );
};

export default FavouritePage;
