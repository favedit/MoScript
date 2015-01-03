/**************************************************************
 * <T>功能导航菜单栏中的条目信息组。</T>
 *
 * @class 
 * @face FControl,MContainer,MFocus
 * @author MAOCY
 * @version 1.0.1
 **************************************************************/
function FNavigatorButton(o){
   o = RClass.inherits(this, o, FControl, MContainer, MFocus);
   o.icon            = RClass.register(o, new TPtyStr('icon'));
   o.page            = RClass.register(o, new TPtyStr('page'));
   o.action          = RClass.register(o, new TPtyStr('action'));
   // @property
   o.lsnsButtonClickBefore = new TListeners();
   o.lsnsButtonClick       = new TListeners();
   // Method
   o.oeBuild         = FNavigatorButton_oeBuild;
   o.onBuildPanel    = FNavigatorButton_onBuildPanel;
   o.drop            = FNavigatorButton_drop;
   o.onMouseOver     = FNavigatorButton_onMouseOver;
   o.onMouseDown     = FNavigatorButton_onMouseDown;
   o.onMouseOut      = FNavigatorButton_onMouseOut;
   o.dispose         = FNavigatorButton_dispose;
   return o;
}

/**************************************************************
 * <T>控件构建事件。</T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorButton_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   if(e.isAfter()){
      var hr = o.hPanel.insertRow();
      // 建立图标区
      if(o.icon){
         var hc = hr.insertCell();
         hc.width = 20;
         o.hIcon = RBuilder.appendIcon(hc, o.icon);
      }
      // 建立文字区
      var hlf = o.hLabelForm = hr.insertCell();
      hlf.innerText = o.label;
      // 建立下拉区
      if(o.components){
         o.hDropForm = hr.insertCell();
         o.hDropForm.innerText = '6';
         o.hDropForm.style.fontFamily = 'Webdings';
      }
   }
   return EEventStatus.Continue;
}

/**************************************************************
 * <T>构建控件底板。</T>
 *
 * @method
 **************************************************************/
function FNavigatorButton_onBuildPanel(){
   this.hPanel = RBuilder.appendTable();
}

/**************************************************************
 * <T>弹出下拉框控件对象。</T>
 *
 * @method
 **************************************************************/
function FNavigatorButton_drop(){
   var o = this;
   var cs = o.components;
   if(cs){
      var p = o.pop;
      if(!p){
         p = RControl.create(FNavigatorEditor);
         o.pop = p;
         p.editable = o;
         p.setGroups(cs);
      }
      o.pop.setShow(true);
   }
}
/**************************************************************
 * <T>响应鼠标悬停事件，显示下拉框控件对象。</T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorButton_onMouseOver(e){
   var o = this;
   o.hPanel.style.cursor = 'hand';
   o.focus();
   o.drop();
}
/**************************************************************
 * <T>响应鼠标离开事件，隐藏下拉框控件对象。</T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorButton_onMouseOut(e){
   var o = this;
   if(o.pop){
      o.pop.setShow(false);
   }
}
/**************************************************************
 * <T>响应鼠标离开事件，隐藏下拉框控件对象。</T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hDropForm);
   RMemory.freeHtml(o.hLabelForm);
   o.hDropForm = null;
   o.hLabelForm = null;
}
/**************************************************************
 * <T>响应鼠标按下事件，显示下拉框控件对象。</T>
 *
 * @method
 * @param e:event:TEvent 封装的事件对象
 **************************************************************/
function FNavigatorButton_onMouseDown(e){
   var o = this;
   o.lsnsButtonClickBefore.process(o);
   if(o.page){
      var url = o.page.replace(/@/g, '&');
      url = top.RContext.context(url);
      window.location.href = url;
   }else{
      o.focus();
      o.drop();
   }
   o.lsnsButtonClick.process(o);
}
