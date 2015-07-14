//==========================================================
// <T>场景动画剪辑。</T>
//
// @author maocy
// @history 150418
//==========================================================
MO.FE3dSceneAnimationClip = function FE3dSceneAnimationClip(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MAttributeCode);
   //..........................................................
   // @attribute
   o._animation  = null;
   // @attribute
   o._beginIndex = MO.Class.register(o, new MO.AGetSet('_beginIndex'), 0);
   o._endIndex   = MO.Class.register(o, new MO.AGetSet('_endIndex'), 0);
   o._playRate   = MO.Class.register(o, new MO.AGetSet('_playRate'), 1);
   //..........................................................
   // @method
   o.setRange    = MO.FE3dSceneAnimationClip_setRange;
   return o;
}

//==========================================================
// <T>设置帧范围。</T>
//
// @method
// @param beginIndex:Integer 开始帧索引位置
// @param endIndex:Integer 结束帧索引位置
//==========================================================
MO.FE3dSceneAnimationClip_setRange = function FE3dSceneAnimationClip_setRange(beginIndex, endIndex){
   var o = this;
   o._beginIndex = beginIndex;
   o._endIndex = endIndex;
}
