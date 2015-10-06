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
   o._drawModeCd           = MO.Class.register(o, new MO.AGetSet('_drawModeCd'), MO.EG3dDrawMode.Triangles);
   o._splitCount           = MO.Class.register(o, new MO.AGetSet('_splitCount'), 8);
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexNormalBuffer   = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
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
   var countAngle = o._splitCount * 2;
   var countZ = o._splitCount;
   var vertexCount = o._vertexCount = (countZ + 1) * (countAngle + 1);
   var positionIndex = 0;;
   var positionData = new Float32Array(3 * vertexCount);
   var normalIndex = 0;;
   var normalData = new Float32Array(3 * vertexCount);
   var coordIndex = 0;;
   var coordData = new Float32Array(2 * vertexCount);
   var stepAngle = Math.PI * 2 / countAngle;
   var stepZ = Math.PI / countZ;
   for(var rz = 0; rz <= countZ; rz++){
      for(var r = 0; r <= countAngle; r++){
         var radius = stepAngle * r - Math.PI;
         var radiusZ = stepZ * rz - MO.Const.PI_2;
         var x = Math.sin(radius) * Math.cos(radiusZ);
         var y = Math.sin(radiusZ);
         var z = -Math.cos(radius) * Math.cos(radiusZ);
         positionData[positionIndex++] = x;
         positionData[positionIndex++] = y;
         positionData[positionIndex++] = z;
         normalData[normalIndex++] = x;
         normalData[normalIndex++] = y;
         normalData[normalIndex++] = z;
         coordData[coordIndex++] = radius / Math.PI / 2 + 0.5;
         coordData[coordIndex++] = radiusZ / Math.PI - 0.5;
      }
   }
   // 创建顶点位置缓冲
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(positionData, 4 * 3, vertexCount);
   o.pushVertexBuffer(buffer);
   // 创建顶点颜色缓冲
   var buffer = o._vertexNormalBuffer = context.createVertexBuffer();
   buffer.setCode('normal');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(normalData, 4 * 3, vertexCount);
   o.pushVertexBuffer(buffer);
   // 创建顶点纹理缓冲
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(coordData, 4 * 2, vertexCount);
   o.pushVertexBuffer(buffer);
   //..........................................................
   // 计算索引
   var drawModeCd = o._drawModeCd;
   var indexes = new MO.TArray();
   for(var rz = 0; rz < countZ; rz++){
      for(var r = 0; r < countAngle; r++){
         var i = (countAngle + 1) * rz;
         var ci = i + r;
         var ni = i + r + (countAngle + 1);
         if(drawModeCd == MO.EG3dDrawMode.Lines){
            indexes.push(ci, ni, ni, ci + 1, ci + 1, ci);
            indexes.push(ni, ni + 1, ni + 1, ci + 1, ci + 1, ni);
         }else{
            indexes.push(ci, ni, ci + 1);
            indexes.push(ni, ni + 1, ci + 1);
         }
      }
   }
   // 创建索引缓冲
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.setDrawModeCd(drawModeCd);
   var indexLength = indexes.length();
   var indexMemory = indexes.memory();
   if(indexLength > 65535){
      buffer.setStrideCd(MO.EG3dIndexStride.Uint32);
      buffer.upload(new Uint32Array(indexMemory), indexLength);
   }else{
      buffer.upload(new Uint16Array(indexMemory), indexLength);
   }
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
