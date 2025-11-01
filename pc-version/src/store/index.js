import { createStore } from 'vuex'

// 从localStorage获取用户信息
let userinfo = {};
try {
  const storedUserinfo = localStorage.getItem('userinfo');
  if (storedUserinfo) {
    userinfo = JSON.parse(storedUserinfo);
  }
} catch (e) {
  console.error('Failed to load userinfo from localStorage', e);
}

// 需要永久存储的变量名
const saveStateKeys = ['userinfo'];

// 保存变量到localStorage
const saveUserinfo = function(key, value) {
  if (saveStateKeys.indexOf(key) !== -1) {
    let tmp = JSON.parse(localStorage.getItem('userinfo') || '{}');
    tmp[key] = value;
    localStorage.setItem('userinfo', JSON.stringify(tmp));
  }
}

export default createStore({
  state: {
    userinfo: userinfo,
    community_name: ''
  },
  mutations: {
    $uStore(state, payload) {
      // 判断是否多层级调用
      const nameArr = payload.name.split('.');
      let saveKey = '';
      const len = nameArr.length;
      
      if (nameArr.length >= 2) {
        let obj = state[nameArr[0]];
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]];
        }
        obj[nameArr[len - 1]] = payload.value;
        saveKey = nameArr[0];
      } else {
        // 单层级变量
        state[payload.name] = payload.value;
        saveKey = payload.name;
      }
      
      // 保存到localStorage
      if (saveStateKeys.indexOf(saveKey) !== -1) {
        saveUserinfo(saveKey, state[saveKey]);
      }
    }
  },
  actions: {
    // 可以添加异步操作
  },
  getters: {
    getUserinfo: state => state.userinfo,
    getCommunityName: state => state.community_name
  }
})