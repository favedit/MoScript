//==========================================================
// <T>渲染程序属性。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FRenderProgramAttribute(o){
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
   o.index = -1;
   // @attribute 格式
   o.formatCd = -1;
   return o;
}
