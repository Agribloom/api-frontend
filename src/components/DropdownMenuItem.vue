<template>
        <span :title="item.value" class="dropdown-item" v-html="item.text" @click="onSelect(item.value)"></span>
</template>

<script>
export default {
    name: 'DropdownMenuItem',
    props: ['item'],
    data () {
        return {
            selected: 0
        }
    },
    methods: {
        onSelect (value) {
            this.$emit('selected', value)
        }
    }
}
</script>~
<style lang="scss">
      .dropdown-item{
          cursor: pointer;
      }
</style>
