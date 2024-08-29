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
                v => this.regexps.reEmail.test(v)
                    || "Email is invalid"
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
            const {valid} = await this.$refs.form.validate()

            return valid;
        },
    }
}