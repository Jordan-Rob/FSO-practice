(this.webpackJsonptestapp=this.webpackJsonptestapp||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(4),o=n(3),r=n(0),c=n.n(r),i=n(14),l=n.n(i),u=n(2),s=n.n(u),m=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return c.a.createElement("li",{className:"note"},e.content," ",c.a.createElement("button",{onClick:n},a))},f=function(){return s.a.get("/api/notes")},p=function(t){return s.a.post("/api/notes",t)},d=function(t,e){return s.a.put("".concat("/api/notes","/").concat(t),e)},v=function(t){var e=t.message;return null===e?null:c.a.createElement("div",{className:"error"},e)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(37);s.a.get("http://localhost:3001/notes").then((function(t){return console.log(t.data)}));var h=s.a.get("http://localhost:3001/foobar");console.log(h);var g=function(){var t=Object(r.useState)([]),e=Object(o.a)(t,2),n=e[0],i=e[1],l=Object(r.useState)(""),u=Object(o.a)(l,2),s=u[0],h=u[1],g=Object(r.useState)(!0),b=Object(o.a)(g,2),E=b[0],j=b[1],w=Object(r.useState)("some error happened..."),O=Object(o.a)(w,2),k=O[0],S=O[1];Object(r.useEffect)((function(){console.log("Effect"),f().then((function(t){console.log("promise fulfilled"),i(t.data)}))}),[]);var y=E?n:n.filter((function(t){return!0===t.important}));return c.a.createElement("div",null,c.a.createElement("h1",null,"Notes"),c.a.createElement(v,{message:k}),c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){return j(!E)}},"show ",E?"important":"all")),c.a.createElement("ul",null,y.map((function(t,e){return c.a.createElement(m,{key:e,note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),o=Object(a.a)(Object(a.a)({},e),{},{important:!e.important});d(t,o).then((function(e){i(n.map((function(n){return n.id!==t?n:e.data})))})).catch((function(a){S("Note '".concat(e.content,"' was already removed from server ")),setTimeout((function(){S(null)}),5e3),i(n.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),c.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:s,date:new Date,important:Math.random()<.5};p(e).then((function(t){i(n.concat(t.data)),h("")}))}},c.a.createElement("input",{value:s,onChange:function(t){console.log(t.target.value),h(t.target.value)}}),c.a.createElement("button",{type:"submit"},"save")))};l.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(g,{notes:[{id:0,val:"foo"},{id:1,val:"foobar"},{id:2,val:"barfoo"}]})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.7d520a59.chunk.js.map