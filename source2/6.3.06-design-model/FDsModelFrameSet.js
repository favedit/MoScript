with(MO){
   //==========================================================
   // <T>模板工作区域。</T>
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsModelFrameSet = function FDsModelFrameSet(o){
      o = RClass.inherits(this, o, FDsFrameSet);
      //..........................................................
      // @attribute
      o._frameCatalog         = null;
      o._frameCatalogToolBar  = null;
      o._frameCatalogContent  = null;
      o._frameCanvas          = null;
      o._frameCanvasToolBar   = null;
      o._frameCanvasContent   = null;
      o._frameProperty        = null;
      o._framePropertyToolBar = null;
      o._framePropertyContent = null;
      //..........................................................
      // @process
      o.onBuilded             = FDsModelFrameSet_onBuilded;
      o.onDataLoaded          = FDsModelFrameSet_onDataLoaded;
      o.onCatalogSelected     = FDsModelFrameSet_onCatalogSelected;
      //..........................................................
      // @method
      o.construct             = FDsModelFrameSet_construct;
      // @method
      o.loadByGuid            = FDsModelFrameSet_loadByGuid;
      o.loadByCode            = FDsModelFrameSet_loadByCode;
      // @method
      o.dispose               = FDsModelFrameSet_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsModelFrameSet_onBuilded = function FDsModelFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, event);
      //..........................................................
      // 设置样式
      o._frameCatalogToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameCanvasToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      //..........................................................
      // 设置分割
      var spliter = o._spliterCatalog;
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var spliter = o._spliterProperty;
      spliter.setAlignCd(EUiAlign.Right);
      spliter.setSizeHtml(o._frameProperty._hPanel);
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsModelFrameSet_onDataLoaded = function FDsModelFrameSet_onDataLoaded(event){
      var o = this;
      var sender = event.sender;
      var space = o._activeSpace = sender.activeSpace();
      o._catalogContent.buildSpace(space);
   }

   //==========================================================
   // <T>目录对象选择处理。</T>
   //
   // @method
   // @param select:FObject 选择对象
   // @param flag:Boolean 选择标志
   //==========================================================
   MO.FDsModelFrameSet_onCatalogSelected = function FDsModelFrameSet_onCatalogSelected(select, flag){
      var o = this;
      // 检查空间
      var space = o._activeSpace;
      if(!space){
         return;
      }
      // 隐藏所有属性面板
      o.hidePropertyFrames();
      // 显示选中属性面板
      if(RClass.isClass(select, FE3dSpace)){
         var frame = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dTechnique)){
         var frame = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dRegion)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dCamera)){
         var frame = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dLight)){
         var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dModelDisplay)){
         var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dMaterial)){
         var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dModelRenderable)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else{
         throw new TError('Unknown select object type. (select={1})', select);
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsModelFrameSet_construct = function FDsModelFrameSet_construct(){
      var o = this;
      // 父处理
      o.__base.FDsFrameSet.construct.call(o);
   }

   //==========================================================
   // <T>根据唯一编码加载模型。</T>
   //
   // @method
   // @param guid:String 唯一编码
   //==========================================================
   MO.FDsModelFrameSet_loadByGuid = function FDsModelFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      o._canvasContent.loadByGuid(guid);
   }

   //==========================================================
   // <T>根据代码加载模型。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsModelFrameSet_loadByCode = function FDsModelFrameSet_loadByCode(code){
      var o = this;
      o._activeCode = code;
      o._canvasContent.loadByCode(code);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsModelFrameSet_dispose = function FDsModelFrameSet_dispose(){
      var o = this;
      // 父处理
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
