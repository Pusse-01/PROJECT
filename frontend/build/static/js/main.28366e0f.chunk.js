(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{14:function(e,t,r){},22:function(e,t,r){},23:function(e,t,r){"use strict";r.r(t);r(0);var n=r(3),o=r.n(n),a=(r(14),r(1));var c=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)("h1",{children:"Hello"})})},s=r(9),d=r(2),i=r(7),l=r(8),u=[i.a],E=Object(d.combineReducers)({taskLogcreated:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_TASK-REQUEST":return{loading:!0};case"CREATE_TASK-SUCCESFUL":return{tasklog:t.payload};case"CREATE_TASK-FAIL":return{loading:!1,error:t.payload};default:return e}},userRegister:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USER_REGISTER_REQUEST":return{loading:!0};case"USER_REGISTER_SUCCESS":return{userInfo:t.payload};case"USER_REGISTER_FAIL":return{error:t.payload,loading:!1};default:return e}}}),p=Object(d.createStore)(E,Object(l.composeWithDevTools)(d.applyMiddleware.apply(void 0,u)));r(22);o.a.render(Object(a.jsx)(s.a,{store:p,children:Object(a.jsx)(c,{})}),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.28366e0f.chunk.js.map