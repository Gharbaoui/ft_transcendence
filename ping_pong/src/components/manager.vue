<template>
<div id="manager_id" style="height:100%">
       
    <div class="mr_ctls">
       <div
       class="btn_ctl"
       :class="{btn_selected : (index === select_ctl)}"
        v-for="(btn, index) in ControlBtns"
        :key="btn.status"
        @click="buttonPressed(index)"
       >
           {{btn.str}}
        </div>
    </div>
</div>
</template>


<script lang="ts">
import { defineComponent, Prop } from 'vue'
import { PropType } from 'vue';

export default defineComponent({
    name: 'ManagerBlock',
    props : {
        ControlBtns: {
            type: Array as PropType<Array<{str:string, status:number}>>,
            required: true
        }
    },
    data()
    {
        return {
            btns: [] as string[],
            select_ctl: 0 as number
        }
    },
    methods: {
        buttonPressed(index:number)
        {
            this.select_ctl = index;
            this.$emit('watchState', index);
        }
    }
})
</script>

<style scoped>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.btn_selected
{
    /* this class will have style of selected button */
    font-size: 20px;
    color: white;
    background-color: aqua;
}

.mr_ctls{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: red;
}
.btn_ctl
{
    padding-top: 10px;
    flex: 1;
}
</style>