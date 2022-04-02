<template>

<!-- This is an example component -->
<div class="w-screen">
    <div class="grid grid-cols-1 min-w-full border rounded" style="min-height: 80vh;">
            <div class="col-span-1 bg-white border-r border-gray-300">

                <ul class="overflow-auto" style="height: 500px;">
                    <li>
  

                        <div class="px-6"
                        >
                        <div class="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
                            <div class="flex items-center">
                            <div class="ml-2">
                            <div class="text-sm font-light text-gray-500"> room name </div>
                            </div>
                            </div>
                            <div>
                                <div class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 cursor-pointer">
                                    <!-- <label > join </label> -->
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        </div>

                    </li>
                </ul>
            </div>
        </div>
    </div>


</template>


<script lang="ts">
import { defineComponent, Prop } from 'vue'

export default defineComponent({
    name: 'ManagerBlock',
    methods: {
      buttonPressed(index:number)
      {
        this.$emit('watchState', index);
      }
    }
})

</script>