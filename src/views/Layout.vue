<template>
  <div class="home">
    <KoHeader></KoHeader>
    <KoSidebar></KoSidebar>
    <router-view />
  </div>
</template>

<script>
import KoHeader from '@/components/ko-header';
import KoSidebar from '@/components/ko-sidebar';

export default {
  name: 'home',
  components: {
    KoHeader,
    KoSidebar
  }
}
</script>
<style scoped>
  .home {
    position: relative;
    height: 100vh;
  }
</style>
