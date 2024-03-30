<template>
    <div class="main-sidebar sidebar-style-2">
      <aside id="sidebar-wrapper">
        <div class="sidebar-brand">
          <router-link :to="{name: 'home'}">
            <img alt="image" src="@/assets/img/logo.png" class="header-logo" /> <span
              class="logo-name">Otika</span>
          </router-link>
        </div>
        <ul class="sidebar-menu">
          <li class="menu-header">Main</li>
          <li class="dropdown" :class="{active: $route.name === 'home'}">
            <router-link :to="{name: 'home'}">
              <i data-feather="monitor"></i>
            <span>Dashboard</span></router-link>
          </li>
          <li class="dropdown" :class="{active: $route.name === 'projects'}">
            <router-link :to="{name: 'projects'}">
              <i data-feather="grid"></i>
            <span>Projects</span></router-link>
          </li>
          
        </ul>
      </aside>
    </div>
</template>

<script>
export default {
    
}
</script>