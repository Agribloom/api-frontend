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

              <input
                :placeholder="email.placeholder"
                :required="email.required"
                @keyup="typing"
                class="form-control"
                name="email"
                type="email"
                v-model="email.value"
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

              <input
                @keyup="typing"
                class="form-control"
                name="password"
                placeholder="Password"
                required="required"
                type="password"
                v-model="password.value"
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
              <label for="confirm_password" class="src-only">Confirm password</label>
              <input
                :type="showPassword"
                @keyup="typing"
                class="form-control"
                name="password"
                id="confirm_password"
                placeholder="Confirm password"
                autocomplete="false"
                required="required"
                v-model="password.confirm"
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
              <vue-tel-input
                v-model="phone.value"
                :placeholder="phone.placeholder"
                id="vue_tel"
                inputClasses="border-2 mob-fix"
                @validate="setPhoneFidelity"
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
            />
            <label class="custom-control-label hint text-sm" for="cb1">
              By signing up, I agree to the
              <router-link :to="{name: 'terms-of-service'}">Terms of service</router-link> agreement
            </label>
          </div>

          <div v-if="accept.value">
            <div>
              <div class="loading-btn" v-if="loading">
                <nomsg-spinner />
              </div>
              <button
                :disabled="loading"
                class="btn btn-primary btn-block"
                type="submit"
                v-else
              >Sign Up</button>
            </div>
            <!-- <div class="line my-4 ">
                             <span>or</span>
                         </div>

                         <div class="text-center">
                             <div class="d-inline-block mr-4">
                                 <button class="btn btn-icon btn-flat text-facebook">
                                     <i class="la la-facebook"></i>
                                 </button>
                             </div>
                             <div class="d-inline-block mr-4">
                                 <button class="btn btn-icon btn-flat text-google">
                                     <i class="la la-google"></i>
                                 </button>
                             </div>
                             <div class="d-inline-block mr-4">
                                 <button class="btn btn-icon btn-flat text-twitter">
                                     <i class="la la-linkedin"></i>
                                 </button>
                             </div>
            </div>-->
          </div>

          <div class="text-center my-3 hint text-sm">
            Already have an account?
            <router-link to="sign-in">Sign In</router-link>
          </div>
        </form>
      </div>
    </div>
    <copyright-item />
  </div>
</template>

<script>
import '../lib/script/auth/main.js'
import mixin from '@/mixin'
import { VueTelInput } from 'vue-tel-input'

export default {
    name: 'Sign-Up',
    mixins: [mixin],
    components: {
        VueTelInput
    },
    data () {
        return {
            loading: false,
            errors: {
                email: [],
                password: [],
                phone: []
            },
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
        passwordClass () {
            return {
                'la-eye-slash': this.password.hidden,
                'la-eye': !this.password.hidden
            }
        },
        showPassword () {
            return this.password.hidden ? 'password' : 'text'
        },
        emailError () {
            return this.errors.email.length
        },
        passwordError () {
            return this.errors.password.length
        },
        phoneError () {
            return this.errors.phone.length
        }
    },
    methods: {
        setPhoneFidelity ({ isValid }) {
            this.phone.valid = isValid
        },
        typing () {
            this.reset()
        },
        signUp () {
            window.axios
                .post(this.url, {
                    email: this.email.value,
                    password1: this.password.value,
                    password2: this.password.confirm,
                    phone_number: this.phone.value
                })
                .then(response => {
                    let token = response.data.key
                    let message = `You've successfully registered using ${this.email.value}. Check your email for a confirmation message. If you are not redirected to your dashboard, refresh page`
                    this.toastrAdd('Success', message, 'success')
                    this.$store.dispatch('setToken', token)
                    setTimeout(() => { this.$store.dispatch('userSignIn') }, 5000)
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
        },
        attemptSignup (e) {
            e.preventDefault()
            this.loading = true
            if (this.formFidelity()) {
                this.signUp()
            } else {
                this.setError()
            }
        },
        emailFidelity () {
            let test = this.email.validator.test(this.email.value)
            let msg = []
            if (!this.email.value.length) {
                msg.push('Email required.')
            }
            if (!test) {
                msg.push('Email should be in the format: username@domain')
            }
            msg.forEach(value => {
                this.errors.email.push(value)
                this.toastrAdd('Error', value, 'error')
            })
            return test
        },
        passwordFidelity () {
            let test = this.password.validator.test(this.password.value)
            let msg = []
            if (!this.password.value.length) {
                msg.push('Password required.')
            }
            if (!test) {
                msg.push(
                    'Password must be no less than eight (8) characters. Special characters are allowed'
                )
            }
            msg.forEach(value => {
                this.errors.password.push(value)
                this.toastrAdd('Password error', value, 'error')
            })
            return test
        },

        /**
     * @return {boolean}
     */
        PhoneNumberFidelity () {
            let test = this.phone.valid
            let msg = []
            if (!this.phone.value.length) {
                msg.push('Phone number required.')
            }
            if (!test) {
                msg.push('Phone number is not valid')
            }
            msg.forEach(value => {
                this.errors.phone.push(value)
                this.toastrAdd('Phone number error', value, 'error')
            })
            return test
        },
        togglePasswordVisibility () {
            this.password.hidden = !this.password.hidden
        },
        reset () {
            this.loading = false
            this.errors = { email: [], password: [], phone: [] }
            this.email.error = false
            this.password.error = false
            this.phone.error = false
        },
        setError () {
            if (this.emailError) {
                this.email.error = true
            }
            if (this.passwordError) {
                this.password.error = true
            }
            if (this.phoneError) {
                this.phone.error = true
            }
            this.loading = false
        },
        formFidelity () {
            let confirmEmail = this.emailFidelity()
            let confirmPhoneNumber = this.PhoneNumberFidelity()
            let confirmPassword = this.passwordFidelity()
            return confirmEmail && confirmPassword && confirmPhoneNumber
        }
    }
}
</script>

<style lang="scss">
@import "../lib/style/auth-form";
</style>
