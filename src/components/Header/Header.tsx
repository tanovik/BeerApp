import React, {useState, useEffect} from "react";
import {NavLink } from "react-router-dom";

import classes from "./Header.module.css";
import HomePageIcon from "../../assets/images/HomePageIcon.png";
import HeaderFormik from "../Formik/HeaderFormikContainer";
import { BeerFilterType } from "../../Redux/beerReducer";
import cn from "classnames";
import {useHistory } from "react-router-dom";



type PropsType = {
  onFilterChanged: (filter: BeerFilterType) => void;
};

export const Header: React.FC<PropsType> = (props) => {
 const [show, setShow] = useState(true)
 const history = useHistory();
const controlHeader = () => {
  if (window.scrollY > 100){
    setShow(false)
  } else{
    setShow(true)
  }
}


useEffect (() => {
  window.addEventListener('scroll',controlHeader)
  return () => {
    window.removeEventListener('scroll', controlHeader)
  }
}, [])

  return (
      <div className={cn(classes.header,
      { [classes.headerUp]: show === true },
      { [classes.headerDown]: show === false })}>
      
      <NavLink to={"/home"}>
        <img src={HomePageIcon} className={cn(classes.homePageIcon,
      { [classes.homePageIconUp]: show === true },
      { [classes.homePageIconDown]: show === false })} />
      </NavLink>

      <div className={classes.searchAndLinks}>
      <div className={classes.searchGroup} style={{ visibility: (history.location.pathname !== "/beersearch" ? 'visible' : 'hidden') }}>
        <HeaderFormik onFilterChanged={props.onFilterChanged} />
      </div>

      <div className={cn(classes.headerLinks,
      { [classes.headerLinksUp]: show === true },
      { [classes.headerLinksDown]: show === false })}>
        <NavLink to={"/beers"}>
          <div>BEERS</div>
        </NavLink>
        <NavLink to={"/beersearch"}>
          <div>SEARCH</div>
        </NavLink>
        <NavLink to={"/favourites"}>
          <div>FAVOURITES</div>
        </NavLink>
      </div>
      </div>
      
    </div>
  );
};
