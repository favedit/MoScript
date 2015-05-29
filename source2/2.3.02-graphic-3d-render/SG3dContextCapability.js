with(MO){
   //==========================================================
   // <T>渲染环境信息。</T>
   //
   // @class
   // @author maocy
   // @history 141230
   //==========================================================
   MO.SG3dContextCapability = function SG3dContextCapability(){
      var o = this;
      //..........................................................
      // @attribute
      o.vendor                 = null;
      o.version                = null;
      o.shaderVersion          = null;
      // @attribute
      o.optionDebug            = false;
      o.optionInstance         = false;
      o.optionLayout           = false;
      o.optionMaterialMap      = false;
      o.optionIndex32          = false;
      o.optionShaderSource     = false;
      // @attribute
      o.mergeCount             = 0;
      o.attributeCount         = null;
      o.vertexCount            = 65536;
      o.vertexConst            = null;
      o.fragmentConst          = null;
      o.varyingCount           = null;
      // @attribute
      o.samplerCount           = null;
      o.samplerSize            = null;
      o.samplerCompressRgb     = null;
      o.samplerCompressRgba    = null;
      //..........................................................
      // @method
      o.calculateBoneCount     = SG3dContextCapability_calculateBoneCount;
      o.calculateInstanceCount = SG3dContextCapability_calculateInstanceCount;
      return o;
   }

   //============================================================
   // <T>计算当前设备支持实例的最大个数。</T>
   //
   // @param boneCount 骨头数量
   // @param vertexCount 顶点数量（不设置的话不限制）
   // @param 可用实例个数
   //============================================================
   MO.SG3dContextCapability_calculateBoneCount = function SG3dContextCapability_calculateBoneCount(boneCount, vertexCount){
      var o = this;
      // 以4个为倍数
      var rb = 0;
      var bi = boneCount % 4;
      if(bi != 0){
         rb = boneCount + 4 - bi;
      }else{
         rb = boneCount;
      }
      // 以4个为倍数
      var r = 0;
      var ib = (o.vertexConst - 16) / 4;
      if(rb > ib){
         r = ib;
      }else{
         r = rb;
      }
      return r;
   }

   //============================================================
   // <T>计算当前设备支持实例的最大个数。</T>
   //
   // @param boneCount 骨头数量
   // @param vertexCount 顶点数量（不设置的话不限制）
   // @param 可用实例个数
   //============================================================
   MO.SG3dContextCapability_calculateInstanceCount = function SG3dContextCapability_calculateInstanceCount(boneCount, vertexCount){
      var o = this;
      // 计算常量缓冲限制
      var cr = (4 * boneCount) + 4;
      var ib = (o.vertexConst - 16) / cr;
      var r = cl;
      // 计算顶点限制
      if(vertexCount > 0){
         var iv = o.vertexCount / vertexCount;
         r = Math.min(ib, iv);
      }
      // 计算其他限制
      if(r > 64){
         r = 64;
      }
      return r;
   }
}
