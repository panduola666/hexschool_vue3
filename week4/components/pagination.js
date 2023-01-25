export default {
    props:['pages'],
    template:` 
    <ul class="flex justify-center space-x-1 pt-4 text-lg">
        <li>
            <button type="button" :disabled="!pages.has_pre" @click="getData(pages.current_page-1)"
                class=" transition-all rounded-md bg-blue-300 text-center w-6 hover:text-white
                disabled:bg-blue-50 disabled:hover:text-black">&laquo;</button>
        </li>
        <li v-for=" (page,index) in pages.total_pages" :key="'page'+page" @click="getData(page)"
            class="transition-all rounded-md cursor-pointer text-center w-6 hover:underline hover:text-blue-700 hover:text-xl"
            :class="{'underline':page === pages.current_page,'text-blue-700':page === pages.current_page,'text-xl':page === pages.current_page}">
            {{ page }} 
        </li>
        <li>
        <button type="button" :disabled="!pages.has_next" @click="getData(pages.current_page+1)"
            class="transition-all rounded-md bg-blue-300 text-center w-6 hover:text-white disabled:bg-blue-50 disabled:hover:text-black">&raquo;</button>
        </li>
    </ul>`,
    methods: {
        getData(page){
            if(this.pages.current_page === page) return;
            this.$emit('get-data',page)
        }
    },
}