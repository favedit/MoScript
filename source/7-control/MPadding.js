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
   o._padding   = RClass.register(o, new APtyPadding(null, '_padding'));
   //..........................................................
   // @method
   o.construct  = MPadding_construct;
   o.padding    = MPadding_padding;
   o.setPadding = MPadding_setPadding;
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
   var h = this.panel(EPanel.Container);
   if(l){
      h.style.paddingLeft = l;
   }
   if(t){
      h.style.paddingTop = t;
   }
   if(r){
      h.style.paddingRight = r;
   }
   if(b){
      h.style.paddingBottom = b;
   }
}
