webpackJsonp([20],{228:function(t,e,a){a(588);var i=a(4)(a(379),a(524),"data-v-4a73298a",null);t.exports=i.exports},379:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(5);e.default={created:function(){this.$socket.emit("paymentVerification",{status:"Verifying the payemnt"});var t=this.$route.query.token,e=this.$route.query.PayerID;this.$http.get(i.a+"/dashboard/billing/return",{params:{token:t,PayerID:e}}).then(function(t){window.close()})}}},418:function(t,e,a){e=t.exports=a(1)(),e.push([t.i,".wrapper[data-v-4a73298a]{text-align:center;background-color:rgba(0,0,0,.1);font-size:1.7em;width:100%;height:100%;line-height:2em}.white-frame[data-v-4a73298a]{padding:40px 14px;background-color:#fff}.m-container[data-v-4a73298a]{margin:0 auto;position:relative;top:25%;max-width:350px}",""])},524:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrapper"},[a("div",{staticClass:"m-container"},[a("md-progress",{staticClass:"md-accent",attrs:{"md-indeterminate":""}}),t._v(" "),a("md-whiteframe",{staticClass:"white-frame",attrs:{"md-elevation":"4"}},[a("md-spinner",{staticClass:"md-warn",attrs:{"md-size":150,"md-stroke":2,"md-indeterminate":""}}),t._v(" "),a("div",[t._v("Verifying the payment "),a("br"),t._v("Please wait ...")])],1)],1)])},staticRenderFns:[]}},588:function(t,e,a){var i=a(418);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(2)("2d1cc8da",i,!0)}});
//# sourceMappingURL=20.build.js.map