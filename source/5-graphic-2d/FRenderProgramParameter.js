//==========================================================
// <T>渲染程序参数。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FRenderProgramParameter(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute 名称
   o.name = null;
   // @attribute 关联名称
   o.linker = null;
   // @attribute 使用标志
   o.statusUsed = false;
   // @attribute 渲染器类型
   o.shaderCd = -1;
   // @attribute 格式
   o.formatCd = -1;
   // @attribute 插槽
   o.slot = -1;
   // @attribute 大小
   o.size = 0;
   // @attribute 缓冲
   o.buffer = null;
   return o;
}
