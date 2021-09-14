import React, { useState } from "react";
import classes from "./Paginator.module.css";
import cn from "classnames";
import { BeerItemsType } from "../../Api/BeerApi";
import {RightOutlined,LeftOutlined} from "@ant-design/icons";


type PropsType = {
  currentPage?: number;
  pageSize?: number;
  onPageChanged?: (pageNumber: number) => void;
  portionSize?: number;
  list: Array<BeerItemsType>;

};

let BeerPaginator: React.FC<PropsType> = ({
  currentPage = 1,
  pageSize = 25,
  onPageChanged = () => {},
  portionSize = 5,
  list}) => {
  let totalItemsCount = 323
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPagePortionNumber = (portionNumber - 1) * portionSize + 1;
  let rightPagePortionNumber = portionNumber * portionSize;

  return (
    <div className={cn(classes.paginator)}>
      {portionNumber > 1 && (
        <button
        className={classes.button}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
            
          }}
        >
          <LeftOutlined />
        </button>
      )}

      {pages
        .filter(
          (p) => p >= leftPagePortionNumber && p <= rightPagePortionNumber
        )
        .map((p) => {
          return (
            <span
              className={cn(
                { [classes.selectedPage]: currentPage === p },
                classes.pageNumber
              )}
              key={p}
              onClick={(e) => {
                onPageChanged(p);
                window.scrollTo(0, 0);
              }}
            >
              <div className={classes.pageItem}>

              {p}
              </div>

            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
        className={classes.button}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
            
          }}
        >
          <RightOutlined />
        </button>
      )}
    </div>
  );
};

export default BeerPaginator;
