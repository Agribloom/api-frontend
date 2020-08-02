<template>
    <div class="container p-0">
        <div class="content-header-left col-md-8 col-12 breadcrumb-new">
            <div class="row">
                <h3 class="content-header-title">Account Profile</h3>
                <div class="breadcrumb-wrapper col-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link :to="{name:'dashboard'}">Dashboard</router-link>
                        </li>
                        <li class="breadcrumb-item active">Account Profile</li>
                    </ol>
                </div>
            </div>
        </div>
        <div v-if="loading">
            <nomsg-spinner/>
        </div>

        <div v-else>
            <div>
                <h3 class="intro right">
                    Welcome,
                    <strong>{{user.username}}</strong>
                </h3>
            </div>
            <div class="row">
                <div class="col-md-12 p-0">
                    <section class="account-card mt-5">
                        <form class="form-horizontal form-user-user mt-2" @submit.prevent="onSave">
                            <div class="d-flex flex-row-reverse">
                                <div class="p-2">
                                    <button v-if="editable" type="submit" class="btn primary">
                                        <i class="la la-check-circle">&nbsp;</i> Confirm changes
                                    </button>
                                    <button @click.prevent="onToggleEditable" class="btn">
                                        <template v-if="!editable">
                                            <i class="la la-edit"></i> Edit Profile
                                        </template>
                                        <template v-else>
                                            <i class="la la-times"></i> Cancel
                                        </template>
                                    </button>
                                </div>
                            </div>
                            <hr/>
                            <div class="row">
                                <!-- Personal details -->
                                <div class="col-lg-6 col-md-6 col-sm-12 p-3">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class=" d-none d-md-block " style="width: 60px; position: relative">
                                                <div class="icon-circle rounded-circle">
                                                    <i class="la la-user"></i>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="intro">
                                                    <strong>Personal Information</strong>
                                                    <p class="hint">Edit your user and personal information here.</p>
                                                    <p>
                                                        Fields marked with asterisk (
                                                        <span class="text-danger">*</span>) are required
                                                    </p>
                                                </div>

                                                <div class="user-form">
                                                    <!--  Email address -->
                                                    <div class="form-group">
                                                        <p class="hint">Email address</p>
                                                        <p>{{user.email}}</p>
                                                    </div>

                                                    <div class="form-group">
                                                        <div :class="disabledClass" class>
                                                            <!--First name-->
                                                            <div class="form-group">
                                                                <label class="label" for="user-first-name">
                                                                    First name
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <input
                                                                        class="form-control"
                                                                        :disabled="!editable"
                                                                        :readonly="!editable"
                                                                        type="text"
                                                                        autofocus="autofocus"
                                                                        id="user-first-name"
                                                                        placeholder="First name (required)"
                                                                        required="required"
                                                                        v-model="user.first_name"
                                                                />
                                                            </div>

                                                            <!--LAst name-->
                                                            <div class="form-group">
                                                                <label class="label" for="user-last-name">
                                                                    Last name
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <input
                                                                        :disabled="!editable"
                                                                        :readonly="!editable"
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="user-last-name"
                                                                        placeholder="Last name (required)"
                                                                        required="required"
                                                                        v-model="user.last_name"
                                                                />
                                                            </div>

                                                            <!--Address & Location-->
                                                            <div class="form-group">
                                                                <label class="label" for="user-address">Address</label>
                                                                <input
                                                                        :disabled="!editable"
                                                                        :readonly="!editable"
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="user-address"
                                                                        placeholder="Address"
                                                                        v-model="user.address"
                                                                />
                                                            </div>

                                                            <!--DOB-->
                                                            <div class="form-group">
                                                                <label class="label" for="user-dob">
                                                                    Date of birth
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <input
                                                                        :disabled="!editable"
                                                                        :readonly="!editable"
                                                                        type="date"
                                                                        class="form-control"
                                                                        id="user-dob"
                                                                        required="required"
                                                                        placeholder="Date of birth (required)"
                                                                        v-model="user.date_of_birth"
                                                                />
                                                            </div>

                                                            <!--Gender-->
                                                            <div class="form-group">
                                                                <label class="label" for="user-gender">
                                                                    Gender
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <select
                                                                        :disabled="!editable"
                                                                        :readonly="!editable"
                                                                        v-model="user.gender"
                                                                        id="user-gender"
                                                                >
                                                                    <option value>Gender</option>
                                                                    <option value="M">Male</option>
                                                                    <option value="F">Female</option>
                                                                </select>
                                                            </div>

                                                            <!--Phone number-->
                                                            <div class="form-group">
                                                                <label class="label" for="user-phone_number">
                                                                    Phone number
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <vue-tel-input
                                                                        class="border-0"
                                                                        :disabled="!editable"
                                                                        :readonly="!editable"
                                                                        id="user-phone_number"
                                                                        required="required"
                                                                        v-model="user.phone_number"
                                                                        @validate="setPhoneFidelity"
                                                                ></vue-tel-input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- End -->
                                <!-- Bank details -->
                                <div class="col-lg-6 col-md-6 col-sm-12 p-3">
                                    <div class="card-body">
                                      <div class="row">
                                        <div class=" d-none d-md-block "
                                             style="width: 60px; position: relative">
                                          <div class="icon-circle rounded-circle">
                                            <i class="la la-credit-card"></i>
                                          </div>
                                        </div>
                                        <div class="col">
                                          <div class="intro">
                                            <strong>Bank Details</strong>
                                            <p class="hint">Enter your bank details here</p>
                                          </div>

                                          <div class="form-group">
                                            <div :class="disabledClass" class>
                                              <!--Bank name-->
                                              <div class="form-group">
                                                <label class="label" for="user-bank-name">
                                                  Bank name
                                                  <span class="required">*</span>
                                                </label>
                                                <input
                                                        :disabled="!editable"
                                                        :readonly="!editable"
                                                        type="text"
                                                        autofocus
                                                        class="form-control"
                                                        id="user-bank-name"
                                                        placeholder="Bank name"
                                                        required="required"
                                                        v-model="user.bank_name"
                                                />
                                              </div>
                                              <!--End -->
                                              <!--Account name-->
                                              <div class="form-group">
                                                <label class="label" for="user-account-name">
                                                  Account name
                                                  <span class="required">*</span>
                                                </label>
                                                <input
                                                        class="form-control"
                                                        :disabled="!editable"
                                                        :readonly="!editable"
                                                        type="text"
                                                        autofocus
                                                        id="user-account-name"
                                                        placeholder="Account name"
                                                        required="required"
                                                        v-model="user.account_name"
                                                />
                                                <!--End-->
                                              </div>
                                              <!--Bank account number-->
                                              <div class="form-group">
                                                <label class="label" for="user-account-number">
                                                  Account number
                                                  <span class="required">*</span>
                                                </label>
                                                <input
                                                        :disabled="!editable"
                                                        :readonly="!editable"
                                                        type="text"
                                                        autofocus
                                                        id="user-account-number"
                                                        placeholder="Account number"
                                                        required="required"
                                                        v-model="user.account_number"
                                                />
                                                <!--End -->
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                                <!-- End -->
                            </div>
                            <div class="d-flex flex-row-reverse bg-black">
                                <div class="p-2">
                                    <button v-if="editable" type="submit" class="btn primary">
                                        <i class="la la-check-circle">&nbsp;</i> Confirm changes
                                    </button>
                                    <button @click.prevent="onToggleEditable" class="btn">
                                        <template v-if="!editable">
                                            <i class="la la-edit"></i> Edit Profile
                                        </template>
                                        <template v-else>
                                            <i class="la la-times"></i> Cancel
                                        </template>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>
                    <section class="account-card">
                        <!-- Reset Password -->
                        <div class="card-body p-3">
                          <div class="row">
                            <div class=" d-none d-md-block " style="width: 60px; position: relative">
                              <div class="icon-circle rounded-circle">
                                <i class="la la-unlock"></i>
                              </div>
                            </div>
                            <div class="col">
                              <div class="intro">
                                <strong>Password Reset</strong>
                                <p class="hint">You can reset your password here</p>
                                <div class="row">
                                  <div class="col-md-3 col-12 p-0">
                                    <router-link :to="{name:'reset-password'}" class="cbtn center">
                                      <i class="la la-power-off"></i>&nbsp;Reset
                                    </router-link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- End -->
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mixin from "@/mixin";
    import {VueTelInput} from "vue-tel-input";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "Account-Profile",
        mixins: [mixin],
        components: {
            VueTelInput
        },
        data() {
            return {
                editable: false
            };
        },

        computed: {
            ...mapGetters("user", {
                user: "data",
                loading: "loading"
            }),
            disabledClass() {
                return {disabled: !this.editable};
            },
            filterUserProfileDetail() {
                let source = this.user;
                let keys = [
                    "username",
                    "first_name",
                    "last_name",
                    "email",
                    "address",
                    "phone_number",
                    "data_of_birth",
                    "gender"
                ];
                this.user.data = this.filterEntryByKeys(keys, source);
            },
            filterUserBankDetail() {
                let source = this.user;
                let keys = ["bank_name", "account_name", "account_number"];
                return this.filterEntryByKeys(keys, source);
            }
        },
        methods: {
            ...mapActions("user", {
                save: "saveProfile" // map `this.add()` to `this.$store.commit('increment')`
            }),
            filterEntryByKeys(keys, source) {
                let result = {};
                keys.forEach(key => {
                    if (source.hasOwnProperty(key)) result[key] = source[key];
                });
                return result;
            },
            onToggleEditable() {
                this.editable = !this.editable;
            },
            onSave(e) {
                e.preventDefault();
                // Patch data to endpoint

                // Toggle editable
                Promise.resolve(this.save(this.user)).then(
                    response => {
                        this.$toastr.Add("Saved", "Data successfully updated", "success");
                    },
                    error => {
                        console.error(error);
                    }
                );
                this.editable = false;
            },
            setPhoneFidelity({number, isValid, country}) {
                return this.user.phone_number.valid === isValid;
            }
        }
    };
</script>
