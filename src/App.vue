<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Jamkrindo Klaim</router-link>
      <div class="navbar-nav">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
        <router-link class="nav-link" to="/add-klaim">Tambah Klaim</router-link>
        <router-link class="nav-link" to="/activity-log">Log Aktivitas</router-link>
      </div>
    </div>
  </nav>

  <div class="container mt-3">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>