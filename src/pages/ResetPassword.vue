<template>
    <div class="auth-container" id="reset">
        <div class="auth-inner">
            <div class="auth-form">
                <div class="py-4">
                    <template v-if="!done.status">
                        <div class="text-center mb-3">
                            <h5>Reset account</h5>
                            <p class="mb-6 hint">Enter the email you used for sign up to reset your account.</p>
                        </div>
                        <form @submit="onSubmit" id="reset-form" method="post" novalidate="true">
                            <div class="mb-3">
                                <template v-if="auth">
                                    <div :class="{'has-error': password.error}" class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                              <span class="input-group-text">
                                                <i class="la la-unlock"></i>
                                              </span>
                                            </div>
                                            <label for="auth-new-password" class="src-only">New password</label>
                                            <input
                                                    class="form-control"
                                                    name="new-password"
                                                    placeholder="New password"
                                                    autofocus="autofocus"
                                                    required="required"
                                                    type="password"
                                                    v-model="password.value"
                                                    @keyup="reset"
                                                    id="auth-new-password"
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
                                            <label for="auth-confirm-new-password" class="src-only">
                                                Confirm new password</label>
                                            <input
                                                    :type="showPassword"
                                                    @keyup="reset"
                                                    class="form-control"
                                                    name="confirm-new-password"
                                                    placeholder="Confirm new password"
                                                    autocomplete="false"
                                                    required="required"
                                                    v-model="password.confirm"
                                                    id="auth-confirm-new-password"
                                            />
                                            <div @click="togglePasswordVisibility"
                                                 class="input-group-append cursor-pointer"
                                            >
                                              <span class="input-group-text">
                                                <i :class="passwordClass" class="la"></i>
                                              </span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="input-group" ref="email-group">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text">
                                            <i class="la la-envelope"></i>
                                          </span>
                                        </div>
                                        <label class="sr-only" for="email">Email address</label>
                                        <input :pattern="email.validator"
                                               :placeholder="email.placeholder"
                                               :required="email.required"
                                               @keyup="reset"
                                               autocomplete="false"
                                               autofocus
                                               class="form-control"
                                               id="email"
                                               name="email"
                                               type="email"
                                               v-model="email.value"
                                        />
                                    </div>
                                </template>
                            </div>
                            <div class="mb-3">
                                <div class="loading-btn" v-if="loading">
                                    <nomsg-spinner/>
                                </div>
                                <button class="btn btn-primary btn-block"
                                        type="submit" v-else>Complete request
                                </button>
                            </div>
                            <div v-if="!auth">
                                <div class="line mt-10 mb-3">
                                    <span>or</span>
                                </div>
                                <div class="custom-btn-group my-4 w-full justify-content-center">
                                    <router-link :to="{name: 'sign-in'}" class="cbtn">
                                        <i class="la la-sign-in"></i> Sign In
                                    </router-link>
                                    <router-link :to="{name: 'sign-up'}" class="cbtn primary">
                                        <i class="la la-user-plus"></i> Sign Up
                                    </router-link>
                                </div>
                            </div>
                        </form>
                    </template>
                    <template v-else>
                        <alert-item class="text-primary" :fontIcon="'la la-check-circle'" title="Request completed">
                            <p class="mt-2 hint ">
                                {{done.message}}
                            </p>
                          <router-link to="/"><i class="fa fa-home"></i>&nbsp;Home</router-link>
                        </alert-item>
                    </template>
                </div>
            </div>
        </div>
        <copyright-item/>
    </div>
</template>

<script>
    // import "../lib/script/auth/main.js";
    import mixin from '@/mixin'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'Reset-password',
        mixins: [mixin],
        data: function () {
            return {
                done: {
                    status: false,
                    message: null
                },
                loading: false,
                email: {
                    required: true,
                    validator: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    value: '',
                    placeholder: 'Email address',
                    error: false
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
            }
        },
        mounted() {
            this.fetchData()
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
            },
            ...mapGetters('user', {
                auth: 'auth',
                userData: 'data'
            })
        },
        methods: {
            ...mapActions('user', ['unsetToken', 'fetchData']),
            togglePasswordVisibility() {
                this.password.hidden = !this.password.hidden
            },
            formFidelity() {
                /*If user is authorised*/
                if (this.auth) {
                    /*Process only the password form fields*/
                    return this.passwordFidelity()
                }
                return this.emailFidelity()
            },
            /* Validates the fidelity of inputted email address */
            emailFidelity() {
                let test = this.email.validator.test(this.email.value)
                let error = []
                if (!this.email.value.length) {
                    error.push('Email required.')
                }
                if (!test) {
                    error.push('Email should be in the format: username@domain')
                    this.email.error = true;
                }
                error.forEach(value => {
                    this.toastrAdd('Error', value, 'error')
                });
                return !(this.email.error = error.length > 0)
            },
            /* Validates the fidelity of inputted password */
            passwordFidelity() {
                let test = this.password.validator.test(this.password.value)
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
            reset() {
                this.email.error = false;
                this.password.error = false;
                this.loading = false;
            },
            onSubmit(e) {
                e.preventDefault();
                this.loading = true;

                /*Checks form fidelity*/
                if (this.formFidelity()) {
                    /* If authorized user */
                    let handleRequest = () => {
                        if (this.auth) {
                            return this.authorizeReset(e.target)
                        } else {
                            return this.requestResetCode(e.target)
                        }
                    };
                    handleRequest()
                        .then(() => {
                            if (this.auth) {
                                this.done.message = `Your password has been reset successfully. It will be activated on your next login`
                            } else {
                                this.done.message = `We have sent the reset code to your registered email address: ${e.target.email}`
                            }
                            this.done.status = true
                        })
                        .catch((error) => {
                          if (error.response) {
                            if (error.response.status === 400) {
                              let data = error.response.data;
                              Object.keys(data).map(key => {
                                data[key].forEach(item => {
                                  this.toastrAdd(`Server error`, item, 'error')
                                })
                              })
                            } else {
                              // Something happened in setting up the request that triggered an Error
                              console.log('Error', error.message)
                            }
                          }
                        }).finally(() => {
                        this.loading = false
                    })
                } else {
                    this.loading = false
                }
            },
            authorizeReset(formData) {
                let params = {
                    "new_password1": formData['new-password'].value,
                    "new_password2": formData['confirm-new-password'].value
                };
                return window.axios.post('auth/password/change/', params)
            },
            requestResetCode(formData) {
                let params = {
                    "email": formData['email'].value,
                };
                return window.axios.post('/password/reset/confirm/', params)
            }
        }
    }
</script>

/*  */
<style lang="scss" scoped>
    @import "../lib/style/auth-form";
</style>
