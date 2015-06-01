/**************************************************************
 * <T>功能导航菜单栏中的每个条目信息。</T>
 *
 * @class 
 * @face FControl
 * @author MAOCY
 * @version 1.0.1
 **************************************************************/
function FNavigatorItem(o){
   o = RClass.inherits(this, o, FControl);
   /// @property String 提示信息
   o.action          = RClass.register(o, new TPtyStr('action'));
   o.page            = RClass.register(o, new TPtyStr('page'));
   o.lsnsButtonClickBefore = new TListeners();
   o.lsnsButtonClick       = new TListeners();
   // Method
   o.onBuildPanel    = FNavigatorItem_onBuildPanel;
   o.onMouseOut      = FNavigatorItem_onMouseOut;
   o.onMouseOver     = FNavigatorItem_onMouseOver;
   o.onMouseDown     = FNavigatorItem_onMouseDown;
   o.dispose         = FNavigatorItem_dispose;
   return o;
}

/**************************************************************
 * <T>构建控件底板。</T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorItem_onBuildPanel(){
   var o = this;
   var hp = o.hPanel = RBuilder.appendTable();
   hp.style.width = '100%';
   hp.height = '20px';
   o.hPanel.style.border = '1px solid #FFFFFF';
   hp.style.cursor = 'hand';
   var hf = o.hForm = hp.insertRow().insertCell();
   hf.width = '100px';
   hf.noWrap = 'true';
   hf.innerText = o.label;
   hp.style.display = 'none';
}

/**************************************************************
 * <T>响应鼠标移出事件。</T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorItem_onMouseOut(e){
   var o = this;
   o.hPanel.style.backgroundColor = '#FFFFFF';
   o.hPanel.style.border = '1px solid #FFFFFF';
}

/**************************************************************
 * <T>响应鼠标悬浮事件。</T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorItem_onMouseOver(e){
   var o = this;
   o.hPanel.style.border = '1px solid #ADDBEF';
   o.hPanel.style.backgroundColor = '#F0F7FD';
}

/**************************************************************
 * <T>响应鼠标按下事件。</T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorItem_onMouseDown(e){
   var o = this;
   o.lsnsButtonClickBefore.process(o);
   if(o.page){
      var fmMain = RHtml.form();
      var url = o.page.replace(/@/g, '&');
      fmMain.action = top.RContext.context(url);
      fmMain.submit();
   }
   o.lsnsButtonClick.process(o);
}

/**************************************************************
 * <T>响应鼠标按下事件。</T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorItem_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hForm);
   o.hPanel = null;
   o.hForm = null;
}
