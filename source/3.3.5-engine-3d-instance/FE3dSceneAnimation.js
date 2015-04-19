 //==========================================================
// <T>资源。</T>
//
// @author maocy
// @history 150418
//==========================================================
function FE3dSceneAnimation(o){
   o = RClass.inherits(this, o, FE3dAnimation);
   //..........................................................
   // @attribute
   o._animation        = null;
   o._activeClip       = null;
   o._clips            = null;
   //..........................................................
   // @method
   o.clips             = FE3dSceneAnimation_clips;
   o.pushClip          = FE3dSceneAnimation_pushClip;
   // @method
   o.record            = RMethod.empty;
   o.process           = RMethod.empty;
   // @method
   o.selectClip        = FE3dSceneAnimation_selectClip;
   // @method
   o.loadAnimation     = FE3dSceneAnimation_loadAnimation;
   o.loadSceneResource = FE3dSceneAnimation_loadSceneResource;
   o.reloadResource    = FE3dSceneAnimation_reloadResource;
   return o;
}

//==========================================================
// <T>获得剪辑集合。</T>
//
// @method
// @return TDictionary 剪辑集合
//==========================================================
function FE3dSceneAnimation_clips(){
   return this._clips;
}

//==========================================================
// <T>增加一个剪辑对象。</T>
//
// @method
// @param clip:FE3dSceneAnimationClip 剪辑对象
//==========================================================
function FE3dSceneAnimation_pushClip(clip){
   var o = this;
   var clips = o._clips;
   if(!clips){
      clips = o._clips = new TDictionary();
   }
   clips.set(clip.code(), clip);
}

//==========================================================
// <T>选中一个剪辑对象。</T>
//
// @method
// @param code:String 代码
//==========================================================
function FE3dSceneAnimation_selectClip(code){
   var o = this;
   var clip = o._clips.get(code);
   // 检查激活
   if(o._activeClip == clip){
      return;
   }
   // 设置剪辑信息
   var info = o._animation._playInfo;
   info.beginIndex = clip.beginIndex();
   info.endIndex = clip.endIndex();
   info.frameCount = info.endIndex - info.beginIndex + 1;
   o._animation._playRate = clip.playRate();
   o._activeClip = clip;
}

 //==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FEs3Animation 资源
//==========================================================
function FE3dSceneAnimation_loadAnimation(animation){
   var o = this;
   o._animation = animation;
}

 //==========================================================
// <T>加载场景资源。</T>
//
// @method
// @param resource:FEs3SceneAnimation 资源
//==========================================================
function FE3dSceneAnimation_loadSceneResource(resource){
   var o = this;
   o._resource = resource;
}

 //==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dSceneAnimation_reloadResource(){
   var o = this;
   var resource = o._resource;
   var animation = o._animation;
   animation._playRate = resource._playRate;
}
