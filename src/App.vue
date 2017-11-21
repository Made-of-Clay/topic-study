<template>
    <div id="app-wrapper">
        <!-- <app-header></app-header> -->
        <md-button class="md-accent">Accent</md-button>
        <div class="content-wrapper">
            <!-- <app-drawer></app-drawer>
            <app-content></app-content> -->
        </div>
    </div>
</template>

<script>
// import AppHeader from './components/app-header';
// import AppDrawer from './components/app-drawer';
// import AppContent from './components/app-content';

export default {
    name: 'app',

    // components: { AppHeader, AppDrawer, AppContent },

    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
        };
    },

    created() {
        // this.
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
