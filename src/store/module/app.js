import Cookies from 'js-cookie'
const app ={
    state:{
        sidebar: {
            opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
            withoutAnimation: false,
            width:Cookies.get('sidebaWidth')|| '220px'
        },
        language: Cookies.get('language') || 'zn',
        showMap:  true,
        mapCol: 12,
        chartListener:{}
    },
    mutations:{
        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
            if (state.sidebar.opened) {
              Cookies.set('sidebarStatus', 1);
              Cookies.set('sidebaWidth', '220px');
              state.sidebar.width = '220px';
            } else {
              Cookies.set('sidebarStatus', 0);
              Cookies.set('sidebaWidth', '36px');
              state.sidebar.width = '36px';
              Object.keys(state.chartListener).forEach((key) => {
                state.chartListener[key].resize();
              })
            }
          },
          CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 0)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
          },
          SET_LANGUAGE: (state, language) => {
            state.language = language
            Cookies.set('language', language)
          },
          SHOW_MAP :(state, showMap) => {
            state.showMap = showMap
          },
          SET_MAP_COL:(state, mapCol) => {
            state.mapCol = mapCol
          },
          ADD_CHART_LISTENER:(state,chartElement) => {
            state.chartListener[chartElement.id] = chartElement ;
          },
          REMOVE_CHART_LISTENER:(state,chartElement) => {
            delete state.chartListener[chartElement.id];
          },
          RESIZE_CHART: (state,chartElement) => {
             state.chartListener[chartElement.id].resize();
          }
    },
    actions:{
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        },
        closeSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        setLanguage({ commit }, language) {
            commit('SET_LANGUAGE', language)
        },
        controlMap({commit,state},command){
          if(state.showMap === true ){
            if('close' == command){
              commit('SET_MAP_COL', 0)
            }else if('open' == command){
              commit('SET_MAP_COL', 10)
              Object.keys(state.chartListener).forEach((key) => {
                state.chartListener[key].resize();
              })
            }else if('full' == command){
              commit('SET_MAP_COL', 24)
            }
          }
        },
        addChartResizeListener({commit},chart){
          commit('ADD_CHART_LISTENER', chart);
        },
        removeChartResizeListener({commit},chart){
          commit('REMOVE_CHART_LISTENER', chart);
        }, 
        chartResizeListener({commit},chart){
          commit('RESIZE_CHART', chart);
        }
    }
}
export default app