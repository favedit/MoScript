//==========================================================
// <T>管理驾驶舱章节。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitChapter = function FEaiCockpitChapter(o){
   o = MO.Class.inherits(this, o, MO.FEaiChapter);
   //..........................................................
   // @attribute
   o._code         = MO.EEaiChapter.Chart;
   // @attribute
   o._sceneCockpit = MO.Class.register(o, new MO.AGetter('_sceneCockpit'));
   //..........................................................
   // @method
   o.construct     = MO.FEaiCockpitChapter_construct;
   // @method
   o.createScene   = MO.FEaiCockpitChapter_createScene;
   // @method
   o.dispose       = MO.FEaiCockpitChapter_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitChapter_construct = function FEaiCockpitChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}

//==========================================================
// <T>根据代码创建场景。</T>
//
// @method
// @param code:String 代码
// @return FEaiScene 场景
//==========================================================
MO.FEaiCockpitChapter_createScene = function FEaiCockpitChapter_createScene(code){
   var o = this;
   var scene = null;
   switch(code){
      // 创建客户球型数据图表
      case MO.EEaiScene.Cockpit:
         scene = o._sceneCockpit = MO.Class.create(MO.FEaiCockpitScene);
         break;
   }
   scene.linkGraphicContext(o);
   return scene;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitChapter_dispose = function FEaiCockpitChapter_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiChapter.dispose.call(o);
}
