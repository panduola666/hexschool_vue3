export default {
    props:['productInfo','openRemoveModal'],
    template: `<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-3/4">
                        <h2 class="text-2xl text-center bg-red-600 text-white py-2">刪除產品</h2>
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex items-center">
                            是否刪除 <span class="text-red-600 font-bold text-xl mx-3">{{ productInfo.title }}</span>
                            商品(刪除後將無法恢復)。
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button @click="removeProduct(productInfo.id)" type="button"
                                class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">刪除</button>
                            <button @click="closeModal" type="button"
                                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
        methods: {
            removeProduct(id){
                this.$emit('remove-product',id)
            },
            closeModal(){
                this.$emit('close-modal')
            }
        },
}