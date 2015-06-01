with(MO){
   //==========================================================
   // <T>渲染立方体。</T>
   //
   // @class
   // @author maocy
   // @history 150207
   //==========================================================
   MO.FE3dSphere = function FE3dSphere(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      //..........................................................
      // @attribute
      o._outline              = null;
      o._splitCount           = 8;
      // @attribute
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      //..........................................................
      // @method
      o.construct             = FE3dSphere_construct;
      // @method
      o.splitCount            = FE3dSphere_splitCount;
      o.setSplitCount         = FE3dSphere_setSplitCount;
      // @method
      o.setup                 = FE3dSphere_setup;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dSphere_construct = function FE3dSphere_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      // 设置属性
      o._material = RClass.create(FE3dMaterial);
      o._outline = new SOutline3();
   }

   //==========================================================
   // <T>获得分割数。</T>
   //
   // @method
   // @return Integer 分割数
   //==========================================================
   MO.FE3dSphere_splitCount = function FE3dSphere_splitCount(){
      return this._splitCount;
   }

   //==========================================================
   // <T>设置分割数。</T>
   //
   // @method
   // @param count:Integer 分割数
   //==========================================================
   MO.FE3dSphere_setSplitCount = function FE3dSphere_setSplitCount(count){
      this._splitCount = count;
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dSphere_setup = function FE3dSphere_setup(){
      var o = this;
      var context = o._graphicContext;
      // 计算坐标
      var positions = new TArray();
      var normals = new TArray();
      var cr = o._splitCount * 2;
      var cz = o._splitCount;
      var stepr = Math.PI * 2 / cr;
      var stepz = Math.PI / cz;
      var count = 0;
      for(var rz = 0; rz <= cz; rz++){
         for(var r = 0; r < cr; r++){
            var radius = stepr * r - Math.PI;
            var radiusZ = stepz * rz - RConst.PI_2;
            var x = Math.sin(radius) * Math.cos(radiusZ);
            var y = Math.sin(radiusZ);
            var z = -Math.cos(radius) * Math.cos(radiusZ);
            positions.push(x, y, z);
            normals.push(x, y, z);
            count++;
         }
      }
      o._vertexCount = count;
      // 创建顶点缓冲
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer._name = 'position';
      buffer._formatCd = EG3dAttributeFormat.Float3;
      buffer.upload(new Float32Array(positions.memory()), 4 * 3, count);
      o._vertexBuffers.set(buffer._name, buffer);
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer._name = 'normal';
      buffer._formatCd = EG3dAttributeFormat.Float3;
      buffer.upload(new Float32Array(normals.memory()), 4 * 3, count);
      o._vertexBuffers.set(buffer._name, buffer);
      //..........................................................
      // 计算索引
      var indexes = new TArray();
      for(var rz = 0; rz < cz; rz++){
         for(var r = 0; r < cr; r++){
            var i = cr * rz;
            var ci = i + r;
            var ni = i + r + cr;
            if(r == cr - 1){
               indexes.push(ci, ni, i);
               indexes.push(ni, i + cr, i);
            }else{
               indexes.push(ci, ni, ci + 1);
               indexes.push(ni, ni + 1, ci + 1);
            }
         }
      }
      // 创建索引缓冲
      var ib = o._indexBuffer = context.createIndexBuffer();
      //ib._fillMode = EG3dFillMode.Line;
      //ib._lineWidth = 1;
      ib.upload(new Uint16Array(indexes.memory()), indexes.length());
      //..........................................................
      // 更新处理
      o.update();
      //..........................................................
      // 设置材质
      var info = o.material().info();
      //info.effectCode = 'control';
      //info.optionDouble = true;
      info.ambientColor.set(0.2, 0.2, 0.2, 1);
      info.diffuseColor.set(0.8, 0.8, 0.8, 1);
      info.specularColor.set(0.8, 0.8, 0.8, 1);
      info.specularLevel = 64;
   }
}
