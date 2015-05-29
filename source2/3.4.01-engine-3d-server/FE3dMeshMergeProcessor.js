with(MO){
   //==========================================================
   // <T>引擎服务进程。</T>
   //
   // @class
   // @author maocy
   // @version 150305
   //==========================================================
   MO.FE3dMeshMergeProcessor = function FE3dMeshMergeProcessor(o){
      o = RClass.inherits(this, o, FProcessor);
      //..........................................................
      // @attribute
      o._typeName  = null;
      o._groupName = null;
      o._name      = null;
      //..........................................................
      // @method
      o.name  = FE3dMeshMergeProcessor_name;
      return o;
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   MO.FE3dMeshMergeProcessor_name = function FE3dMeshMergeProcessor_name(){
      return this._name;
   }
}
