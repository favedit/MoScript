with(MO){
   //==========================================================
   // <T>场景相机属性页面。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsCommonCameraFrame = function FDsCommonCameraFrame(o){
      o = MO.Class.inherits(this, o, FDuiForm);
      //..........................................................
      // @attribute
      o._workspace        = null;
      o._camera           = null;
      // @attribute
      o._controlPosition  = null;
      o._controlDirection = null;
      //..........................................................
      // @method
      o.construct         = FDsCommonCameraFrame_construct;
      // @method
      o.loadObject        = FDsCommonCameraFrame_loadObject;
      // @method
      o.dispose           = FDsCommonCameraFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonCameraFrame_construct = function FDsCommonCameraFrame_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载材质信息。</T>
   //
   // @method
   // @param s:scene:FE3dScene 场景
   // @param c:technique:FG3dTechnique 技术
   //==========================================================
   MO.FDsCommonCameraFrame_loadObject = function FDsCommonCameraFrame_loadObject(s, c){
      var o = this;
      var r = c._resource;
      // 设置属性
      o._camera = c;
      // 设置参数
      o._controlPosition.set(c.position());
      o._controlDirection.set(c.direction());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonCameraFrame_dispose = function FDsCommonCameraFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.dispose.call(o);
   }
}
