//==========================================================
// <T>界面画板。</T>
//
// @class
// @author maocy
// @history 150805
//==========================================================
MO.FUiCanvas = function FUiCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE2dCanvas);
   //..........................................................
   // @method
   o.createContext = MO.FUiCanvas_createContext;
   return o;
}

//==========================================================
// <T>创建绘制环境。</T>
//
// @method
// @return FG2dCanvasContext 绘制环境
//==========================================================
MO.FUiCanvas_createContext = function FUiCanvas_createContext(){
   return MO.Class.create(MO.FUiCanvasContext);
}
