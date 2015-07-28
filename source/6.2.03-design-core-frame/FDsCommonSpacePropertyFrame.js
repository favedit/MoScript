with(MO){
   //==========================================================
   // <T>空间属性页面。</T>
   //
   // @class
   // @author maocy
   // @history 150325
   //==========================================================
   MO.FDsCommonSpacePropertyFrame = function FDsCommonSpacePropertyFrame(o){
      o = RClass.inherits(this, o, FDuiForm);
      //..........................................................
      // @attribute
      o._visible      = false;
      // @attribute
      o._workspace    = null;
      o._activeSpace  = null;
      // @attribute
      o._controlGuid  = null;
      o._controlCode  = null;
      o._controlLabel = null;
      //..........................................................
      // @event
      o.onBuilded     = FDsCommonSpacePropertyFrame_onBuilded;
      o.onDataChanged = FDsCommonSpacePropertyFrame_onDataChanged;
      //..........................................................
      // @method
      o.construct     = FDsCommonSpacePropertyFrame_construct;
      // @method
      o.loadObject    = FDsCommonSpacePropertyFrame_loadObject;
      // @method
      o.dispose       = FDsCommonSpacePropertyFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonSpacePropertyFrame_onBuilded = function FDsCommonSpacePropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FDuiForm.onBuilded.call(o, p);
      // 关联事件
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonSpacePropertyFrame_onDataChanged = function FDsCommonSpacePropertyFrame_onDataChanged(p){
      var o = this;
      var space = o._activeSpace;
      var resource = space.resource();
      // 设置属性
      resource.setLabel(o._controlLabel.get());
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonSpacePropertyFrame_construct = function FDsCommonSpacePropertyFrame_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载材质信息。</T>
   //
   // @method
   // @param space:FE3dSpace 空间
   //==========================================================
   MO.FDsCommonSpacePropertyFrame_loadObject = function FDsCommonSpacePropertyFrame_loadObject(space){
      var o = this;
      var resource = space.resource();
      // 设置属性
      o._activeSpace = space;
      // 设置参数
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonSpacePropertyFrame_dispose = function FDsCommonSpacePropertyFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.dispose.call(o);
   }
}
