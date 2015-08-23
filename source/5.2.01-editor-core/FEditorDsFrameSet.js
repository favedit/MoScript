//==========================================================
// <T>系统设计框架。</T>
//
// @class
// @author maocy
// @history 150516
//==========================================================
MO.FEditorDsFrameSet = function FEditorDsFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorFrameSet);
   //..........................................................
   // @style
   o._styleTitleGround     = MO.Class.register(o, new MO.AStyle('_styleTitleGround', 'Title_Ground'));
   o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleSpaceContent    = MO.Class.register(o, new MO.AStyle('_styleSpaceContent', 'Space_Content'));
   o._stylePropertyContent = MO.Class.register(o, new MO.AStyle('_stylePropertyContent', 'Property_Content'));
   //..........................................................
   // @attribute
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSpace           = null;
   o._frameSpaceToolbar    = null;
   o._frameSpaceContent    = null;
   o._frameProperty        = null;
   o._framePropertyToolbar = null;
   o._framePropertyContent = null;
   //..........................................................
   // @method
   o.construct             = MO.FEditorDsFrameSet_construct;
   // @method
   o.setFrameTitle         = MO.FEditorDsFrameSet_setFrameTitle;
   o.selectObject          = MO.FEditorDsFrameSet_selectObject;
   // @method
   o.load                  = MO.FEditorDsFrameSet_load;
   // @method
   o.dispose               = MO.FEditorDsFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameSet_construct = function FEditorDsFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FEditorFrameSet.construct.call(o);
}

//==========================================================
// <T>设置页面标题。</T>
//
// @method
// @param title:String 标题
//==========================================================
MO.FEditorDsFrameSet_setFrameTitle = function FEditorDsFrameSet_setFrameTitle(title){
   var o = this;
   var hTitlePanel = o._framePropertyTitle._hPanel;
   MO.Window.Html.textSet(hTitlePanel, title);
}

//==========================================================
// <T>选择对象处理。</T>
//
// @method
// @param frameName:String 属性名称
//==========================================================
MO.FEditorDsFrameSet_selectObject = function FEditorDsFrameSet_selectObject(frameName){
   var o = this;
   // 选中页面
   var frame = o.selectPropertyFrame(frameName);
   // 显示标题
   o.setFrameTitle(frame.label());
   // 显示工具栏
   var hToolBarPanel = o._framePropertyToolBar._hPanel;
   MO.Window.Html.clear(hToolBarPanel);
   var toolBar = frame.findControl('toolBar');
   if(toolBar){
      toolBar.setPanel(hToolBarPanel);
   }
   return frame;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameSet_load = function FEditorDsFrameSet_load(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameSet_dispose = function FEditorDsFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FEditorFrameSet.dispose.call(o);
}
