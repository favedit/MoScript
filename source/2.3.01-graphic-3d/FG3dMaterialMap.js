//==========================================================
// <T>渲染材质集合。</T>
//
// @author maocy
// @history 150211
//==========================================================
MO.FG3dMaterialMap = function FG3dMaterialMap(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._size      = MO.Class.register(o, new MO.AGetter('_size'));
   o._data      = MO.Class.register(o, new MO.AGetter('_data'));
   o._texture   = MO.Class.register(o, new MO.AGetter('_texture'));
   // @attribute
   o._stride    = null;
   o._dirty     = false;
   //..........................................................
   // @method
   o.construct  = MO.FG3dMaterialMap_construct;
   // @method
   o.setup      = MO.FG3dMaterialMap_setup;
   o.resize     = MO.FG3dMaterialMap_resize;
   // @method
   o.setUint8   = MO.FG3dMaterialMap_setUint8;
   o.setUint16  = MO.FG3dMaterialMap_setUint16;
   o.setUint32  = MO.FG3dMaterialMap_setUint32;
   o.setFloat16 = MO.FG3dMaterialMap_setFloat16;
   o.setFloat32 = MO.FG3dMaterialMap_setFloat32;
   // @method
   o.update     = MO.FG3dMaterialMap_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG3dMaterialMap_construct = function FG3dMaterialMap_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 创建变量
   o._size = new MO.SSize2();
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @param width:Integer 宽度
// @param height:Integer 高度
//==========================================================
MO.FG3dMaterialMap_setup = function FG3dMaterialMap_setup(width, height){
   var o = this;
   var c = o._graphicContext;
   var texture = o._texture = c.createFlatTexture();
   o.resize(width, height);
   texture.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   texture.uploadData(o._data, width, height);
}

//==========================================================
// <T>改变纹理大小。</T>
//
// @method
// @param width:Integer 宽度
// @param height:Integer 高度
//==========================================================
MO.FG3dMaterialMap_resize = function FG3dMaterialMap_resize(width, height){
   var o = this;
   var s = o._size;
   // 计算有效值
   if(height > 2048){
      height = 4096;
   }else if(height > 1024){
      height = 2048;
   }else if(height > 512){
      height = 1024;
   }else if(height > 256){
      height = 512;
   }else if(height > 128){
      height = 256;
   }else if(height > 64){
      height = 128;
   }else if(height > 32){
      height = 64;
   }else if(height > 16){
     height = 32;
   }
   if(height < s.height){
      height = s.height;
   }
   // 检查参数
   if((s.width == width) && (s.height == height)){
      return;
   }
   s.set(width, height);
   o._stride = 4 * width;
   // 分配内存
   var total = 4 * width * height;
   o._data = new Uint8Array(total);
}

//==========================================================
// <T>设置4个8位非负整数。</T>
//
// @method
// @param number:Integer 编号
// @param index:Integer 索引
// @param value1:Integer 数据1(0~255)
// @param value2:Integer 数据2(0~255)
// @param value3:Integer 数据3(0~255)
// @param value4:Integer 数据4(0~255)
//==========================================================
MO.FG3dMaterialMap_setUint8 = function FG3dMaterialMap_setUint8(n, i, v1, v2, v3, v4){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   if(v1.constructor == MO.SColor4){
      // 设置红色
      var v = v1.red * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      // 设置红色
      var v = v1.green * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      // 设置红色
      var v = v1.blue * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      // 设置红色
      var v = v1.alpha * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
   }else{
      d[p++] = v1;
      d[p++] = v2;
      d[p++] = v3;
      d[p++] = v4;
   }
   //o._dirty = true;
}

//==========================================================
// <T>设置2个16位非负整数。</T>
//
// @method
// @param n:number:Integer 编号
// @param i:index:Integer 索引
// @param v1:value1:Integer 数据1(0~65535)
// @param v2:value2:Integer 数据2(0~65535)
//==========================================================
MO.FG3dMaterialMap_setUint16 = function FG3dMaterialMap_setUint16(n, i, v1, v2){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v1 >> 8) & 0xFF;
   d[p++] = v1 & 0xFF;
   d[p++] = (v2 >> 8) & 0xFF;
   d[p++] = v2 & 0xFF;
   o._dirty = true;
}

//==========================================================
// <T>设置1个32位非负整数。</T>
//
// @method
// @param n:number:Integer 编号
// @param i:index:Integer 索引
// @param v:value:Integer 数据1(0~4294967295)
//==========================================================
MO.FG3dMaterialMap_setUint32 = function FG3dMaterialMap_setUint32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v >> 24) & 0xFF;
   d[p++] = (v >> 16) & 0xFF;
   d[p++] = (v >> 8) & 0xFF;
   d[p++] = v & 0xFF;
   o._dirty = true;
}

//==========================================================
// <T>设置2个16位浮点数。</T>
//
// @method
// @param n:number:Integer 编号
// @param i:index:Integer 索引
// @param v1:value1:Float 数据1(0~255 + 1/255)
// @param v2:value2:Float 数据2(0~255 + 1/255)
//==========================================================
MO.FG3dMaterialMap_setFloat16 = function FG3dMaterialMap_setFloat16(n, i, v1, v2){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   var v = parseInt(v1 * 256);
   d[p++] = parseInt(v1) & 0xFF;
   d[p++] = parseInt(v1 * 256) & 0xFF;
   d[p++] = parseInt(v2) & 0xFF;
   d[p++] = parseInt(v2 * 256) & 0xFF;
   o._dirty = true;
}

//==========================================================
// <T>设置1个32位浮点数。</T>
//
// @method
// @param n:number:Integer 编号
// @param i:index:Integer 索引
// @param v:value:Float 数据1(0~65535 + 1/65535)
//==========================================================
MO.FG3dMaterialMap_setFloat32 = function FG3dMaterialMap_setFloat32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = parseInt(v * 0.00390625) & 0xFF;
   d[p++] = parseInt(v) & 0xFF;
   d[p++] = parseInt(v * 256) & 0xFF;
   d[p++] = parseInt(v * 65536) & 0xFF;
   o._dirty = true;
}

//==========================================================
// <T>更新数据。</T>
//
// @method
//==========================================================
MO.FG3dMaterialMap_update = function FG3dMaterialMap_update(){
   var o = this;
   if(o._dirty){
      var s = o._size;
      o._texture.uploadData(o._data, s.width, s.height);
      o._dirty = false;
   }
}
