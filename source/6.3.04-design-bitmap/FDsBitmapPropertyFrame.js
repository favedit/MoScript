with(MO){
   //==========================================================
   // <T>场景动画属性页面。</T>
   //
   // @class
   // @author maocy
   // @history 150316
   //==========================================================
   MO.FDsBitmapPropertyFrame = function FDsBitmapPropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      //..........................................................
      // @attribute
      o._activeBitmap      = null;
      // @attribute
      o._controlGuid       = null;
      o._controlCode       = null;
      o._controlLabel      = null;
      // @attribute
      o._controlSizeWidth  = null;
      o._controlSizeHeight = null;
      //..........................................................
      // @event
      o.onBuilded          = FDsBitmapPropertyFrame_onBuilded;
      o.onDataChanged      = FDsBitmapPropertyFrame_onDataChanged;
      //..........................................................
      // @method
      o.construct          = FDsBitmapPropertyFrame_construct;
      // @method
      o.loadObject         = FDsBitmapPropertyFrame_loadObject;
      // @method
      o.dispose            = FDsBitmapPropertyFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsBitmapPropertyFrame_construct = function FDsBitmapPropertyFrame_construct(){
      var o = this;
      // 父处理
      o.__base.FUiForm.construct.call(o);
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsBitmapPropertyFrame_onBuilded = function FDsBitmapPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      // 关联对象
      o._controlCode.addDataChangedListener(o, o.onDataChanged);
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   // <P>不改变渲染器代码。</P>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsBitmapPropertyFrame_onDataChanged = function FDsBitmapPropertyFrame_onDataChanged(p){
      var o = this;
      var bitmap = o._activeBitmap;
      // 设置参数
      bitmap.setCode(o._controlCode.get());
      bitmap.setLabel(o._controlLabel.get());
   }

   //==========================================================
   // <T>加载材质信息。</T>
   //
   // @method
   // @param space:FE3dSpace 空间对象
   // @param animation:FE3rAnimation 动画对象
   //==========================================================
   MO.FDsBitmapPropertyFrame_loadObject = function FDsBitmapPropertyFrame_loadObject(bitmap){
      var o = this;
      o._activeBitmap = bitmap;
      // 设置参数
      o._controlGuid.set(bitmap.guid());
      o._controlCode.set(bitmap.code());
      o._controlLabel.set(bitmap.label());
      // 设置参数
      o._controlSizeWidth.set(bitmap.sizeWidth());
      o._controlSizeHeight.set(bitmap.sizeHeight());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsBitmapPropertyFrame_dispose = function FDsBitmapPropertyFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiForm.dispose.call(o);
   }
}
