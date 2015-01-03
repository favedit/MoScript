//==========================================================
// <T>渲染程序取样。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FRenderProgramSampler(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute 名称
   o.name = null;
   // @attribute 关联名称
   o.linker = null;
   // @attribute 使用标志
   o.statusUsed = false;
   // @attribute 插槽
   o.slot = -1;
   // @attribute 索引
   o.index = 0;
   // @attribute 来源
   o.source = null;
   return o;
}
