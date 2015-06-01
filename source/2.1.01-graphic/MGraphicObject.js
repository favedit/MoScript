with(MO){
   //==========================================================
   // <T>图形对象。</T>
   //
   // @face
   // @author maocy
   // @history 150206
   //==========================================================
   MO.MGraphicObject = function MGraphicObject(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @attribute
      o._graphicContext    = null;
      //..........................................................
      // @method
      o.graphicContext     = MGraphicObject_graphicContext;
      o.linkGraphicContext = MGraphicObject_linkGraphicContext;
      o.dispose            = MGraphicObject_dispose;
      return o;
   }

   //==========================================================
   // <T>获得图形环境。</T>
   //
   // @method
   // @return FGraphicContext 图形环境
   //==========================================================
   MO.MGraphicObject_graphicContext = function MGraphicObject_graphicContext(){
      return this._graphicContext;
   }

   //==========================================================
   // <T>关联图形环境。</T>
   //
   // @method
   // @param p:context:FGraphicContext 图形环境
   //==========================================================
   MO.MGraphicObject_linkGraphicContext = function MGraphicObject_linkGraphicContext(context){
      var o = this;
      if(RClass.isClass(context, FGraphicContext)){
         o._graphicContext = context;
      }else if(RClass.isClass(context, MGraphicObject)){
         o._graphicContext = context._graphicContext;
      }else{
         throw new TError(o, 'Link graphic context failure. (context={1})', context);
      }
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
}
