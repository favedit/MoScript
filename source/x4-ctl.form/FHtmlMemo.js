//==========================================================
// <T>页面备注。</T>
//
// @manger
// @history 091113 MAOCY 创建
//==========================================================
function FHtmlMemo(o){
   o = RClass.inherits(this, o, FEditControl);
   //..........................................................
   // @property
   o.editOverflow = RClass.register(o, new TPtyStr('editOverflow'));
   //..........................................................
   // @event
   o.onBuildEdit  = FHtmlMemo_onBuildEdit;
   //..........................................................
   // @process
   o.oeClearValue = RMethod.empty;
   o.oeResetValue = RMethod.empty;
   //..........................................................
   // @method
   o.setText      = FHtmlMemo_setText;
   o.dispose      = FHtmlMemo_dispose;
   return o;
}

//==========================================================
// <T>建立编辑控件。</T>
//
// @method
//==========================================================
function FHtmlMemo_onBuildEdit(hc){
   var o = this;
   var h = o.hEdit = RBuilder.appendDiv(hc, o.style('Edit'));
   if(o.width){
      h.style.width = o.width;
   }
   h.style.overflowY = 'auto';
   if(RString.equals(o.editOverflow,'N')){
      h.wrap ='off';
      h.style.overflowX = 'auto';
   }
   if(RString.equals(o.editOverflow,'Y')){
      h.style.overflowX = 'auto';
   }
   if(o.dataDefault){
      this.hEdit.innerHTML = o.dataDefault;
   }
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FHtmlMemo_setText(t){
   this.hEdit.innerHTML = t;
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FHtmlMemo_dispose(text){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hEdit = null;
}
