//==========================================================
// <T>画板控制台。</T>
//
// @console
// @author maocy
// @version 150411
//==========================================================
MO.FE2dCanvasConsole = function FE2dCanvasConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = MO.EScope.Local;
   // @attribute
   o._pools      = null;
   //..........................................................
   // @method
   o.construct   = MO.FE2dCanvasConsole_construct;
   // @method
   o.allocBySize = MO.FE2dCanvasConsole_allocBySize;
   o.free        = MO.FE2dCanvasConsole_free;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE2dCanvasConsole_construct = function FE2dCanvasConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._pools = MO.Class.create(MO.FObjectPools);
}

//==========================================================
// <T>根据大小收集一个画板。</T>
//
// @method
// @param width:Integer 宽度
// @param height:Integer 高度
// @return FE2dCanvas 画板
//==========================================================
MO.FE2dCanvasConsole_allocBySize = function FE2dCanvasConsole_allocBySize(width, height, clazz){
   var o = this;
   var pools = o._pools;
   // 查找画板
   var code = width + 'x' + height;
   var canvas = pools.alloc(code);
   if(!canvas){
      // 创建画板
      canvas = MO.Class.create(MO.Runtime.nvl(clazz, MO.FE2dCanvas));
      canvas.size().set(width, height);
      canvas.build(MO.Window._hDocument);
   }
   // 重置处理
   canvas.reset();
   return canvas;
}

//==========================================================
// <T>释放一个画板。</T>
//
// @method
// @param canvas:FE2dCanvas 画板
//==========================================================
MO.FE2dCanvasConsole_free = function FE2dCanvasConsole_free(canvas){
   var o = this;
   var pools = o._pools;
   // 查找画板
   var size = canvas.size();
   var code = size.width + 'x' + size.height;
   pools.free(code, canvas);
}
