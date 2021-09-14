import React from "react";
import { BeerItemsType } from "../../Api/BeerApi";
import { HeartOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

type PropsType = {
  favBeerList: Array<BeerItemsType>;
  beer: BeerItemsType;
};

const FavouriteButton: React.FC<PropsType> = (props) => {
  const setClass = (beer: BeerItemsType, favBeerList: Array<BeerItemsType>) => {
    let favouriteClass: Array<boolean> = [];
    favBeerList.find((favBeer) => favBeer.id === beer.id)
      ? favouriteClass.push(true)
      : favouriteClass.push(false);

    return favouriteClass;
  };

  return (
    <>
      <Tooltip title={setClass(props.beer, props.favBeerList)[1]}>
        <Button
          type="primary"
          shape="circle"
          icon={<HeartOutlined />}
          ghost={setClass(props.beer, props.favBeerList)[0]}
        />
      </Tooltip>
    </>
  );
};

export default FavouriteButton;
