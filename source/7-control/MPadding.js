//==========================================================
// <T>填充接口。</T>
//
// @face
// @author maocy
// @version 150101
//==========================================================
function MPadding(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property SPadding 填充结构
   o._padding     = RClass.register(o, new APtyPadding('_padding'));
   //..........................................................
   // @method
   o.construct    = MPadding_construct;
   o.padding      = MPadding_padding;
   o.setPadding   = MPadding_setPadding;
   o.refreshStyle = MPadding_refreshStyle;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function MPadding_construct(){
   var o = this;
   o._padding = new SPadding();
}

//==========================================================
// <T>获得填充信息。</T>
//
// @return 填充信息
//==========================================================
function MPadding_padding(){
   return this._padding;
}

//==========================================================
// <T>设置四周的空白。</T>
//
// @method
// @param l:left:Integer 左空白
// @param t:top:Integer 上空白
// @param r:right:Integer 右空白
// @param b:bottom:Integer 下空白
//==========================================================
function MPadding_setPadding(l, t, r, b){
   return this._padding.set(l, t, r, b);
}

//==========================================================
// <T>刷新样式。</T>
//
// @method
//==========================================================
function MPadding_refreshStyle(){
   var o = this;
   var p = o._padding;
   var h = o.panel(EPanel.Container);
   if(p.left){
      h.style.paddingLeft = p.left;
   }
   if(p.top){
      h.style.paddingTop = p.top;
   }
   if(p.right){
      h.style.paddingRight = p.right;
   }
   if(p.bottom){
      h.style.paddingBottom = p.bottom;
   }
}
