(this.webpackJsonptestapp=this.webpackJsonptestapp||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(4),o=n(3),r=n(0),c=n.n(r),l=n(14),i=n.n(l),u=n(2),s=n.n(u),m=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return c.a.createElement("li",{className:"note"},e.content," ",c.a.createElement("button",{onClick:n},a))},f="https://stormy-retreat-41112.herokuapp.com/api/notes",p=function(){return s.a.get(f)},d=function(t){return s.a.post(f,t)},h=function(t,e){return s.a.put("".concat(f,"/").concat(t),e)},v=function(t){var e=t.message;return null===e?null:c.a.createElement("div",{className:"error"},e)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(37);s.a.get("http://localhost:3001/notes").then((function(t){return console.log(t.data)}));var g=s.a.get("http://localhost:3001/foobar");console.log(g);var b=function(){var t=Object(r.useState)([]),e=Object(o.a)(t,2),n=e[0],l=e[1],i=Object(r.useState)(""),u=Object(o.a)(i,2),s=u[0],f=u[1],g=Object(r.useState)(!0),b=Object(o.a)(g,2),E=b[0],j=b[1],w=Object(r.useState)("some error happened..."),O=Object(o.a)(w,2),k=O[0],y=O[1];Object(r.useEffect)((function(){console.log("Effect"),p().then((function(t){console.log("promise fulfilled"),l(t.data)}))}),[]);var S=E?n:n.filter((function(t){return!0===t.important}));return c.a.createElement("div",null,c.a.createElement("h1",null,"Notes"),c.a.createElement(v,{message:k}),c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){return j(!E)}},"show ",E?"important":"all")),c.a.createElement("ul",null,S.map((function(t,e){return c.a.createElement(m,{key:e,note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),o=Object(a.a)(Object(a.a)({},e),{},{important:!e.important});h(t,o).then((function(e){l(n.map((function(n){return n.id!==t?n:e.data})))})).catch((function(a){y("Note '".concat(e.content,"' was already removed from server ")),setTimeout((function(){y(null)}),5e3),l(n.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),c.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:s,date:new Date,important:Math.random()<.5};d(e).then((function(t){l(n.concat(t.data)),f("")}))}},c.a.createElement("input",{value:s,onChange:function(t){console.log(t.target.value),f(t.target.value)}}),c.a.createElement("button",{type:"submit"},"save")))};i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(b,{notes:[{id:0,val:"foo"},{id:1,val:"foobar"},{id:2,val:"barfoo"}]})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.2982a809.chunk.js.map