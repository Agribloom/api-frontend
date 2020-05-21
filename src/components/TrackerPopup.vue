<template>
    <div class="popup-box">
        <div class="container">
            <div class="d-flex">
                <p>We may collect information from you automatically through
                    cookies or similar technology. Do you accept our
                    <router-link :to="{name:'privacy'}">Privacy Policy</router-link>
                    ?
                </p>
                <div>
                    <button class="cbtn primary">Accept</button>
                    <button class="cbtn">Reject</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TrackerPopup'
}
</script>

<style lang="scss" scoped>
    .popup-box {
        position: fixed;
        left: 10%;
        right: 10%;
        background: #fff;
        bottom: 0;
        z-index: 100000;
    }
</style>
