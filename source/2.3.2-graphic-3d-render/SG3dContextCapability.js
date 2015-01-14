//==========================================================
// <T>渲染环境信息。</T>
//
// @author maocy
// @history 141230
//==========================================================
function SG3dContextCapability(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.vendor        = null;
   o.version       = null;
   o.shaderVersion = null;
   // @attribute
   o.vertexCount   = null;
   o.vertexConst   = null;
   o.fragmentConst = null;
   o.varyingCount  = null;
   o.samplerCount  = null;
   o.samplerSize   = null;
   //..........................................................
   // @method
   o.calculateInstanceCount = SG3dContextCapability_calculateInstanceCount;
   return o;
}

//============================================================
// <T>计算当前设备支持实例的最大个数。</T>
//
// @param vertexCount 顶点数量
// @param boneCount 骨头数量
//============================================================
function SG3dContextCapability_calculateInstanceCount(vertexCount, boneCount){
   var o = this;
   // 计算常量缓冲限制
   var vertexConstLimit = o.vertexCount;
   var constRequire = (3 * boneCount) + 4;
   var constLimit = (vertexConstLimit - 16) / constRequire;
   var instanceCount = constLimit;
   // 计算顶点限制
   if(vertexCount > 0){
      //var vertexCountLimit = o.vertexCount;
      var vertexCountLimit = 65535;
      var vertexLimit = vertexCountLimit / vertexCount;
      instanceCount = Math.min(instanceCount, vertexLimit);
   }
   // 计算其他限制
   instanceCount = Math.min(instanceCount, 256);
   return instanceCount;
}

