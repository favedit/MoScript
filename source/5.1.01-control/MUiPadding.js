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
// @param left:Integer 左空白
// @param top:Integer 上空白
// @param right:Integer 右空白
// @param bottom:Integer 下空白
//==========================================================
function MUiPadding_setPadding(left, top, right, bottom){
   var o = this;
   var padding = o._padding;
   var hPanel = o.panel(EPanel.Container);
   // 获得样式
   var hStyle = null;
   if(hPanel && !hPanel.__fragment){
      hStyle = hPanel.style;
   }
   // 设置左空白
   if(left != null){
      padding.left = left;
      if(hStyle){
         hStyle.paddingLeft = (left == 0) ? null : left + 'px';
      }
   }
   // 设置上空白
   if(top != null){
      padding.top = top;
      if(hStyle){
         hStyle.paddingTop = (top == 0) ? null : top + 'px';
      }
   }
   // 设置右空白
   if(right != null){
      padding.right= right;
      if(hStyle){
         hStyle.paddingRight = (right == 0) ? null : right + 'px';
      }
   }
   // 设置下空白
   if(bottom != null){
      padding.bottom = bottom;
      if(hStyle){
         hStyle.paddingBottom = (bottom == 0) ? null : bottom + 'px';
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
