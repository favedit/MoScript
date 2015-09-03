//==========================================================
// <T>设计目录基类。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FManageCatalogContent = function FManageCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   //..........................................................
   // @event
   o.onButtonClick = MO.FManageCatalogContent_onButtonClick;
   o.onBuilded     = MO.FManageCatalogContent_onBuilded;
   //..........................................................
   // @method
   o.construct     = MO.FManageCatalogContent_construct;
   // @method
   o.dispose       = MO.FManageCatalogContent_dispose;
   return o;
}

//==========================================================
// <T>节点点击处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
MO.FManageCatalogContent_onButtonClick = function FManageCatalogContent_onButtonClick(event){
   var o = this;
   var button = event.sender;
   // 获得页面名称
   var frameName = button.attributeGet('frame_name');
   MO.Assert.debugNotEmpty(frameName);
   // 显示界面
   var frame = o._frameSet.selectObject(frameName);
   frame.psMode(MO.EUiMode.Update);
   frame.psRefresh();
   if(MO.Class.isClass(frame, MO.FDuiFormFrame)){
      frame.dataModify();
      //frame.doFetch();
   }else if(MO.Class.isClass(frame, MO.FDuiTableFrame)){
      frame.doFetch();
   }
   // 设置历史
   var historyBar = o._frameSet._historyBar;
   historyBar.historyClear();
   var historyButton = historyBar.historyPush();
   historyButton.setLabel(frame.label());
   historyButton.attributeSet('frame_name', frame.name());
}

//==========================================================
// <T>定义加载完成处理。</T>
//
// @method
// @param event:SXmlEvent 事件信息
//==========================================================
MO.FManageCatalogContent_onBuilded = function FManageCatalogContent_onBuilded(event){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, event);
   // 注册按键监听
   var buttons = new MO.TObjects();
   o.searchComponents(buttons, MO.FDuiSliderButton);
   var count = buttons.count();
   for(var i = 0; i < count; i++){
      var button = buttons.at(i);
      button.addClickListener(o, o.onButtonClick);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FManageCatalogContent_construct = function FManageCatalogContent_construct(){
   var o = this;
   o.__base.FDuiForm.construct.call(o);
   // 加载定义
   //o.loadDefine(o._defineCode);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FManageCatalogContent_dispose = function FManageCatalogContent_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiForm.dispose.call(o);
}
