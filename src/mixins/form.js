import {mapStores} from "pinia";

import {usePortfoliosStore} from "@/stores/portfolios.js";

export const authForm = {
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            regexps: {
                reEmail: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                rePassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}$/
            },
            emailRules: [
                v => !!v || "Email is required",
                v => this.regexps.reEmail.test(v) || "Email is invalid"
            ],
            passwordRules: [
                v => !!v || "Password is required",
                v => (v && v.length >= 8 && v.length <= 16)
                    || "The password must have from 8 to 16 characters",
                v => this.regexps.rePassword.test(v)
                    || "Requires one number, an uppercase letter, a lowercase letter, and a special character"
            ],
            serverError: ""
        }
    },
    methods: {
        async validateForm() {
            const {valid} = await this.$refs.form.validate();

            return valid;
        },
    }
};


export const portfolioForm = {
    data() {
        return {
            form: {
                name: ""
            },
            nameRules: [
                v => !!v || "The name cannot be empty",
                v => (v && v.length >= 5 && v.length <= 16)
                    || "The name must have from 5 to 16 characters",
                v => !this.portfoliosStore.includesName(v)
                    || "The name matches another portfolio"
            ],
            isLoading: false
        }
    },
    computed: {
        ...mapStores(usePortfoliosStore),
    },
    methods: {
        async validateForm() {
            const {valid} = await this.$refs.form.validate();

            return valid;
        },
    }
};