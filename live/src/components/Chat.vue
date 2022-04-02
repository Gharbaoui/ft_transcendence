<template>
    <div id="Chat_id">
        <ChatNavBarBlock @chatBtnPressed="chatState" />
        <PublicChatBlock />
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import ChatNavBarBlock from './chatnavbar.vue';
import PublicChatBlock from './PublicChat.vue'

export default defineComponent({
    name: 'ChatBlock',
    components: {
        ChatNavBarBlock,
        PublicChatBlock,
    },
    data()
    {
        return {
           state: 0 as number
        }
    },
    methods: {
        chatState(index:number)
        {
            this.state = index;
            console.log(`state is ${this.state}`);
        }
    }
})
</script>
