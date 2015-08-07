//===========================================================
// <T>描述器类型枚举。<T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
MO.EAnnotation = new function EAnnotation(){
   var o = this;
   // @attribute 代码
   o.Constructor = 'constructor';
   // @attribute 代码
   o.Dispose     = 'dispose';
   // @attribute 代码
   o.Source      = 'source';
   // @attribute 属性
   o.Property    = 'property';
   // @attribute 持久化属性
   o.Persistence = 'persistence';
   // @attribute 枚举v
   o.Event       = 'enum';
   // @attribute 事件
   o.Event       = 'event';
   // @attribute 关联对象
   o.Linker      = 'linker';
   // @attribute 式
   o.Style       = 'style';
   // @attribute 式图标
   o.StyleIcon   = 'icon';
   return o;
}
