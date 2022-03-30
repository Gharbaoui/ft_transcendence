<template>
    <div id="Chat_id">
        {{msg}}
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatBlock',
    data()
    {
        return {
            msg: 'Chat here'
        }
    }
})
</script>
