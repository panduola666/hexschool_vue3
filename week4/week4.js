import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.js';
import pagination from './components/pagination.js';
import productModal from './components/productModal.js';
import removeModal from './components/removeModal.js';

const baseUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'panduola666';
const app ={
    data(){
        return{
            user:{
                username:'',
                password:''
            },
            isLoad: false,
            products:[],
            productInfo:{
                remainingNum: 0,
                imagesUrl: []
            },
            openProductModal: false,
            openRemoveModal: false,
            pages:{}
        }
    },
    methods: {
        login(){
            axios.post(`${baseUrl}/admin/signin`,this.user)
            .then(res=>{
                document.cookie = `token=${res.data.token}; expires=${new Date(res.data.expired)};`;
                this.isLoad = true;
            axios.defaults.headers.common['Authorization'] = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                this.getProductData();
            })
            .catch(err=>{
                alert('登入失敗');
            })
        },
        checkLogin () {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${baseUrl}/api/user/check`)
            .then(res=>{
                // alert(`${res.data.uid} 歡迎`); 
                this.isLoad = true;
                this.getProductData(); 
            })
            .catch(err=>{
                // alert(JSON.parse(err.request.response).message);
                this.isLoad = false;
            })
        },
        getProductData (page = 1) {
            this.products=[];
            axios.get(`${baseUrl}/api/${apiPath}/admin/products?page=${page}`)
            .then(res => {
                const { products,pagination } = res.data;
                this.products = Object.values(products);
                this.pages = pagination;
            })
        },
        productInfoReset (requiredMsg) {
            this.productInfo = this.$options.data().productInfo;
            this.openProductModal = false;
            requiredMsg.classList.remove('outline');
        },
        postProduct (requiredMsg) {
            if(!this.productInfo.remainingNum) this.productInfo.is_enabled = false;
            // 編輯
            if (this.productInfo.id) {
                axios.put(`${baseUrl}/api/${apiPath}/admin/product/${this.productInfo.id}`,{
                    data : this.productInfo
                })
                .then(() => {
                    this.getProductData();
                    this.productInfoReset();
                })
                .catch(err => {
                    if(err.request?.status === 400) {
                        const message = JSON.parse(err.request.response).message;
                        alert(message.join('\n'));
                        requiredMsg.classList.add('outline');
                    }
                })
                return;
            };
            // 新增
            axios.post(`${baseUrl}/api/${apiPath}/admin/product`,{
                data : this.productInfo
            })
            .then(res => {
                this.getProductData();
                this.productInfoReset();
            })
            .catch(err => {
                if(err.request?.status === 400) {
                    const message = JSON.parse(err.request.response).message;
                    alert(message.join('\n'));
                    requiredMsg.classList.add('outline');
                }
            });
        },
        removeProduct (id) {
            axios.delete(`${baseUrl}/api/${apiPath}/admin/product/${id}`)
            .then(() => {
                this.openRemoveModal = false;
                this.getProductData();
            })
        },
        localImg (inputDom) {
            this.productInfo.imageUrl = '';
            const file = inputDom.files[0];
            const formData = new FormData();
            formData.append('fileImage',file);
            axios.post(`${baseUrl}/api/${apiPath}/admin/upload`,formData)
            .then(res=>{
                this.productInfo.imageUrl = res.data.imageUrl;
            })
        }
    },
    components:{
        pagination,productModal,removeModal
    },
    mounted() {
        if (document.cookie.includes('token')) this.checkLogin();
    },
}
createApp(app).mount('#app');