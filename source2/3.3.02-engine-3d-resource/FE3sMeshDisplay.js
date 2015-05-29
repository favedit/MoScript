with(MO){
   //==========================================================
   // <T>资源显示。</T>
   //
   // @author maocy
   // @history 150129
   //==========================================================
   MO.FE3sMeshDisplay = function FE3sMeshDisplay(o){
      o = RClass.inherits(this, o, FE3sObject);
      //..........................................................
      // @attribute
      o._matrix     = null;
      o._material   = null;
      o._renderable = null;
      //..........................................................
      // @method
      o.construct   = FE3sMeshDisplay_construct;
      // @method
      o.matrix      = FE3sMeshDisplay_matrix;
      o.material    = FE3sMeshDisplay_material;
      o.renderable  = FE3sMeshDisplay_renderable;
      // @method
      o.unserialize = FE3sMeshDisplay_unserialize;
      o.saveConfig  = FE3sMeshDisplay_saveConfig;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3sMeshDisplay_construct = function FE3sMeshDisplay_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._matrix = new SMatrix3d();
      o._material = RClass.create(FE3sMaterial);
      o._renderable = RClass.create(FE3sRenderable);
   }

   //==========================================================
   // <T>获得矩阵。</T>
   //
   // @method
   // @return SMatrix3d 矩阵
   //==========================================================
   MO.FE3sMeshDisplay_matrix = function FE3sMeshDisplay_matrix(){
      return this._matrix;
   }

   //==========================================================
   // <T>获得材质。</T>
   //
   // @method
   // @return FE3sMaterial 材质
   //==========================================================
   MO.FE3sMeshDisplay_material = function FE3sMeshDisplay_material(){
      return this._material;
   }

   //==========================================================
   // <T>获得材质集合。</T>
   //
   // @method
   // @return TObjects 材质集合
   //==========================================================
   MO.FE3sMeshDisplay_renderable = function FE3sMeshDisplay_renderable(){
      return this._renderable;
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param p:input:FByteStream 数据流
   // @return 处理结果
   //==========================================================
   MO.FE3sMeshDisplay_unserialize = function FE3sMeshDisplay_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      // 读取属性
      o._matrix.unserialize(p);
      o._material.unserialize(p);
      o._renderable.unserialize(p);
   }

   //==========================================================
   // <T>数据内容存储到配置节点中。</T>
   //
   // @method
   // @param p:config:TXmlNode 配置节点
   //==========================================================
   MO.FE3sMeshDisplay_saveConfig = function FE3sMeshDisplay_saveConfig(p){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, p);
      // 存储属性
      o._matrix.saveConfig(p.create('Matrix'));
      o._material.saveConfig(p.create('Material'));
      o._renderable.saveConfig(p.create('Renderable'));
   }
}
