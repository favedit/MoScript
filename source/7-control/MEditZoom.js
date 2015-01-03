//==========================================================
// <T>数据详细窗口的接口。</T>
//
// @face
// @author maocy
// @version 150102
//==========================================================
function MEditZoom(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property
   o._zoomRefer = RClass.register(o, new APtyString(null, '_zoomRefer'));
   o._zoomField = RClass.register(o, new APtyString(null, '_zoomField'));
   //..........................................................
   // @method
   o.testZoom   = MEditZoom_testZoom;
   o.doZoom     = MEditZoom_doZoom;
   return o;
}

//==========================================================
// <T>测试当前对象是否允许弹出详细窗口。</T>
//
// @method
// @return Boolean 是否允许
//==========================================================
function MEditZoom_testZoom(){
   return !RString.isEmpty(this.zoomRefer);
}

//==========================================================
// <T>弹出关联的数据详细窗口。</T>
//
// @method
// @param v:value:String 数据
//==========================================================
function MEditZoom_doZoom(v){
   RFormSpace.doZoom(this, v);
}
