 //==========================================================
// <T>渲染位图。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FE3dBitmap = function FE3dBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3dFace);
   //..........................................................
   // @method
   o.construct = MO.FE3dBitmap_construct;
   // @method
   o.testReady = MO.FE3dBitmap_testReady;
   o.loadUrl   = MO.FE3dBitmap_loadUrl;
   // @method
   o.dispose   = MO.FE3dBitmap_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dBitmap_construct = function FE3dBitmap_construct(){
   var o = this;
   o.__base.FE3dFace.construct.call(o);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
MO.FE3dBitmap_testReady = function FE3dBitmap_testReady(){
   var o = this;
   if(!o._ready){
      var renderable = o._renderable;
      if(renderable){
         // 检查是否准备好
         o._ready = renderable.testReady();
         if(o._ready){
            var size = renderable.size();
            var adjustSize = renderable.adjustSize();
            var matrix = o.matrix();
            //matrix.sx = adjustSize.width / size.width;
            matrix.sz = adjustSize.height / size.height;
            matrix.updateForce();
            var event = new MO.SEvent(o);
            o.processLoadListener(event);
            event.dispose();
         }
         // 设置材质引用
         o._materialReference = renderable;
      }
   }
   return o._ready;
}

//==========================================================
// <T>加载位图处理。</T>
//
// @method
//==========================================================
MO.FE3dBitmap_loadUrl = function FE3dBitmap_loadUrl(url){
   var o = this;
   o._renderable = MO.Console.find(MO.FE3dBitmapConsole).loadDataByUrl(o, url);
   o._ready = false;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dBitmap_dispose = function FE3dBitmap_dispose(){
   var o = this;
   // 父处理
   o.__base.FE3dFace.dispose.call(o);
}
