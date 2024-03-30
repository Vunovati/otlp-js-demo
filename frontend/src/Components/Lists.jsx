import React from 'react'
import { allProducts } from "../mockData";

// Ovdje stavljam funkcije kojima filtriram proizvode u 4 kategorije: Women, Men, New Arrivals, Trending Now


    function listWomenProducts(){
        const women = allProducts.filter(product => product.gender === 'Female');
    
        return(
          <div>
              {women.map(item => <li key={item.id}>{item.name},{item.imageSrc},{item.price},{item.color}</li>)}
          </div>)
         
    
      };
    
       function listMenProducts(){
        const men = allProducts.filter(product => product.gender === 'Male');
    
        return(
          <div>
              {men.map(item => <li key={item.id}>{item.name},{item.imageSrc},{item.price},{item.color}</li>)}
          </div>)
         
    
      };
    
      function listNewArrivedProducts(){
        const newArrived = allProducts.filter(product => product.newArrival=== 'True');
    
        return(
          <div>
              {newArrived.map(item => <li key={item.id}>{item.name},{item.imageSrc},{item.price},{item.color}</li>)}
          </div>)
         
    
      };
    
       function listTrendingNowProducts(){
        const trendingNow = allProducts.filter(product => product.trendingNow === 'True');
    
        return(
          <div>
              {trendingNow.map(item => <li key={item.id}>{item.name},{item.imageSrc},{item.price},{item.color}</li>)}
          </div>)
         
    
    
      };

      


export { listWomenProducts, listMenProducts, listNewArrivedProducts, listTrendingNowProducts };
