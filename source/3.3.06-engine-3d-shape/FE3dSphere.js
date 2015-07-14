//==========================================================
// <T>渲染立方体。</T>
//
// @class
// @author maocy
// @history 150207
//==========================================================
MO.FE3dSphere = function FE3dSphere(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._outline              = null;
   o._splitCount           = MO.Class.register(o, new MO.AGetter('_splitCount'), 8);
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   //..........................................................
   // @method
   o.construct             = MO.FE3dSphere_construct;
   // @method
   o.setup                 = MO.FE3dSphere_setup;
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
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._outline = new MO.SOutline3();
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
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(new Float32Array(positions.memory()), 4 * 3, count);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('normal');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(new Float32Array(normals.memory()), 4 * 3, count);
   o.pushVertexBuffer(buffer);
   //..........................................................
   // 计算索引
   var indexes = new MO.TArray();
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
   var buffer = context.createIndexBuffer();
   //ib._fillMode = EG3dFillMode.Line;
   //ib._lineWidth = 1;
   buffer.upload(new Uint16Array(indexes.memory()), indexes.length());
   o.pushIndexBuffer(buffer);
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
