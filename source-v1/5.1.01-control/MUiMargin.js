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
// @param left:Integer 左空白
// @param top:Integer 上空白
// @param right:Integer 右空白
// @param bottom:Integer 下空白
//==========================================================
function MUiMargin_setMargin(left, top, right, bottom){
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
         hStyle.marginLeft = (left == 0) ? null : left + 'px';
      }
   }
   // 设置上空白
   if(top != null){
      padding.top = top;
      if(hStyle){
         hStyle.marginTop = (top == 0) ? null : top + 'px';
      }
   }
   // 设置右空白
   if(right != null){
      padding.right= right;
      if(hStyle){
         hStyle.marginRight = (right == 0) ? null : right + 'px';
      }
   }
   // 设置下空白
   if(bottom != null){
      padding.bottom = bottom;
      if(hStyle){
         hStyle.marginBottom = (bottom == 0) ? null : bottom + 'px';
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
