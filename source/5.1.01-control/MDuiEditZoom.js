with(MO){
   //==========================================================
   // <T>数据详细窗口的接口。</T>
   //
   // @face
   // @author maocy
   // @version 150102
   //==========================================================
   MO.MUiEditZoom = function MUiEditZoom(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @property
      o._zoomReference = RClass.register(o, new APtyString('_zoomReference'));
      o._zoomField     = RClass.register(o, new APtyString('_zoomField'));
      //..........................................................
      // @method
      o.testZoom   = MUiEditZoom_testZoom;
      o.doZoom     = MUiEditZoom_doZoom;
      return o;
   }

   //==========================================================
   // <T>测试当前对象是否允许弹出详细窗口。</T>
   //
   // @method
   // @return Boolean 是否允许
   //==========================================================
   MO.MUiEditZoom_testZoom = function MUiEditZoom_testZoom(){
      return !RString.isEmpty(this._zoomReference);
   }

   //==========================================================
   // <T>弹出关联的数据详细窗口。</T>
   //
   // @method
   // @param p:value:String 数据
   //==========================================================
   MO.MUiEditZoom_doZoom = function MUiEditZoom_doZoom(p){
      RFormSpace.doZoom(this, p);
   }
}
