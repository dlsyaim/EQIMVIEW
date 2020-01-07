 const userMap = {
  admin: {
    result:{
      roles: ['admin'],
      username: 'admin',
      realName: '管理员',
      notice:100
    },
    message:"",
    code:"0",
    success:true
  },
  reuslt:{
    result:"111111",
    message:"登录失败",
    code:"2018020801",
    success:true
  }
}

export default {
  fetchCaptcha: () =>{
    return {
      result:"",
      message:"",
      code:"",
      success:true
    }
  },
  loginByUsername: () => {
    return userMap.reuslt
  },
  getUserInfo: () => {
      return userMap.admin;
     
  },
  logout: () => {
    return {
      result:"",
      message:"",
      code:"",
      success:true
    }
  }
}