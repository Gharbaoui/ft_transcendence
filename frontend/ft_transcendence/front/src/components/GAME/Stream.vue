<template>

<div>
<div class="h-full mt-5">

  <div class="border-b-2 block md:flex" style="height:80vh">

    <div class="w-full md:w-3/6  bg-blue">

        <div class="overflow-auto" style="height: 80vh;">

	<!-- start of nav bar of streeam-->


    <div class="flex justify-around mb-3 py-5 rounded-lg bg-white mt-3">
	<div class="flex justify-around bg-blue w-3/12">
		<div class="flex flex-col">
		    <img :src="left_player_avatar" v-if="left_player_avatar != ''"  class="rounded-full max-w-xs w-16 items-center border" />
		    <div class="text-center"> {{left_player_login}}</div>
		</div>
		<div class="mt-2.5"> {{playerLeft.score}} </div>
	</div>
	<div>
		<div>
		    <div class="mt-2.5">VS</div>
		</div>
	</div>

	<div class="flex justify-around bg-blue w-3/12">
		<div class="flex flex-col">
		    <img :src="right_player_avatar" v-if="right_player_avatar != ''" class="rounded-full max-w-xs w-16 items-center border" />
		    <div>{{right_player_login}} </div>
		</div>
		<div class="mt-2.5"> {{playerRight.score}} </div>
	</div>

    </div>
	<!-- end of nav bar of streeam-->


		<div id ="pong-table" class="pong-table flex justify-center">
		    <canvas id="canvas"></canvas>
		</div>
	</div>

    </div>

    <div class="w-full md:w-3/6 p-8 bg-white lg:ml-4 shadow-md">
        <div class="grid grid-cols-1 min-w-full rounded">
                <ul class="overflow-auto" style="height: 70vh;">
                    <li>
                        <div class="px-6"
                        v-for="(oneroom, index) in room_display" :key="rooms_info[index].id"
                        >
                        <div class="flex justify-around items-center h-30 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
                            <div class="flex items-center">
                                <div class="ml-2">
                                    <div class="cursor-pointer" @click="redirect_left_player(oneroom.left_player.id)">
                                        <img id="showImage" class="rounded-full max-w-xs w-16 items-center border" :src="oneroom.left_player.image_url">
                                        <div class="text-center">{{oneroom.left_player.login}}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center cursor-pointer" @click="roomClicked(rooms_info[index].namespace, rooms_info[index].name, oneroom)">
                                    {{ rooms_info[index].namespace }}
                            </div>

                            <div class="flex items-center">
                                <div class="ml-5">
                                    <div class="cursor-pointer" @click="redirect_left_player(oneroom.right_player.id)">
                                        <img id="showImage" class="rounded-full max-w-xs w-16 items-center border" :src="oneroom.right_player.image_url">
                                        <div class="text-center">{{oneroom.right_player.login}}</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        </div>

                    </li>
                </ul>
            </div>
    </div>

  </div>

</div>

</div>

</template>


<script lang="ts">

import { defineComponent } from 'vue'
import { io } from "socket.io-client";

import axios from 'axios';
import router from '@/router';

interface Player {
    x: number;
    y: number;
    w: number;
    h: number;
    score: number;
    color: string;
}

interface Ball {
    x: number,
    y: number,
    r: number,
    speed: number,
    velocityX: number,
    velocityY: number,
    color: string,
}

interface streamRoom{
    id:number;
    players: Array<number>;
    namespace: string;
};

interface Player{
    id:number;
    login:string;
    image_url:string;
};

interface OneRoom{
    left_player: Player;
    right_player: Player;
};

