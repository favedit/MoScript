 //==========================================================
// <T>场景动画剪辑。</T>
//
// @author maocy
// @history 150418
//==========================================================
function FE3dSceneAnimationClip(o){
   o = RClass.inherits(this, o, FObject, MAttributeCode);
   //..........................................................
   // @attribute
   o._animation  = null;
   // @attribute
   o._beginIndex = 0;
   o._endIndex   = 0;
   o._playRate   = 1;
   //..........................................................
   // @method
   o.beginIndex  = FE3dSceneAnimationClip_beginIndex;
   o.endIndex    = FE3dSceneAnimationClip_endIndex;
   o.setRange    = FE3dSceneAnimationClip_setRange;
   // @method
   o.playRate    = FE3dSceneAnimationClip_playRate;
   o.setPlayRate = FE3dSceneAnimationClip_setPlayRate;
   return o;
}

//==========================================================
// <T>获得开始帧索引位置。</T>
//
// @method
// @return Integer 索引位置
//==========================================================
function FE3dSceneAnimationClip_beginIndex(){
   return this._beginIndex;
}

//==========================================================
// <T>获得结束帧索引位置。</T>
//
// @method
// @return Integer 索引位置
//==========================================================
function FE3dSceneAnimationClip_endIndex(){
   return this._endIndex;
}

//==========================================================
// <T>设置帧范围。</T>
//
// @method
// @param beginIndex:Integer 开始帧索引位置
// @param endIndex:Integer 结束帧索引位置
//==========================================================
function FE3dSceneAnimationClip_setRange(beginIndex, endIndex){
   var o = this;
   o._beginIndex = beginIndex;
   o._endIndex = endIndex;
}

//==========================================================
// <T>获得播放速率。</T>
//
// @method
// @return Number 播放速率
//==========================================================
function FE3dSceneAnimationClip_playRate(){
   return this._playRate;
}

//==========================================================
// <T>设置播放速率。</T>
//
// @method
// @return Number 播放速率
//==========================================================
function FE3dSceneAnimationClip_setPlayRate(rate){
   this._playRate = rate;
}
