<template>
    <div class="auth-container" id="sign-up">
        <div class="auth-inner my-2">
            <div class="auth-form">
                <div class="text-center my-3">
                    <h5>Create an account</h5>
                    <p class="mb-5 hint">Setup a new account in a minute.</p>
                </div>
                <form @submit="attemptSignup" id method="post" novalidate="true">
                    <div :class="{'has-error': email.error}" class="form-group email-field">
                        <div class="input-group">
                            <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="la la-envelope"></i>
                </span>
                            </div>
                            <label for="email" class="src-only">Email address</label>
                            <input
                                    :placeholder="email.placeholder"
                                    :required="email.required"
                                    @keyup="reset"
                                    class="form-control"
                                    name="email"
                                    type="email"
                                    id="email"
                                    v-model="email.value"
                                    tabindex="1"
                            />
                        </div>
                    </div>

                    <div :class="{'has-error': password.error}" class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="la la-unlock"></i>
                </span>
                            </div>
                            <label for="password" class="src-only">Password</label>
                            <input
                                    @keyup="reset"
                                    class="form-control"
                                    name="password"
                                    placeholder="Password"
                                    required="required"
                                    type="password"
                                    v-model="password.value"
                                    id="password"
                                    tabindex="2"
                            />
                        </div>
                    </div>

                    <div :class="{'has-error': password.error}" class="form-group password-field">
                        <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">
                                <i class="la la-unlock"></i>
                              </span>
                            </div>
                            <label for="confirm-password" class="src-only">Confirm password</label>
                            <input
                                    :type="showPassword"
                                    @keyup="reset"
                                    class="form-control"
                                    name="password"
                                    id="confirm-password"
                                    placeholder="Confirm password"
                                    autocomplete="false"
                                    required="required"
                                    v-model="password.confirm"
                                    tabindex="3"
                            />

                            <div @click="togglePasswordVisibility" class="input-group-append cursor-pointer">
                <span class="input-group-text">
                  <i :class="passwordClass" class="la"></i>
                </span>
                            </div>
                        </div>
                    </div>
                    <div :class="{'has-error': phone.error}" class="form-group phone-field">
                        <div class="input-group">
                            <label for="vue_tel" class="src-only">Phone number</label>
                            <vue-tel-input
                                    v-model="phone.value"
                                    :placeholder="phone.placeholder"
                                    id="vue_tel"
                                    inputClasses="border-2 mob-fix"
                                    @validate="setPhoneFidelity"
                                    tabindex="4"
                            ></vue-tel-input>
                            <div class="input-group-append">
                <span class="input-group-text">
                  <i class="la la-phone"></i>
                </span>
                            </div>
                        </div>
                    </div>
                    <div class="custom-control custom-checkbox my-3">
                        <input
                                class="custom-control-input"
                                id="cb1"
                                ref="accept-terms"
                                type="checkbox"
                                v-model="accept.value"
                                tabindex="5"
                        />
                        <label class="custom-control-label hint text-sm" for="cb1">
                            By signing up, I agree to the
                            <router-link :to="{name: 'terms-of-service'}">Terms of service</router-link>
                            agreement
                        </label>
                    </div>

                    <div v-if="accept.value">
                        <div>
                            <div class="loading-btn" v-if="loading">
                                <nomsg-spinner/>
                            </div>
                            <button
                                    :disabled="loading"
                                    class="btn btn-primary btn-block"
                                    type="submit"
                                    tabindex="6"
                                    v-else
                            >Sign Up
                            </button>
                        </div>
                    </div>

                    <div class="text-center my-3 hint text-sm">
                        Already have an account?
                        <router-link to="sign-in">Sign In</router-link>
                    </div>
                </form>
            </div>
        </div>
        <copyright-item/>
    </div>
</template>

