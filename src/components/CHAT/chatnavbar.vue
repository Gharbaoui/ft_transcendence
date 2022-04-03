<template>
        <nav class="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full">
            <div class="sm:mb-0 self-center">
                <!-- <div class="h-10" style="display: table-cell, vertical-align: middle;"> -->
                <div @click="btnPressed(0)"
                    class="text-md no-underline text-black hover:text-blue-dark ml-2 px-1 cursor-pointer  inline-block" 
                    :class="{'text-rose-600': isVisible === 0}"
                    >
                    Public
                </div>
                
                <div @click="btnPressed(1)" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1 cursor-pointer inline-block"
                :class="{'text-rose-600': isVisible === 1}"
                >
                    Private
                </div>
                <!-- <a href="/two" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">About Us</a> -->
                <div @click="btnPressed(2)" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1 cursor-pointer inline-block"
                :class="{'text-rose-600': isVisible === 2}"
                >
                    Create Room
                </div>
                <!-- </div> -->
            </div>
        </nav>
</template>


<script lang="ts">
import store from '@/store';
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatNavBarBlock',
    data(){
        return {
        }   
    },
    methods: {
        btnPressed(index:number)
        {
            store.commit('updateChatState', index);
        }
    },
    computed: {
        isVisible() : number
        {
            return store.state.chatState.index;
        }
    }
})
</script>
