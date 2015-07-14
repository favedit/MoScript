 //==========================================================
// <T>场景显示层。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
MO.FE3dSceneLayer = function FE3dSceneLayer(o){
   o = MO.Class.inherits(this, o, MO.FDisplayLayer, MO.MLinkerResource);
   //..........................................................
   // @method
   o.makeLabel    = MO.FE3dSceneLayer_makeLabel;
   o.loadResource = MO.FE3dSceneLayer_loadResource;
   // @method
   o.process      = MO.FE3dSceneLayer_process;
   return o;
}

//==========================================================
// <T>生成名称。</T>
//
// @method
// @return String 名称
//==========================================================
MO.FE3dSceneLayer_makeLabel = function FE3dSceneLayer_makeLabel(){
   var o = this;
   var resource = o.resource();
   var code = resource.code();
   var label = resource.label();
   if(label){
      return code + '[' + label + ']';
   }
   return code;
}

//==========================================================
// <T>加载空间资源。</T>
//
// @method
// @param p:resource:FE3sSceneLayer 层资源
//==========================================================
MO.FE3dSceneLayer_loadResource = function FE3dSceneLayer_loadResource(p){
   var o = this;
   o._resource = p;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param p:region:FG3dReigon 区域
//==========================================================
MO.FE3dSceneLayer_process = function FE3dSceneLayer_process(p){
   var o = this;
   o.__base.FDisplayLayer.process.call(o, p)
   // 变换处理
   var c = o._resource.transformCd();
   if(c){
      if(c == MO.EDisplayTransform.CameraPosition){
         var cp = p.camera().position();
         o._matrix.setTranslate(cp.x, cp.y, cp.z);
         o._matrix.update();
      }
   }
}
