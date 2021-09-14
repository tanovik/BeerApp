import React from "react";
import classes from "./HomePage.module.css";
import { BeerItemsType, BannerImagesType } from "../../../Api/BeerApi";
import { BeerFilterType } from "../../../Redux/beerReducer";
import Slider from "../../Slider/Slider";
import HomePageBanner1 from "../../../assets/images/HomePageSlides/HomePageBanner1.png";
import HomePageBanner2 from "../../../assets/images/HomePageSlides/HomePageBanner2.png";
import HomePageBanner3 from "../../../assets/images/HomePageSlides/HomePageBanner3.png";
import worldBeer from "./../../../assets/images/worldBeer.jpg";

type PropsType = {
  onFavClick: (u: BeerItemsType) => void;
  favBeerList: Array<BeerItemsType>;
  list: Array<BeerItemsType>;
  onFilterChanged: (filter: BeerFilterType) => void;
};

const bannerImages: BannerImagesType[] = [
  { id: 1, img: HomePageBanner1 },
  { id: 2, img: HomePageBanner2 },
  { id: 3, img: HomePageBanner3 },
];
const HomePage: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.startPage}>
      <div className={classes.bannerSlider}>
        <Slider
          list={bannerImages}
          amountPerWindow={1}
          itemWidth={1583}
          gapWidth={0}
          shiftSize={1583}
          isBanner={true}
          onFavClick={props.onFavClick}
          favBeerList={props.favBeerList}
        />
      </div>
      <div className={classes.beerItemSlider_container}>
        <div>
          <Slider
            list={props.list}
            amountPerWindow={5}
            itemWidth={80}
            gapWidth={10}
            shiftSize={450}
            isBanner={false}
            onFavClick={props.onFavClick}
            favBeerList={props.favBeerList}
          />
        </div>
        <div>
          <img src={worldBeer} className={classes.worldBeerImage} />
        </div>
        <div>
          <Slider
            list={props.list.slice().reverse()}
            amountPerWindow={5}
            itemWidth={80}
            gapWidth={10}
            shiftSize={450}
            isBanner={false}
            onFavClick={props.onFavClick}
            favBeerList={props.favBeerList}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
