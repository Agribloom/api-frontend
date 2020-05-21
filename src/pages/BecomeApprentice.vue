<template>
    <div class="auth-container" id="sign-in">
        <div class="auth-inner">
            <div class="auth-form py-5">
                <div class="text-center mb-8">
                    <h5>Become an apprentice</h5>
                </div>
                <form @submit="assertSignin" action id="signin-form" method="post">
                    <div class="form-group mt-5">
                        <div class="input-group">
                            <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="la la-envelope"></i>
                </span>
                            </div>
                            <label class="sr-only" for="email">Email address</label>

                            <input
                                    :placeholder="email.placeholder"
                                    :required="email.required"
                                    class="form-control"
                                    id="email"
                                    name="email"
                                    type="email"
                                    v-model="email.value"
                            />
                        </div>
                    </div>

                    <div>
                        <button class="btn btn-primary btn-block">Register</button>
                    </div>

                    <div class="text-center my-3">
                        &copy; Copyright
                        <router-link to="/">AgriBloom</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// import "../lib/script/auth/main.js";

export default {
    name: 'Apprentices'
}

</script>

<style lang="scss" scoped>
    @import "../lib/style/auth-form";
</style>
