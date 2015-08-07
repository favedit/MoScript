//==========================================================
// <T>界面画板。</T>
//
// @class
// @author maocy
// @history 150805
//==========================================================
MO.FGuiCanvas = function FGuiCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE2dCanvas);
   //..........................................................
   // @method
   o.createContext = MO.FGuiCanvas_createContext;
   return o;
}

//==========================================================
// <T>创建绘制环境。</T>
//
// @method
// @return FG2dCanvasContext 绘制环境
//==========================================================
MO.FGuiCanvas_createContext = function FGuiCanvas_createContext(){
   return MO.Class.create(MO.FGuiCanvasContext);
}
