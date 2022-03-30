<template>
    <div id="profile_id" style="height:100%">

        <div class="info_style_container" v-show="user_info.user_name.length !== 0">
            <!-- start -->
            <div class="avatar_container">
                    <div class="avatar_style_left">
                        <div class="avatar_style">
                            <img :src="avatar_img" class="avatar_style_img">
                        </div>
                        <input style="display:none;" type="file" @change="avatarUpload" ref="input_file">
                    </div>
                    <div class="avatar_style_right">
                        <div class="change_avatar_btn_container">
                            <button class="change_avatar_btn" @click="promptChoosFile">change avatar</button>
                        </div>
                        <div class="upload_avatar_btn_container">
                            <button class="upload_btn" @click="onUpload">Upload</button>
                        </div>
                    </div>
            </div>
            <!-- end -->

            <!-- start -->
            <div class="user_name_container">
                <div class="user_name">
                    <div class="user_name_data">
                        <div class="user_name_display" v-if="!user_name_editing"> {{user_info.user_name}} </div>
                        <input type="text" :class="{invalid_user_name : invalid_user_name}" v-else v-model="tmp_user_name" v-focus @keypress="userIsTyping" @keyup="userIsTyping" @blur="doneEditing(false)" @keypress.enter="doneEditing(true)">
                    </div>
                    <button class="change_user_name" @click="editUserName" v-if="!user_name_editing">change user name</button>
                </div>
            </div>
            <!-- end -->

            <!-- start -->
            <div class="auth2_container">
                <div class="auth2_style">
                    <input type="checkbox" @click="changeAuth" ref="auth_check_box">
                    <label for=""> enable authentication </label>
                </div>
            </div>
            <!-- end -->
        </div>

    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios';
export default defineComponent({
    name: 'ProfileBlock',
    data()
    {
        return {
            user_info: {
                user_name: '' as string,
                user_id: 0 as number,
                avatar_file_name: 'default-avatar.png' as string, /* i will place image in assets folder and avatar_url i will get it in from database*/
                avatar_file_obj: null as any
            },
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
    },
    methods:
    {
        avatarUpload(event:any)
        {
            this.user_info.avatar_file_obj = event.target.files[0];
        },
        async onUpload()
        {
            // const data = new FormData();
            // data.append('image', this.avatar_file, this.avatar_file.name);
            // const resp = await axios.post(this.userInfoSendEndPoint, data); // this will be responsible for sending data to backend and i need him to store in the assets folder
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
            const check : any = this.$refs.auth_check_box;
            check.checked = true; // true on success otherwise failure and depending on this.auth2_enabled variable
            console.log(this.auth2_enabled);
        },
        async getUserInfo()
        {
            // this will request for user info to display
            // after data arrived update userinfo object
            // just simluation
            await sleep(3000); // this like time taking to user from database

            this.user_info.user_name = 'user name from db'; // i'm assuming user name should at least of length 1
            this.user_info.user_id = 1;
            this.user_info.avatar_file_name = 'logo.png';
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
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.avatar_style
{

}

.user_name_edit
{

}

.hide_elm{
    display: none;
}

.invalid_user_name
{
    background-color: pink;
}
/* start styling */
.info_style_container
{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.avatar_container
{
    height: 30%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items:center;
}

.avatar_style_left
{
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100%;
    width: 20%;
    background-color: black;
    justify-content: center;
}

.avatar_style{
    width: 100%;
}
.avatar_style_img{
    width: 100px;
    height: 100px;
}

.avatar_style_right
{
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100%;
    width: 20%;
    background-color: black;
    justify-content: center;
}
.change_avatar_btn
{
    margin-top: 12%;
    height: 65%;
    background-color: aliceblue;
    width:80%;
}

.upload_btn{
    height: 65%;
    background-color: aliceblue;
    width:80%;
}

.upload_avatar_btn_container
{
    height: 50%;
}
.change_avatar_btn_container
{
    height: 50%;
}
.user_name_container
{
    height: 30%;
    background-color: white;


    display: flex;
}

.auth2_container
{
    height: 30%;
    background-color: white;
}
</style>