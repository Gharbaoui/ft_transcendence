import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ProfileBlock from '@/components/Profile.vue'
import FriendsBlock from '@/components/Friends.vue'
import LeaderBoardBlock from '@/components/LeaderBoard.vue'
import MatchHistoryBlock from '@/components/MatchHistory.vue'
import GameBlock from '@/components/Game.vue'
import ChatBlock from '@/components/CHAT/Chat.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'profile',
    component: ProfileBlock
  },
  {
    path: '/users',
    name: 'users',
    component: FriendsBlock
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderBoardBlock
  },
  {
    path: '/matchhistory',
    name: 'matchhistory',
    component: MatchHistoryBlock
  },
  {
    path: '/game',
    name: 'game',
    component: GameBlock
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatBlock
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
