<template>
  <div class="login-container">
    <div class="center_body">
      <div class="login_box">
        <div class="login_top">
          <div class="login_logo"></div>
        </div>
        <div class="login_body">
          <div class="table_an">
            <div class="input_box">
              <div class="border_center">
                <div class="border_r1">
                  <el-form
                    ref="loginForm"
                    :model="loginForm"
                    :rules="loginRules"
                    class="login-form"
                    auto-complete="off"
                    label-position="left"
                  >
                    <el-input v-model="loginForm.key" type="hidden"></el-input>
                    <div class="border_r2">
                      <div class="input_box_title">
                        <p>{{$t('login.title')}}</p>
                      </div>
                      <div class="input_box_bottom">
                        <el-form-item prop="username">
                          <label class="input_user" for="login_user"></label>
                          <el-input
                            v-model="loginForm.username"
                            :placeholder="$t('login.username')"
                            name="username"
                            type="text"
                            id="login_user"
                          />
                        </el-form-item>
                        <el-form-item prop="password">
                          <label class="input_password" for="login_password"></label>
                          <el-input
                            v-model="loginForm.password"
                            :type="passwordType"
                            :placeholder="$t('login.password')"
                            name="password"
                            @keyup.enter.native="handleLogin"
                            id="login_password"
                          />
                          <span class="show-pwd" @click="showPwd">
                            <svg-icon
                              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                            />
                          </span>
                        </el-form-item>
                        <el-form-item prop="captcha">
                          <div class="input_reg">
                            <div class="input_reg_left">
                              <label for="reg"></label>
                              <el-input  v-model="loginForm.captcha" :placeholder="$t('login.reg')" type="text" id="reg"/>
                            </div>
                            <div class="input_reg_right">
                              <img :src="captcha_img" alt="如果看不清楚，请单击图片刷新！"  @click="refreshCode" >
                            </div>
                          </div>
                        </el-form-item>
                        <div class="input_save">
                          <div class="input_save_left">
                            <input type="checkbox" class="fn_checkbox">
                            <span class="checkbox_type"></span>
                            {{$t('login.remember')}}
                          </div>
                          <div class="input_save_right">{{$t('login.lost')}}</div>
                        </div>

                        <el-button
                          :loading="loading"
                          type="primary"
                          style="width:100%;margin-bottom:30px;"
                          @click.native.prevent="handleLogin"
                        >
                          <a>{{ $t('login.logIn') }}</a>
                        </el-button>

                        <div class="suggest">
                          <span>{{$t('login.bottom_tip')}}</span>
                        </div>
                      </div>
                    </div>
                  </el-form>
                </div>
              </div>
            </div>
            <div class="bak_table">
              <a class="bak01"></a>
              <a class="bak02"></a>
              <a class="bak03"></a>
              <a class="bak04"></a>
            </div>
          </div>
        </div>
        <div class="login_bottom">
          {{$t('login.copyright')}}
          <a href="http://www.gisinfo.com/">{{$t('login.bottom_but01')}}</a>
          <a href="#">{{$t('login.bottom_but02')}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {fetchCaptcha} from '@/api/login' 
import captcha_img from '@/assets/login_images/regpng.png'
import { Message } from 'element-ui'
import request from '@/utils/request';
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "000000",
        captcha: undefined,
        key : undefined
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        captcha: [{ required: true, trigger: "blur", message: "请输入验证码" }]
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      redirect: undefined,
      captcha_img:captcha_img
    };
  },
  mounted:function(){
      this.refreshCode();
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    refreshCode(){
      fetchCaptcha().then(res => {
        if(res.data.result){
          this.captcha_img = "data:image/jpeg;base64,"+res.data.result.captcha
          this.loginForm.key =  res.data.result.key
        }
      })  
    },
    showPwd() { 
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path:"/authHome",name:'首页' });
            })
            .catch((error) => {
              this.loading = false;
              Message({
                message: error.message||'服务请求异常', type: 'error', duration: 5 * 1000
              })
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
$bg: #283443;
$light_gray: #000;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    caret-color: #000;
  }
}
.el-input__inner {
  line-height: normal !important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  box-shadow: 0 0 0 60px #fff inset;
  -webkit-text-fill-color: #000;
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 42px;
    width: 100%;

    input {
      background: #fff;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0;
      color: #000;
      height: 42px;
      caret-color: #000;
      text-indent: 43px;
      border: solid 1px #ccc;
      &:hover {
        border: solid 1px #409eff;
      }
    }
  }
  .el-form-item {
    border-radius: 0px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: none;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: table;

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}

.el-button {
  a {
    font-size: 18px;
    color: #fff;
  }
}
.center_body {
  display: table-cell;
  vertical-align: middle;
  width: 100%;
}
.login_box {
  width: 100%;
  float: left;
}
.login_top {
  width: 100%;
  height: 70px;
  float: left;
  background: url(../../assets/login_images/logo_top_bg.png) center center
    repeat-x;
  border-bottom: 1px solid #2095ff;
}

.login_logo {
  width: 1000px;
  margin: 0px auto;
  height: 100%;
  background: url(../../assets/login_images/logo.png) left center no-repeat;
}
.login_body {
  height: 477px;
  background: url(../../assets/login_images/banner01.png) center center
    no-repeat;
  float: left;
  width: 100%;
  transition: 0.5s ease-in;
}

