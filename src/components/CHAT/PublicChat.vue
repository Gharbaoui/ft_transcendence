<template>
    <div>
    <div class="grid grid-cols-1 min-w-full border rounded">
                <ul class="overflow-auto hideScrollBar" style="height: 90vh;">
                    <li>
                        <div class="px-6"
                            v-for="room in rooms" :key="room.room_id"
                        >
                        <div class="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
                            <div class="flex items-center">
                            <div class="ml-2">
                            <div class="text-sm font-light" style="color: #2d00ff;">  {{ room.room_name }} </div>
                            </div>
                            </div>
                            <div>
                                <div 
                                class="rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out  mr-6 cursor-pointer"
                                :class="room.is_locked ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'"
                                @click="joinToRoom(room.room_id, room.is_locked)"
                                >
                                <svg v-if="!room.is_locked"  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                </svg>

                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                   <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                </div>
                            </div>
                        </div>

                        </div>

                    </li>
                </ul>
            </div>
        </div>
</template>


<script lang="ts">
interface Room{
    room_id : number;
    room_name: string;
    is_locked: boolean;
}

import { defineComponent } from 'vue'
import axios from 'axios';


export default defineComponent({
    name: 'PublicChatBlock',
    components:{
    },
    data()
    {
        return {
            rooms: [
                /*
                    room_id, room_name, is_locked
                */
            ] as Array<Room>
        }
    },
    mounted()
    {
        this.getRooms();
    },
    methods: {
        async getRooms()
        {
            try {
                const resp = await axios.get(`http://localhost:8001/rooms`);
                this.rooms = resp.data;
            }catch(e)
            {
                console.log(`while trying to get data for rooms ${e}`);
            }
        },
        joinToRoom(room_id:number, is_locked:boolean)
        {
            // probably this function shoould by async
            if (is_locked)
                this.joinToPrivateRoom(room_id);
            else
                this.joinToPublicRoom(room_id);
        },
        joinToPrivateRoom(room_id:number)
        {
            console.log(`private room ${room_id}`);
        },
        joinToPublicRoom(room_id:number)
        {
            console.log(`public room ${room_id}`);
        }
    }

})
</script>


<style scoped>
.hideScrollBar::-webkit-scrollbar {
    display: none;
}

.hideScrollBar
{
    -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>