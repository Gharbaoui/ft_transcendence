<template>

<div>
<div class="h-full" v-show="is_done">
 
  <div class="border-b-2 block md:flex">

    <div class="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
        <div class="flex justify-between">
            <span class="text-xl font-semibold block">Your Info</span>
        </div>

        <div class="w-full p-8 mx-2 flex justify-center">
            <img id="showImage" class="max-w-xs w-32 items-center border" :src="avatar_img">
        </div>
        <div class="w-full p-8 mx-2 flex justify-around">
        <div @click="promptChoosFile" class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 cursor-pointer">
            <input style="display:none;" type="file" :maxFileSize="max_avatar_size" @change="avatarUpload" ref="input_file">
            change
        </div>
        <div @click="onUpload" class="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 cursor-pointer">
            upload
        </div>
        </div>
    </div>
    
    <div class="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
      <div class="rounded  shadow p-6">
        <div class="pb-6">
          <label for="name" class="font-semibold text-gray-700 block pb-1">Name</label>
          <div class="flex" @dblclick="editUserName">
            <input disabled id="username" class="border-1  rounded-r px-4 py-2 w-full" type="text" v-if="!user_name_editing" :value="user_info.user_name" />
            <input id="username" class="border-1  rounded-r px-4 py-2 w-full" type="text" v-else v-focus :class="{'bg-pink-500' : invalid_user_name}" v-model="tmp_user_name" @keypress="userIsTyping" @keyup="userIsTyping" @blur="doneEditing(false)" @keypress.enter="doneEditing(true)"/>
          </div>
        </div>
        <div class="pb-4">
            <label class="flex justify-start items-start">
            <div class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                <input type="checkbox" class="opacity-0 absolute" @click="changeAuth">
                <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" :class="{checked : auth2_enabled}" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
            </div>
            <div class="select-none font-semibold text-gray-700">enable authentication</div>
            </label>
        </div>
      </div>
    </div>

  </div>
 
</div>
</div>

</template>


<script lang="ts">
declare var require: any; // important for require with typescript
import { defineComponent } from 'vue'
import axios from 'axios';
import store from '@/store';
export default defineComponent({
    name: 'ProfileBlock',
    data()
    {
        return {
            user_info: {
                user_name: '' as string,
                user_id: 0 as number,
                avatar_file_name: 'logo.png' as string, /* i will place image in assets folder and avatar_url i will get it in from database*/
                avatar_file_obj: null as any
            },
            max_avatar_size: 10000 as number,
            auth2_enabled: false as boolean,
            invalid_user_name: false as boolean,
            tmp_user_name: '' as string,
            user_name_editing: false as boolean,
            userInfoSendEndPoint: '' as string /* for example http://localhost:3000/upload */
        }
    },
    beforeMount(){
        // this.atStart();
        this.getUserInfo();
    },
    computed: {
        avatar_img()
        {
            const img : string = this.user_info.avatar_file_name;
            return require('../assets/' + img);
        },
        is_done()
        {
            const res : any = this.user_info.user_name.length !== 0;
            return res;
        }
    },
    methods:
    {
        avatarUpload(event:any)
        {
            this.user_info.avatar_file_obj = event.target.files[0];
            // console.log(this.user_info.avatar_file_obj);
        },
        async onUpload()
        {
            // const data = new FormData();
            // data.append('image', this.user_info.avatar_file_obj, this.user_info.avatar_file_obj.name);
            // console.log('called');
            // const resp = await axios.post('http://localhost:4000/av_upl', data, {
            //         headers: {
            //             "Content-Type": "multipart/form-data"
            //         }
            // }); // this will be responsible for sending data to backend and i need him to store in the assets folder
            // console.log(resp);
            // if (resp is valid){
            // i will send other request to backend to delete old avatar
            //     this.avatar_url_name = this.avatar_file.name;
            // }

            console.log('trying to upload');

        },
        promptChoosFile ()
        {
            const btn :any = this.$refs.input_file;
            btn.click();
        },
        editUserName()
        {
                console.log('catch double click');
                this.user_name_editing = true;
        },
        async doneEditing(edit:boolean)
        {
            if (edit === true)
            {
                let tmp = this.tmp_user_name.trim();
                if (tmp.length !== 0){
                    // here i should send to the backend to check if user name he typed is valid
                    
                    // if valid i will update otherwise no
                    if (tmp !== this.user_info.user_name){
                        const check = await this.isUserNameValid(tmp);
                        if (check.value)
                            this.user_info.user_name = tmp;
                        else
                        {
                            this.invalid_user_name = true;
                            return ;
                        }
                    } 
                }
                else
                {
                    this.invalid_user_name = true;
                    return ;
                }
            }
            this.user_name_editing = false;
            this.tmp_user_name = '';
            this.invalid_user_name = false;
        },
        async isUserNameValid(userName:string){
            // simlation for getting data from db base and check if username already there 
            await sleep(1000);
            return {value: true};

        },
        userIsTyping(e:any){
            if (e.keyCode !== 13) // 13 is for enter
                this.invalid_user_name = false;
        },
        async changeAuth()
        {
            // here i will change auth of user
            // until now i do not know what to do if response from backend was error what does it mean he could not change his authentication
            this.auth2_enabled = !this.auth2_enabled;
            await sleep(1000);
            console.log(this.auth2_enabled);
        },
        async getUserInfo()
        {
            // this will request for user info to display
            // after data arrived update userinfo object
            // just simluation
            // await sleep(7000); // this like time taking to user from database
            try {
                const resp = await axios.get(`http://localhost:3000/user`);
                const data = resp.data.user;
                this.user_info.user_name = data.user_name;
                this.user_info.user_id = data.user_id;
                this.user_info.avatar_file_name = data.avatar_file_name;
                store.commit('updateUserData', {user_name: this.user_info.user_name, user_id: this.user_info.user_id});

            }catch(e)
            {
                console.error('error happend');
            }
        },
    },
    directives:
    {
        focus : {
            mounted(el) {
                el.focus();
            },
        }
    }
})



// these function are just for testing
function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
</script>


<style scoped>
.checked{
    display: block;
}
</style>