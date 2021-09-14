import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredBeerItems,
  getFilter,
  getCurrentPage,
} from "../../../Redux/beerSelectors";
import { BeerItemsType } from "../../../Api/BeerApi";
import {
  BeerFilterType,
  getFilteredBeerList,
} from "../../../Redux/beerReducer";
import BeerItem from "../../BeerItem/BeerItem";

import * as queryString from "querystring";
import classes from "./SearchPage.module.css";
import BeerFormik from "../../Formik/FormikContainer";
import cn from "classnames";
import beersHorizontal from "../../../assets/images/beersHorizontal.jpg";

type PropsType = {
  favBeerList: Array<BeerItemsType>;
  onFavClick: (u: BeerItemsType) => void;
  onFilterChanged: (filter: BeerFilterType) => void;
};

const SearchPage: React.FC<PropsType> = (props) => {
  const filteredBeerItems = useSelector(getFilteredBeerItems);
  const filter = useSelector(getFilter);
  const currentPage = useSelector(getCurrentPage);
  const [showButton, setShowButton] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as {
      term: string;
      page: string;
      abv_gt: string;
      abv_lt: string;
      ibu_gt: string;
      ibu_lt: string;
      food: string;
      brewed_before: string;
      brewed_after: string;
    };

    let actualPage = currentPage;
    let actualFilter = filter;
    if (parsed.page) actualPage = +parsed.page;
    if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term };
    if (parsed.food) actualFilter = { ...actualFilter, food: parsed.food };
    if (parsed.brewed_before)
      actualFilter = {
        ...actualFilter,
        brewed_before: parsed.brewed_before,
        brewed_beforeDate: parsed.brewed_before as unknown as Date,
      };
    if (parsed.brewed_after)
      actualFilter = {
        ...actualFilter,
        brewed_after: parsed.brewed_after,
        brewed_afterDate: parsed.brewed_after as unknown as Date,
      };

    if (parsed.abv_gt)
      actualFilter = {
        ...actualFilter,
        abv_gt: parsed.abv_gt,
        abv: parsed.abv_gt,
      };
    if (parsed.abv_lt)
      actualFilter = {
        ...actualFilter,
        abv_lt: parsed.abv_lt,
        abv: parsed.abv_lt,
      };
    if (parsed.ibu_gt)
      actualFilter = {
        ...actualFilter,
        ibu_gt: parsed.ibu_gt,
        ibu: parsed.ibu_gt,
      };
    if (parsed.ibu_lt)
      actualFilter = {
        ...actualFilter,
        ibu_lt: parsed.ibu_lt,
        ibu: parsed.ibu_lt,
      };

    dispatch(getFilteredBeerList(actualFilter, actualPage));
  }, []);

  useEffect(() => {
    const query: { [key: string]: string } = {};
    if (filter.term) query.term = filter.term;
    if (filter.food) query.food = filter.food;
    if (filter.brewed_before) query.brewed_before = filter.brewed_before;
    if (filter.brewed_after) query.brewed_after = filter.brewed_after;
    if (filter.abv_gt !== null) query.abv_gt = filter.abv_gt;
    if (filter.abv_lt !== null) query.abv_lt = filter.abv_lt;
    if (filter.ibu_gt !== null) query.ibu_gt = String(filter.ibu_gt);
    if (filter.ibu_lt !== null) query.ibu_lt = String(filter.ibu_lt);
    if (currentPage !== 1) query.page = String(currentPage);
    history.push({
      pathname: "/beersearch",
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

  useEffect(() => {
    const handler = () => {
      if (window.pageYOffset > 120) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className={classes.searchBeerPage}>
      <div
        className={cn(
          classes.searchSideMenu,
          { [classes.searchSideMenuUp]: showButton == true },
          { [classes.searchSideMenuDown]: showButton == false }
        )}
      >
        <BeerFormik onFilterChanged={props.onFilterChanged} />
      </div>

      {filteredBeerItems.length === 0 ? (
        <div className={classes.emptyList}>
          No beers matched. Try to change your search criteria.
          <div>
            <img src={beersHorizontal} className={classes.beerImage} />
          </div>
        </div>
      ) : (
        <div className={classes.beerItems}>
          <BeerItem
            onFavClick={props.onFavClick}
            list={filteredBeerItems}
            favBeerList={props.favBeerList}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
