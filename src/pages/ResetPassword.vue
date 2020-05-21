<template>
  <div class="auth-container" id="reset">
    <div class="auth-inner">
      <div class="auth-form">
        <div class="py-4">
          <template v-if="incomplete">
            <div class="text-center mb-3">
              <h5>Reset account</h5>
              <p class="mb-6 hint">Enter the email you used for sign up to reset your account.</p>
            </div>
            <form @submit="onSubmit" id="reset-form" method="post" novalidate="true">
              <div :class="{'has-error': email.error}" class="form-group email-field">
                <template v-if="auth">
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
                        class="form-control"
                        name="password"
                        id="confirm_password"
                        placeholder="Confirm password"
                        autocomplete="false"
                        required="required"
                        v-model="password.confirm"
                      />

                      <div
                        @click="togglePasswordVisibility"
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

                    <input
                      :pattern="email.validator"
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
                  <nomsg-spinner />
                </div>
                <button class="btn btn-primary btn-block" type="submit" v-else>Complete request</button>
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
            <alert-item :fontIcon="'la la-check-circle'" title="Request completed">
              <p class="mt-2">We have sent the reset code to your registered email address</p>
            </alert-item>
          </template>
        </div>
      </div>
    </div>
    <copyright-item />
  </div>
</template>

<script>
// import "../lib/script/auth/main.js";
import mixin from '@/mixin'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Reset-password',
    mixins: [mixin],
    data: function () {
        return {
            authorized: false,
            incomplete: true,
            loading: false,
            errors: {
                email: []
            },
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
            }
        }
    },
    mounted () {
        this.fetchData()
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
        passwordError () {
            return this.errors.password.length
        },

        ...mapGetters('user', {
            auth: 'auth'
        }),
        emailError () {
            return this.errors.email.length
        }
    },
    methods: {
        ...mapActions('user', ['unsetToken', 'fetchData']),

        togglePasswordVisibility () {
            this.password.hidden = !this.password.hidden
        },
        formFidelity () {
            let confirmEmail = this.emailFidelity()
            let confirmPassword = this.passwordFidelity()
            return confirmEmail && confirmPassword
        },
        /* Validates the fidelity of inputted email address */
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
        /* Validates the fidelity of inputted password */
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
        reset () {
            this.errors = { email: [], server: [] }
            this.email.error = false
            this.loading = false
        },
        onSubmit (e) {
            e.preventDefault()
            this.loading = true
            if (this.formFidelity()) {
                /* If authorized */
                if (this.auth) {
                    this.authorizeReset()
                } else {
                    this.requestResetPermission()
                }
            } else {
                this.setError()
            }
        },
        authorizeReset () {
            window.axios.post('auth/password/change/').then(
                response => {
                    console.log(response)
                },
                error => {
                    console.error(error)
                }
            )
        },
        requestResetPermission () {
            window.axios.post('auth/password/reset/confirm/').then(
                response => {
                    console.log(response)
                },
                error => {
                    console.error(error)
                }
            )
        }
    }
}
</script>

/*  */
<style lang="scss" scoped>
@import "../lib/style/auth-form";
</style>
