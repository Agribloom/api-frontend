<template>
  <div class="auth-container" id="sign-in">
    <div class="auth-inner">
      <div class="auth-form">
        <div class="text-center my-3">
          <h5>Sign in</h5>
          <p class="mb-6 hint">Enter your credentials to access your account.</p>
        </div>
        <form @submit.prevent="onSignIn" id="reset-form" method="post" novalidate="true">
          <div :class="{'has-error': email.error}" class="form-group email-field">
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
                @keyup="typing"
                autocomplete="false"
                autofocus="autofocus"
                class="form-control"
                id="email"
                name="email"
                type="email"
                v-model="email.value"
              />
            </div>
          </div>

          <div :class="{'has-error' : password.error}" class="form-group password-field">
            <div class="input-group" ref="password-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="la la-unlock-alt"></i>
                </span>
              </div>
              <label class="sr-only" for="password">Password</label>
              <input
                :placeholder="password.placeholder"
                :required="password.required"
                :type="showPassword"
                @keyup="typing"
                class="form-control"
                id="password"
                name="password"
                v-model="password.value"
              />

              <div @click="togglePasswordVisibility" class="input-group-append cursor-pointer">
                <span class="input-group-text">
                  <i :class="passwordClass" class="la"></i>
                </span>
              </div>
            </div>
          </div>

          <!--<div class="row mt-6 mb-6">
                        <div class="col-12 ">
                            <div class="custom-control custom-checkbox">
                                <input class="custom-control-input" id="cb1" ref="remember-me"
                                       type="checkbox" v-model="remember.value"/>
                                <label class="custom-control-label text-sm" for="cb1">Remember me</label>
                            </div>
                        </div>
                        <div class="col-12 text-right">
                        </div>
          </div>-->

          <div>
            <div class="loading-btn" v-if="loading">
              <nomsg-spinner />
            </div>
            <button class="btn btn-primary btn-block" type="submit" v-else>Sign in</button>
          </div>

          <!-- <div class="line mt-10 mb-3">
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

          <div class="text-sm text-center hint my-3">
            <div>
              <router-link :to="{name: 'reset-password'}">Forgot password</router-link>
            </div>Don't have an account?
            <router-link to="sign-up">Sign Up</router-link>
          </div>
        </form>
      </div>
    </div>
    <copyright-item />
  </div>
</template>

<script>
import mixin from "@/mixin";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Sign-In",
  mounted() {},
  mixins: [mixin],
  data: function() {
    return {
      next: this.$route.params,
      loading: false,
      errors: {
        email: [],
        password: [],
        server: []
      },
      email: {
        required: true,
        validator: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        value: "",
        placeholder: "Email address",
        error: false
      },
      password: {
        required: true,
        validator: /\S{8,}/,
        hidden: true,
        value: "",
        placeholder: "Password",
        error: false
      },
      remember: {
        type: "checkbox",
        value: false
      },
      url: "auth/login/"
    };
  },
  computed: {
    passwordClass() {
      return {
        "la-eye-slash": this.password.hidden,
        "la-eye": !this.password.hidden
      };
    },
    showPassword() {
      return this.password.hidden ? "password" : "text";
    },
    emailError() {
      return this.errors.email.length;
    },
    passwordError() {
      return this.errors.password.length;
    }
  },
  methods: {
    ...mapActions({
      setToken: "user/setToken"
    }),
    /* asserts if user can sign in */
    onSignIn(e) {
      this.loading = true;
      // Asserts the fidelity of the form data
      if (this.accurateFormData()) {
        this.signIn();
      } else {
        this.setError();
      }
    },
    accurateFormData() {
      let emailIsValid = this.emailFidelity();
      let passwordIsValid = this.passwordFidelity();
      return emailIsValid && passwordIsValid;
    },
    emailFidelity() {
      let test = this.email.validator.test(this.email.value);
      let msg = [];
      if (!this.email.value.length) {
        msg.push("Email required.");
      }
      if (!test) {
        msg.push("Email should be in the format: username@domain");
      }
      msg.forEach(value => {
        this.errors.email.push(value);
        this.toastrAdd("Error", value, "error");
      });
      return test;
    },
    passwordFidelity() {
      let test = this.password.validator.test(this.password.value);
      let msg = [];
      if (!this.password.value.length) {
        msg.push("Password required.");
      }
      if (!test) {
        msg.push(
          "Password must be no less than eight (8) characters. Special characters are allowed"
        );
      }
      msg.forEach(value => {
        this.errors.password.push(value);
        this.toastrAdd("Password error", value, "error");
      });
      return test;
    },
    serverFidelity() {
      return window.axios
        .post(this.url, {
          email: this.email.value,
          password: this.password.value
        })
        .then(response => {
          this.setToken(response.data.key);
          return response.status;
        })
        .catch(e => {
          if (e.response.status === 400) {
            if (e.response.data.non_field_errors) {
              e.response.data.non_field_errors.forEach(e => {
                this.toastrAdd("Sign in error", e, "error");
              });
            } else {
              let data = e.response.data;
              Object.keys(data).map(key => {
                data[key].forEach(item => {
                  this.toastrAdd(`${key} error`, item, "error");
                });
              });
            }
          } else {
            console.error("Error", e.message);
          }
        });
    },
    signIn() {
      // Resolve server api fidelity promise
      Promise.resolve(this.serverFidelity())
        .then(status => {
          if (status === 200) {
            // If the status is 'OK'
            // Store the key in local storage
            let token = localStorage.getItem("token");
            if (token !== null) {
              // If a url was specified before redirect
              if (this.$route.params.nextUrl != null) {
                // Log in and redirect user to the page
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push("account");
              }
              let message = `Welcome, ${this.email.value}`;
              this.toastrAdd("Success", message, "success");
            }
          }
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {
      this.errors = { email: [], password: [], server: [] };
      this.email.error = false;
      this.password.error = false;
      this.loading = false;
    },
    setError() {
      if (this.emailError) {
        this.email.error = true;
      }
      if (this.passwordError) {
        this.password.error = true;
      }
      this.loading = false;
    },
    togglePasswordVisibility() {
      this.password.hidden = !this.password.hidden;
    },
    typing() {
      this.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../lib/style/auth-form";
/*@import "../lib/style/_variable";*/
</style>
