import { fetchSecurityKey } from '@/api/security';
import { JSEncrypt } from 'jsencrypt';
import { sha256 } from 'js-sha256';
import b from '@/assets/b.png'

const getProvisional = function(commit){
    const canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.id = "canvas_png";
    canvas.width=17;
    canvas.height=17;
    var image = new Image();
    image.src = b;
    image.onload= (() => {
        let str = "";
        context.drawImage(image,0,0);
        var imageData = context.getImageData(0, 0, 17, 17);
        for(var i = 0;i<imageData.data.length;i++){
            if((i+1)%4==0)continue;
            str += imageData.data[i]!=0?hexToString(imageData.data[i]):'';
        }
        commit('SET_PROVISIONAL', iGetInnerText(str.trim()));
    })
};

const hexToString = function (a) {
    return String.fromCharCode(parseInt(a, 10))
}

const iGetInnerText = function (testStr) {
    var resultStr = testStr; //去掉空格
    resultStr = resultStr.replace(/\s/g,"");
    resultStr = resultStr.replace(/[ ]/g, "");    //去掉空格
    resultStr = resultStr.replace(/[\r\n]/g, ""); //去掉回车换行
    return resultStr;
}

 const a =  {
    state: {
        provisional:undefined,
        hash: false,
        query: false,
        aes: undefined
    },
    mutations: {
        SET_PROVISIONAL(state, provisional) {
            state.provisional = provisional;
        },
        SET_QUERY(state, query) {
            state.query = query;
        },
        SET_HASH(state, hash) {
            state.hash = hash;
        },
        SET_ASE(state, aes) {
            state.aes = aes;
        }
    },
    actions: {
        getServicePublicKey({ state,commit}) {
            if(!state.provisional) 
                getProvisional(commit);
            return new Promise((resolve, reject) => {
                fetchSecurityKey().then(response => {
                    const headers = response.headers;
                    const responseHash = headers["response-hash"];
                    if (responseHash&&response.data) {
                        let data =response.data;  
                        if(responseHash == sha256.sha256(JSON.stringify(data))){
                            data = data.result;
                            const a = data.a;
                            commit('SET_HASH',  data.c);
                            const encryptor = new JSEncrypt();
                            encryptor.setPrivateKey(state.provisional);
                            const aesKey = encryptor.decrypt(a);
                            commit('SET_ASE', aesKey)   
                            commit('SET_QUERY', true)
                        }else return reject("得到的数据与期望值不一致")
                    }
                    resolve();
                }).catch(error => {  reject(error);  })
            })
        }
    }
}
export default a;