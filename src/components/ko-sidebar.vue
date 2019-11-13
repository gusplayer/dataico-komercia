<template>
  <aside class="main-sidebar">
    <div class="head"></div>
    <ul class="sidebar-menu">
      <template v-for="(route, index) in routes">
        <li v-if="route.children" :key="index" :class="{treeview: true, active: route.active}">
          <a href="#" @click="openTreeview(route)">
            <span>{{ route.label }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <transition name="slide">
            <ul
              class="treeview-menu"
              v-show="route.active"
              :style="`height: ${50.5 * route.children.length}px`"
            >
              <li
                v-for="(subroute,index) in route.children"
                :class="{soonDisabled: subroute.soon}"
                :key="index"
              >
                <a
                  :href="subroute.path"
                  v-if="subroute.external"
                  class="sub-route"
                  style="padding-left: 40px"
                >
                  <div class="icon-circle" />
                  {{ subroute.label }}
                  <span
                    class="pull-right-soon soon"
                    v-show="subroute.soon"
                  >Pronto</span>
                </a>
                <router-link
                  :to="subroute.path"
                  v-else
                  class="sub-route"
                  style="padding-left: 40px"
                >
                  <div class="icon-circle" />
                  {{ subroute.label }}
                  <span
                    class="pull-right-soon soon"
                    v-show="subroute.soon"
                  >Pronto</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
      </template>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      routes: [

        {
          path: "/facturacion",
          label: "Facturación",
          // icon: "ti-package",
          active: false,
          children: [
            {
              path: "/facturacion/factura",
              label: "Facturas"
            },
            {
              path: "/facturacion/notas_credito",
              label: "Notas credito",
              // soon: "true"
            }
          ]
        }
      ]
    };
  },
  methods: {
    openTreeview(route) {
      const activeRoute = !route.active;
      this.routes = this.routes.map(route => {
        route.active = false;
        return route;
      });
      route.active = activeRoute;
    }
  }
}
</script>

<style scoped>
.main-sidebar {
  position: absolute;
  width: 200px;
  top: 0px;
  height: 100vh;
  background: #eee;
  z-index: 9;
}
.head {
  width: 100%;
  height: 50px;
  background: var(--purple);
}
.sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
}
.sidebar-menu > li {
  position: relative;
  margin: 0;
  padding: 0;
}
.sidebar-menu > li > a {
  color: initial;
  padding: 12px 5px 11px 15px;
  display: block;
  font-weight: 300;
}
.sidebar-menu li.active > .treeview-menu {
  display: block;
}
.sidebar-menu li > a {
  position: relative;
}
.sidebar-menu li > a > .pull-right-container {
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -7px;
}
.sidebar-menu .treeview-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar-menu .treeview-menu > li {
  margin: 0;
}
.sidebar-menu .treeview-menu > li > a {
  display: block;
  color: initial;
}
.sidebar-menu .treeview-menu > li > a div {
  display: inline-block;
  margin-right: 5px;
}
.sidebar-menu {
  font-size: 12px;
  font-weight: 500;
  overflow: auto;
}
.sidebar-menu li > a {
  padding: 16px 25px;
  color: #000;
  font-weight: 400;
}
.sidebar-menu a.router-link-exact-active.router-link-active {
  color: #000;
  font-weight: 600;
  border-left: #12cc6f 5px solid;
  z-index: 9999;
}

.treeview {
  position: relative;
  transition: 0.3s;
}

.active {
  background-color: #fff;
}
.icon-circle {
  width: 6px;
  height: 6px;
  background-color: #4429b4;
  border-radius: 35px;
}
.sub-route {
  font-weight: 900;
  color: #363636;
}
.soonDisabled {
  pointer-events: none;
}
.soon {
  font-size: 11px;
  background-color: #4429b4;
  color: #fff;
  border-radius: 5px;
  padding: 3px 5px;
}
.pull-right-soon {
  position: absolute;
  right: 10px;
}

.main-sidebar.collapse a {
  padding: 12px 5px 11px 15px;
  display: flex;
  justify-content: flex-end;
}
.main-sidebar.collapse .pull-right-container {
  display: none;
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  height: 0px !important;
}
</style>