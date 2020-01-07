import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user';
import permission from './module/permission';
import app from './module/app'
import tagsView from './module/tagsView'
import security from './module/security'
import getters from './getters';
import { debounce } from '@/utils'

Vue.use(Vuex);

const store= new Vuex.Store(
    {
        modules:{
            app,
            security,
            user,
            permission,
            tagsView
        },
        getters
   }
); 

window.addEventListener('resize',() =>{
    Object.keys(store.state.app.chartListener).forEach((key) => {
        const listener = store.state.app.chartListener[key];
        debounce(() => {
            listener&&listener.resize();
        }, 100)();
    });
});

export default store;