//==========================================================
// <T>外空白接口。</T>
//
// @face
// @author maocy
// @version 150329
//==========================================================
function MUiMargin(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property Smargin 填充结构
   o._margin       = RClass.register(o, new APtyPadding('_margin'));
   //..........................................................
   // @method
   o.construct     = MUiMargin_construct;
   // @method
   o.margin        = MUiMargin_margin;
   o.setMargin     = MUiMargin_setMargin;
   o.refreshMargin = MUiMargin_refreshMargin;
   // @method
   o.dispose       = MUiMargin_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function MUiMargin_construct(){
   var o = this;
   o._margin = new SPadding();
}

//==========================================================
// <T>获得填充空白。</T>
//
// @method
// @return 填充空白
//==========================================================
function MUiMargin_margin(){
   return this._margin;
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
function MUiMargin_setMargin(l, t, r, b){
   var o = this;
   var p = o._margin;
   var h = o.panel(EPanel.Container);
   // 设置左空白
   if(l != null){
      p.left = l;
      if(h){
         h.style.marginLeft = (l == 0) ? null : l + 'px';
      }
   }
   // 设置上空白
   if(t != null){
      p.top = t;
      if(h){
         h.style.marginTop = (t == 0) ? null : t + 'px';
      }
   }
   // 设置右空白
   if(r != null){
      p.right= r;
      if(h){
         h.style.marginRight = (r == 0) ? null : r + 'px';
      }
   }
   // 设置下空白
   if(b != null){
      p.bottom = b;
      if(h){
         h.style.marginBottom = (b == 0) ? null : b + 'px';
      }
   }
}

//==========================================================
// <T>刷新填充空白。</T>
//
// @method
//==========================================================
function MUiMargin_refreshMargin(){
   var o = this;
   var p = o._margin;
   o.setMargin(p.left, p.top, p.right, p.bottom);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function MUiMargin_dispose(){
   var o = this;
   // 释放属性
   o._margin = RObject.dispose(o._margin);
}