.login_bottom {
  width: 100%;
  float: left;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  text-align: center;
  color: #929292;
}
.table_an {
  width: 1000px;
  margin: 0 auto;
  height: 100%;
  position: relative;
}
.input_box {
  height: 100%;
  float: right;
  display: table;
}
.border_center {
  display: table-cell;
  vertical-align: middle;
}
.border_r1 {
  width: 462px;
  float: left;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.7);
  padding: 10px;
  box-sizing: border-box;
}
.border_r2 {
  width: 100%;
  float: left;
  background: rgba(255, 255, 255, 0.5);
  padding: 8px 40px;
  box-sizing: border-box;
}
.input_box_title {
  width: 100%;
  height: 34px;
  border-bottom: solid 1px #999;
  margin-bottom: 10px;
}
.input_box_title p {
  float: left;
  height: 33px;
  border-bottom: solid 2px #54a9ff;
  line-height: 33px;
  padding: 0 12px;
  font-size: 18px;
  color: #54a9ff;
}
.input_box_bottom {
  width: 100%;
  padding: 0 15px;
  float: left;
  box-sizing: border-box;
  margin-top: 10px;
}
.input_falsetxt {
  width: 100%;
  height: 26px;
  line-height: 26px;
  border: solid 1px #f8c4c4;

  text-indent: 30px;
  color: #ce4545;
  background: #ffecec url(../../assets/login_images/false.png) 12px 50%
    no-repeat;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.3s ease-in;
  margin-bottom: 10px;
}
.input_falsetxt.active {
  height: 26px;
  opacity: 1;
  margin-bottom: 10px;
}

label.input_password {
  background: url(../../assets/login_images/password.png) center no-repeat;
  width: 42px;
  height: 42px;
  position: absolute;
  z-index: 9;
}
label.input_user {
  background: url(../../assets/login_images/username.png) center no-repeat;
  width: 42px;
  height: 42px;
  position: absolute;
  z-index: 9;
}
.input_reg {
  margin-bottom: 16px;
  width: 100%;
  height: 42px;
  float: left;
}
.input_reg_left {
  width: calc(100% - 136px);
  height: 42px;
  line-height: 42px;
  background: #fff;
  margin-bottom: 16px;
  float: left;
}
.input_reg_left label {
  background: url(../../assets/login_images/reg.png) center no-repeat;
  width: 42px;
  height: 42px;
  position: absolute;
  z-index: 9;
}
.input_reg_right {
  width: 126px;
  float: right;
  height: 42px;
}
.input_reg_right img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.ty_input {
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background: none;
  outline: 0;
  font-size: 14px;
  color: #000;
  border: solid 1px #ccc;
  text-indent: 42px;
}
.input_save {
  width: 100%;
  height: 18px;
  line-height: 18px;
  float: left;
  margin-bottom: 16px;
}
.input_save_left {
  height: 18px;
  float: left;
  position: relative;
  line-height: 18px;
  text-indent: 6px;
  color: #333;
  font-size: 14px;
}
.fn_checkbox {
  width: 80px;
  height: 18px;
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
span.checkbox_type {
  width: 18px;
  height: 18px;
  float: left;
  border: solid 1px #ccc;
  background: #fff;
  transition: all 0.3s ease-in;
  box-sizing: border-box;
  border-radius: 3px;
  cursor: pointer;
}
.fn_checkbox:hover + span.checkbox_type {
  border: solid 1px #4899ff;
}
.fn_checkbox:checked + span {
  background: url(../../assets/login_images/checkbox_bg.png) center no-repeat;
  border: solid 1px #4899ff;
}
.input_save_right {
  height: 18px;
  line-height: 18px;
  float: right;
  cursor: pointer;
  color: #53a9ff;
  font-size: 14px;
  transition: 0.3s ease-in;
}
.input_save_right:hover {
  text-decoration: underline;
}
.input_submit {
  width: 100%;
  height: 46px;
  line-height: 46px;
  cursor: pointer;
  background: #2095ff;
  color: #fff;
  font-size: 16px;
  letter-spacing: 10px;
  transition: opacity 0.3s ease;
  float: left;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 16px;
}
.input_submit:hover {
  background: #228af2 none repeat scroll 0 0;
  opacity: 0.8;
}
.suggest {
  width: 100%;
  height: 12px;
  float: left;
  margin-bottom: 16px;
}
.suggest span {
  width: 100%;
  text-indent: 12px;
  height: 12px;
  text-align: center;
  font-size: 12px;
  float: left;

  color: #ff6600;
  background: url(../../assets/login_images/tishi.png) center left no-repeat;
  line-height: 12px;
}
.bak_table {
  position: absolute;
  bottom: 16px;
  left: 11px;
  display: none;
}
body div.bak_table a {
  height: 16px;
  width: 16px;
  display: inline-block;
  margin: 0 5px;
  border: solid 2px #fff;
  border-radius: 50%;
  background: #999;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s ease-in;
}
body div.bak_table a.active {
  background: #f00000;
}
body div.bak_table a:hover {
  background: #f00000;
}

div.bak01 {
  background: url(../../assets/login_images/banner01.png) center center
    no-repeat;
}
div.bak02 {
  background: url(../../assets/login_images/banner02.png) center center
    no-repeat;
}
div.bak03 {
  background: url(../../assets/login_images/banner01.png) center center
    no-repeat;
}
div.bak04 {
  background: url(../../assets/login_images/banner02.png) center center
    no-repeat;
}
a.help {
  height: 70px;
  line-height: 70px;
  float: right;
  background: url(../../assets/login_images/help.png) center left no-repeat;
  text-indent: 20px;
  color: #53a9ff;
  cursor: pointer;
  transition: 0.3s ease-in;
}
a.help:hover {
  text-decoration: underline;
}
.login_bottom a {
  margin-left: 10px;
  transition: 0.3s ease-in;
  color: #929292;
}
.login_bottom a:hover {
  color: #53a9ff;
}
</style>