import { loginByUsername,getUserInfo,logout} from '@/api/login'
import { getToken, setToken, removeToken} from '@/utils/auth'
import { base64 } from '@/utils/base64'
const user= {
    state: {
        token:getToken(),       //授权token
        username:"",    //用户登录名称
        realname:"",    //真实名称
        roles: [],      //角色列表,
        notice: 100    //通知数量
    },
    mutations:{
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.username = name
        },
        SET_REALNAME: (state, realname) => {
            state.realname = realname
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_NOTICE: (state, notice) => {
            state.notice = notice
        }
    },
    actions:{
        LoginByUsername:({commit},userInfo) => {
            return new Promise((resolve, reject) => {
                const password = base64(userInfo.password);
                const clone = JSON.parse(JSON.stringify(userInfo));
                clone.password  = "{SAND}"+password
                loginByUsername(clone).then(response => {
                    const data = response.data;
                    commit('SET_TOKEN', data.result);
                    setToken(data.result);
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },
        RefreshToken:function({commit},token){
            commit('SET_TOKEN', token);
            setToken(token);
        },
        GetUserInfo:({commit, state }) =>{
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(response => {
                  if (!response.data) {
                    reject('验证失败、请重新登录...')
                  }
                  const data = response.data.result;
                  if (data.roles && data.roles.length > 0) {
                    const roles= ['admin'] ;
                    data.roles.forEach(role => {
                        roles.push(role.code);
                    });
                    commit('SET_ROLES', roles)
                  } else {
                    commit('SET_ROLES', ['__anonymous__'])  //没有角色的默认匿名角色
                  }
                  commit('SET_NAME', data.name);
                  commit('SET_REALNAME', data.realName);
                  commit('SET_NOTICE', data.notice || 2);
                  resolve(response)
                }).catch(error => {
                  reject(error)
                })
              })
        },
        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
      }  
    }
}

export default user;