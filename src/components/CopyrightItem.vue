<template>
    <div class="copyright-wrapper">
        <div>
            <span>&copy; Copyright 2019</span>
            <router-link :to="{name: 'home'}">AgriBloom</router-link>
        </div>

    </div>
</template>

<script>
export default {
    name: 'CopyrightItem'
}
</script>

<style scoped lang="scss">
    @import "../lib/style/_variable";
    .copyright-wrapper{
        display: flex;
        flex-direction: column;
        margin: 15px auto ;
        color: $dark-typo;
        text-align: center;
        span{
            margin-right: 4px;
            &:after{
                position: relative;
                border-right: 1px solid $light-bd;
                width: 2px;
                height: 100%;
                }
            }
        a{
            color: $primary;
            }
        }
</style>
