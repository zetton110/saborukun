import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'worktime-input-form',
      component: require('@/components/WorkTimeInputForm').default
    },
    {
      path: '*',
      redirect: '/worktime-input'
    }
  ]
})
