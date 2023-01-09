import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.js';
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
                imagesUrl: []
            },
            openProductModal: false,
            openRemoveModal: false
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
                console.log(err);
                alert('登入失敗');
            })
        },
        getProductData () {
            this.products=[];
            axios.get(`${baseUrl}/api/${apiPath}/admin/products/all`)
            .then(res => {
                this.products = Object.values(res.data.products);
            })
            .catch(err => {
                console.log(err);
            })
        },
        productInfoReset () {
            this.productInfo = {
                imagesUrl: []
            };
            this.openProductModal = false;
            this.$refs.requiredMsg.classList.remove('outline');
        },
        postProduct () {
            // 編輯
            if (this.productInfo.id) {
                console.log('編輯');
                axios.put(`${baseUrl}/api/${apiPath}/admin/product/${this.productInfo.id}`,{
                    data : this.productInfo
                })
                .then(() => {
                    this.getProductData();
                    this.productInfoReset();
                })
                .catch(err => {
                    const message = JSON.parse(err.request.response).message;
                    alert(message.join('\n'));
                    this.$refs.requiredMsg.classList.add('outline');
                })
                return
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
                const message = JSON.parse(err.request.response).message;
                alert(message.join('\n'));
                this.$refs.requiredMsg.classList.add('outline');
            });
        },
        removeProduct (id) {
            axios.delete(`${baseUrl}/api/${apiPath}/admin/product/${id}`)
            .then(() => {
                this.openRemoveModal = false;
                this.getProductData();
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    watch:{
        productInfo:{
            handler (n,o) {
                if (this.productInfo.title || this.productInfo.category || this.productInfo.unit || this.productInfo.origin_price || this.productInfo.price) {
                     this.$refs.requiredMsg.classList.remove('outline');
                }
            },
            deep:true
        }
    },
    mounted() {
        if (document.cookie.includes('token')) {
            this.isLoad = true;
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;
            this.getProductData();
        }
    },
}
createApp(app).mount('#app');