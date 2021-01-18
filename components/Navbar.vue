<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info" class="navbar">
    <b-navbar-brand href="#">SCHEDULER</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/Add" >Add</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default {
    name : 'Navbar'
}
</script>
<style scoped>
.navbar {
    background-color: #33383b !important;
}
</style>