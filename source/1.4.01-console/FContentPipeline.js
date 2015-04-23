//==========================================================
// <T>内容管道。</T>
//
// @class
// @author maocy
// @version 141231
//==========================================================
function FContentPipeline(o){
   o = RClass.inherits(this, o, FPipeline);
   //..........................................................
   // @attribute
   o._scopeCd = EScope.Global;
   //..........................................................
   // @method
   o.scopeCd  = FContentPipeline_scopeCd;
   return o;
}

//==========================================================
// <T>获得范围类型。</T>
//
// @method
// @return 范围类型
//==========================================================
function FContentPipeline_scopeCd(){
   return this._scopeCd;
}
