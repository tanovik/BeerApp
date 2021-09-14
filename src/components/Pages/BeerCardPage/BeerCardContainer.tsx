import React from "react";
import { connect } from "react-redux";
import { getBeerCard } from "../../../Redux/beerReducer";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { AppStateType } from "../../../Redux/reduxStore";
import BeerCard from "./BeerCardPage";
import { BeerItemsType } from "../../../Api/BeerApi";

type PropsType = MapStatePropsType &
  MapDispatchPropsType &
  RouteComponentProps<PathParamsType>;
type PathParamsType = {
  beerId: string;
};
class BeerCardContainer extends React.Component<PropsType, AppStateType> {
  refreshCard() {
    let beerId: number | null = +this.props.match.params.beerId;
    this.props.getBeerCard(beerId);
  }

  componentDidMount() {
    this.refreshCard();
  }
  componentDidUpdate(prevProps: PropsType, prevState: AppStateType) {
    if (this.props.match.params.beerId !== prevProps.match.params.beerId)
      this.refreshCard();
  }

  render() {
    return <BeerCard beerItem={this.props.beerItem} />;
  }
}

type MapDispatchPropsType = {
  getBeerCard: (beerId: number) => void;
};

type MapStatePropsType = {
  beerItem: BeerItemsType | null;
};
let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  beerItem: state.beerPage.beerItem,
});

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps,
    { getBeerCard }
  ),
  withRouter
)(BeerCardContainer);
