//==========================================================
// <T>资源模板。</T>
//
// @author maocy
// @history 150108
//==========================================================
MO.FE3sTemplate = function FE3sTemplate(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace);
   //..........................................................
   // @attribute
   o._typeName     = 'Template';
   o._dataCompress = true;
   return o;
}
