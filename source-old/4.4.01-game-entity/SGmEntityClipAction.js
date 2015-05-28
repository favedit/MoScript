 //==========================================================
// <T>游戏实例剪辑命令。</T>
//
// @class
// @author maocy
// @history 150419
//==========================================================
function SGmEntityClipAction(){
   var o = this;
   //..........................................................
   // @attribute 播放类型
   o.typeCd      = EGmEntityClipAction.Play;
   // @attribute 播放代码
   o.code        = null;
   // @attribute 播放次数
   o.count       = 0;
   // @attribute 强制立刻开始，不立刻开始的话，必须等上一个动画播放完才开始
   o.optionForce = false;
   // @attribute 强制重置
   o.optionReset = false;
   return o;
}
