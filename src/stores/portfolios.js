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
        },
        includesName(name) {
            name = name.trim();
            
            return this.portfolios.find((portfolio) => {
                return portfolio.name === name;
            });
        },
        includesId(id) {
            return this.portfolios.find((portfolio) => {
                return portfolio.id === id;
            });
        }
    }
});