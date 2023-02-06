export default{
    props:['product','addToCart'],
    template:`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-primary bg-opacity-25">
                <h5 class="modal-title fs-4" id="exampleModalLabel">
                    {{ product.title }}
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close" @click="$emit('update:product',{})"></button>
            </div>
            <div class="modal-body row">
                <div class="col">
                    <img :src="product.imageUrl"
                        :alt="product.title" class="w-100" />
                </div>
                <div class="col">
                    <h2 class="fs-3 d-flex gap-4 align-items-center">
                    {{ product.title }}
                        <button type="button" class="btn btn-sm btn-primary rounded-pill">
                        {{ product.category }}
                        </button>
                    </h2>
                    <p class="fs-5 mb-0">商品描述：</p>
                    <p> {{ product.description }} </p>
                    <p class="fs-5 mb-0">商品內容：</p>
                    <p> {{ product.content }} </p>
                    <p v-if="product.origin_price === product.price">{{ product.origin_price }} 元</p>
                    <div v-else>
                        <del>原價 {{ product.origin_price }} 元</del>
                        <p class="fs-4 text-danger">現在只要 {{ product.price }} 元</p>
                    </div>
                    <div class="input-group">
                        <input type="number" class="form-control" min="1" v-model="qty" />
                        <button type="button" class="btn btn-primary" @click="addCart(product.id,qty)">
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="$emit('update:product',{})"  ref="modalClose">
                    關閉
                </button>
            </div>
        </div>
    </div>
</div>`,
data(){
    return{
        qty: 1
    }
},
methods: {
    addCart(productId,qty) {
        this.addToCart(productId,qty);
        alert('已加入購物車');
        this.$refs.modalClose.click();
    }
},
}