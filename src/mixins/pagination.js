export const pagination = {
    data() {
        return {
            data: [],
            elementsOnPage: 2,
            currentPage: 1
        }
    },
    computed: {
        amountElements() {
            return this.data.length;
        },
        elements() {
            return this.data;
        },
        getAmountPages() {
            return Math.ceil(this.amountElements / this.elementsOnPage);
        },
        getPaginationData() {
            const end = this.currentPage * this.getAmountPages;

            const start = end - this.elementsOnPage;

            return this.elements.slice(start, end);
        },
        checkPrevPage() {
            return this.currentPage === 1;
        },
        checkNextPage() {
            return this.currentPage === this.getAmountPages;
        }
    },
    methods: {
        prevPage() {
            this.currentPage--;
        },
        nextPage() {
            this.currentPage++;
        },
    }
};