import { AppStateType } from "./reduxStore"

export const getBeerItems =(state:AppStateType )=>{
return state.beerPage.beerItems
}
export const getFilteredBeerItems =(state:AppStateType )=>{
return state.beerPage.filteredBeerItems
}
export const getBeerItem =(state:AppStateType )=>{
return state.beerPage.beerItem
}
export const getBeerId =(state:AppStateType )=>{
return state.beerPage.beerId
}
export const getFilter =(state:AppStateType)=>{
    return state.beerPage.filter
    }
export const getCurrentPage =(state:AppStateType)=>{
    return state.beerPage.currentPage
    }
export const getTotalItemsCount =(state:AppStateType)=>{
    return state.beerPage.totalItemsCount
    }





