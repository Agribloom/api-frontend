<template>
    <div>
        <!-- scroll to top -->
        <a href="#" class="scrollToTop"><i class="la la-angle-up"></i></a>
        <!-- scroll to top -->
    </div>
</template>

<script>
export default {
    name: 'scrollTop'
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .scrollToTop {
        bottom: 0;
        color: white;
        display: none;
        height: 40px;
        line-height: 40px;
        position: fixed;
        /*left:calc(100% - 40px);*/
        right: 15px;
        text-align: center;
        width: 40px;
        z-index: 999;

        }
</style>
