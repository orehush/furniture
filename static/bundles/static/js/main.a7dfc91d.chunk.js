(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{55:function(e,t){},68:function(e,t,n){},69:function(e,t,n){},88:function(e,t,n){},94:function(e,t){},95:function(e,t){},97:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(30),i=n.n(a),s=(n(68),n(25)),j=n(6),o=n(7),u=(n(69),n(105)),l=n(57),d=n(9),b=n.n(d),h=n(37),O=n(12),x=n(43),f=function(e,t){return Object(x.isEmpty)(e)?t:e},p=function(){var e=Object(O.a)(b.a.mark((function e(t,n,c,r,a){var i,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=Object.entries(f(c,{})).map((function(e){var t=Object(o.a)(e,2),n=t[0],c=t[1];return"".concat(n,"=").concat(c)})).join("&"),e.next=3,fetch("/api".concat(n,"?").concat(i),{method:t.toUpperCase(),mode:"cors",cache:"no-cache",headers:Object(h.a)({"Content-Type":"application/json"},f(a,{})),body:Object(x.isEmpty)(r)?null:JSON.stringify(r)});case 3:return s=e.sent,e.prev=4,e.next=7,s.json();case 7:return e.abrupt("return",e.sent);case 10:return e.prev=10,e.t0=e.catch(4),console.log(e.t0),e.abrupt("return",null);case 14:case"end":return e.stop()}}),e,null,[[4,10]])})));return function(t,n,c,r,a){return e.apply(this,arguments)}}(),m=function(e){return p("GET","/projects/".concat(e))},v=function(e){var t=e.city,n=e.street,c=e.name;return p("POST","/projects",null,{city:t,street:n,name:c})},g=function(e,t,n){return p("POST","/nightstands",null,{template:e,project:t,inputs:n})},y=n(56),C=n.n(y),k=n(0);function w(e){var t=e.show,n=e.onClose,r=e.children,a=Object(c.useState)(t),i=Object(o.a)(a,2),s=i[0],j=i[1];return Object(c.useEffect)((function(){j(t)}),[t]),Object(k.jsx)(C.a,{isOpen:s,toggle:function(){return j(!s)},onClosed:n,children:r})}var N=n(99),S=n(100),_=n(101),E=n(102),T=n(103);function F(e){var t=e.onFinish,n=Object(c.useState)(""),r=Object(o.a)(n,2),a=r[0],i=r[1],s=Object(c.useState)(""),j=Object(o.a)(s,2),u=j[0],l=j[1],d=Object(c.useState)(""),h=Object(o.a)(d,2),x=h[0],f=h[1];return Object(k.jsxs)(N.a,{className:"m-5",children:[Object(k.jsx)("h3",{children:"Create New Project"}),Object(k.jsxs)(S.a,{children:[Object(k.jsx)(_.a,{for:"name",children:"Name"}),Object(k.jsx)(E.a,{type:"text",name:"name",id:"name",placeholder:"project name",value:a,onChange:function(e){return i(e.target.value)}})]}),Object(k.jsxs)(S.a,{children:[Object(k.jsx)(_.a,{for:"city",children:"City"}),Object(k.jsx)(E.a,{type:"text",name:"city",id:"city",placeholder:"city",value:u,onChange:function(e){return l(e.target.value)}})]}),Object(k.jsxs)(S.a,{children:[Object(k.jsx)(_.a,{for:"street",children:"Street"}),Object(k.jsx)(E.a,{type:"text",name:"street",id:"street",placeholder:"street",value:x,onChange:function(e){return f(e.target.value)}})]}),Object(k.jsx)(T.a,{onClick:Object(O.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v({name:a,city:u,street:x});case 2:t&&t();case 3:case"end":return e.stop()}}),e)}))),disabled:!a||!u,children:"Submit"})]})}function P(){var e=Object(u.a)("project-list",(function(){return function(){return p("GET","/projects",{page:arguments.length>0&&void 0!==arguments[0]?arguments[0]:1})}()})),t=e.data,n=e.isLoading,r=Object(l.b)(),a=Object(c.useState)(!1),i=Object(o.a)(a,2),j=i[0],d=i[1];return Object(k.jsxs)("div",{className:"m-5",children:[Object(k.jsx)("h1",{children:"Projects list"}),n&&Object(k.jsx)("div",{children:"Loading..."}),Object(k.jsx)("ul",{children:t&&t.results.map((function(e){return Object(k.jsx)("li",{children:Object(k.jsx)(s.b,{to:"/project/".concat(e.id),children:e.name})},e.id)}))}),Object(k.jsx)(T.a,{onClick:function(){d(!0)},children:"Add new project"}),Object(k.jsx)(w,{show:j,onClose:function(){return d(!1)},children:Object(k.jsx)(F,{onFinish:function(){r.invalidateQueries("project-list"),d(!1)}})})]})}n(88);var L=function(){var e=Object(O.a)(b.a.mark((function e(t){var n,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m(t);case 2:return n=e.sent,e.next=5,p("GET","/projects/".concat(t,"/nightstands"));case 5:return c=e.sent,e.abrupt("return",{project:n,boxes:c});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=function(e){if(!e)return[];var t=[["\u0422\u0438\u043f \u043c\u0430\u0442\u0435\u0440\u0456\u0430\u043b\u0443","\u0428\u0438\u0440\u0438\u043d\u0430","\u0414\u043e\u0432\u0436\u0438\u043d\u0430","\u041a\u0456\u043b\u044c\u043a\u0456\u0441\u0442\u044c","\u041f\u043b\u043e\u0449\u0430","\u041f\u043b\u043e\u0449\u0430 \u0437 \u0437\u0430\u043f\u0430\u0441\u043e\u043c","\u041a\u0440\u043e\u043c\u043a\u0430","\u041a\u0440\u043e\u043c\u043a\u0430 \u0437 \u0437\u0430\u043f\u0430\u0441\u043e\u043c","\u041a\u0456\u043b\u044c\u043a\u0456\u0441\u0442\u044c \u0441\u0432\u0435\u0440\u043b\u0456\u043d\u044c"]];return e.forEach((function(e){e.outputs.forEach((function(e){t.push([e.base,e.width||0,e.length||0,e.amount||0,e.square||0,e.square_extra||0,e.edge||0,e.edge_extra||0,e.drilling_count||0])}))})),t},D=n(22),q=n.n(D),G=n(60),U=n(45),Q=function(e){var t=e.csvData,n=e.fileName;return Object(k.jsx)(q.a,{color:"info",onClick:function(e){return function(e,t){var n={Sheets:{data:U.utils.json_to_sheet(e)},SheetNames:["data"]},c=U.write(n,{bookType:"xlsx",type:"array"}),r=new Blob([c],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});G.saveAs(r,t+".xlsx")}(t,n)},children:"Export to excel"})},A=n(62),J=n.n(A),I=n(63),M=n.n(I),Y=n(36),W=function(e){var t=e.template,n=e.onChange,r=Object(c.useState)(null===t||void 0===t?void 0:t.default_value),a=Object(o.a)(r,2),i=a[0],s=a[1];return Object(c.useEffect)((function(){t.default_value&&s(t.default_value)}),[t]),Object(c.useEffect)((function(){n(+i)}),[i]),4===t.type?Object(k.jsxs)(S.a,{tag:"fieldset",children:[Object(k.jsx)("legend",{children:t.name}),Object(k.jsx)(S.a,{check:!0,children:Object(k.jsxs)(_.a,{check:!0,children:[Object(k.jsx)(E.a,{type:"radio",name:"radio1",value:1,onChange:function(e){return s(e.target.value)}})," ","Yes"]})}),Object(k.jsx)(S.a,{check:!0,children:Object(k.jsxs)(_.a,{check:!0,children:[Object(k.jsx)(E.a,{type:"radio",name:"radio1",value:0,onChange:function(e){return s(e.target.value)}})," ","No"]})})]}):Object(k.jsxs)(S.a,{children:[Object(k.jsx)(_.a,{for:"name",children:t.name}),Object(k.jsx)(E.a,{type:"number",name:"name",placeholder:t.name,value:i,onChange:function(e){return s(e.target.value)}})]})};function z(e){var t=e.onFinish,n=e.project,r=Object(c.useState)([]),a=Object(o.a)(r,2),i=a[0],s=a[1],j=Object(c.useState)(null),l=Object(o.a)(j,2),d=l[0],h=l[1],x=Object(u.a)("templates",(function(){return p("GET","/nightstand_templates")})).data;return Object(c.useEffect)((function(){d&&d.inputs&&s(d.inputs.filter((function(e){return e.default_value})).map((function(e){return{template:e.id,value:e.default_value}})))}),[d]),Object(k.jsxs)(N.a,{className:"m-5",children:[Object(k.jsx)("h3",{children:"Create New Box"}),x&&x.map((function(e){return Object(k.jsx)("div",{style:{width:"150px",height:"150px",border:"1px solid #000",cursor:"pointer"},className:"p-2 d-flex justify-content-center align-items-center ".concat(e.id===(null===d||void 0===d?void 0:d.id)&&"border-info border-2"),onClick:function(){return h(e)},children:Object(k.jsx)("h4",{children:e.name})},e.id)})),d&&d.inputs&&d.inputs.map((function(e){return Object(k.jsx)(W,{template:e,onChange:function(t){s([].concat(Object(Y.a)(i.filter((function(t){return t.template!==e.id}))),[{template:e.id,value:t}]))}})})),Object(k.jsx)(T.a,{onClick:Object(O.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(d.id,n.id,i);case 2:t&&t();case 3:case"end":return e.stop()}}),e)}))),disabled:!d,children:"Submit"})]})}var H=n(61),K=function(e){var t=e.template_type,n=e.template_name,r=e.default_value,a=e.onChange,i=Object(c.useState)(r),s=Object(o.a)(i,2),j=s[0],u=s[1];return Object(c.useEffect)((function(){a(+j)}),[j]),4===t?Object(k.jsxs)(S.a,{tag:"fieldset",children:[Object(k.jsx)("legend",{children:n}),Object(k.jsx)(S.a,{check:!0,children:Object(k.jsxs)(_.a,{check:!0,children:[Object(k.jsx)(E.a,{type:"radio",name:"radio1",value:1,onChange:function(e){return u(e.target.value)}})," ","Yes"]})}),Object(k.jsx)(S.a,{check:!0,children:Object(k.jsxs)(_.a,{check:!0,children:[Object(k.jsx)(E.a,{type:"radio",name:"radio1",value:0,onChange:function(e){return u(e.target.value)}})," ","No"]})})]}):Object(k.jsxs)(S.a,{children:[Object(k.jsx)(_.a,{for:"name",children:n}),Object(k.jsx)(E.a,{type:"number",name:"name",placeholder:n,value:j,onChange:function(e){return u(e.target.value)}})]})};function R(e){var t=e.onFinish,n=e.box,r=Object(c.useState)((null===n||void 0===n?void 0:n.inputs)||[]),a=Object(o.a)(r,2),i=a[0],s=a[1];return n?Object(k.jsxs)(N.a,{className:"m-5",children:[Object(k.jsxs)("h3",{children:["Update Box - ",n.short_name]}),n.inputs&&n.inputs.map((function(e){return Object(k.jsx)(K,Object(h.a)({onChange:function(t){s([].concat(Object(Y.a)(i.filter((function(t){return t.id!==e.id}))),[{id:e.id,value:t}]))},default_value:e.value},e))})),Object(k.jsx)(T.a,{onClick:Object(O.a)(b.a.mark((function e(){var n,c,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=Object(H.a)(i),e.prev=1,n.s();case 3:if((c=n.n()).done){e.next=10;break}return r=c.value,console.log(r),e.next=8,a=r.id,s=r.value,p("PUT","/inputs/".concat(a),null,{value:s});case 8:e.next=3;break;case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),n.e(e.t0);case 15:return e.prev=15,n.f(),e.finish(15);case 18:t&&t();case 19:case"end":return e.stop()}var a,s}),e,null,[[1,12,15,18]])}))),children:"Update"})]}):null}function V(){var e=Object(j.g)().id,t=Object(j.f)(),n=Object(l.b)(),r=Object(c.useState)(!1),a=Object(o.a)(r,2),i=a[0],s=a[1],d=Object(c.useState)(null),h=Object(o.a)(d,2),x=h[0],f=h[1],m=Object(u.a)("project-detail-".concat(e),(function(){return L(e)}),{initialData:{}}),v=m.data,g=v.project,y=v.boxes,C=m.isLoading;return Object(k.jsxs)("div",{className:"m-5",children:[Object(k.jsx)("h1",{children:"Project Details"}),Object(k.jsx)(q.a,{onClick:function(){return t.push("/")},children:"Go Back"}),C&&Object(k.jsx)("div",{children:"Loading..."}),Object(k.jsx)("div",{children:null===g||void 0===g?void 0:g.name}),Object(k.jsx)("div",{children:null===g||void 0===g?void 0:g.city}),Object(k.jsx)("div",{children:null===g||void 0===g?void 0:g.address}),Object(k.jsxs)("div",{className:"mt-3",children:[Object(k.jsxs)("div",{className:"mb-2",children:[Object(k.jsx)("div",{className:"mb-2",children:g&&y&&Object(k.jsx)(Q,{csvData:B(y),fileName:g.name})}),Object(k.jsx)("div",{children:g&&Object(k.jsx)(q.a,{color:"primary",onClick:function(){return s(!0)},children:"Add new box"})})]}),Object(k.jsx)("h4",{children:"\u0421\u043f\u0438\u0441\u043e\u043a \u0442\u0443\u043c\u0431"}),Object(k.jsx)(J.a,{className:"mb-4",children:y&&y.map((function(t){return Object(k.jsxs)(M.a,{children:[Object(k.jsx)("div",{className:"m-1 fw-bold",children:t.short_name}),Object(k.jsx)(q.a,{color:"primary",className:"mr-4",onClick:function(){return f(t)},children:"\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"}),Object(k.jsx)(q.a,{color:"danger",onClick:Object(O.a)(b.a.mark((function c(){return b.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,r=t.id,p("DELETE","/nightstands/".concat(r));case 2:n.invalidateQueries("project-detail-".concat(e));case 3:case"end":return c.stop()}var r}),c)}))),children:"\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438"})]})}))}),Object(k.jsx)("h4",{children:"\u0421\u043f\u0438\u0441\u043e\u043a \u0434\u0435\u0442\u0430\u043b\u0435\u0439"}),Object(k.jsxs)("table",{className:"table table-bordered table-striped",children:[Object(k.jsx)("thead",{children:Object(k.jsxs)("tr",{children:[Object(k.jsx)("th",{children:"\u0422\u0443\u043c\u0431\u0430"}),Object(k.jsx)("th",{children:"\u041d\u0430\u0437\u0432\u0430 \u0435\u043b\u0435\u043c\u0435\u043d\u0442\u0443"}),Object(k.jsx)("th",{children:"\u0422\u0438\u043f \u043c\u0430\u0442\u0435\u0440\u0456\u0430\u043b\u0443"}),Object(k.jsx)("th",{children:"\u0428\u0438\u0440\u0438\u043d\u0430"}),Object(k.jsx)("th",{children:"\u0414\u043e\u0432\u0436\u0438\u043d\u0430"}),Object(k.jsx)("th",{children:"\u041a\u0456\u043b\u044c\u043a\u0456\u0441\u0442\u044c"}),Object(k.jsx)("th",{children:"\u041f\u043b\u043e\u0449\u0430"}),Object(k.jsx)("th",{children:"\u041f\u043b\u043e\u0449\u0430 \u0437 \u0437\u0430\u043f\u0430\u0441\u043e\u043c"}),Object(k.jsx)("th",{children:"\u041a\u0440\u043e\u043c\u043a\u0430"}),Object(k.jsx)("th",{children:"\u041a\u0440\u043e\u043c\u043a\u0430 \u0437 \u0437\u0430\u043f\u0430\u0441\u043e\u043c"}),Object(k.jsx)("th",{children:"\u041a\u0456\u043b\u044c\u043a\u0456\u0441\u0442\u044c \u0441\u0432\u0435\u0440\u043b\u0456\u043d\u044c"}),Object(k.jsx)("th",{children:"\u041e\u0431\u0435\u0440\u0442\u0430\u043d\u043d\u044f"})]})}),Object(k.jsx)("tbody",{children:y&&y.map((function(e){return e.outputs.map((function(t){return Object(k.jsxs)("tr",{children:[Object(k.jsx)("td",{children:e.short_name}),Object(k.jsx)("td",{children:t.name}),Object(k.jsx)("td",{children:t.base}),Object(k.jsx)("td",{children:t.width||0}),Object(k.jsx)("td",{children:t.length||0}),Object(k.jsx)("td",{children:t.amount||0}),Object(k.jsx)("td",{children:t.square||0}),Object(k.jsx)("td",{children:t.square_extra||0}),Object(k.jsx)("td",{children:t.edge||0}),Object(k.jsx)("td",{children:t.edge_extra||0}),Object(k.jsx)("td",{children:t.drilling_count||0}),Object(k.jsx)("td",{children:t.rotation||0})]})}))}))})]})]}),Object(k.jsx)(w,{show:i,onClose:function(){return s(!1)},children:Object(k.jsx)(z,{onFinish:function(){n.invalidateQueries("project-detail-".concat(e)),s(!1)},project:g})}),Object(k.jsx)(w,{show:!!x,onClose:function(){return f(null)},children:Object(k.jsx)(R,{onFinish:function(){f(null),n.invalidateQueries("project-detail-".concat(e))},box:x})})]})}var X=new(n(104).a)({defaultOptions:{queries:{refetchOnMount:!0,refetchOnWindowFocus:!0}}});var Z=function(){return Object(k.jsx)(l.a,{client:X,children:Object(k.jsx)(s.a,{children:Object(k.jsxs)(j.c,{children:[Object(k.jsx)(j.a,{path:"/project/:id",children:Object(k.jsx)(V,{})}),Object(k.jsx)(j.a,{path:"/",children:Object(k.jsx)(P,{})})]})})})},$=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,106)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};n(96);i.a.render(Object(k.jsx)(r.a.StrictMode,{children:Object(k.jsx)(Z,{})}),document.getElementById("root")),$()}},[[97,1,2]]]);
//# sourceMappingURL=main.a7dfc91d.chunk.js.map