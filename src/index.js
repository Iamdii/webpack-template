//здесь подключаются все библиотеки

import './js/common' //possible without filename extension, webpack understand 
import './css/main.css' 

/* 3 ways to add external .js files: 
1. import 'vue'   
-- just add vue library, webpack is just searching in current directory;
   if in current directory no vue.js, next folder - node_modules;
   next - in package.json path to head script - dist -- 'vue/dist/vue.js'
2. import Vue from 'vue'  
 --- when we want to interact with Vue, for example Vue.use()... 
3. window.Vue = require('vue')
4. when we want separate files(styles or js from Bootstrap only): 'bootstrap/dist/css/bootstrap.min.css'
*/