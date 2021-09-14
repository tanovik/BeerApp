import "./AppBeer.css";
import { Provider } from "react-redux";
import {withRouter,BrowserRouter,Route,Redirect,Switch} from "react-router-dom";
import { compose } from "redux";
import store from "./Redux/reduxStore";
import BeerCardContainer from "./components/Pages/BeerCardPage/BeerCardContainer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBeerItems } from "./Redux/beerSelectors";
import { BeerFilterType, getBeerList } from "./Redux/beerReducer";
import { BeerItemsType } from "./Api/BeerApi";
import SearchPage from "./components/Pages/SearchPage/SearchPage";
import BeersPage from "./components/Pages/BeersPage/BeersPage";
import HomePage from "./components/Pages/HomePage/HomePage";
import { Header } from "./components/Header/Header";
import { getFilteredBeerList } from "./Redux/beerReducer";
import { Footer } from "./components/Footer/Footer";
import FavouritePage from "./components/Pages/FavouritePage/FavouritePage";

type PropsType = {};

export const MainApp: React.FC<PropsType> = () => {
  const [favBeerList, setFavBeerList] = useState<BeerItemsType[]>([]);
  const beerItems = useSelector(getBeerItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBeerList("", 1));
  }, []);

  const onFavClick = (u: BeerItemsType) => {
    let clearedBeerList = [] 
    
    clearedBeerList = [...favBeerList];
    clearedBeerList.find((savedBeer: BeerItemsType) => savedBeer.id === u.id)
      ? clearedBeerList.splice(
          clearedBeerList.findIndex(
            (savedBeer: BeerItemsType) => savedBeer.id === u.id
          ),
          1
        )
      : clearedBeerList.push(u);
    setFavBeerList(clearedBeerList);
  };
  const onFilterChanged = (filter: BeerFilterType) => {
    dispatch(getFilteredBeerList(filter, 1));
  };
  return (
    <div>
      <Header onFilterChanged={onFilterChanged} />

      <div style={{ textAlign: "center" }}>
        {/* <Content style={{ padding: "0 24px", minHeight: 280 }}> */}
        <Switch>
          <Route path="/" exact>
            <Redirect from="/" to="/home" />
          </Route>

          <Route
            path="/home"
            render={() => (
              <HomePage
                onFavClick={onFavClick}
                list={beerItems}
                favBeerList={favBeerList}
                onFilterChanged={onFilterChanged}
              />
            )}
          />
          <Route
            path="/beers"
            render={() => (
              <BeersPage
                onFavClick={onFavClick}
                list={beerItems}
                favBeerList={favBeerList}
              />
            )}
          />
          <Route
            path="/beercard/:beerId?"
            render={() => <BeerCardContainer />}
          />
          <Route
            path="/favourites"
            render={() => (
              <FavouritePage
                onFavClick={onFavClick}
                list={favBeerList}
                favBeerList={favBeerList}
              />
            )}
          />
          <Route
            path="/beersearch"
            render={() => (
              <SearchPage
                favBeerList={favBeerList}
                onFavClick={onFavClick}
                onFilterChanged={onFilterChanged}
              />
            )}
          />

          <Route path="*" render={() => <div>404 NOT FOUND</div>} />
        </Switch>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

let AppContainer = compose<React.ComponentType>(withRouter)(MainApp);

let App: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};
export default App;
