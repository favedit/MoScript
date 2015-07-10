//==========================================================
// <T>图形对象。</T>
//
// @face
// @author maocy
// @history 150206
//==========================================================
MO.MGraphicObject = function MGraphicObject(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._graphicContext    = MO.Class.register(o, new MO.AGetter('_graphicContext'));
   //..........................................................
   // @method
   o.linkGraphicContext = MO.MGraphicObject_linkGraphicContext;
   // @method
   o.dispose            = MO.MGraphicObject_dispose;
   return o;
}

//==========================================================
// <T>关联图形环境。</T>
//
// @method
// @param context:FGraphicContext 图形环境
//==========================================================
MO.MGraphicObject_linkGraphicContext = function MGraphicObject_linkGraphicContext(context){
   var o = this;
   if(MO.Class.isClass(context, MO.FGraphicContext)){
      o._graphicContext = context;
   }else if(MO.Class.isClass(context, MO.MGraphicObject)){
      o._graphicContext = context.graphicContext();
   }else{
      throw new MO.TError(o, 'Link graphic context failure. (context={1})', context);
   }
   MO.Assert.debugNotNull(o._graphicContext);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MGraphicObject_dispose = function MGraphicObject_dispose(){
   var o = this;
   o._graphicContext = null;
}
