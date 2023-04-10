//这里使用了redux的全局变量，声明一个store，初始值为判断浏览器有无isLoging的cookie，有的话说明用户处于登录状态
//然后订阅该变化并利用useState进行实时界面刷新（路由组的变化）
import { createSlice, configureStore } from '@reduxjs/toolkit'
let mystate = false;
if(document.cookie.indexOf("isLoging")!==-1){
   mystate=true;
}
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: mystate
  },
  reducers: {
    login: state => {
      // Redux Toolkit 允许在 reducers 中编写 "mutating" 逻辑。
      // 它实际上并没有改变 state，因为使用的是 Immer 库，检测到“草稿 state”的变化并产生一个全新的
      // 基于这些更改的不可变的 state。
      state.value =true;
    },
    logout: state => {
      state.value =false;
    }
  }
})
//login代表登入，logout代表退出
export const {login, logout} = counterSlice.actions

export const store = configureStore({
  reducer: counterSlice.reducer
})

