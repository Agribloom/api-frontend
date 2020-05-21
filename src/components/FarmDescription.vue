<template>
       <div>
           <alert-item v-if="!hasDescription" :messages="'No description found yet!'" fontIcon="las la-comment"/>
           <collapsible-text v-else-if="isCollapsible" height="140" class="description" :action="true">
               <span v-html="description"></span>
           </collapsible-text>
           <span v-else v-html="description"></span>
       </div>
</template>

<script>
export default {
    name: 'FarmDescription',
    props: {
        description: {
            required: true
        }
    },
    computed: {
        hasDescription () {
            return this.description
        },
        isCollapsible () {
            return this.description.length > 150
        }
    }
}
</script>

<style scoped>

</style>
