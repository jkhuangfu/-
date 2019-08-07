>store/index.js

```
import Vue from 'vue';
import vuex from 'vuex';
Vue.use(Vuex);
// 创建实例
const store = new vuex.store({
	//组件通过 this.$store.state.count获取
    state:{
      count:1
    }，
    //组件通过this.$store.getters.getStateCount获取
    getters:{
      getStateCount:(state)=>state.count+1
    },
    //组件通过this.$store.commit('add' || 'reduce')调用更新
    mutations:{
    	add(state){
    		state.count = state.count + 1; 
    	},
    	reduce(state,v){
			state.count = state.count - v; 
    	}
    },
    //组件通过 this.$store.dispatch('addFunc' || 'reduceFunc')调用 用途同上述mutations相同
    actions:{//类似于vue中的mothods
    	addFunc(context){// 接收一个与store实例具有相同的方法属性的context对象
    		context.commit('add');
    	},
    	reduceFunc(context,v){
    		context.commit('reduce',v);//
    	}
    }
})
```

> main.js

```
import Vue from 'vue';
import App from './App';
import router from './router';

import store from './store';

new Vue({
	el:'#app',
	store,
	router,
	component:{ App },
	Template:'<App/>'
})
```

>HelloWorld.vue

```
<template>

	<div>
		<h1>我是从state直接获取的{{this.$store.state.count}}</h1>
		<h1>我是从getters直接获取的计算后的{{this.$store.getters.getStateCount}}</h1>

		<button @click="add">+</button>
		<button @click="reduce">-</button>
	</div>

</template>

<script>
	export default {
		name:'helloWorld',
		data(){

		},
		methods:{
			add(){
				//this.$store.commit('add');
				this.$store.dispatch('addFunc')
			},
			reduce(){
				//this.$store.commit('reduce');
				this.$store.dispatch('reduceFunc',4)

			}
		}
	}
</script>
```
### 每个属性描述 

> State vuex中的数据源，我们需要保存的数据就保存在这里，可以在页面通过 this.$store.state来获取我们定义的数据；

>Getters 相当于vue中的computed计算属性，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算，这里我们可以通过定义vuex的Getter来获取，Getters 可以用于监听、state中的值的变化，返回计算后的结果。

> Mutations：数据我们在页面是获取到了，但是如果我们需要修改count值怎么办？如果需要修改store中的值唯一的方法就是提交mutation来修改，我们现在HelloWorld.vue文件中添加两个按钮，一个加1，一个减1；这里我们点击按钮调用addFun（执行加的方法）和reduceFun（执行减法的方法），然后在里面直接提交mutations中的方法修改值

> Actions：我们看到，当点击三次后页面上的值是改变了；我们达到了修改store中状态值的目的，但是，官方并不推荐我们这样直接去修改store里面的值，而是让我们去提交一个actions，在actions中提交mutation再去修改状态值，接下来我们修改index.js文件，先定义actions提交mutation的函数



