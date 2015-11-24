//==========================================================
// <T>画板简单场景。</T>
//
// @class
// @author maocy
// @history 150930
//==========================================================
MO.FCanvasSimpleScene = function FCanvasSimpleScene(o){
   o = MO.Class.inherits(this, o, MO.FCanvasScene);
   //..........................................................
   // @attribute
   o._code = MO.ECanvasScene.Simple;
   //..........................................................
   // @method
   o.setup = MO.FCanvasSimpleScene_setup;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FCanvasSimpleScene_setup = function FCanvasSimpleScene_setup(){
   var o = this;
   o.__base.FCanvasScene.setup.call(o);
   // 创建舞台
   var stage = o._activeStage = MO.Class.create(MO.FE3dSimpleStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0, 0);
}
