<!-- src/components/MainMenu.vue -->
<template>
  <div id="main-menu">
    <router-link to="/">MainMenu</router-link>
    <!-- Add more menu items as needed -->
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
};
</script>

<style scoped>
/* Add component-specific styles here */
#main-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 10px;
}

#main-menu a {
  color: #fff;
  margin-right: 15px;
  text-decoration: none;
}
</style>
