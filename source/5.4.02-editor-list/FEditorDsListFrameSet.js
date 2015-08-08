//==========================================================
// <T>资源框架。</T>
//
// @author maocy
// @history 150121
//==========================================================
MO.FEditorDsListFrameSet = function FEditorDsListFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   //..........................................................
   // @property
   o._frameName   = 'editor.design.list.FrameSet';
   //..........................................................
   // @process
   o.onBuilded    = MO.FEditorDsListFrameSet_onBuilded;
   //..........................................................
   // @method
   o.construct    = MO.FEditorDsListFrameSet_construct;
   // @method
   o.selectObject = MO.FEditorDsListFrameSet_selectObject;
   o.load         = MO.FEditorDsListFrameSet_load;
   // @method
   o.dispose      = MO.FEditorDsListFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsListFrameSet_onBuilded = function FEditorDsListFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   // 设置样式
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   //..........................................................
   // 设置分割
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   //..........................................................
   // 设置目录工具栏
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsListCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   // 设置目录内容
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsListCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   //control.addSelectedListener(o, o.selectObject);
   o._frameCatalogContent.push(control);
   //..........................................................
   // 设置属性工具栏
   var control = o._propertyToolbar = MO.Class.create(MO.FEditorDsListPropertyToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyToolBar.push(control);
   //_framePropertyContent
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListFrameSet_construct = function FEditorDsListFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FEditorDsFrameSet.construct.call(o);
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param typeGroup:EDuiTreeNodeGroup 类型分组枚举
// @param propertyFrame:String 属性名称
// @param controlName:String 控件名称
//==========================================================
MO.FEditorDsListFrameSet_selectObject = function FEditorDsListFrameSet_selectObject(typeGroup, propertyFrame, controlName){
   var o = this;
   //var activeFrame = o._spaceContent._activeFrame;
   // 隐藏所有属性面板
   o.hidePropertyFrames();
   // 显示控件信息
   var frame = o.findPropertyFrame(propertyFrame);
   frame.show();
   //if(typeGroup == MO.EDuiTreeNodeGroup.Container){
   //   frame.loadObject(activeFrame, activeFrame);
   //}else{
   //   var activeControl = activeFrame.findComponent(controlName);
   //   frame.loadObject(activeFrame, activeControl);
   //   o._spaceContent.selectControl(activeControl);
   //}
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListFrameSet_load = function FEditorDsListFrameSet_load(name){
   var o = this;
   //if(name){
      //o._spaceContent.loadFrame(name);
   //}
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListFrameSet_dispose = function FEditorDsListFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
