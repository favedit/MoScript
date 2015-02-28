//==========================================================
// <T>图形对象。</T>
//
// @face
// @author maocy
// @history 150206
//==========================================================
MO.Graphic.FGraphicContext = function MGraphicObject(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._graphicContext    = null;
   //..........................................................
   // @method
   o.graphicContext     = MGraphicObject_graphicContext;
   o.linkGraphicContext = MGraphicObject_linkGraphicContext;
   return o;

   //==========================================================
   // <T>获得图形环境。</T>
   //
   // @method
   // @return FGraphicContext 图形环境
   //==========================================================
   function MGraphicObject_graphicContext(){
      return this._graphicContext;
   }

   //==========================================================
   // <T>关联图形环境。</T>
   //
   // @method
   // @param p:context:FGraphicContext 图形环境
   //==========================================================
   function MGraphicObject_linkGraphicContext(p){
      var o = this;
      if(RClass.isClass(p, FGraphicContext)){
         o._graphicContext = p;
      }else if(RClass.isClass(p, MGraphicObject)){
         o._graphicContext = p._graphicContext;
      }else{
         throw new TError(o, 'Link graphic context failure. (context={1})', p);
      }
   }
}
