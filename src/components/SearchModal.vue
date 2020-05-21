<template>
    <!-- search area -->
    <div>
        <modal-component ref="modal">
            <div class="search-area">
                <div class="search-input">
                    <form>
                        <input name="text" placeholder="Keyword..." type="text">
                        <div class="form-btn"><i class="la la-arrow-right icon"></i>Search</div>
                    </form>
                </div>
                <farm-filters/>
            </div>

        </modal-component>
    </div>
    <!-- search area -->
</template>
<script>

export default {
    name: 'searchModal',
    data () {
        return {
        }
    },
    methods: {
        toggleShow () {
            this.$refs.modal.toggleState()
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../lib/style/_variable';

    .search-area {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        background: $white;
        bottom: 0;
        left: 0;
        margin: auto;
        position: fixed;
        right: 0;
        text-align: center;
        top: 0;
        -moz-transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
        padding-top: 60px;

        .search-input {
            display: flex;
            align-items: center;
            justify-content: center;

            form {
                /*left: 50%;*/
                /*top: 30%;*/
                /*transform: translate(-50%, -50%);*/
                width: 80%;
                display: flex;
                align-items: flex-end;
                padding: 30px;
                /*content: "";*/
                /*position: absolute;*/
                input {
                    border: none;
                    border-bottom: 1px solid $default;
                    border-radius: 0;
                    color: $primary-light;
                    font-size: 1.5em;
                    text-align: center;
                    width: 100%;

                    &:hover,
                    &:focus {
                        border-color: $primary-light;
                    }
                }

                .form-btn {
                    border: 1px solid $light;
                    -moz-border-radius: $bdrs;
                    -webkit-border-radius: $bdrs;
                    border-radius: $bdrs;
                    color: $dark;
                    cursor: pointer;
                    text-align: center;
                    letter-spacing: 0;
                    overflow: hidden;
                    padding: 15px;
                    position: relative;
                    flex: auto;
                    display: flex;
                    justify-content: center;
                    align-items: baseline;
                    -moz-transition: all .5s ease-in-out;
                    -ms-transition: all .5s ease-in-out;
                    -o-transition: all .5s ease-in-out;
                    -webkit-transition: all .5s ease-in-out;
                    transition: all .5s ease-in-out;
                    font-size: 1em;

                    .icon {
                        font-size: inherit;
                        color: inherit;
                        margin: 0;
                        margin-right: 4px;
                        padding: 0;
                    }

                    &:hover {
                        /*-webkit-box-shadow:  0px 7px 7px -7px $shadow;-moz-box-shadow:  0px 7px 7px -7px $shadow;box-shadow:  0px 7px 7px -7px $shadow;*/
                        box-shadow: inset 0 0 0 1px $gray-100, 0 0 0 2px $gray-200;
                        border-color: $primary-light;
                        color: $primary-light;
                    }
                }
            }
        }

        .filters {
            width: 80%;
            margin-left: 10%;
        }
    }

</style>
