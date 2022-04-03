import { createStore } from 'vuex'

export default createStore({
  state: {
    chatState: {
      index: 0 as number,
    },
    userData : {
      user_name: '' as string,
      user_id: 0 as number
    }
  },
  getters: {
  },
  mutations: {
    updateChatState(state:any, index:number)
    {
      state.chatState.index = index;
    },
    updateUserData(state:any, user_data: any)
    {
      state.userData = user_data;
      console.log(state.userData);
    }
  },
  actions: {
  },
  modules: {
  }
})
