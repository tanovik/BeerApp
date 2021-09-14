import React, { useRef } from "react";

import { BeerItemsType, BannerImagesType } from "../../Api/BeerApi";
import classes from "./Slider.module.css";
import cn from "classnames";
import BannerSlider from "./BannerSlider";
import BeerListSlider from "./BeerListSlider";
import {RightOutlined,LeftOutlined} from "@ant-design/icons";


type PropsType = {
   list: (BannerImagesType| BeerItemsType)[]
  amountPerWindow: number
  itemWidth: number
  gapWidth: number
  shiftSize: number
  isBanner:boolean
  onFavClick: (u: BeerItemsType) => void;
  favBeerList: Array<BeerItemsType>
};
const Slider: React.FC<PropsType> = (props) => {
   const { list, amountPerWindow, itemWidth, gapWidth, shiftSize,isBanner, onFavClick, favBeerList} = props;
  const slider = useRef<any>(null);
 
  let position = 0
  let newPosition = (list.length - amountPerWindow)*itemWidth+(list.length - amountPerWindow)*gapWidth
  const prevHandler = () => {
    const items:(BannerImagesType| BeerItemsType)[] = Array.from(slider.current?.childNodes)
    if (position === 0){
      position = -(newPosition)
      items.slice(0,items.length-2).forEach((el) => {
        el.style = `transform: translateX(${position}px)`;
      });
    } else{
      position += shiftSize
      items.slice(0,items.length-2).forEach((el) => {
        el.style = `transform: translateX(${position}px)`;
      });
    }
  };
  
  const nextHandler = () => {
    // const items = Array.from(slider.current?.childNodes)
    const items:(BannerImagesType| BeerItemsType)[] = Array.from(slider.current?.childNodes)

    if (position === -(newPosition)){
      position = 0
      items.slice(0,items.length-2).forEach((el) => {
        el.style = `transform: translateX(${position}px)`})
    }else{
      position -= shiftSize
      items.slice(0,items.length-2).forEach((el) => {
        el.style = `transform: translateX(${position}px)`;
      });
    }
  };

  return (
   <div className={cn(
      { [classes.sliderBanner]: isBanner === true },
      { [classes.sliderBeerList]: isBanner === false })}>

  
      <div className={classes.slider_track} ref={slider}>
      
        {list.map((elem, i) => {
      return (
        <div key={elem.id}>
{isBanner?<BannerSlider elem={elem as BannerImagesType} />:<BeerListSlider elem={elem as BeerItemsType} onFavClick={onFavClick} favBeerList={favBeerList} />}
        </div>
       
        ) })}
       
      

     <button
      className={cn(classes.slider_button,
        { [classes.slider_button_prevBanner]: isBanner === true },
        { [classes.slider_button_prevBeerList]: isBanner === false })}
      onClick={prevHandler}
        >
         <LeftOutlined />
        </button>
        
        <button
        className={cn(classes.slider_button,
          { [classes.slider_button_nextBanner]: isBanner === true },
          { [classes.slider_button_nextBeerList]: isBanner === false })}
          onClick={nextHandler}
          >
          <RightOutlined />
        </button>
        


    </div>
    </div>
  );
}
export default Slider;
     