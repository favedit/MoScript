with(MO){
   //==========================================================
   // <T>场景动画属性页面。</T>
   //
   // @class
   // @author maocy
   // @history 150316
   //==========================================================
   MO.FDsCommonAnimationPropertyFrame = function FDsCommonAnimationPropertyFrame(o){
      o = RClass.inherits(this, o, FDuiForm);
      //..........................................................
      // @attribute
      o._visible         = false;
      // @attribute
      o._activeSpace     = null;
      o._activeAnimation = null;
      // @attribute
      o._controlGuid     = null;
      o._controlCode     = null;
      o._controlLabel    = null;
      // @event
      //..........................................................
      o.onBuilded        = FDsCommonAnimationPropertyFrame_onBuilded;
      o.onDataChanged    = FDsCommonAnimationPropertyFrame_onDataChanged;
      //..........................................................
      // @method
      o.construct        = FDsCommonAnimationPropertyFrame_construct;
      // @method
      o.loadObject       = FDsCommonAnimationPropertyFrame_loadObject;
      // @method
      o.dispose          = FDsCommonAnimationPropertyFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonAnimationPropertyFrame_construct = function FDsCommonAnimationPropertyFrame_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.construct.call(o);
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonAnimationPropertyFrame_onBuilded = function FDsCommonAnimationPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FDuiForm.onBuilded.call(o, p);
      // 关联对象
      o._controlCode.addDataChangedListener(o, o.onDataChanged);
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
      // 关联对象
      o._controlPlayRate.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   // <P>不改变渲染器代码。</P>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonAnimationPropertyFrame_onDataChanged = function FDsCommonAnimationPropertyFrame_onDataChanged(p){
      var o = this;
      var animation = o._activeAnimation;
      var resource = animation.resource();
      // 设置参数
      resource.setCode(o._controlCode.get());
      resource.setLabel(o._controlLabel.get());
      resource._playRate = o._controlPlayRate.get();
      // 重新加载数据
      animation.reloadResource();
   }

   //==========================================================
   // <T>加载材质信息。</T>
   //
   // @method
   // @param space:FE3dSpace 空间对象
   // @param animation:FE3rAnimation 动画对象
   //==========================================================
   MO.FDsCommonAnimationPropertyFrame_loadObject = function FDsCommonAnimationPropertyFrame_loadObject(space, animation){
      var o = this;
      var resource = animation.resource();
      o._activeSpace = space;
      o._activeAnimation = animation;
      // 获得场景动画资源
      //var display = animation._display;
      //var displayResource = display.resourceScene();
      //var animationResource = displayResource.findAnimation(resource.guid());
      // 设置参数
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
      // 设置参数
      o._controlPlayRate.set(resource.playRate());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonAnimationPropertyFrame_dispose = function FDsCommonAnimationPropertyFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.dispose.call(o);
   }
}
