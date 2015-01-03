/**************************************************************
 * <T>功能导航按钮的弹出框。</T>
 *
 * @class 
 * @face FControl,MFocus
 * @author MAOCY
 * @version 1.0.1
 **************************************************************/
function FNavigatorEditor(o){
   o = RClass.inherits(this, o, FControl, MFocus);
   // Listener
   // Method
   o.construct         = FNavigatorEditor_construct;
   o.oeBuild           = FNavigatorEditor_oeBuild;
   o.onBuildPanel      = FNavigatorEditor_onBuildPanel;
   o.setGroups         = FNavigatorEditor_setGroups;
   o.setShow           = FNavigatorEditor_setShow;
   o.onMouseOut        = FNavigatorEditor_onMouseOut;
   o.onMouseOver       = FNavigatorEditor_onMouseOver;
   o.onItemClick       = FNavigatorEditor_onItemClick;
   o.dispose           = FNavigatorEditor_dispose;
   o.rect              = new TRect();
   return o;
}

/**************************************************************
 * <T>构造函数。</T>
 *
 * @method
 * @param h:H:HEvent 封装的事件对象
 **************************************************************/
function FNavigatorEditor_construct(){
   var o = this;
}

/**************************************************************
 * <T>控件对象构建事件。</T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorEditor_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   if(e.isBefore()){
      o.hForm = RBuilder.appendTable(o.hPanel);
      o.hForm.style.backgroundColor = 'white';
      o.hForm.style.fontSize = '9pt';
      o.hForm.style.cursor = 'default';
      o.hPanel.style.display = 'none';
   }
   return EEventStatus.Continue;
}

/**************************************************************
 * <T>构建控件底板。<T>
 *
 * @method
 **************************************************************/
function FNavigatorEditor_onBuildPanel(){
   var o = this;
   var hp = o.hPanel = RBuilder.appendDiv();
   hp.style.position = 'absolute';
   hp.style.border = '1px solid #77AFEE';
   hp.style.backgroundColor = 'white';
   hp.style.padding = '10';
   hp.style.zindex = RLayer.next();
}

/**************************************************************
 * <T>把所有组件放置在弹出框里。<T>
 *
 * @method
 * @param gs.groups:TMap 组对象集合
 **************************************************************/
function FNavigatorEditor_setGroups(gs){
   var o = this;
   if(gs){
      var hr = o.hForm.insertRow();
      for(var n = 0; n < gs.count; n++){
         var g = gs.value(n);
         g.hPanel.style.display='block';
         if(RClass.isClass(g, FNavigatorGroup)){
            g.editor = o;
            var cs = g.components;
            g.setItems(cs);
         }
         var hc = hr.insertCell();
         hc.vAlign = 'top';
         hc.appendChild(g.hPanel);
      }
   }
}

/**************************************************************
 * <T>鼠标移过控件时的响应。<T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorEditor_onMouseOver(e){
   var o = this;
   o.setShow(true);
   //o.hPanel.style.display = 'block';
}

/**************************************************************
 * <T>鼠标移除控件后的响应。<T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorEditor_onMouseOut(e){
   var o = this;
   o.setShow(false);
}

/**************************************************************
 * <T>设置下拉控件对象是否能够显示。<T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorEditor_setShow(f){
   var o = this;
   var p = o.editable;
   if(f){
      o.hPanel.style.display = 'block';
      var r = RHtml.rect(p.hPanel);
      var tr = this.calcRect();
      r.left = r.right - tr.width() + 1;
      //r.bottom += 1;
      o.setBounds(r.left, r.bottom);
      o.hPanel.style.zIndex = RLayer.next();
   }else{
      o.hPanel.style.display = 'none';
   }
}

/**************************************************************
 * <T>设置下拉控件对象是否能够显示。<T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorEditor_onItemClick(c){
   var o = this;
   //alert(FNavigatorEditor_onItemClick);
}

/**************************************************************
 * <T>设置下拉控件对象是否能够显示。<T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorEditor_dispose(c){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hForm);
   o.hPanel = null;
   o.hForm = null;
}
