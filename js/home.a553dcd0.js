(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{1178:function(e,t,a){},"1f09":function(e,t,a){},"2b7e":function(e,t,a){"use strict";a("cda6")},"340e":function(e,t,a){"use strict";a("1178")},5568:function(e,t,a){"use strict";a("6db2")},"6db2":function(e,t,a){},a24c:function(e,t,a){"use strict";a("f926")},cda6:function(e,t,a){},f4a9:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-row",{staticClass:"pt-5",attrs:{"no-gutters":""}},[a("Title",{attrs:{title:"What would you like to eat?","back-arrow":!1}})],1),a("v-row",{staticClass:"d-flex flex-row flex-md-row-reverse",attrs:{"no-gutters":""}},[a("v-col",{staticClass:"col-12 col-md-9"},[a("RecipeSearchBar",{attrs:{loading:e.loadingData}})],1),a("v-col",{staticClass:"col-12 col-md-3"},[a("v-select",{staticClass:"mr-md-4",attrs:{outlined:"",clearable:"",label:"Categories",value:e.filters.category?e.filters.category.value:"",items:e.categoryItems},on:{change:e.categoryFilter}})],1)],1),a("v-row",{staticClass:"d-flex align-end",attrs:{"no-gutters":""}}),a("v-row",{attrs:{"no-gutters":""}},[a("h2",[e._v("How about:")])]),a("v-row",{attrs:{"no-gutters":""}},[a("RecipeList",{staticClass:"loading-list",attrs:{loading:e.loadingData}})],1)],1)},r=[],n=(a("07ac"),a("5530")),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-text-field",{attrs:{"single-line":"",clearable:"","prepend-icon":"mdi-magnify",label:"Search"},on:{"click:clear":e.clear,"click:prepend":e.search,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.localSearchTerm,callback:function(t){e.localSearchTerm=t},expression:"localSearchTerm"}})},o=[],l=a("2f62"),c={name:"RecipeSearchBar",data:function(){return{localSearchTerm:""}},computed:Object(n["a"])({},Object(l["d"])(["searchTerm"])),methods:Object(n["a"])(Object(n["a"])({},Object(l["b"])(["updateSearchTerm"])),{},{search:function(){this.updateSearchTerm(this.localSearchTerm)},clear:function(){this.updateSearchTerm("")}}),watch:{searchTerm:function(e){this.localSearchTerm!==e&&(this.localSearchTerm=e)}},mounted:function(){this.localSearchTerm=this.searchTerm}},d=c,u=a("2877"),p=a("6544"),h=a.n(p),f=a("8654"),v=Object(u["a"])(d,s,o,!1,null,"1823a638",null),m=v.exports;h()(v,{VTextField:f["a"]});var b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"d-flex flex-wrap"},[e.loading?e._l(6,(function(e){return a("v-skeleton-loader",{key:e,staticClass:"recipe-card-skeleton ma-3",attrs:{type:"card"}})})):e.recipes.length?e._l(e.recipes,(function(t){return a("RecipeCard",e._b({key:t.id,staticClass:"recipe-card ma-3"},"RecipeCard",t,!1))})):a("div",[a("h3",[e._v("No recipes match your filters, please update your selection")])])],2)},g=[],y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-hover",{scopedSlots:e._u([{key:"default",fn:function(t){var i=t.hover;return[a("v-card",{staticClass:"recipe-card",class:e.titleColor,attrs:{shaped:"",elevation:i?12:2}},[a("v-container",{staticClass:"py-0"},[a("v-row",{staticClass:"d-flex justify-space-between"},[e.img?a("v-img",{staticClass:"align-end",attrs:{height:"250",src:e.img}},[a("RecipeTitle",{attrs:{name:e.nameCapitalized,id:e.id}})],1):a("RecipeTitle",{attrs:{name:e.nameCapitalized,id:e.id}})],1)],1)],1)]}}])})],1)},C=[],S=(a("fb6a"),a("b0c0"),a("9276")),k=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-row",{attrs:{"no-gutters":""}},[a("v-col",{staticClass:"pa-0"},[a("v-card-title",{staticClass:"recipe-title py-0",attrs:{"primary-title":""}},[a("v-container",[a("v-row",[a("v-col",{staticClass:"col-auto pa-0"},[e.inCart?a("v-btn",{staticClass:"mr-2",attrs:{"x-small":"",fab:"",dark:"",elevation:"3",color:"error"},on:{click:e.remove}},[a("v-icon",{attrs:{dark:""}},[e._v(" mdi-cart-remove ")])],1):a("v-btn",{staticClass:"mr-2 grey lighten-3",attrs:{icon:"","x-small":"",fab:"",elevation:"3",color:"primary"},on:{click:e.addToCart}},[a("v-icon",{attrs:{dark:""}},[e._v(" mdi-cart-plus ")])],1)],1),a("router-link",{attrs:{to:"/recipe/"+e.id},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.href,r=(t.route,t.navigate);return[a("v-col",{staticClass:"pa-0 text-center word-wrap",attrs:{href:i},on:{click:r}},[e._v(e._s(e.name))])]}}])})],1)],1)],1)],1),a("v-col",{staticClass:"col-auto pa-0"},[e.userLoggedIn?a("v-card-actions",[a("router-link",{attrs:{to:"/recipe-form/"+e.id},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.href,r=(t.route,t.navigate);return[a("v-btn",{staticClass:"grey lighten-3",attrs:{icon:"","x-small":"",fab:"",elevation:"3",color:"primary",href:i},on:{click:r}},[a("v-icon",{attrs:{dark:""}},[e._v(" mdi-pencil ")])],1)]}}],null,!1,580528206)})],1):e._e()],1)],1)},O=[],j={name:"RecipeTitle",props:{name:String,id:String},computed:Object(n["a"])(Object(n["a"])({},Object(l["c"])(["recipeInCart","userLoggedIn"])),{},{inCart:function(){return this.recipeInCart({recipeId:this.id})}}),methods:Object(n["a"])(Object(n["a"])({},Object(l["b"])(["addToShoppingCartById","removeFromCart"])),{},{addToCart:function(){this.addToShoppingCartById(this.id)},remove:function(){this.removeFromCart({recipeId:this.id})}})},x=j,_=(a("a24c"),a("8336")),w=a("99d9"),T=a("62ad"),B=a("a523"),L=a("132d"),V=a("0fd9"),R=Object(u["a"])(x,k,O,!1,null,"613e00e2",null),E=R.exports;h()(R,{VBtn:_["a"],VCardActions:w["a"],VCardTitle:w["c"],VCol:T["a"],VContainer:B["a"],VIcon:L["a"],VRow:V["a"]});var $={name:"RecipeCard",props:{id:String,name:String,img:String,category:String},components:{RecipeTitle:E},computed:{nameCapitalized:function(){return this.name[0].toUpperCase()+this.name.slice(1)},titleColor:function(){return S["b"][this.category].color}}},I=$,A=(a("340e"),a("b0af")),D=a("16b7"),F=a("f2e7"),M=a("58df"),z=a("d9bd"),H=Object(M["a"])(D["a"],F["a"]).extend({name:"v-hover",props:{disabled:{type:Boolean,default:!1},value:{type:Boolean,default:void 0}},methods:{onMouseEnter:function(){this.runDelay("open")},onMouseLeave:function(){this.runDelay("close")}},render:function(){return this.$scopedSlots.default||void 0!==this.value?(this.$scopedSlots.default&&(e=this.$scopedSlots.default({hover:this.isActive})),Array.isArray(e)&&1===e.length&&(e=e[0]),e&&!Array.isArray(e)&&e.tag?(this.disabled||(e.data=e.data||{},this._g(e.data,{mouseenter:this.onMouseEnter,mouseleave:this.onMouseLeave})),e):(Object(z["c"])("v-hover should only contain a single element",this),e)):(Object(z["c"])("v-hover is missing a default scopedSlot or bound value",this),null);var e}}),P=a("adda"),J=Object(u["a"])(I,y,C,!1,null,"0a12bffc",null),N=J.exports;h()(J,{VCard:A["a"],VContainer:B["a"],VHover:H,VImg:P["a"],VRow:V["a"]});var U={name:"RecipeList",components:{RecipeCard:N},props:{loading:Boolean},computed:Object(n["a"])({},Object(l["c"])({recipes:"recipesList"}))},W=U,q=(a("5568"),a("a630"),a("c975"),a("d81d"),a("ac1f"),a("3ca3"),a("5319"),a("1276"),a("3835")),G=(a("1f09"),a("c995")),K=a("24b2"),Q=a("7560"),X=a("80d2"),Y=Object(M["a"])(G["a"],K["a"],Q["a"]).extend({name:"VSkeletonLoader",props:{boilerplate:Boolean,loading:Boolean,tile:Boolean,transition:String,type:String,types:{type:Object,default:function(){return{}}}},computed:{attrs:function(){return this.isLoading?this.boilerplate?{}:Object(n["a"])({"aria-busy":!0,"aria-live":"polite",role:"alert"},this.$attrs):this.$attrs},classes:function(){return Object(n["a"])(Object(n["a"])({"v-skeleton-loader--boilerplate":this.boilerplate,"v-skeleton-loader--is-loading":this.isLoading,"v-skeleton-loader--tile":this.tile},this.themeClasses),this.elevationClasses)},isLoading:function(){return!("default"in this.$scopedSlots)||this.loading},rootTypes:function(){return Object(n["a"])({actions:"button@2",article:"heading, paragraph",avatar:"avatar",button:"button",card:"image, card-heading","card-avatar":"image, list-item-avatar","card-heading":"heading",chip:"chip","date-picker":"list-item, card-heading, divider, date-picker-options, date-picker-days, actions","date-picker-options":"text, avatar@2","date-picker-days":"avatar@28",heading:"heading",image:"image","list-item":"text","list-item-avatar":"avatar, text","list-item-two-line":"sentences","list-item-avatar-two-line":"avatar, sentences","list-item-three-line":"paragraph","list-item-avatar-three-line":"avatar, paragraph",paragraph:"text@3",sentences:"text@2",table:"table-heading, table-thead, table-tbody, table-tfoot","table-heading":"heading, text","table-thead":"heading@6","table-tbody":"table-row-divider@6","table-row-divider":"table-row, divider","table-row":"table-cell@6","table-cell":"text","table-tfoot":"text@2, avatar@2",text:"text"},this.types)}},methods:{genBone:function(e,t){return this.$createElement("div",{staticClass:"v-skeleton-loader__".concat(e," v-skeleton-loader__bone")},t)},genBones:function(e){var t=this,a=e.split("@"),i=Object(q["a"])(a,2),r=i[0],n=i[1],s=function(){return t.genStructure(r)};return Array.from({length:n}).map(s)},genStructure:function(e){var t=[];e=e||this.type||"";var a=this.rootTypes[e]||"";if(e===a);else{if(e.indexOf(",")>-1)return this.mapBones(e);if(e.indexOf("@")>-1)return this.genBones(e);a.indexOf(",")>-1?t=this.mapBones(a):a.indexOf("@")>-1?t=this.genBones(a):a&&t.push(this.genStructure(a))}return[this.genBone(e,t)]},genSkeleton:function(){var e=[];return this.isLoading?e.push(this.genStructure()):e.push(Object(X["n"])(this)),this.transition?this.$createElement("transition",{props:{name:this.transition},on:{afterEnter:this.resetStyles,beforeEnter:this.onBeforeEnter,beforeLeave:this.onBeforeLeave,leaveCancelled:this.resetStyles}},e):e},mapBones:function(e){return e.replace(/\s/g,"").split(",").map(this.genStructure)},onBeforeEnter:function(e){this.resetStyles(e),this.isLoading&&(e._initialStyle={display:e.style.display,transition:e.style.transition},e.style.setProperty("transition","none","important"))},onBeforeLeave:function(e){e.style.setProperty("display","none","important")},resetStyles:function(e){e._initialStyle&&(e.style.display=e._initialStyle.display||"",e.style.transition=e._initialStyle.transition,delete e._initialStyle)}},render:function(e){return e("div",{staticClass:"v-skeleton-loader",attrs:this.attrs,on:this.$listeners,class:this.classes,style:this.isLoading?this.measurableStyles:void 0},[this.genSkeleton()])}}),Z=Object(u["a"])(W,b,g,!1,null,"dc25cb2a",null),ee=Z.exports;h()(Z,{VSkeletonLoader:Y});var te=a("43b3"),ae={name:"HomePage",props:{loadingData:Boolean},components:{RecipeSearchBar:m,RecipeList:ee,Title:te["a"]},computed:Object(n["a"])(Object(n["a"])({},Object(l["d"])(["filters"])),{},{categoryItems:function(){return Object.values(S["b"])}}),methods:Object(n["a"])({},Object(l["b"])(["categoryFilter"]))},ie=ae,re=(a("2b7e"),a("b974")),ne=Object(u["a"])(ie,i,r,!1,null,"88e21a3a",null);t["default"]=ne.exports;h()(ne,{VCol:T["a"],VContainer:B["a"],VRow:V["a"],VSelect:re["a"]})},f926:function(e,t,a){}}]);
//# sourceMappingURL=home.a553dcd0.js.map