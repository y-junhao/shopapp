import{c as O,m as q,n as N,d as z,r as w,a as K,u as M,b as W,i as D,e as G,f as J,g as X,h as u,j as Q,p as Y,k as Z,l as ee,w as te,_ as oe,o as se,q as ae,s as V,t as P,F as ne,v as le,x as p,y as h,z as ce,A as T,B as A,C as S,D as re,E as R,G as U,H as ie,I as de,S as ue,J as fe}from"./index-bc880d92.js";import{S as ge,C as he,a as _e}from"./index-cbb1b2b3.js";const[pe,y]=O("swipe-cell"),me={name:q(""),disabled:Boolean,leftWidth:N,rightWidth:N,beforeClose:Function,stopPropagation:Boolean};var ve=z({name:pe,props:me,emits:["open","close","click"],setup(l,{emit:c,slots:a}){let f,m,o;const s=w(),r=w(),_=w(),n=K({offset:0,dragging:!1}),v=M(),b=e=>e.value?Q(e).width:0,C=W(()=>D(l.leftWidth)?+l.leftWidth:b(r)),k=W(()=>D(l.rightWidth)?+l.rightWidth:b(_)),t=e=>{n.offset=e==="left"?C.value:-k.value,f||(f=!0,c("open",{name:l.name,position:e}))},i=e=>{n.offset=0,f&&(f=!1,c("close",{name:l.name,position:e}))},$=e=>{const d=Math.abs(n.offset),g=.15,H=f?1-g:g,L=e==="left"?C.value:k.value;L&&d>L*H?t(e):i(e)},j=e=>{l.disabled||(o=n.offset,v.start(e))},F=e=>{if(l.disabled)return;const{deltaX:d}=v;v.move(e),v.isHorizontal()&&(m=!0,n.dragging=!0,(!f||d.value*o<0)&&Y(e,l.stopPropagation),n.offset=Z(d.value+o,-k.value,C.value))},x=()=>{n.dragging&&(n.dragging=!1,$(n.offset>0?"left":"right"),setTimeout(()=>{m=!1},0))},B=(e="outside")=>{c("click",e),f&&!m&&ee(l.beforeClose,{args:[{name:l.name,position:e}],done:()=>i(e)})},E=(e,d)=>g=>{d&&g.stopPropagation(),B(e)},I=(e,d)=>{const g=a[e];if(g)return u("div",{ref:d,class:y(e),onClick:E(e,!0)},[g()])};return G({open:t,close:i}),J(s,()=>B("outside"),{eventName:"touchstart"}),X("touchmove",F,{target:s}),()=>{var e;const d={transform:`translate3d(${n.offset}px, 0, 0)`,transitionDuration:n.dragging?"0s":".6s"};return u("div",{ref:s,class:y(),onClick:E("cell",m),onTouchstartPassive:j,onTouchend:x,onTouchcancel:x},[u("div",{class:y("wrapper"),style:d},[I("left",r),(e=a.default)==null?void 0:e.call(a),I("right",_)])])}}});const Ce=te(ve);const ke={class:"cart-view"},be={class:"jh-van-swipe-cell"},we=["src"],Ve={__name:"CartView",setup(l){let c=se(),a=w(!0);ae(a,(o,s)=>{o==!1&&c.cartList.some(r=>r.isChecked==!1)||c.cartList.forEach(r=>{r.isChecked=o})});let f=async(o,{name:s})=>{if((await R.postData("/api_cart",{userId:c.TOKEN,status:"addcart",goodsId:s,goodsNumber:o})).code!=0)return U("后台繁忙~~~"),!1},m=async o=>{let s=c.cartList.findIndex(_=>_.goods_id==o),r=await R.postData("/api_cart",{userId:c.TOKEN,goodsId:o,status:"delcart"});if(r.code!=0){console.log(r),U("后台繁忙~~~");return}c.cartList.splice(s,1),ie("删除成功")};return(o,s)=>{const r=de,_=he,n=ue,v=_e,b=fe,C=Ce,k=ge;return V(),P("div",ke,[u(r,{title:"购物车"}),(V(!0),P(ne,null,le(p(c).cartList,t=>(V(),ce(C,{key:t.goods_id},{right:h(()=>[u(b,{color:"#F6BAC3",square:"",text:"删除",type:"danger",class:"jh-delete-button",onClick:i=>p(m)(t.goods_id)},null,8,["onClick"])]),default:h(()=>[T("div",be,[u(_,{class:"cart-check",modelValue:t.isChecked,"onUpdate:modelValue":i=>t.isChecked=i,onChange:i=>A(a)?a.value=t.isChecked?p(a):!1:a=t.isChecked?p(a):!1},null,8,["modelValue","onUpdate:modelValue","onChange"]),u(v,{class:"goods-card",num:t.goods_number,desc:t.goods_desc,title:t.goods_name,"origin-price":t.price*1.05,onClickThumb:i=>o.$router.push({name:"product",query:{goodsId:t.goods_id}})},{thumb:h(()=>[T("img",{style:{width:"100%"},src:t.goods_thumb},null,8,we)]),num:h(()=>[u(n,{max:"10",min:"1",modelValue:t.goods_number,"onUpdate:modelValue":i=>t.goods_number=i,theme:"round","button-size":"18","disable-input":"",name:t.goods_id,onChange:p(f)},null,8,["modelValue","onUpdate:modelValue","name","onChange"])]),price:h(()=>[S("¥"+re(t.price),1)]),_:2},1032,["num","desc","title","origin-price","onClickThumb"])])]),_:2},1024))),128)),u(k,{price:p(c).priceAll*100,"button-text":"提交订单",onSubmit:s[2]||(s[2]=t=>o.$router.push({name:"order"}))},{tip:h(()=>[S(" 你的收货地址不支持配送, "),T("span",{onClick:s[1]||(s[1]=(...t)=>o.onClickLink&&o.onClickLink(...t))},"修改地址")]),default:h(()=>[u(_,{modelValue:p(a),"onUpdate:modelValue":s[0]||(s[0]=t=>A(a)?a.value=t:a=t)},{default:h(()=>[S("全选")]),_:1},8,["modelValue"])]),_:1},8,["price"])])}}},ye=oe(Ve,[["__scopeId","data-v-80811616"]]);export{ye as default};
