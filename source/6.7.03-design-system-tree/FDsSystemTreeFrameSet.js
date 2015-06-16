with(MO){
   //==========================================================
   // <T>资源框架。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsSystemTreeFrameSet = function FDsSystemTreeFrameSet(o){
      o = RClass.inherits(this, o, FDsSystemDesignFrameSet);
      //..........................................................
      // @property
      o._frameName   = 'system.design.tree.FrameSet';
      //..........................................................
      // @process
      o.onBuilded    = FDsSystemTreeFrameSet_onBuilded;
      //..........................................................
      // @method
      o.construct    = FDsSystemTreeFrameSet_construct;
      // @method
      o.selectObject = FDsSystemTreeFrameSet_selectObject;
      o.load         = FDsSystemTreeFrameSet_load;
      // @method
      o.dispose      = FDsSystemTreeFrameSet_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemTreeFrameSet_onBuilded = function FDsSystemTreeFrameSet_onBuilded(event){
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
      var control = o._catalogToolbar = RClass.create(FDsSystemTreeCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      // 设置目录内容
      var control = o._catalogContent = RClass.create(FDsSystemTreeCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      //control.addSelectedListener(o, o.selectObject);
      o._frameCatalogContent.push(control);
      //..........................................................
      // 设置属性工具栏
      var control = o._propertyToolbar = RClass.create(FDsSystemTreePropertyToolBar);
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
   MO.FDsSystemTreeFrameSet_construct = function FDsSystemTreeFrameSet_construct(){
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
   MO.FDsSystemTreeFrameSet_selectObject = function FDsSystemTreeFrameSet_selectObject(typeGroup, propertyFrame, controlName){
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
   MO.FDsSystemTreeFrameSet_load = function FDsSystemTreeFrameSet_load(name){
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
   MO.FDsSystemTreeFrameSet_dispose = function FDsSystemTreeFrameSet_dispose(){
      var o = this;
      // 父处理
      o.__base.FDsSystemDesignFrameSet.dispose.call(o);
   }
}
