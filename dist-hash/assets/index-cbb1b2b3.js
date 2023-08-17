import{c as P,d as S,h as a,aF as E,X as T,Y as C,W as R,O as I,w as $,a7 as z,n as y,Q as L,R as H,r as A,b as B,a8 as V,i as w,C as K,aG as U,U as q,q as X,e as Y,a6 as j,a3 as J,a4 as Q,m as W,aH as M,J as Z}from"./index-bc880d92.js";const[p,G]=P("tag"),ee={size:String,mark:Boolean,show:T,type:C("default"),color:String,plain:Boolean,round:Boolean,textColor:String,closeable:Boolean};var ne=S({name:p,props:ee,emits:["close"],setup(e,{slots:t,emit:i}){const r=f=>{f.stopPropagation(),i("close",f)},g=()=>e.plain?{color:e.textColor||e.color,borderColor:e.color}:{color:e.textColor,background:e.color},d=()=>{var f;const{type:s,mark:h,plain:o,round:l,size:n,closeable:c}=e,u={mark:h,plain:o,round:l};n&&(u[n]=n);const b=c&&a(I,{name:"cross",class:[G("close"),R],onClick:r},null);return a("span",{style:g(),class:G([u,s])},[(f=t.default)==null?void 0:f.call(t),b])};return()=>a(E,{name:e.closeable?"van-fade":void 0},{default:()=>[e.show?d():null]})}});const te=$(ne),O={name:z,disabled:Boolean,iconSize:y,modelValue:z,checkedColor:String,labelPosition:String,labelDisabled:Boolean};var ae=S({props:L({},O,{bem:H(Function),role:String,shape:C("round"),parent:Object,checked:Boolean,bindGroup:T}),emits:["click","toggle"],setup(e,{emit:t,slots:i}){const r=A(),g=n=>{if(e.parent&&e.bindGroup)return e.parent.props[n]},d=B(()=>{if(e.parent&&e.bindGroup){const n=g("disabled")||e.disabled;if(e.role==="checkbox"){const c=g("modelValue").length,u=g("max"),b=u&&c>=+u;return n||b&&!e.checked}return n}return e.disabled}),f=B(()=>g("direction")),s=B(()=>{const n=e.checkedColor||g("checkedColor");if(n&&e.checked&&!d.value)return{borderColor:n,backgroundColor:n}}),h=n=>{const{target:c}=n,u=r.value,b=u===c||(u==null?void 0:u.contains(c));!d.value&&(b||!e.labelDisabled)&&t("toggle"),t("click",n)},o=()=>{var n,c;const{bem:u,shape:b,checked:x}=e,k=e.iconSize||g("iconSize");return a("div",{ref:r,class:u("icon",[b,{disabled:d.value,checked:x}]),style:b!=="dot"?{fontSize:V(k)}:{width:V(k),height:V(k),borderColor:(n=s.value)==null?void 0:n.borderColor}},[i.icon?i.icon({checked:x,disabled:d.value}):b!=="dot"?a(I,{name:"success",style:s.value},null):a("div",{class:u("icon--dot__icon"),style:{backgroundColor:(c=s.value)==null?void 0:c.backgroundColor}},null)])},l=()=>{if(i.default)return a("span",{class:e.bem("label",[e.labelPosition,{disabled:d.value}])},[i.default()])};return()=>{const n=e.labelPosition==="left"?[l(),o()]:[o(),l()];return a("div",{role:e.role,class:e.bem([{disabled:d.value,"label-disabled":e.labelDisabled},f.value]),tabindex:d.value?void 0:0,"aria-checked":e.checked,onClick:h},[n])}}});const[ce,m]=P("card"),ie={tag:String,num:y,desc:String,thumb:String,title:String,price:y,centered:Boolean,lazyLoad:Boolean,currency:C("¥"),thumbLink:String,originPrice:y};var oe=S({name:ce,props:ie,emits:["clickThumb"],setup(e,{slots:t,emit:i}){const r=()=>{if(t.title)return t.title();if(e.title)return a("div",{class:[m("title"),"van-multi-ellipsis--l2"]},[e.title])},g=()=>{if(t.tag||e.tag)return a("div",{class:m("tag")},[t.tag?t.tag():a(te,{mark:!0,type:"primary"},{default:()=>[e.tag]})])},d=()=>t.thumb?t.thumb():a(U,{src:e.thumb,fit:"cover",width:"100%",height:"100%",lazyLoad:e.lazyLoad},null),f=()=>{if(t.thumb||e.thumb)return a("a",{href:e.thumbLink,class:m("thumb"),onClick:o=>i("clickThumb",o)},[d(),g()])},s=()=>{if(t.desc)return t.desc();if(e.desc)return a("div",{class:[m("desc"),"van-ellipsis"]},[e.desc])},h=()=>{const o=e.price.toString().split(".");return a("div",null,[a("span",{class:m("price-currency")},[e.currency]),a("span",{class:m("price-integer")},[o[0]]),K("."),a("span",{class:m("price-decimal")},[o[1]])])};return()=>{var o,l,n;const c=t.num||w(e.num),u=t.price||w(e.price),b=t["origin-price"]||w(e.originPrice),x=c||u||b||t.bottom,k=u&&a("div",{class:m("price")},[t.price?t.price():h()]),_=b&&a("div",{class:m("origin-price")},[t["origin-price"]?t["origin-price"]():`${e.currency} ${e.originPrice}`]),N=c&&a("div",{class:m("num")},[t.num?t.num():`x${e.num}`]),D=t.footer&&a("div",{class:m("footer")},[t.footer()]),F=x&&a("div",{class:m("bottom")},[(o=t["price-top"])==null?void 0:o.call(t),k,_,N,(l=t.bottom)==null?void 0:l.call(t)]);return a("div",{class:m()},[a("div",{class:m("header")},[f(),a("div",{class:m("content",{centered:e.centered})},[a("div",null,[r(),s(),(n=t.tags)==null?void 0:n.call(t)]),F])]),D])}}});const ke=$(oe),[le,xe]=P("checkbox-group"),re=Symbol(le),[de,ue]=P("checkbox"),se=L({},O,{shape:C("round"),bindGroup:T});var be=S({name:de,props:se,emits:["change","update:modelValue"],setup(e,{emit:t,slots:i}){const{parent:r}=q(re),g=s=>{const{name:h}=e,{max:o,modelValue:l}=r.props,n=l.slice();if(s)!(o&&n.length>=+o)&&!n.includes(h)&&(n.push(h),e.bindGroup&&r.updateValue(n));else{const c=n.indexOf(h);c!==-1&&(n.splice(c,1),e.bindGroup&&r.updateValue(n))}},d=B(()=>r&&e.bindGroup?r.props.modelValue.indexOf(e.name)!==-1:!!e.modelValue),f=(s=!d.value)=>{r&&e.bindGroup?g(s):t("update:modelValue",s)};return X(()=>e.modelValue,s=>t("change",s)),Y({toggle:f,props:e,checked:d}),j(()=>e.modelValue),()=>a(ae,Q({bem:ue,role:"checkbox",parent:r,checked:d.value,onToggle:f},e),J(i,["default","icon"]))}});const Ce=$(be),[me,v,ge]=P("submit-bar"),fe={tip:String,label:String,price:Number,tipIcon:String,loading:Boolean,currency:C("¥"),disabled:Boolean,textAlign:String,buttonText:String,buttonType:C("danger"),buttonColor:String,suffixLabel:String,placeholder:Boolean,decimalLength:W(2),safeAreaInsetBottom:T};var he=S({name:me,props:fe,emits:["submit"],setup(e,{emit:t,slots:i}){const r=A(),g=M(r,v),d=()=>{const{price:l,label:n,currency:c,textAlign:u,suffixLabel:b,decimalLength:x}=e;if(typeof l=="number"){const k=(l/100).toFixed(+x).split("."),_=x?`.${k[1]}`:"";return a("div",{class:v("text"),style:{textAlign:u}},[a("span",null,[n||ge("label")]),a("span",{class:v("price")},[c,a("span",{class:v("price-integer")},[k[0]]),_]),b&&a("span",{class:v("suffix-label")},[b])])}},f=()=>{var l;const{tip:n,tipIcon:c}=e;if(i.tip||n)return a("div",{class:v("tip")},[c&&a(I,{class:v("tip-icon"),name:c},null),n&&a("span",{class:v("tip-text")},[n]),(l=i.tip)==null?void 0:l.call(i)])},s=()=>t("submit"),h=()=>i.button?i.button():a(Z,{round:!0,type:e.buttonType,text:e.buttonText,class:v("button",e.buttonType),color:e.buttonColor,loading:e.loading,disabled:e.disabled,onClick:s},null),o=()=>{var l,n;return a("div",{ref:r,class:[v(),{"van-safe-area-bottom":e.safeAreaInsetBottom}]},[(l=i.top)==null?void 0:l.call(i),f(),a("div",{class:v("bar")},[(n=i.default)==null?void 0:n.call(i),d(),h()])])};return()=>e.placeholder?g(o):o()}});const Pe=$(he);export{Ce as C,Pe as S,te as T,ke as a,O as c,ae as s};
