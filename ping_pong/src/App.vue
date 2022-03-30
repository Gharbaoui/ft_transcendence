// state is 0 means ProfileBlock
// state is 1 means FriendsBlock
// state is 2 means LeaderBoardBlock
// state is 3 means MathcHistoryBlock
// state is 4 means GameBlock
// state is 5 means ChatBlock


<template>
  <div id="main_app" class="container_app">
    
    <div class="controls_style">
        <div class="ctls_child">
          <ManagerBlock :ControlBtns="btns" @watchState="changeComponent" />
        </div>
    </div>
    
    
    <!-- i need to add component that is responsible for login --> 
    <div class="websites_style">
      <div class="comps_container">
        <ProfileBlock v-show="state === 0"/>
        <FriendsBlock v-show="state === 1" />
        <LeaderBoardBlock v-show="state === 2"/>
        <MatchHistoryBlock v-show="state === 3" />
        <GameBlock v-show="state === 4" />
        <ChatBlock v-show="state === 5" />
      </div>
    </div>
  
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ManagerBlock from './components/manager.vue';
import ChatBlock from './components/Chat.vue';
import FriendsBlock from './components/Friends.vue';
import GameBlock from './components/Friends.vue';
import LeaderBoardBlock from './components/LeaderBoard.vue';
import MatchHistoryBlock from './components/MatchHistory.vue';
import ProfileBlock from './components/Profile.vue';

export default defineComponent({
  name: 'App',
  components: {
    ManagerBlock,
    ChatBlock,
    FriendsBlock,
    GameBlock,
    LeaderBoardBlock,
    MatchHistoryBlock,
    ProfileBlock,
  },
  data()
  {
    return {
      // the state variable will control we are game or profile or login ...
      // i need to chage this variable in other component
      btns: [
        {
            str: 'Profile'  as string,
            status: 0 as number,
        },
        {
            str: 'Friends'  as string,
            status: 0 as number,
        },
        {
            str: 'LeaderBoard'  as string,
            status: 0 as number,
        },
        {
            str: 'MathcHistory'  as string,
            status: 0 as number,
        },
        {
            str: 'Game'  as string,
            status: 0 as number,
        },
        {
            str: 'Chat'  as string,
            status: 0 as number,
        },
      ],
      state: 0 as number // this will hold index to which btn is selected now
    }
  },
  methods:{
    changeComponent(index:number)
    {
        this.state = index;
    }
  }
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container_app{
  display: flex;
  height: 100%;
}

.controls_style
{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width:20%;
  background-color:burlywood;
}

.websites_style
{
  padding-top: 5%;
  width: 80%;
  background-color: blanchedalmond;
}

.comps_container{
  height: 90%;
  background-color: aqua;
}
.ctls_child{
  text-align: center;
  width:100%;
  height: 50%;
  text-align: center;
}
</style>
