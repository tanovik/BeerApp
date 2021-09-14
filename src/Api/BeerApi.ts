import axios from "axios";



const instance = axios.create({
  
  baseURL: 'https://api.punkapi.com/v2/',
});
export const beerAPI = {
 
  requestBeerList(term:null|string = null,abv_gt:null|string = null,abv_lt:null|string = null,ibu_gt:null|string = null,ibu_lt:null|string = null, food:null|string = null, brewed_before:null| string = null, brewed_after:null| string = null, currentPage = 1) {
    return instance
    .get<Array<BeerItemsType>>(`/beers`+((currentPage===null? '': `?page=${currentPage}`)+(term===null||term===''?'': `&beer_name=${term}`)+(abv_gt==null||abv_gt===''?'': `&abv_gt=${abv_gt}`)+(abv_lt==null||abv_lt===''?'': `&abv_lt=${abv_lt}`)+(ibu_gt==null||ibu_gt===''?'': `&ibu_gt=${ibu_gt}`)+(ibu_lt==null||ibu_lt===''?'': `&ibu_lt=${ibu_lt}`)+(food==null||food===''?'': `&food=${food}`)+(brewed_before==null||brewed_before===''?'': `&brewed_before=${brewed_before}`)+(brewed_after==null||brewed_after===''?'': `&brewed_after=${ brewed_after}`)))
    .then((response) => response.data)
   
  },
    
  getBeerItem(beerId: number | null) {
    return instance
    .get<Array<BeerItemsType>>(`/beers/` + beerId).then((response) => response.data);
  },
}


export type  BeerItemsType =
{id:number
name:string
tagline:string
first_brewed: string
description: string
image_url:string |null
abv:number
ibu:number
target_fg:number
target_og:number
ebc:number
srm:number
ph:number
attenuation_level:number
volume:{value:number,unit:string}
boil_volume:{value:number,unit:string}
method:Object
ingredients:{
    malt:Array<MaltType>
    hops:Array<HopsType>
    yeast: string}
food_pairing:Array<string>
brewers_tips:string
contributed_by:string
style?: string

}

export type MaltType ={
  name: string,
 amount: {
            value: number,
            unit: string
}
}
export type HopsType ={
  name: string,
  amount: {
            value: number,
            unit: string
}
  add: string,
   attribute: string

}

export type BannerImagesType={
  id: number
  img: string
  style?: string
}