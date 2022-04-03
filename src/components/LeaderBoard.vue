<template>
    <div id="LeaderBoard_id">
        {{msg}}
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LeaderBoardBlock',
    data()
    {
        return {
            msg: 'LeaderBoard here' as string
        }
    }
})
</script>
