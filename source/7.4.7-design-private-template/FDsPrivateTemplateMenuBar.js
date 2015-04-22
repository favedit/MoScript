//==========================================================
// <T>私有模板菜单栏。</T>
//
// @method
// @author maocy
// @history 150422
//==========================================================
function FDsPrivateTemplateMenuBar(o){
   o = RClass.inherits(this, o, FDsTemplateMenuBar);
   //..........................................................
   // @property
   o._frameName = 'resource.private.template.MenuBar';
   return o;
}
