<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->


  <div class="flex flex-row h-full">
    <ManagerBlock />
    <div class="px-16 py-4 text-gray-700 bg-gray-200 h-screen w-screen">
        <!-- Content -->
        <router-view v-show="validUrl"/>
        <ErrorPageBlock v-show="!validUrl" />
    </div>
    <!-- <testApp  /> -->
  </div>
</template>
     

<script lang="ts">
import { defineComponent } from 'vue'
import ManagerBlock from './components/manager.vue';
import ErrorPageBlock from './components/ErrorPage.vue';
// import testApp from './components/test.vue'
export default defineComponent({
  components: {
    ManagerBlock,
    ErrorPageBlock,
    // testApp,
  },
  data(){
    return {
      state: 0 as number
    }
  },
  computed :{
      validUrl() : boolean
      {
        const current = this.$route.name;
        return (current === '/' || current === 'profile' || current === 'users' || current === "leaderboard" || current === 'matchhistory' || current === 'game' || current === 'chat')
      }
  },
  methods: {
    // test()
    // {
    //   console.log(this.$route.name);
    // }
  }
})
</script>