<script>
    import '../lib/script/auth/main.js'
    import mixin from '@/mixin'
    import {VueTelInput} from 'vue-tel-input'

    export default {
        name: 'Sign-Up',
        mixins: [mixin],
        components: {
            VueTelInput
        },
        data() {
            return {
                loading: false,
                email: {
                    required: true,
                    validator: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    value: '',
                    placeholder: 'Email address',
                    error: false
                },
                phone: {
                    required: true,
                    valid: false,
                    value: '',
                    placeholder: 'Phone number',
                    error: false,
                    areaCode: {
                        value: '234',
                        placeholder: 'code',
                        codes: [
                            {
                                name: 'Nigeria (+234)',
                                value: 234,
                                selected: true
                            }
                        ]
                    }
                },
                password: {
                    required: true,
                    validator: /\S{8,}/,
                    hidden: true,
                    value: '',
                    placeholder: 'Password',
                    error: false,
                    confirm: ''
                },
                accept: {
                    type: 'checkbox',
                    value: false
                },
                url: 'auth/registration/'
            }
        },
        computed: {
            passwordClass() {
                return {
                    'la-eye-slash': this.password.hidden,
                    'la-eye': !this.password.hidden
                }
            },
            showPassword() {
                return this.password.hidden ? 'password' : 'text'
            }
        },
        methods: {
            setPhoneFidelity({isValid}) {
                this.phone.valid = isValid
            },
            signUp() {
                return window.axios
                    .post(this.url, {
                        email: this.email.value,
                        password1: this.password.value,
                        password2: this.password.confirm,
                        phone_number: this.phone.value
                    })
            },
            attemptSignup(e) {
                e.preventDefault();
                this.loading = true;
                if (this.formFidelity()) {
                    this.signUp().then(response => {
                        let token = response.data.key
                        let message = `You've successfully registered using ${this.email.value}. Check your email for a confirmation message. If you are not redirected to your dashboard, refresh page`
                        this.toastrAdd('Success', message, 'success')
                        this.$store.dispatch('setToken', token)
                        setTimeout(() => {
                            this.$store.dispatch('userSignIn')
                        }, 5000)
                        this.$router.push('account')
                    })
                        .catch(e => {
                            if (e.response) {
                                if (e.response.status === 400) {
                                    let data = e.response.data
                                    Object.keys(data).map(key => {
                                        data[key].forEach(item => {
                                            this.toastrAdd(`${key} error`, item, 'error')
                                        })
                                    })
                                } else {
                                    // Something happened in setting up the request that triggered an Error
                                    console.log('Error', e.message)
                                }
                            }
                        })
                        .finally(() => {
                            this.loading = false
                        })
                } else {
                    this.loading = false
                }
            },
            emailFidelity() {
                let test = this.email.validator.test(this.email.value)
                let error = []
                if (!this.email.value.length) {
                    error.push('Email required.')
                }
                if (!test) {
                    error.push('Email should be in the format: username@domain')
                }
                error.forEach(value => {
                    this.toastrAdd('Error', value, 'error')
                });
                return !(this.email.error = error.length > 0)
            },
            PhoneNumberFidelity() {
                let error = [];
                if (!this.phone.value.length) {
                    error.push('Phone number required.')
                }
                if (!this.phone.valid) {
                    error.push('Phone number is not valid')
                }
                error.forEach(value => {
                    this.toastrAdd('Phone number error', value, 'error')
                })
                return !(this.phone.error = error.length > 0);
            },
            passwordFidelity() {
                let test = this.password.validator.test(this.password.value);
                let error = [];
                if (!this.password.value.length) {
                    error.push('Password required.')
                }
                if (!test) {
                    error.push(
                        'Password must be no less than eight (8) characters. Special characters are allowed'
                    )
                }
                if (this.password.confirm != this.password.value) {
                    error.push(
                        'Passwords do not match. Confirm again'
                    )
                }
                error.forEach(value => {
                    this.toastrAdd('Password error', value, 'error')
                });
                return !(this.password.error = error.length > 0)
            },
            togglePasswordVisibility() {
                this.password.hidden = !this.password.hidden
            },
            reset() {
                this.loading = false;
                this.email.error = false;
                this.password.error = false;
                this.phone.error = false;
            },
            formFidelity() {
                let confirmEmail = this.emailFidelity();
                let confirmPhoneNumber = this.PhoneNumberFidelity();
                let confirmPassword = this.passwordFidelity();
                return confirmEmail && confirmPassword && confirmPhoneNumber
            }
        }
    }
</script>

<style lang="scss">
    @import "../lib/style/auth-form";
</style>
