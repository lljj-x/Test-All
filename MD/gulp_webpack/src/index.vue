<template>
    <header-component></header-component>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
    import HeaderComponent from './components/HeaderComponent.vue'
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        }, components:{
            HeaderComponent
        }
    };
</script>