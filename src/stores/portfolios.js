import {defineStore} from "pinia";


export const usePortfoliosStore = defineStore("portfolios", {
    state: () => {
        return {
            // [{id: "", name: ""}, ...]
            portfolios: []
        }
    },
    getters: {
        getData: (state) => state.portfolios,
    },
    actions: {
        updateData(portfolios) {
            this.portfolios = portfolios.slice(0);
        }
    }
});