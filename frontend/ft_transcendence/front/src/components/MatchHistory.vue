<template>
    <div>
    <div class="grid grid-cols-1 min-w-full border rounded">
                <ul class="overflow-auto hideScrollBar" style="height: 90vh;">
                    <li>
                        <div class="px-6"
                        v-for="(onehistory, index) in historyDisplay" :key="matchs_info[index].id"
                        >
                        <div class="flex justify-around items-center h-30 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
                            <div class="flex items-center">
                                <div class="ml-2">
                                    <div class="cursor-pointer" @click="redirect_left_player(onehistory.left_player.id)">
                                        <img id="showImage" class="rounded-full max-w-xs w-32 items-center border" :src="onehistory.left_player.image_url">
                                        <div class="text-center">{{onehistory.left_player.login}}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex items-center">
                                <div class="ml-2">
                                    <div class="text-center mb-3">
                                        {{ matchs_info[index].type }}
                                    </div>
                                    <div>
                                        {{ matchs_info[index].data[0].score }} - {{ matchs_info[index].data[1].score }}
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <div class="ml-5">
                                    <div class="cursor-pointer" @click="redirect_left_player(onehistory.right_player.id)">
                                        <img id="showImage" class="rounded-full max-w-xs w-32 items-center border" :src="onehistory.right_player.image_url">
                                        <div class="text-center">{{onehistory.right_player.login}}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>

                            </div>
                        </div>

                        </div>

                    </li>
                </ul>
            </div>
        </div>
</template>


<script lang="ts">
import store from '@/store'
import { defineComponent } from 'vue'
import axios from 'axios';
import router from '@/router';

interface Match {
    id: number,
    data: Array<{id:number, score:number}>, // of size fixed 2
    type: string,
};

interface Player{
    id:number;
    login:string;
    image_url:string;
};

interface OneHistory
{
    left_player: Player;
    right_player: Player;
};

export default defineComponent({
    name: 'LeaderBoardBlock',
    data()
    {
        return {
            logged: false as boolean,
            user_id: 0 as number,
            msg: 'LeaderBoard here' as string,
            users_ids: [] as Array<number>,
            matchs_info : [] as Array<Match>,
            match_display: [] as Array<OneHistory>
        }
    },
    async created()
    {
        // now i will get players from backend
        ///////////////////
        await this.checkLogin();
        if (!this.logged){
            router.push({name: 'login'});
            return ;
        }
        //////////////////////


        await this.InitMatchHistory();
        await this.getUsers();
    },
    methods:{
        async InitMatchHistory()
        {
            try{
                const resp = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/game/matchs/' + (this.$route.query.history_id ? this.$route.query.history_id : '')
                });
                this.matchs_info = resp.data;

                // start tests
                // this.matchs_info  = [];
                // this.matchs_info.push({id:0, data: [{id:58640, score:100}, {id:1200, score:50}], type:'matchup'});
                // this.matchs_info.push({id:0, data: [{id:1300, score:600}, {id:1500, score:56}], type:'1v1'});
                //end tests
                this.users_ids = [];
                this.matchs_info.map((inp:Match) => {
                    this.users_ids.push(+inp.data[0].id);
                    this.users_ids.push(+inp.data[1].id);
                });
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getUsers()
        {
            console.log(this.users_ids);
            try {
                const resp = await axios({
                    method: 'post',
                    url: 'http://localhost:8080/api/getusers',
                    data : {usersId: this.users_ids}
                });
                this.match_display = resp.data;
            } catch(e){
                console.log(e);
            }
        },
        redirect_left_player(target_id:number)
        {
            if (target_id === -1) {
                // which means playes against robot
                return ;
            }
            if (target_id === this.user_id) {
                router.push({name: 'profile'});
                return ;
            }
            router.push({name: 'FriendProfile', query: {friend_id: target_id}});
        },

        //////////
        async checkLogin()
        {
            try{
                const resp = await axios({
                    method: 'get',
                    url: 'http://localhost:8080/api/islogin',
                    withCredentials: true
                });
                this.logged = true;
                this.user_id = resp.data.id;
            }
            catch(e)
            {
                this.logged = false;
            }
        }
        /////////////////////////
    },
    computed: {
        playerHistory(): Array<any>
        {
            return store.getters.getPlayerHistory;
        },
        historyDisplay() : Array<OneHistory>
        {
            return this.match_display.reverse();
        }
    }
})
</script>