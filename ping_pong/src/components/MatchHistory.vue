<template>
    <div id="MatchHistory_id">
        {{msg}}
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MatchHistoryBlock',
    data()
    {
        return {
            msg: 'MatchHistory here'
        }
    }
})
</script>
