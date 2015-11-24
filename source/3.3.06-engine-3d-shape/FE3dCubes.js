//==========================================================
// <T>渲染立方体集合。</T>
//      04 ── 05
//    ╱│    ╱ │
//  00 ── 01   │
//  │  07─│─ 06
//  │╱    │ ╱
//  03 ── 02
//
// @class
// @author maocy
// @history 150207
//==========================================================
MO.FE3dCubes = function FE3dCubes(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._optionCenterX        = MO.Class.register(o, new MO.AGetSet('_optionCenterX'), true);
   o._optionCenterY        = MO.Class.register(o, new MO.AGetSet('_optionCenterY'), true);
   o._optionCenterZ        = MO.Class.register(o, new MO.AGetSet('_optionCenterZ'), true);
   o._outline              = null;
   o._drawModeCd           = MO.Class.register(o, new MO.AGetSet('_drawModeCd'), MO.EG3dDrawMode.Triangles);
   o._size                 = MO.Class.register(o, new MO.AGetter('_size'));
   o._splits               = MO.Class.register(o, new MO.AGetter('_splits'));
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexNormalBuffer   = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
   //..........................................................
   // @method
   o.construct             = MO.FE3dCubes_construct;
   // @method
   o.setup                 = MO.FE3dCubes_setup;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dCubes_construct = function FE3dCubes_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置属性
   o._size = new MO.SSize3(1, 1, 1);
   o._splits = new MO.SSize3(4, 4, 4);
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._outline = new MO.SOutline3();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dCubes_setup = function FE3dCubes_setup(){
   var o = this;
   var context = o._graphicContext;
   // 计算顶点信息
   var splits = o._splits;
   var cx = splits.width;
   var cy = splits.height;
   var cz = splits.deep;
   var size = o._size;
   var sx = size.width / cx;
   var sy = size.height / cy;
   var sz = size.deep / cz;
   var centerX = size.width * 0.5;
   if(!o._optionCenterX){
      centerX = 0;
   }
   var centerY = size.height * 0.5;
   if(!o._optionCenterY){
      centerY = 0;
   }
   var centerZ = size.deep * 0.5;
   if(!o._optionCenterZ){
      centerZ = 0;
   }
   var vertexCount = o._vertexCount = (cx + 1) * (cy + 1) * (cz + 1);
   var positionIndex = 0;
   var positionData = new Float32Array(3 * vertexCount);
   var colorIndex = 0;
   var colorData = new Uint8Array(4 * vertexCount);
   for(var z = 0; z <= cz; z++){
      for(var y = 0; y <= cy; y++){
         for(var x = 0; x <= cx; x++){
            positionData[positionIndex++] = sx * x - centerX;
            positionData[positionIndex++] = sy * y - centerY;
            positionData[positionIndex++] = sz * z - centerZ;
            colorData[colorIndex++] = 0x00;
            colorData[colorIndex++] = 0x00;
            colorData[colorIndex++] = 0x00;
            colorData[colorIndex++] = 0xFF;
         }
      }
   }
   // 创建顶点位置缓冲
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(positionData, 4 * 3, vertexCount);
   o.pushVertexBuffer(buffer);
   // 创建顶点颜色缓冲
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   buffer.upload(colorData, 4, vertexCount);
   o.pushVertexBuffer(buffer);
   //..........................................................
   // 计算索引
   var drawModeCd = o._drawModeCd;
   var indexes = new MO.TArray();
   if(drawModeCd == MO.EG3dDrawMode.Lines){
      var strideY = (cx + 1);
      var strideZ = strideY * (cy + 1);
      for(var z = 0; z <= cz; z++){
         var zindex = (cx + 1) * (cy + 1) * z;
         for(var y = 0; y <= cy; y++){
            var yindex = strideY * y;
            for(var x = 0; x <= cx; x++){
               var index = zindex + yindex + x;
               if(x < cx){
                  indexes.push(index, index + 1);
               }
               if(y < cy){
                  indexes.push(index, index + strideY);
               }
               if(z < cz){
                  indexes.push(index, index + strideZ);
               }
            }
         }
      }
   }else{
      throw new TError();
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
   info.optionAlpha = true;
   //info.alphaRate = 0.4;
   //info.effectCode = 'control';
   //info.optionDouble = true;
   //info.ambientColor.set(0.2, 0.2, 0.2, 1);
   //info.diffuseColor.set(0.8, 0.8, 0.8, 1);
   //info.specularColor.set(0.8, 0.8, 0.8, 1);
   info.specularLevel = 64;
}
