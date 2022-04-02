<template>
<div id="Friends_id">
    {{msg}}
</div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FriendsBlock',
    data()
    {
        return {
            msg: 'Friends here'
        }
    }
})
</script>