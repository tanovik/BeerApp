import React from "react";
import beerBottleIcon from "../../../assets/images/beerBottleIcon.png";
import { BeerItemsType, MaltType, HopsType } from "../../../Api/BeerApi";
import Preloader from "../../Preloader/Preloader";
import classes from "./BeerCardPage.module.css";

type PropsType = {
  beerItem: BeerItemsType | null;
};

const BeerCard: React.FC<PropsType> = (props) => {
  if (!props.beerItem) {
    return <Preloader />;
  }

  let maltElement = props.beerItem.ingredients.malt.map((u: MaltType) => (
    <div>
      {" "}
      {u.name} - {u.amount.value}
      {u.amount.unit}
    </div>
  ));
  let hopsElement = props.beerItem.ingredients.hops.map((u: HopsType) => (
    <div>
      {" "}
      {u.name} - {u.amount.value}
      {u.amount.unit}
    </div>
  ));
  let foodPairingElement = props.beerItem.food_pairing.map((u: string) => (
    <div> {u} </div>
  ));
  return (
    <div className={classes.beerCardPage}>
      <div className={classes.beerIconContainer}>
        <img
          src={
            props.beerItem.image_url == null ||
            props.beerItem.image_url == "https://images.punkapi.com/v2/keg.png"
              ? beerBottleIcon
              : props.beerItem.image_url
          }
          className={classes.beerIcon}
        />
      </div>

      <div className={classes.beerInfo}>
        <div className={classes.beerNameText}>{props.beerItem.name}</div>
        <div className={classes.beerDescription}>
          {props.beerItem.description}
        </div>

        <table>
          <tbody>
            <tr>
              <th>ABV%</th>
              <td>{props.beerItem.abv}</td>
            </tr>
            <tr>
              <th>IBU</th>
              <td>{props.beerItem.ibu}</td>
            </tr>
            <tr>
              <th>First brewed</th>
              <td>{props.beerItem.first_brewed}</td>
            </tr>

            <tr>
              <th>Malt</th>
              <td>{maltElement}</td>
            </tr>
            <tr>
              <th>Hops</th>
              <td>{hopsElement}</td>
            </tr>
            <tr>
              <th>Yeast</th>
              <td>{props.beerItem.ingredients.yeast}</td>
            </tr>
            <tr>
              <th>Food pairing</th>
              <td>{foodPairingElement}</td>
            </tr>
            <tr>
              <th>Brewers tips</th>
              <td>{props.beerItem.brewers_tips}</td>
            </tr>
            <tr>
              <th>Contributed by</th>
              <td>{props.beerItem.contributed_by}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BeerCard;
