(this.webpackJsonppatientor=this.webpackJsonppatientor||[]).push([[0],{261:function(e,a,t){e.exports=t(437)},437:function(e,a,t){"use strict";t.r(a);var n,r,l=t(0),c=t.n(l),i=t(60),o=t.n(i),s=(t(265),t(26)),u=t.n(s),d=t(25),p=t(38),m=t.n(p),E=t(73),h=t(53),b=t(445),f=t(455),v=t(452),g=t(446),y=t(74),C=t(34),O=function(e){return{type:"SET_PATIENT_LIST",payload:e}},k=function(e){return{type:"SET_PATIENT_PAGE",payload:e}},D=function(e){return{type:"SET_DIAGNOSIS_LIST",payload:e}},H=function(e){return{type:"ADD_ENTRY",payload:e}},w={patients:{},diagnosis:{}},S=Object(l.createContext)([w,function(){return w}]),T=function(){return Object(l.useContext)(S)},j=t(451),N=t(448),x=t(454),R=t(453),A=t(15),Y=t(447),F=t(450),I=function(e){var a=e.name,t=e.label,n=e.options;return c.a.createElement(Y.a.Field,null,c.a.createElement("label",null,t),c.a.createElement(A.b,{as:"select",name:a,className:"ui dropdown"},n.map((function(e){return c.a.createElement("option",{key:e.value,value:e.value},e.label||e.value)}))))},_=function(e){var a=e.field,t=e.label,n=e.placeholder;return c.a.createElement(Y.a.Field,null,c.a.createElement("label",null,t),c.a.createElement(A.b,Object.assign({placeholder:n},a)),c.a.createElement("div",{style:{color:"red"}},c.a.createElement(A.a,{name:a.name})))};!function(e){e.Male="male",e.Female="female",e.Other="other"}(n||(n={})),function(e){e[e.Healthy=0]="Healthy",e[e.LowRisk=1]="LowRisk",e[e.HighRisk=2]="HighRisk",e[e.CriticalRisk=3]="CriticalRisk"}(r||(r={}));var M,P=[{value:n.Male,label:"Male"},{value:n.Female,label:"Female"},{value:n.Other,label:"Other"}],L=function(e){var a=e.onSubmit,t=e.onCancel;return c.a.createElement(A.d,{initialValues:{name:"",ssn:"",dateOfBirth:"",occupation:"",gender:n.Other},onSubmit:a,validate:function(e){var a={};return e.name||(a.name="Field is required"),e.ssn||(a.ssn="Field is required"),e.dateOfBirth||(a.dateOfBirth="Field is required"),e.occupation||(a.occupation="Field is required"),a}},(function(e){var a=e.isValid,n=e.dirty;return c.a.createElement(A.c,{className:"form ui"},c.a.createElement(A.b,{label:"Name",placeholder:"Name",name:"name",component:_}),c.a.createElement(A.b,{label:"Social Security Number",placeholder:"SSN",name:"ssn",component:_}),c.a.createElement(A.b,{label:"Date Of Birth",placeholder:"YYYY-MM-DD",name:"dateOfBirth",component:_}),c.a.createElement(A.b,{label:"Occupation",placeholder:"Occupation",name:"occupation",component:_}),c.a.createElement(I,{label:"Gender",name:"gender",options:P}),c.a.createElement(R.a,null,c.a.createElement(R.a.Column,{floated:"left",width:5},c.a.createElement(v.a,{type:"button",onClick:t,color:"red"},"Cancel")),c.a.createElement(R.a.Column,{floated:"right",width:5},c.a.createElement(v.a,{type:"submit",floated:"right",color:"green",disabled:!n||!a},"Add"))))}))},B=function(e){var a=e.modalOpen,t=e.onClose,n=e.onSubmit,r=e.error;return c.a.createElement(N.a,{open:a,onClose:t,centered:!1,closeIcon:!0},c.a.createElement(N.a.Header,null,"Add a new patient"),c.a.createElement(N.a.Content,null,r&&c.a.createElement(x.a,{inverted:!0,color:"red"},"Error: ".concat(r)),c.a.createElement(L,{onSubmit:n,onCancel:t})))},V=t(457),G=["The patient is in great shape","The patient has a low risk of getting sick","The patient has a high risk of getting sick","The patient has a diagnosed condition"],q=function(e){var a=e.rating,t=e.showText;return c.a.createElement("div",{className:"health-bar"},c.a.createElement(V.a,{icon:"heart",disabled:!0,rating:4-a,maxRating:4}),t?c.a.createElement("p",null,G[a]):null)},J=function(){var e=T(),a=Object(d.a)(e,2),t=a[0].patients,n=a[1],r=c.a.useState(!1),l=Object(d.a)(r,2),i=l[0],o=l[1],s=c.a.useState(),p=Object(d.a)(s,2),h=p[0],f=p[1],g=function(){o(!1),f(void 0)};return c.a.createElement("div",{className:"App"},c.a.createElement(b.a,{textAlign:"center"},c.a.createElement("h3",null,"Patient list")),c.a.createElement(j.a,{celled:!0},c.a.createElement(j.a.Header,null,c.a.createElement(j.a.Row,null,c.a.createElement(j.a.HeaderCell,null,"Name"),c.a.createElement(j.a.HeaderCell,null,"Gender"),c.a.createElement(j.a.HeaderCell,null,"Occupation"),c.a.createElement(j.a.HeaderCell,null,"Health Rating"))),c.a.createElement(j.a.Body,null,Object.values(t).map((function(e){return c.a.createElement(j.a.Row,{key:e.id},c.a.createElement(j.a.Cell,null,c.a.createElement(E.b,{to:"/".concat(e.id)},e.name)),c.a.createElement(j.a.Cell,null,e.gender),c.a.createElement(j.a.Cell,null,e.occupation),c.a.createElement(j.a.Cell,null,c.a.createElement(q,{showText:!1,rating:1})))})))),c.a.createElement(B,{modalOpen:i,onSubmit:function(e){var a,t;return u.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,u.a.awrap(m.a.post("".concat("/api/","patients"),e));case 3:a=r.sent,t=a.data,n({type:"ADD_PATIENT",payload:t}),g(),r.next=13;break;case 9:r.prev=9,r.t0=r.catch(0),console.error(r.t0.response.data),f(r.t0.response.data.error);case 13:case"end":return r.stop()}}),null,null,[[0,9]])},error:h,onClose:g}),c.a.createElement(v.a,{onClick:function(){return o(!0)}},"Add New Patient"))},z=t(77),K=function(e){var a=e.entry;return c.a.createElement(x.a,null,c.a.createElement(f.a,{as:"h3"},a.date," ",c.a.createElement(z.a,{name:"doctor"})),c.a.createElement("p",null,a.description),c.a.createElement(z.a,{name:"heart",color:0===a.healthCheckRating?"green":1===a.healthCheckRating?"yellow":(a.healthCheckRating,"orange")}))},Q=function(e){var a=e.entry;return c.a.createElement(x.a,null,c.a.createElement(f.a,{as:"h3"},a.date," ",c.a.createElement(z.a,{name:"hospital"})),c.a.createElement("p",null,a.description))},U=function(e){var a=e.entry;return c.a.createElement(x.a,null,c.a.createElement(f.a,{as:"h3"},a.date," ",c.a.createElement(z.a,{name:"stethoscope"}),a.employerName),c.a.createElement("p",null,a.description))},W=function(e){var a=e.entry;switch(a.type){case"HealthCheck":return c.a.createElement(K,{entry:a});case"Hospital":return c.a.createElement(Q,{entry:a});case"OccupationalHealthcare":return c.a.createElement(U,{entry:a});default:return null}};!function(e){e.Health="HealthCheck",e.Occup="OccupationalHealthcare",e.Hospit="Hospital"}(M||(M={}));var X=function(e){var a=e.name,t=e.label,n=e.options,r=e.onChange;return c.a.createElement(Y.a.Field,null,c.a.createElement("label",null,t),c.a.createElement(A.b,{as:"select",name:a,className:"ui dropdown",onChange:function(e){return r(e.target.value)}},n.map((function(e){return c.a.createElement("option",{key:e.value,value:e.value},e.label||e.value)}))))},Z=function(e){var a=e.name,t=e.label,n=e.options;return c.a.createElement(Y.a.Field,null,c.a.createElement("label",null,t),c.a.createElement(A.b,{as:"select",name:a,className:"ui dropdown"},n.map((function(e){return c.a.createElement("option",{key:e.value,value:e.value},e.label||e.value)}))))},$=function(e){var a=e.field,t=e.label,n=e.placeholder;return c.a.createElement(Y.a.Field,null,c.a.createElement("label",null,t),c.a.createElement(A.b,Object.assign({placeholder:n},a)),c.a.createElement("div",{style:{color:"red"}},c.a.createElement(A.a,{name:a.name})))},ee=function(e){var a=e.diagnoses,t=e.setFieldValue,n=e.setFieldTouched,r="diagnosisCodes",l=a.map((function(e){return{key:e.code,text:"".concat(e.name," (").concat(e.code,")"),value:e.code}}));return c.a.createElement(Y.a.Field,null,c.a.createElement("label",null,"Diagnoses"),c.a.createElement(F.a,{fluid:!0,multiple:!0,search:!0,selection:!0,options:l,onChange:function(e,a){n(r,!0),t(r,a.value)}}),c.a.createElement(A.a,{name:r}))},ae=[{value:M.Health,label:"HealthCheck"},{value:M.Hospit,label:"Hospital"},{value:M.Occup,label:"OccupationalHealthcare"}],te=[{value:r.CriticalRisk,label:3},{value:r.HighRisk,label:2},{value:r.LowRisk,label:1},{value:r.Healthy,label:0}],ne=function(e){var a=e.onSubmit,t=e.onCancel,n=T(),r=Object(d.a)(n,1)[0].diagnosis,l=c.a.useState(M.Health),i=Object(d.a)(l,2),o=i[0],s=i[1];return c.a.createElement(A.d,{initialValues:{date:"",type:M.Occup,specialist:"",diagnosisCodes:[],description:"",dischargeDate:"",dischargeCriteria:"",employerName:"",startDate:"",endDate:"",healthCheckRating:0},onSubmit:a,validate:function(e){var a="Field is required",t={};return e.date||(t.date=a),e.specialist||(t.specialist=a),e.description||(t.description=a),e.type!==M.Hospit||e.dischargeDate||(t.dischargeDate=a),e.type!==M.Hospit||e.dischargeCriteria||(t.dischargeCriteria=a),e.type!==M.Occup||e.employerName||(t.employerName=a),t}},(function(e){var a=e.isValid,n=e.dirty,l=e.setFieldValue,i=e.setFieldTouched;return c.a.createElement(A.c,{className:"form ui"},c.a.createElement(A.b,{label:"Date",placeholder:"YYYY-MM-DD",name:"date",component:$}),c.a.createElement(X,{label:"Type",name:"type",options:ae,onChange:s}),c.a.createElement(ee,{setFieldValue:l,setFieldTouched:i,diagnoses:Object.values(r)}),c.a.createElement(A.b,{label:"Specialist",placeholder:"Specialist",name:"specialist",component:$}),c.a.createElement(A.b,{label:"Description",placeholder:"Description",name:"description",component:$}),function(){switch(o){case"HealthCheck":return c.a.createElement(Z,{label:"HealthCheckRating",name:"healthCheckRating",options:te,onChange:s});case"Hospital":return c.a.createElement("div",null,c.a.createElement(A.b,{label:"DischargeDate",placeholder:"YYYY-MM-DD",name:"dischargeDate",component:$}),c.a.createElement(A.b,{label:"DischargeCriteria",placeholder:"Discharge Criteria",name:"dischargeCriteria",component:$}));case"OccupationalHealthcare":return c.a.createElement("div",null,c.a.createElement(A.b,{label:"StartDate",placeholder:"YYYY-MM-DD",name:"startDate",component:$}),c.a.createElement(A.b,{label:"EndDate",placeholder:"YYYY-MM-DD",name:"endDate",component:$}));default:return null}}(),c.a.createElement(R.a,null,c.a.createElement(R.a.Column,{floated:"left",width:5},c.a.createElement(v.a,{type:"button",onClick:t,color:"red"},"Cancel")),c.a.createElement(R.a.Column,{floated:"right",width:5},c.a.createElement(v.a,{type:"submit",floated:"right",color:"green",disabled:!n||!a},"Add"))))}))},re=function(e){var a=e.modalOpen,t=e.onClose,n=e.onSubmit,r=e.error;return c.a.createElement(N.a,{open:a,onClose:t,centered:!1,closeIcon:!0},c.a.createElement(N.a.Header,null,"Add a new patient"),c.a.createElement(N.a.Content,null,r&&c.a.createElement(x.a,{inverted:!0,color:"red"},"Error: ".concat(r)),c.a.createElement(ne,{onSubmit:n,onCancel:t})))},le=function(){var e=T(),a=Object(d.a)(e,2),t=a[0],n=t.patient,r=t.diagnosis,l=a[1],i=Object(h.f)().id,o=c.a.useState(!1),s=Object(d.a)(o,2),p=s[0],E=s[1],g=c.a.useState(),y=Object(d.a)(g,2),C=y[0],O=y[1],D=function(){E(!1),O(void 0)},w="male"===(null===n||void 0===n?void 0:n.gender)?"mars":"female"===(null===n||void 0===n?void 0:n.gender)?"venus":"genderless";if(!n||n.id!==i){!function(){var e,a;u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.a.awrap(m.a.get("".concat("/api/","patients/").concat(i)));case 3:e=t.sent,a=e.data,l(k(a)),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.error(t.t0.response);case 11:case"end":return t.stop()}}),null,null,[[0,8]])}()}return n?c.a.createElement(b.a,null,c.a.createElement(f.a,{as:"h2"},null===n||void 0===n?void 0:n.name," ",c.a.createElement(z.a,{name:w,size:"big"})),c.a.createElement("p",null,"ssh: ",n.ssn),c.a.createElement("p",null,"occupation: ",n.occupation),c.a.createElement("br",null),c.a.createElement(f.a,{as:"h3"},"entries"),n.entries.map((function(e){return c.a.createElement(W,{entry:e})})),c.a.createElement(re,{modalOpen:p,onSubmit:function(e){var a,t,n,c,o,s;return u.a.async((function(d){for(;;)switch(d.prev=d.next){case 0:console.log(e.diagnosisCodes),d.t0=e.type,d.next="HealthCheck"===d.t0?4:"OccupationalHealthcare"===d.t0?17:"Hospital"===d.t0?30:43;break;case 4:return d.prev=4,d.next=7,u.a.awrap(m.a.post("".concat("/api/","patients/").concat(i,"/entries"),{type:e.type,description:e.description,date:e.date,specialist:e.specialist,diagnosisCodes:e.diagnosisCodes.map((function(e){return r[e]})),healthCheckRating:e.healthCheckRating}));case 7:a=d.sent,t=a.data,l(H(t)),D(),d.next=17;break;case 13:d.prev=13,d.t1=d.catch(4),console.error(d.t1.response.data),O(d.t1.response.data.error);case 17:return d.prev=17,d.next=20,u.a.awrap(m.a.post("".concat("/api/","patients/").concat(i,"/entries"),{type:e.type,description:e.description,date:e.date,specialist:e.specialist,diagnosisCodes:e.diagnosisCodes.map((function(e){return r[e]})),employerName:e.employerName,sickLeave:{startDate:e.startDate,endDate:e.endDate}}));case 20:n=d.sent,c=n.data,l(H(c)),D(),d.next=30;break;case 26:d.prev=26,d.t2=d.catch(17),console.error(d.t2.response.data),O(d.t2.response.data.error);case 30:return d.prev=30,d.next=33,u.a.awrap(m.a.post("".concat("/api/","patients/").concat(i,"/entries"),{type:e.type,description:e.description,date:e.date,specialist:e.specialist,diagnosisCodes:e.diagnosisCodes.map((function(e){return r[e]})),discharge:{date:e.dischargeDate,criteria:e.dischargeCriteria}}));case 33:o=d.sent,s=o.data,l(H(s)),D(),d.next=43;break;case 39:d.prev=39,d.t3=d.catch(30),console.error(d.t3.response.data),O(d.t3.response.data.error);case 43:return d.abrupt("break",44);case 44:case"end":return d.stop()}}),null,null,[[4,13],[17,26],[30,39]])},error:C,onClose:D}),c.a.createElement(v.a,{onClick:function(){return E(!0)}},"Add New Entry")):null},ce=function(){var e=T(),a=Object(d.a)(e,2),t=a[0],n=(t.patients,t.patient,t.diagnosis,a[1]);return c.a.useEffect((function(){m.a.get("/ping");!function(){var e,a;u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.a.awrap(m.a.get("".concat("/api/","patients")));case 3:e=t.sent,a=e.data,n(O(a)),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.error(t.t0);case 11:case"end":return t.stop()}}),null,null,[[0,8]])}()}),[n]),c.a.useEffect((function(){!function(){var e,a;u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.a.awrap(m.a.get("".concat("/api/","diagnosis")));case 3:e=t.sent,a=e.data,n(D(a)),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.error(t.t0);case 11:case"end":return t.stop()}}),null,null,[[0,8]])}()}),[n]),c.a.createElement("div",{className:"App"},c.a.createElement(E.a,null,c.a.createElement(b.a,null,c.a.createElement(f.a,{as:"h1"},"Patientor"),c.a.createElement(v.a,{as:E.b,to:"/",primary:!0},"Home"),c.a.createElement(g.a,{hidden:!0}),c.a.createElement(h.c,null,c.a.createElement(h.a,{path:"/:id",render:function(){return c.a.createElement(le,null)}}),c.a.createElement(h.a,{path:"/",render:function(){return c.a.createElement(J,null)}})))))};o.a.render(c.a.createElement((function(e){var a=e.reducer,t=e.children,n=Object(l.useReducer)(a,w),r=Object(d.a)(n,2),i=r[0],o=r[1];return c.a.createElement(S.Provider,{value:[i,o]},t)}),{reducer:function(e,a){switch(a.type){case"SET_PATIENT_LIST":return Object(C.a)({},e,{patients:Object(C.a)({},a.payload.reduce((function(e,a){return Object(C.a)({},e,Object(y.a)({},a.id,a))}),{}),{},e.patients)});case"ADD_PATIENT":return Object(C.a)({},e,{patients:Object(C.a)({},e.patients,Object(y.a)({},a.payload.id,a.payload))});case"SET_PATIENT_PAGE":return Object(C.a)({},e,{patient:a.payload});case"SET_DIAGNOSIS_LIST":return Object(C.a)({},e,{diagnosis:Object(C.a)({},a.payload.reduce((function(e,a){return Object(C.a)({},e,Object(y.a)({},a.code,a))}),{}),{},e.diagnosis)});case"ADD_ENTRY":return Object(C.a)({},e,{patient:e.patient?Object(C.a)({},e.patient,{entries:e.patient.entries.concat(a.payload)}):void 0});default:return e}}},c.a.createElement(ce,null)),document.getElementById("root"))}},[[261,1,2]]]);
//# sourceMappingURL=main.308575bf.chunk.js.map