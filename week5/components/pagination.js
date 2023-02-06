export default{
    template:`<nav aria-label="Page navigation example">
    {{pages}}
    <ul class="pagination justify-content-center">
        <li class="page-item" 
        :class="{'disabled':!pages.has_pre}"
         @click="getProducts(pages.current_page - 1)"
         >
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" 
        v-for="page in pages.total_pages" :key="page"
        :class="{'active':page === pages.current_page}"
        @click="getProducts(page)">
            <a class="page-link" href="#">{{page}}</a>
        </li>
        <li class="page-item"
        :class="{'disabled':!pages.has_next}"
        @click="getProducts(pages.current_page + 1)"
        >
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>`,
props:['pages','getProducts'],
mounted() {

},
}