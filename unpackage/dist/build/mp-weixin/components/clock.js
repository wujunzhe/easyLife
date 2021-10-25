(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/clock"],{"5be5":function(t,n,e){"use strict";e.r(n);var r=e("d6d7"),a=e("85b4");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);var i,c=e("f0c5"),o=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);n["default"]=o.exports},"85b4":function(t,n,e){"use strict";e.r(n);var r=e("9aba"),a=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);n["default"]=a.a},"9aba":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"clock",data:function(){return{time:"",timeInterval:null}},mounted:function(){var t=this;t.timeInterval=setInterval((function(){t.init()}),1e3)},methods:{init:function(){var t=(new Date).toLocaleString("zh-ZH");this.time=t}},beforeDestroy:function(){clearInterval(this.timeInterval)}};n.default=r},d6d7:function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return r}));var a=function(){var t=this,n=t.$createElement;t._self._c},u=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/clock-create-component',
    {
        'components/clock-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5be5"))
        })
    },
    [['components/clock-create-component']]
]);
