//==========================================================
// <T>画板章节。</T>
//
// @class
// @author maocy
// @history 150930
//==========================================================
MO.FCanvasSimpleChapter = function FCanvasSimpleChapter(o){
   o = MO.Class.inherits(this, o, MO.FChapter);
   //..........................................................
   // @attribute
   o._code       = MO.ECanvasChapter.Simple;
   //..........................................................
   // @method
   o.createScene = MO.FCanvasSimpleChapter_createScene;
   return o;
}

//==========================================================
// <T>根据代码创建场景。</T>
//
// @method
// @param code:String 代码
// @return FEaiScene 场景
//==========================================================
MO.FCanvasSimpleChapter_createScene = function FCanvasSimpleChapter_createScene(code){
   var o = this;
   var scene = null;
   switch(code){
      // 简单场景
      case MO.ECanvasScene.Simple:
         scene = o._sceneSimple = MO.Class.create(MO.FCanvasSimpleScene);
         break;
   }
   scene.linkGraphicContext(o);
   return scene;
}
