//==========================================================
// <T>系统设计框架。</T>
//
// @class
// @author maocy
// @history 150516
//==========================================================
MO.FManageFrameSet = function FManageFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDuiFrameSet, MO.MUiStorage);
   //..........................................................
   // @style
   o._styleTitleGround     = MO.Class.register(o, new MO.AStyle('_styleTitleGround', 'Title_Ground'));
   o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleSpaceContent    = MO.Class.register(o, new MO.AStyle('_styleSpaceContent', 'Space_Content'));
   //..........................................................
   // @attribute
   o._storageCode          = 'manage.logic.common.FrameSet';
   // @attribute
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSpace           = null;
   o._frameSpaceToolbar    = null;
   o._frameSpaceContent    = null;
   // @attribute
   o._activeFrame          = MO.Class.register(o, new MO.AGetSet('_activeFrame'));
   //..........................................................
   // @process
   o.onBuilded             = MO.FManageFrameSet_onBuilded;
   o.onHistoryButtonClick  = MO.FManageFrameSet_onHistoryButtonClick;
   //..........................................................
   // @method
   o.construct             = MO.FManageFrameSet_construct;
   // @method
   o.setFrameTitle         = MO.FManageFrameSet_setFrameTitle;
   // @method
   o.findSpaceFrame        = MO.FManageFrameSet_findSpaceFrame;
   o.hideSpaceFrames       = MO.FManageFrameSet_hideSpaceFrames;
   o.selectSpaceFrame      = MO.FManageFrameSet_selectSpaceFrame;
   // @method
   o.load                  = MO.FManageFrameSet_load;
   // @method
   o.dispose               = MO.FManageFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FManageFrameSet_onBuilded = function FManageFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDuiFrameSet.onBuilded.call(o, event);
   // 设置历史工具栏
   var control = o._historyBar = MO.Class.create(MO.FDuiHistoryBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   control.addButtonClickListener(o, o.onHistoryButtonClick);
   o._frameSpaceTitle.push(control);
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FManageFrameSet_onHistoryButtonClick = function FManageFrameSet_onHistoryButtonClick(event){
   var o = this;
   var button = event.sender;
   var frameName = button.attributeGet('frame_name');
   o.selectSpaceFrame(frameName);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FManageFrameSet_construct = function FManageFrameSet_construct(){
   var o = this;
   o.__base.FDuiFrameSet.construct.call(o);
   // 设置属性
   o._spaceFrames = new MO.TDictionary();
}

//==========================================================
// <T>设置页面标题。</T>
//
// @method
// @param title:String 标题
//==========================================================
MO.FManageFrameSet_setFrameTitle = function FManageFrameSet_setFrameTitle(title){
   var o = this;
   //var hTitlePanel = o._frameSpaceTitle._hPanel;
   //MO.Window.Html.textSet(hTitlePanel, title);
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @param code:String 代码
// @return FDuiFrame 页面
//==========================================================
MO.FManageFrameSet_findSpaceFrame = function FManageFrameSet_findSpaceFrame(code){
   var o = this;
   var frame = o._spaceFrames.get(code);
   if(!frame){
      frame = MO.Console.find(MO.FDuiFrameConsole).get(o, code, o._frameSpaceContent._hContainer);
      frame._frameSet = o;
      o._spaceFrames.set(code, frame);
   }
   return frame;
}

//==========================================================
// <T>隐藏属性界面集合。</T>
//
// @method
//==========================================================
MO.FManageFrameSet_hideSpaceFrames = function FManageFrameSet_hideSpaceFrames(){
   var o = this;
   var frames = o._spaceFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
}

//==========================================================
// <T>选中属性界面。</T>
//
// @method
// @param frameName:String 属性页面名称
//==========================================================
MO.FManageFrameSet_selectSpaceFrame = function FManageFrameSet_selectSpaceFrame(frameName){
   var o = this;
   // 清空工具栏
   var hToolBarPanel = o._frameSpaceToolBar._hPanel;
   MO.Window.Html.clear(hToolBarPanel);
   // 隐藏所有属性面板
   o.hideSpaceFrames();
   // 显示控件信息
   var frame = null;
   if(frameName){
      // 查找页面
      frame = o.findSpaceFrame(frameName);
      frame.show();
      var frameLabel = frame.label();
      // 显示标题
      o.setFrameTitle(frame.label());
      // 显示工具栏
      var toolBar = frame.findControl('toolBar');
      if(toolBar){
         toolBar.setPanel(hToolBarPanel);
      }
   }
   // 激活页面
   o._activeFrame = frame;
   //..........................................................
   // 存储选择内容
   if(frame){
      o.storageSet('frame_name', frameName)
      o.storageUpdate();
   }
   return frame;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FManageFrameSet_load = function FManageFrameSet_load(){
   var o = this;
   var frameName = o.storageGet('frame_name');
   if(frameName){
      // 显示界面
      var frame = o.selectSpaceFrame(frameName);
      frame.psMode(MO.EUiMode.Update);
      frame.psRefresh();
      if(MO.Class.isClass(frame, MO.FDuiFormFrame)){
         frame.dataModify();
         //frame.doFetch();
      }else if(MO.Class.isClass(frame, MO.FDuiTableFrame)){
         frame._dsPageSize = 20;
         frame._dsPage = 0;
         frame.resetSearch();
         frame.doFetch();
      }
      // 设置历史
      var historyBar = o._historyBar;
      historyBar.historyClear();
      var historyButton = historyBar.historyPush();
      historyButton.setLabel(frame.label());
      historyButton.attributeSet('frame_name', frame.name());
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FManageFrameSet_dispose = function FManageFrameSet_dispose(){
   var o = this;
   // 释放属性集合
   o._spaceFrames = MO.Lang.Object.dispose(o._spaceFrames, true);
   // 父处理
   o.__base.FDuiFrameSet.dispose.call(o);
}
