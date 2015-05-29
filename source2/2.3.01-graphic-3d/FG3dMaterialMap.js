with(MO){
   //==========================================================
   // <T>渲染材质集合。</T>
   //
   // @author maocy
   // @history 150211
   //==========================================================
   MO.FG3dMaterialMap = function FG3dMaterialMap(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      //..........................................................
      // @attribute
      o._size      = null;
      o._data      = null;
      o._texture   = null;
      // @attribute
      o._stride    = null;
      o._dirty     = false;
      //..........................................................
      // @method
      o.construct  = FG3dMaterialMap_construct;
      // @method
      o.size       = FG3dMaterialMap_size;
      o.data       = FG3dMaterialMap_data;
      o.texture    = FG3dMaterialMap_texture;
      // @method
      o.setup      = FG3dMaterialMap_setup;
      o.resize     = FG3dMaterialMap_resize;
      // @method
      o.setUint8   = FG3dMaterialMap_setUint8;
      o.setUint16  = FG3dMaterialMap_setUint16;
      o.setUint32  = FG3dMaterialMap_setUint32;
      o.setFloat16 = FG3dMaterialMap_setFloat16;
      o.setFloat32 = FG3dMaterialMap_setFloat32;
      // @method
      o.update     = FG3dMaterialMap_update;
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
      o._size = new SSize2();
   }

   //==========================================================
   // <T>获得尺寸。</T>
   //
   // @method
   // @return SSize2 尺寸
   //==========================================================
   MO.FG3dMaterialMap_size = function FG3dMaterialMap_size(){
      return this._size;
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return Uint8Array 数据
   //==========================================================
   MO.FG3dMaterialMap_data = function FG3dMaterialMap_data(){
      return this._data;
   }

   //==========================================================
   // <T>获得纹理。</T>
   //
   // @method
   // @return FG3dTexture 纹理
   //==========================================================
   MO.FG3dMaterialMap_texture = function FG3dMaterialMap_texture(){
      return this._texture;
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @param w:width:Integer 宽度
   // @param h:height:Integer 高度
   //==========================================================
   MO.FG3dMaterialMap_setup = function FG3dMaterialMap_setup(w, h){
      var o = this;
      var c = o._graphicContext;
      var t = o._texture = c.createFlatTexture();
      o.resize(w, h);
      t.setFilterCd(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
      t.uploadData(o._data, w, h);
   }

   //==========================================================
   // <T>改变纹理大小。</T>
   //
   // @method
   // @param w:width:Integer 宽度
   // @param h:height:Integer 高度
   //==========================================================
   MO.FG3dMaterialMap_resize = function FG3dMaterialMap_resize(w, h){
      var o = this;
      var s = o._size;
      // 计算有效值
      if(h > 2048){
         h = 4096;
      }else if(h > 1024){
         h = 2048;
      }else if(h > 512){
         h = 1024;
      }else if(h > 256){
         h = 512;
      }else if(h > 128){
         h = 256;
      }else if(h > 64){
         h = 128;
      }else if(h > 32){
         h = 64;
      }else if(h > 16){
         h = 32;
      }
      if(h < s.height){
         h = s.height;
      }
      // 检查参数
      if((s.width == w) && (s.height == h)){
         return;
      }
      s.set(w, h);
      o._stride = 4 * w;
      // 分配内存
      var t = 4 * w * h;
      o._data = new Uint8Array(t);
      //console.log('Resize material map.', w, h);
   }

   //==========================================================
   // <T>设置4个8位非负整数。</T>
   //
   // @method
   // @param n:number:Integer 编号
   // @param i:index:Integer 索引
   // @param v1:value1:Integer 数据1(0~255)
   // @param v2:value2:Integer 数据2(0~255)
   // @param v3:value3:Integer 数据3(0~255)
   // @param v4:value4:Integer 数据4(0~255)
   //==========================================================
   MO.FG3dMaterialMap_setUint8 = function FG3dMaterialMap_setUint8(n, i, v1, v2, v3, v4){
      var o = this;
      var d = o._data;
      var p = (o._stride * n) + (i << 2);
      if(v1.constructor == SColor4){
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
         //console.log('Material dirty.', s.width, s.height);
         o._dirty = false;
      }
   }
}
