//==========================================================
// <T>填充接口。</T>
//
// @face
// @author maocy
// @version 150101
//==========================================================
function MUiPadding(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property SPadding 填充结构
   o._padding       = RClass.register(o, new APtyPadding('_padding'));
   //..........................................................
   // @method
   o.construct      = MUiPadding_construct;
   // @method
   o.padding        = MUiPadding_padding;
   o.setPadding     = MUiPadding_setPadding;
   o.refreshPadding = MUiPadding_refreshPadding;
   // @method
   o.dispose        = MUiPadding_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function MUiPadding_construct(){
   var o = this;
   o._padding = new SPadding();
}

//==========================================================
// <T>获得填充空白。</T>
//
// @method
// @return 填充空白
//==========================================================
function MUiPadding_padding(){
   return this._padding;
}

//==========================================================
// <T>设置填充空白。</T>
//
// @method
// @param l:left:Integer 左空白
// @param t:top:Integer 上空白
// @param r:right:Integer 右空白
// @param b:bottom:Integer 下空白
//==========================================================
function MUiPadding_setPadding(l, t, r, b){
   var o = this;
   var p = o._padding;
   var h = o.panel(EPanel.Container);
   // 设置左空白
   if(l != null){
      p.left = l;
      if(h){
         h.style.paddingLeft = (l == 0) ? null : l + 'px';
      }
   }
   // 设置上空白
   if(t != null){
      p.top = t;
      if(h){
         h.style.paddingTop = (t == 0) ? null : t + 'px';
      }
   }
   // 设置右空白
   if(r != null){
      p.right= r;
      if(h){
         h.style.paddingRight = (r == 0) ? null : r + 'px';
      }
   }
   // 设置下空白
   if(b != null){
      p.bottom = b;
      if(h){
         h.style.paddingBottom = (b == 0) ? null : b + 'px';
      }
   }
}

//==========================================================
// <T>刷新填充空白。</T>
//
// @method
//==========================================================
function MUiPadding_refreshPadding(){
   var o = this;
   var p = o._padding;
   o.setPadding(p.left, p.top, p.right, p.bottom);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function MUiPadding_dispose(){
   var o = this;
   // 释放属性
   var v = o._padding;
   if(v){
      v.dispose();
      o._padding = null;
   }
}
