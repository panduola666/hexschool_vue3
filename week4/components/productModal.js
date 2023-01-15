export default {
    props:['productInfo'],
    template:`<div class="relative z-10" aria-labelledby="modal-title" role="dialog"
            aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-3/4">
                        <h2 class="text-2xl text-center bg-yellow-200">{{ product.id ? '編輯產品' : '新增產品'}}</h2>
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="flex">
                                <div class="flex flex-col w-1/2 pr-4">
                                    <h2 class="text-2xl">
                                    主要圖片
                                    <form enctype="multipart/form-data" class="relative group float-right text-base">
                                        <button type="button"
                                            class=" p-1 border-2 border-yellow-500 text-yellow-500 font-bold rounded group-hover:bg-yellow-500 group-hover:text-white transition-all">圖片上傳</button>
                                            <input type="file" name="fileImage" id="file" aria-label="圖片上傳"
                                            class="absolute left-0 top-0 w-full border border-emerald-300 opacity-0 cursor-pointer" @change="localImg">
                                     </form>
                                     </h2>
                                    
                                    <label for="imageUrl">圖片連結</label>
                                    <input type="text" placeholder="請輸入圖片連結" class="border border-gray-400 rounded p-2"
                                        id="imageUrl" name="imageUrl" v-model="product.imageUrl">
                                    <img :src="product.imageUrl" alt="" class="max-h-72 object-cover mt-4 mb-10">
                                    <p class="text-2xl">多圖新增</p>
                                    <div v-if="Array.isArray(product.imagesUrl)" class="flex flex-col">
                                        <div class="flex flex-col" v-if="product.imagesUrl">
                                            <template v-for="(image, index) in product.imagesUrl" :key="image+index">
                                                <label :for="image+index">圖片網址</label>
                                                <input type="text" placeholder="請輸入圖片連結"
                                                    class="border border-gray-400 rounded p-2 mb-4" :name="image+index"
                                                    :id="image+index" v-model.trim="product.imagesUrl[index]">
                                                <img v-if="image" :src="image" :alt="'圖片' + (index+1)" class="max-h-52 object-cover mb-2">
                                            </template>
                                        </div>
                                        <button type="button"
                                            class="border-2 border-yellow-500 text-yellow-500 font-bold rounded hover:bg-yellow-500 hover:text-white transition-all py-2 my-2 disabled:bg-gray-300 disabled:text-white disabled:border-none"
                                            @click="product.imagesUrl.push('')"
                                            :disabled="product.imagesUrl[product.imagesUrl.length -1] === ''">新增圖片</button>
                                        <button type="button"
                                            class="border-2 border-red-500 text-red-500 font-bold rounded hover:bg-red-500 hover:text-white transition-all py-2 disabled:bg-gray-300 disabled:text-white disabled:border-none"
                                            @click="product.imagesUrl.pop()" :disabled="!product.imagesUrl.length">刪除圖片</button>
                                    </div>
                                    <div v-else class="flex flex-col">
                                    <button type="button"
                                        class="border-2 border-yellow-500 text-yellow-500 font-bold rounded hover:bg-yellow-500 hover:text-white transition-all py-2 my-2 disabled:bg-gray-300 disabled:text-white disabled:border-none"
                                        @click="product.imagesUrl=['']">新增圖片</button>
                                    <button type="button"
                                        class="border-2 border-red-500 text-red-500 font-bold rounded hover:bg-red-500 hover:text-white transition-all py-2 disabled:bg-gray-300 disabled:text-white disabled:border-none"
                                        disabled>刪除圖片</button>
                                    </div>
                                </div>
                                <div class="flex flex-col flex-grow">
                                    <div ref="requiredMsg"
                                        class="flex flex-col outline-2 outline-offset-4 outline-red-500">
                                        <label for="title">*標題</label>
                                        <input type="text" name="title" id="title"
                                            class="border border-gray-400 rounded p-2" placeholder="請輸入標題"
                                            v-model="product.title">
                                        <div class="flex justify-between my-2">
                                            <div class="flex flex-col w-full mr-3">
                                                <label for="category">*分類</label>
                                                <input type="text" name="category" id="category"
                                                    class="border border-gray-400 rounded p-2 flex-grow"
                                                    placeholder="請輸入分類" v-model="product.category">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="unit">*單位</label>
                                                <input type="text" name="unit" id="unit"
                                                    class="border border-gray-400 rounded p-2 flex-grow"
                                                    placeholder="請輸入單位" v-model="product.unit">
                                            </div>
                                        </div>
                                        <div class="flex justify-between">
                                            <div class="flex flex-col w-full mr-3">
                                                <label for="origin_price">*原價</label>
                                                <input type="number" name="origin_price" id="origin_price"
                                                    class="border border-gray-400 rounded p-2 flex-grow"
                                                    placeholder="請輸入原價" v-model.number="product.origin_price">
                                            </div>
                                            <div class="flex flex-col">
                                                <label for="price">*售價</label>
                                                <input type="number" name="price" id="price"
                                                    class="border border-gray-400 rounded p-2 flex-grow"
                                                    placeholder="請輸入售價" v-model.number="product.price">
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="my-4">
                                    <label for="remainingNum">剩餘數量</label>
                                    <input type="number" min="0" name="remainingNum" id="remainingNum" class="max-h-14 border border-gray-400 rounded p-2 flex-grow" placeholder="請輸入數量" v-model.number="product.remainingNum">
                                    <label for="description" class="mt-2">產品描述</label>
                                    <textarea name="description" id="description" placeholder="請輸入產品描述"
                                        class="border border-gray-400 rounded p-2 flex-grow"
                                        v-model="product.description"></textarea>
                                    <label for="content" class="mt-2">說明內容</label>
                                    <textarea name="content" id="content" placeholder="請輸入說明內容"
                                        class="border border-gray-400 rounded p-2 flex-grow"
                                        v-model="product.content"></textarea>
                                    <div class="mt-2">
                                        <input type="checkbox" name="is_enabled" id="is_enabled"
                                            :checked="product.is_enabled" v-model="product.is_enabled">
                                        <label for="is_enabled">是否啟用</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button @click="postProduct(this.$refs.requiredMsg)" type="button"
                                class="inline-flex w-full justify-center rounded-md border border-transparent bg-yellow-300 px-4 py-2 text-base font-medium hover:text-white shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">確認</button>
                            <button @click="productReset(this.$refs.requiredMsg)" type="button"
                                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    data(){
        return{
            product:{
                imagesUrl:[]
            }
        }
    },
    methods: {
        productReset(dom) {
            this.$emit('product-reset',dom)
        },
        postProduct(dom){
            this.$emit('post-product',dom)
        },
        localImg(){
            this.$emit('local-img',document.querySelector('#file'))
        }
    },
    mounted() {
        this.product = this.productInfo;
    },
    watch:{
        product:{
            handler (n,o) {
                this.product = this.productInfo;
                if (this.productInfo.title || this.productInfo.category || this.productInfo.unit || this.productInfo.origin_price || this.productInfo.price) {
                     this.$refs.requiredMsg.classList.remove('outline');
                }
            },
            deep:true
        }
    },
}