//==========================================================
// <T>数据详细窗口的接口。</T>
//
// @face
// @author maocy
// @version 150906
//==========================================================
MO.MUiDescriptorZoom = function MUiDescriptorZoom(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._zoomFrame = MO.Class.register(o, new MO.APtyString('_zoomFrame'));
   o._zoomField = MO.Class.register(o, new MO.APtyString('_zoomField'));
   //..........................................................
   // @method
   o.testZoom   = MO.MUiDescriptorZoom_testZoom;
   o.doZoom     = MO.MUiDescriptorZoom_doZoom;
   return o;
}

//==========================================================
// <T>测试当前对象是否允许弹出详细窗口。</T>
//
// @method
// @return Boolean 是否允许
//==========================================================
MO.MUiDescriptorZoom_testZoom = function MUiDescriptorZoom_testZoom(){
   return !MO.Lang.String.isEmpty(this._zoomFrame);
}

//==========================================================
// <T>弹出关联的数据详细窗口。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
MO.MUiDescriptorZoom_doZoom = function MUiDescriptorZoom_doZoom(p){
   MO.RFormSpace.doZoom(this, p);
}
