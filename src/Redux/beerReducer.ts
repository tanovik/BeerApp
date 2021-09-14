import {  beerAPI } from "../Api/BeerApi";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { BeerItemsType } from "../Api/BeerApi";



export type InitialStateType = typeof initialState


let initialState = {
  totalItemsCount:0,
  currentPage: 1,
  beerItems: [] as Array<BeerItemsType>, 
  filteredBeerItems: [] as Array<BeerItemsType>, 
  beerItem: null as BeerItemsType | null, 
  beerId : null as number | null, 
  filter:{
    term: '' as null|string,
    abv_gt: null as null|string,
    abv_lt: null as null|string,
    ibu_gt: null as null|string,
    ibu_lt: null as null|string,
    food: '' as null|string,
    ibu: '' as null|string,
    abv: '' as null|string,
    brewed_before: '' as null| string,
    brewed_after: '' as null| string,
    brewed_beforeDate: null as null| Date,
    brewed_afterDate: null as null| Date,

  },
 
};


export type BeerFilterType = typeof initialState.filter

const beerReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
  switch (action.type) {
    case "BEER/SET_BEER_LIST":
    {
      return {
        ...state,
        beerItems: [...action.beerItems]

              };
    }
    case "BEER/SET_FILTERED_BEER_LIST":
    {
      return {
        ...state,
        filteredBeerItems: [...action.filteredBeerItems]

              };
    }
    case "BEER/SET_BEER_CARD":
    {
      return {
        ...state,
        beerItem: action.beerItem

              };
    }
    case "BEER/SET_CURRENT_PAGE": {
      return { ...state, currentPage: action.currentPage };
    }
    case "BEER/SET_BEER_FILTER":
    {
      return {
        ...state,
        filter:{...action.payload}
              };
    }
   
   
    default:
      return state;
  }
};


type ActionsTypes = InferActionsTypes<typeof actions>

const actions={
  setBeerList: (beerItems: Array<BeerItemsType>) => ({type: "BEER/SET_BEER_LIST", beerItems }as const),
  setFilteredBeerList: (filteredBeerItems: Array<BeerItemsType>) => ({type: "BEER/SET_FILTERED_BEER_LIST", filteredBeerItems }as const),
  setBeerFilter: (filter:BeerFilterType) => ({type: "BEER/SET_BEER_FILTER", payload:filter }as const),
  setCurrentPage : (currentPage:number) => ({type: "BEER/SET_CURRENT_PAGE", currentPage, }as const),
  setBeerCard: (beerItem: BeerItemsType) => ({type: "BEER/SET_BEER_CARD", beerItem }as const),
  setError: (beerItem: BeerItemsType) => ({type: "BEER/SET_ERROR", beerItem }as const),
 
}  

type ThunkType = BaseThunkType<ActionsTypes>


    
export const getBeerList =( term:string, page:number):ThunkType=> async (dispatch)=>{
   dispatch(actions.setCurrentPage(page));
   
   let data= await beerAPI.requestBeerList(null,null,null,null,null,null,null,null,page);
      dispatch(actions.setBeerList(data))
    
    }

export const getFilteredBeerList =( filter:BeerFilterType, page:number):ThunkType=> async (dispatch)=>{
  dispatch(actions.setBeerFilter(filter));
   let data= await beerAPI.requestBeerList(filter.term,filter.abv_gt,filter. abv_lt,filter.ibu_gt,filter. ibu_lt,filter.food, filter.brewed_before, filter.brewed_after, page=1);
      dispatch(actions.setFilteredBeerList(data))}

   

    export const getBeerCard= (beerId:number| null):ThunkType=>async (dispatch)=>{
      let data = await beerAPI.getBeerItem(beerId)

            dispatch(actions.setBeerCard(data[0]));

     }


 

export default beerReducer;


