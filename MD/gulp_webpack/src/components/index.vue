<template>
    <header-component></header-component>
</template>
<style lang="less" rel="stylesheet/less">
    body {
        background-color: red;
        div {

        }
    }
</style>
<script>
    import HeaderComponent from './components/HeaderComponent.vue'
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        }, components: {
            HeaderComponent
        }
    };
</script>