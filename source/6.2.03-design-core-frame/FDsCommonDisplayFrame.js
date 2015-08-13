with(MO){
   //==========================================================
   // <T>网格显示页面。</T>
   //
   // @class
   // @author maocy
   // @history 150325
   //==========================================================
   MO.FDsCommonDisplayFrame = function FDsCommonDisplayFrame(o){
      o = MO.Class.inherits(this, o, FDuiForm);
      //..........................................................
      // @attribute
      o._activeSpace   = null;
      o._activeDisplay = null;
      //..........................................................
      // @event
      o.onBuilded      = FDsCommonDisplayFrame_onBuilded;
      o.onDataChanged  = FDsCommonDisplayFrame_onDataChanged;
      //..........................................................
      // @method
      o.construct      = FDsCommonDisplayFrame_construct;
      // @method
      o.loadObject     = FDsCommonDisplayFrame_loadObject;
      // @method
      o.dispose        = FDsCommonDisplayFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonDisplayFrame_onBuilded = function FDsCommonDisplayFrame_onBuilded(p){
      var o = this;
      o.__base.FDuiForm.onBuilded.call(o, p);
      // 关联对象
      o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
      o._controlRotation.addDataChangedListener(o, o.onDataChanged);
      o._controlScale.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonDisplayFrame_onDataChanged = function FDsCommonDisplayFrame_onDataChanged(p){
      var o = this;
      var display = o._activeDisplay;
      var resource = display.resource();
      var matrix = resource.matrix();
      // 设置环境颜色
      var value = o._controlTranslate.get();
      matrix.setTranslate(value.x, value.y, value.z);
      // 设置散射颜色
      var value = o._controlRotation.get();
      matrix.setRotation(value.x, value.y, value.z);
      // 设置高光颜色
      var value = o._controlScale.get();
      matrix.setScale(value.x, value.y, value.z);
      // 重新计算
      matrix.update();
      display.matrix().assign(matrix);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonDisplayFrame_construct = function FDsCommonDisplayFrame_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载显示信息。</T>
   //
   // @method
   // @param space:FE3dSpace 空间
   // @param display:FE3dDisplay 显示
   //==========================================================
   MO.FDsCommonDisplayFrame_loadObject = function FDsCommonDisplayFrame_loadObject(space, display){
      var o = this;
      var resource = display.resource();
      o._activeSpace = space;
      o._activeDisplay = display;
      // 获得矩阵
      var matrix = resource.matrix();
      // 设置参数
      o._controlTranslate.set(matrix.tx, matrix.ty, matrix.tz);
      o._controlRotation.set(matrix.rx, matrix.ry, matrix.rz);
      o._controlScale.set(matrix.sx, matrix.sy, matrix.sz);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonDisplayFrame_dispose = function FDsCommonDisplayFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.dispose.call(o);
   }
}
