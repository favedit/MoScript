with(MO){
   //==========================================================
   // <T>模板属性页面。</T>
   //
   // @class
   // @author maocy
   // @history 150202
   //==========================================================
   MO.FDsCommonTechniquePropertyFrame = function FDsCommonTechniquePropertyFrame(o){
      o = RClass.inherits(this, o, FDuiForm);
      //..........................................................
      // @attribute
      o._visible              = false;
      // @attribute
      o._workspace            = null;
      o._activeSpace          = null;
      o._activeTechnique      = null;
      // @attribute
      o._controlTriangleCount = null;
      o._controlDrawCount     = null;
      // @attribute
      o._thread               = null;
      o._interval             = 2000;
      //..........................................................
      // @event
      o.onBuilded             = FDsCommonTechniquePropertyFrame_onBuilded;
      o.onDataChanged         = FDsCommonTechniquePropertyFrame_onDataChanged;
      o.onModeClick           = FDsCommonTechniquePropertyFrame_onModeClick;
      o.onRefresh             = FDsCommonTechniquePropertyFrame_onRefresh;
      //..........................................................
      // @method
      o.construct             = FDsCommonTechniquePropertyFrame_construct;
      // @method
      o.loadObject            = FDsCommonTechniquePropertyFrame_loadObject;
      // @method
      o.dispose               = FDsCommonTechniquePropertyFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonTechniquePropertyFrame_onBuilded = function FDsCommonTechniquePropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FDuiForm.onBuilded.call(o, p);
      // 增加对象
      o._controlRenderModes.addClickListener(o, o.onModeClick);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonTechniquePropertyFrame_onDataChanged = function FDsCommonTechniquePropertyFrame_onDataChanged(p){
      var o = this;
      var r = o._activeTechnique;
      r._code = o._controlCode.get();
      r._label = o._controlLabel.get();
      r._activeTechniqueCode = o._controlTechniqueCode.get();
   }

   //==========================================================
   // <T>模式点击处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonTechniquePropertyFrame_onModeClick = function FDsCommonTechniquePropertyFrame_onModeClick(ps, pi){
      var o = this;
      var m = pi.tag();
      // 场景脏处理
      o._activeTechnique._activeMode = m;
      o._activeSpace.dirty();
   }

   //==========================================================
   // <T>数据刷新处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonTechniquePropertyFrame_onRefresh = function FDsCommonTechniquePropertyFrame_onRefresh(){
      var o = this;
      // 检查可见性
      if(!o._statusVisible){
         return;
      }
      // 设置统计数据
      var s = o._activeSpace;
      var ss = s.statistics();
      var gs = s._graphicContext.statistics();
      // 场景统计
      o._controlFrameTick.set(ss._frame.toString());
      o._controlProcessTick.set(ss._frameProcess.toString() + ' | ' + ss._frameDrawRenderable.toString());
      o._controlDrawTick.set(ss._frameDraw.toString() + ' | ' + ss._frameDrawSort.toString());
      // 设备统计
      o._controlClearCount.set(gs._frameClearCount);
      o._controlModeInfo.set(
         'FIL:' + gs._frameFillModeCount +
         ' | DEP:' + gs._frameDepthModeCount +
         ' | CUL:' + gs._frameCullModeCount +
         ' | BLD:' + gs._frameBlendModeCount);
      o._controlProgramCount.set(gs._frameProgramCount);
      o._controlConstInfo.set(gs._frameConstCount + ' : length=' + gs._frameConstLength);
      o._controlBufferCount.set(gs._frameBufferCount);
      o._controlTextureCount.set(gs._frameTextureCount);
      o._controlTargetCount.set(gs._frameTargetCount);
      o._controlDrawInfo.set(gs._frameDrawCount + ' : triangle=' + gs._frameTriangleCount);
      // 设备统计
      o._controlProgramTotal.set(gs._programTotal);
      o._controlLayoutTotal.set(gs._layoutTotal);
      o._controlBufferInfo.set('Vertex:' + gs._vertexBufferTotal + ' Index:' + gs._indexBufferTotal);
      o._controlTextureInfo.set('Flat:' + gs._flatTextureTotal + ' Cube:' + gs._cubeTextureTotal);
      o._controlTargetTotal.set(gs._targetTotal);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonTechniquePropertyFrame_construct = function FDsCommonTechniquePropertyFrame_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.construct.call(o);
      // 创建线程
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onRefresh);
      RConsole.find(FThreadConsole).start(t);
   }

   //==========================================================
   // <T>加载材质信息。</T>
   //
   // @method
   // @param scene:FE3dSpace 空间
   // @param technique:FG3dTechnique 技术
   //==========================================================
   MO.FDsCommonTechniquePropertyFrame_loadObject = function FDsCommonTechniquePropertyFrame_loadObject(space, technique){
      var o = this;
      // 设置属性
      o._activeSpace = space;
      o._activeTechnique = technique;
      // 设置效果器
      var ctlModes = o._controlRenderModes;
      ctlModes.clear();
      var modes = technique.modes();
      var c = modes.count();
      for(var i = 0; i < c; i++){
         var mode = modes.getAt(i);
         var item = ctlModes.createItem(null, mode.code());
         item.setTag(mode);
         ctlModes.push(item);
      }
      // 刷新统计数据
      o.onRefresh();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonTechniquePropertyFrame_dispose = function FDsCommonTechniquePropertyFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.dispose.call(o);
   }
}
