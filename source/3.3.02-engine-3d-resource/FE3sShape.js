with(MO){
   //==========================================================
   // <T>资源显示。</T>
   //
   // @author maocy
   // @history 150129
   //==========================================================
   MO.FE3sShape = function FE3sShape(o){
      o = RClass.inherits(this, o, FE3sRenderable);
      //..........................................................
      // @attribute
      o._modelGuid    = null;
      o._model        = null;
      o._meshGuid     = null;
      o._mesh         = null;
      o._materialGuid = null;
      o._material     = null;
      //..........................................................
      // @method
      o.construct     = FE3sShape_construct;
      // @method
      o.modelGuid     = FE3sShape_modelGuid;
      o.model         = FE3sShape_model;
      o.meshGuid      = FE3sShape_meshGuid;
      o.mesh          = FE3sShape_mesh;
      o.materialGuid  = FE3sShape_materialGuid;
      o.material      = FE3sShape_material;
      // @method
      o.unserialize   = FE3sShape_unserialize;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3sShape_construct = function FE3sShape_construct(){
      var o = this;
      o.__base.FE3sRenderable.construct.call(o);
   }

   //==========================================================
   // <T>获得模型编号。</T>
   //
   // @method
   // @return String 模型编号
   //==========================================================
   MO.FE3sShape_modelGuid = function FE3sShape_modelGuid(){
      return this._modelGuid;
   }

   //==========================================================
   // <T>获得模型。</T>
   //
   // @method
   // @return FE3sModel 模型
   //==========================================================
   MO.FE3sShape_model = function FE3sShape_model(){
      var o = this;
      var model = o._model;
      if(!model){
         model = o._model = RConsole.find(FE3sModelConsole).findModel(o._modelGuid);
      }
      return model;
   }

   //==========================================================
   // <T>获得网格编号。</T>
   //
   // @method
   // @return String 网格编号
   //==========================================================
   MO.FE3sShape_meshGuid = function FE3sShape_meshGuid(){
      return this._meshGuid;
   }

   //==========================================================
   // <T>获得网格。</T>
   //
   // @method
   // @return FE3sMesh 网格
   //==========================================================
   MO.FE3sShape_mesh = function FE3sShape_mesh(){
      var o = this;
      var mesh = o._mesh;
      if(!mesh){
         mesh = o._mesh = RConsole.find(FE3sModelConsole).findMesh(this._meshGuid);
      }
      return mesh;
   }

   //==========================================================
   // <T>获得材质编号。</T>
   //
   // @method
   // @return String 材质编号
   //==========================================================
   MO.FE3sShape_materialGuid = function FE3sShape_materialGuid(){
      return this._materialGuid;
   }

   //==========================================================
   // <T>获得材质。</T>
   //
   // @method
   // @return FE3sMaterial 材质
   //==========================================================
   MO.FE3sShape_material = function FE3sShape_material(){
      var o = this;
      var material = o._material;
      if(!material){
         material = o._material = RConsole.find(FE3sMaterialConsole).find(this._materialGuid);
      }
      return material;
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @method
   // @param input:FByteStream 数据流
   //==========================================================
   MO.FE3sShape_unserialize = function FE3sShape_unserialize(input){
      // 读取父信息
      var o = this;
      o.__base.FE3sRenderable.unserialize.call(o, input);
      // 读取属性
      o._modelGuid = input.readString();
      o._meshGuid = input.readString();
      o._materialGuid = input.readString();
   }
}
