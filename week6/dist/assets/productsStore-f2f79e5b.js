import{d as s,a as i}from"./axios-61e5193b.js";import{r as p}from"./index-f28331f7.js";const{VITE_URL:e,VITE_APIPATH:n}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"panduola666",BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0},d=s("productsStore",{state:()=>({products:[],pagination:{}}),actions:{async getProducts(t){if(t===this.pagination.current_page)return;const o=await i.get(`${e}/api/${n}/products?page=${t}`),{products:a,pagination:r}=o.data;this.pagination=r,this.products=a,p.push({query:{page:this.pagination.current_page}})}}});export{d as p};
