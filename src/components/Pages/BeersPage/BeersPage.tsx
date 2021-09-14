import React, { useEffect, useState } from "react";
import classes from "./BeersPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage } from "../../../Redux/beerSelectors";
import { BeerItemsType } from "../../../Api/BeerApi";
import { getBeerList } from "../../../Redux/beerReducer";
import { Button, Tooltip } from "antd";
import BeerItem from "../../BeerItem/BeerItem";
import BeerPaginator from "../../Paginator/Paginator";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";
import allBeer from "../../../assets/images/allBeer.png";
import { UpOutlined } from "@ant-design/icons";

type PropsType = {
  onFavClick: (u: BeerItemsType) => void;
  favBeerList: Array<BeerItemsType>;
  list: Array<BeerItemsType>;
};

const BeersPage: React.FC<PropsType> = (props) => {
  const [showButton, setShowButton] = useState(false);

  const currentPage = useSelector(getCurrentPage);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const query: { [key: string]: string } = {};
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/beers",
      search: queryString.stringify(query),
    });
  }, [currentPage]);

  useEffect(() => {
    const handler = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const onPageChanged = (pageNumber: number) => {
    dispatch(getBeerList("", pageNumber));
  };

  return (
    <div className={classes.beerStartPage}>
      <div>
        <img src={allBeer} className={classes.allBeerImg} />
      </div>

      <div className={classes.beerItems}>
        <BeerItem
          onFavClick={props.onFavClick}
          list={props.list}
          favBeerList={props.favBeerList}
        />
      </div>
      <div className={classes.paginator}>
        <BeerPaginator
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          list={props.list}
        />
      </div>

      <div className={classes.backToTop}>
        {showButton && (
          <Tooltip title={"UP"}>
            <Button
              onClick={scrollToTop}
              className={classes.backToTopButton}
              icon={<UpOutlined className={classes.backToTopIcon} />}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default BeersPage;