export default defineComponent({
    name: 'ProfileBlock',
    components: {
    },
    data()
    {
        return {
	left_player_login: '' as string,
	left_player_avatar: '' as string,
	right_player_login: '' as string,
	right_player_avatar: '' as string,
            user_id: 0 as number,
            users_ids: [] as Array<number>,
            logged: false as boolean,
            rooms_info: [] as Array<streamRoom>,
            room_display: [] as Array<OneRoom>,
            socket : null as any,
            canvas: 0 as any,
            canvasGrd: 0 as any,
            context: 0 as any,
            factor: 0 as number,
            scw: 0 as number,
            sch: 0 as number,
            playerRight: {
                x: 0 as number,
                y: 0 as number,
                w: 0 as number,
                h: 0 as number,
                score: 0 as number,
                color: ''  as string,
            } as Player,
            playerLeft: {
                x: 0 as number,
                y: 0 as number,
                w: 0 as number,
                h: 0 as number,
                score: 0 as number,
                color: ''  as string,
            } as Player,
            ball: {
                x: 0 as number,
                y: 0 as number,
                r: 0 as number,
                speed: 0 as number,
                velocityX: 0 as  number,
                velocityY: 0 as number,
                color: '' as string,
            } as Ball,

            gameRooms: [] as any
        }
    },
    async created(){
        await this.checkLogin();
        if (!this.logged){
            router.push({name: 'login'});
            return ;
        }
        await this.InitMatchHistory();
        await this.getUsers();
    },
    methods:{
        async InitMatchHistory()
        {
            try{
                const resp = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/game/rooms'
                });
                this.rooms_info = resp.data;

                // start tests
                //end tests
                this.users_ids = [];
                this.rooms_info.map((inp:streamRoom) => {
                    this.users_ids.push(inp.players[0]);
                    this.users_ids.push(inp.players[1]);
                });
            }
            catch(e)
            {
                console.log(e);
            }
        },
        async getUsers()
        {
            console.log("array: ", this.users_ids);
            try {
                const resp = await axios({
                    method: 'post',
                    url: 'http://localhost:8080/api/getusers',
                    data : {usersId: this.users_ids}
                });
                
                this.room_display = resp.data;
            }catch(e){
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
        },
        startStreaming(stream_id:number)
        {
            console.log(`stream id ${stream_id}`);
        },
        initGame(scw: number, sch: number){
            this.scw = scw;
            this.sch = sch;
            //this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
            this.canvas.width = this.canvas.offsetWidth ;
            this.factor = this.canvas.width / scw;

            window.addEventListener('resize', () => {
                this.canvas.width = this.canvas.offsetWidth ;
                this.factor = this.canvas.width / this.scw;
                this.canvas.height = this.sch * this.factor;
            });

            this.canvas.height = sch * this.factor;

            this.context = (this.canvas as HTMLCanvasElement).getContext('2d');
            this.canvasGrd = this.context.createRadialGradient(
                this.canvas.width/2,
                    this.canvas.height/2,
                    5,
                    this.canvas.width/2,
                    this.canvas.height/2,
                    this.canvas.height
                );
            this.canvasGrd.addColorStop(0, "rgb(177,255,185)");
            this.canvasGrd.addColorStop(1, "rgb(36,252,82,1)");

            this.renderGame();
        },
        renderGame(): void{
            this.context.fillStyle = this.canvasGrd;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.context.fillStyle = this.playerLeft.color;
            this.context.fillRect(this.playerRight.x * this.factor, this.playerRight.y * this.factor, this.playerRight.w * this.factor, this.playerRight.h * this.factor);
            this.context.fillRect(this.playerLeft.x * this.factor, this.playerLeft.y * this.factor, this.playerLeft.w * this.factor, this.playerLeft.h * this.factor);
            //console.log(this.ball.x);
            this.context.fillStyle = this.ball.color;
            this.context.beginPath();
            this.context.arc(this.ball.x * this.factor, this.ball.y * this.factor, this.ball.r * this.factor, 0, Math.PI*2,false);
            this.context.closePath();
            this.context.fill();
        },
        async getRooms(){
            const resp = await axios.get('http://localhost:3000/game/rooms');
            this.gameRooms = resp.data;
            console.log(resp.data);
        },

        roomClicked(namespace:string, name:string, oneroom: OneRoom)
        {
            this.left_player_avatar = oneroom.left_player.image_url;
            this.left_player_login = oneroom.left_player.login;
            this.right_player_avatar = oneroom.right_player.image_url;
            this.right_player_login = oneroom.right_player.login;

            this.canvas.width = this.canvas.offsetWidth ;
            this.factor = this.canvas.width / this.scw;
            this.canvas.height = this.sch * this.factor;
            if (this.socket){
                this.socket.disconnect();
            }
            this.socket = io(`http://localhost:3000/${namespace}`);

            this.socket.on('connect', () => {
                this.socket.emit('clientType', {type: 'stream',room: name});
                this.socket.on('canvasWH', (canvas: any) => {
                    console.log(this.scw, this.sch);
                    this.initGame(canvas.scw, canvas.sch);
                });
                //console.log(this.socket.id);
            });
            this.socket.on("updateClient", (clientData: any) => {
                this.playerLeft = clientData.pl;
                this.playerRight = clientData.pr;
                this.ball = clientData.b;
                // this.scw = clientData.scw;
                // this.sch = clientData.sch;
                // console.log(this.scw);
                this.renderGame();
            });
            this.socket.on("leaveRoom", () => {
                this.$router.push('/game/stream');
            });
        }
    },
    mounted(){
        this.factor = 1;
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.canvas.width = this.canvas.offsetWidth ;
        //this.factor = this.canvas.width / this.canvas.width;

        this.canvas.height = this.canvas.width * 0.7;

        this.context = (this.canvas as HTMLCanvasElement).getContext('2d');
        this.canvasGrd = this.context.createRadialGradient(
            this.canvas.width/2,
                this.canvas.height/2,
                5,
                this.canvas.width/2,
                this.canvas.height/2,
                this.canvas.height
            );
        this.canvasGrd.addColorStop(0, "rgb(177,255,185)");
        this.canvasGrd.addColorStop(1, "rgb(36,252,82,1)");
        this.renderGame();
    },
    unmounted(){
        console.log('stream unmounted');
        // this.socket.emit("stopTime");
        if(this.socket)
            this.socket.disconnect();
    },
})

</script>

<style scoped>


#canvas {
    /* margin-top: 10px; */
    border: solid 1px rgb(240, 46, 170);
    background: rgb(177,255,185);
    background: radial-gradient(circle, rgba(177,255,185,1) 0%, rgba(36,252,82,1) 100%);
    width: 100%;
    object-fit: contain;
    /* height: 800; */
    max-width: 800px;
    box-shadow: rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px;
    /* max-height: 800px; */
    /* position: absolute; */
    /* overflow: hidden; */

}

</style>

