<template>
    <!-- This is an example component -->
  <!-- Sidebar -->
      <nav class="bg-gray-900 w-20  justify-between flex flex-col ">
        <div class="mt-10 mb-10">
          <div class="mt-10">
            <ul>

              <li class="mb-6">
              <router-link to="/">
                  <span>
                    <svg class="fill-current h-8 w-8 mx-auto text-gray-300 hover:text-green-500"  viewBox="0 0 24 24">
                      <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"></path>
                    </svg>
                  </span>
              </router-link>
              </li>

              <li class="mb-6">
                <router-link to="/users">
                  <span>
                    <svg class="fill-current h-8 w-8 mx-auto text-gray-300 hover:text-green-500" viewBox="0 0 24 24">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </span>
                </router-link>
              </li>

              <li class="mb-6">
                <router-link to="/leaderboard">
                  <span>
                    <svg class="fill-current h-8 w-8 mx-auto text-gray-300 hover:text-green-500" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </router-link>
              </li>


              <li class="mb-6">
                <router-link to="/matchhistory">
                  <span>
                    <svg class="fill-current h-8 w-8 mx-auto text-gray-300 hover:text-green-500" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </span>
                </router-link>
              </li>

              <li class="mb-6">
                <router-link to="/game">
                  <span>
                    <svg class="fill-current h-8 w-8 mx-auto text-gray-300 hover:text-green-500" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </span>
                </router-link>
              </li>
              
              <li class="mb-6">
                <router-link to="/chat">
                  <span>
                    <svg class="fill-current h-8 w-8 mx-auto text-gray-300 hover:text-green-500" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    </span>
                  </router-link>
                </li>

            </ul>
          </div>
        </div>
      </nav>
</template>


<script lang="ts">
import { defineComponent, Prop } from 'vue'

export default defineComponent({
    name: 'ManagerBlock',
    data()
    {
      return {
        state: 0 as number
      }
    },
    computed: {
      activeBtn() : number
      {
        return this.state;
      }
    },
    methods: {
      // buttonPressed(index:number)
      // {
      //   this.$emit('watchState', index);
      // }
      activated(index:number)
      {
        this.state = index;
      }
    }
})

</script>

<style scoped>
.router-link-exact-active span svg
{
  color: #48bb78;
}
</style>