/**************************************************************
 * 图标类型枚举
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function EIconFace(){
   var o = this;
   // Attribute
   o.None      = 'n';
   o.SysBlock  = 'block';
   o.SysPlus   = 'plus';
   o.SysMinus  = 'minus';
   o.SysEmpty  = 'empty';
   o.SysNode   = 'node';
   o.SysSearch = 'search';
   o.Floder    = 'floder';
   o.Tree      = 'tv';
   return o;
}
var EIcon = new EIconFace();
