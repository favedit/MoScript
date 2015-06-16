with(MO){
   //==========================================================
   // <T>资源框架。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsSystemListFrameSet = function FDsSystemListFrameSet(o){
      o = RClass.inherits(this, o, FDsSystemDesignFrameSet);
      //..........................................................
      // @property
      o._frameName   = 'system.design.list.FrameSet';
      //..........................................................
      // @process
      o.onBuilded    = FDsSystemListFrameSet_onBuilded;
      //..........................................................
      // @method
      o.construct    = FDsSystemListFrameSet_construct;
      // @method
      o.selectObject = FDsSystemListFrameSet_selectObject;
      o.load         = FDsSystemListFrameSet_load;
      // @method
      o.dispose      = FDsSystemListFrameSet_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemListFrameSet_onBuilded = function FDsSystemListFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.onBuilded.call(o, event);
      // 设置样式
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      //..........................................................
      // 设置分割
      var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      //..........................................................
      // 设置目录工具栏
      var control = o._catalogToolbar = RClass.create(FDsSystemListCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      // 设置目录内容
      var control = o._catalogContent = RClass.create(FDsSystemListCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      //control.addSelectedListener(o, o.selectObject);
      o._frameCatalogContent.push(control);
      //..........................................................
      // 设置属性工具栏
      var control = o._propertyToolbar = RClass.create(FDsSystemListPropertyToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyToolBar.push(control);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemListFrameSet_construct = function FDsSystemListFrameSet_construct(){
      var o = this;
      // 父处理
      o.__base.FDsSystemDesignFrameSet.construct.call(o);
   }

   //==========================================================
   // <T>目录对象选择处理。</T>
   //
   // @method
   // @param typeGroup:EUiTreeNodeGroup 类型分组枚举
   // @param propertyFrame:String 属性名称
   // @param controlName:String 控件名称
   //==========================================================
   MO.FDsSystemListFrameSet_selectObject = function FDsSystemListFrameSet_selectObject(typeGroup, propertyFrame, controlName){
      var o = this;
      var activeFrame = o._spaceContent._activeFrame;
      // 隐藏所有属性面板
      var frames = o._propertyFrames;
      var count = frames.count();
      for(var i = 0; i < count; i++){
         var frame = frames.at(i);
         frame.hide();
      }
      // 显示控件信息
      var frame = o.findPropertyFrame(propertyFrame);
      frame.show();
      if(typeGroup == EUiTreeNodeGroup.Container){
         frame.loadObject(activeFrame, activeFrame);
      }else{
         var activeControl = activeFrame.findComponent(controlName);
         frame.loadObject(activeFrame, activeControl);
         o._spaceContent.selectControl(activeControl);
      }
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemListFrameSet_load = function FDsSystemListFrameSet_load(name){
      var o = this;
      if(name){
         o._spaceContent.loadFrame(name);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemListFrameSet_dispose = function FDsSystemListFrameSet_dispose(){
      var o = this;
      // 父处理
      o.__base.FDsSystemDesignFrameSet.dispose.call(o);
   }
}
