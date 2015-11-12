//==========================================================
// <T>时间线对象。</T>
//
// @class
// @author maocy
// @history 150710
//==========================================================
MO.MTimelineActions = function MTimelineActions(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._currentSection = MO.Class.register(o, new MO.AGetter('_currentSection'));
   o._sections       = MO.Class.register(o, new MO.AGetter('_sections'));
   //..........................................................
   // @method
   o.construct       = MO.MTimelineActions_construct;
   // @method
   o.setup           = MO.MTimelineActions_setup;
   o.pushSection     = MO.MTimelineActions_pushSection;
   o.pushAction      = MO.MTimelineActions_pushAction;
   o.process         = MO.MTimelineActions_process;
   // @method
   o.dispose         = MO.MTimelineActions_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MTimelineActions_construct = function MTimelineActions_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._sections = new MO.TObjects();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.MTimelineActions_setup = function MTimelineActions_setup(){
   var o = this;
}

//==========================================================
// <T>增加一个段落。</T>
//
// @method
// @param section:FTimelineSection 段落
//==========================================================
MO.MTimelineActions_pushSection = function MTimelineActions_pushSection(section){
   var o = this;
   MO.Assert.debugNotNull(section);
   o._sections.push(section);
}

//==========================================================
// <T>增加一个命令。</T>
//
// @method
// @param action:MTimelineAction 命令
//==========================================================
MO.MTimelineActions_pushAction = function MTimelineActions_pushAction(action, loopCd, loopCount){
   var o = this;
   MO.Assert.debugNotNull(action);
   var section = MO.Class.create(MO.FTimelineSection);
   section.pushAction(action, loopCd, loopCount);
   o._sections.push(section);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param context:STimelineContext 环境
//==========================================================
MO.MTimelineActions_process = function MTimelineActions_process(context){
   var o = this;
   var sections = o._sections;
   // 获得活动的段落
   var section = o._currentSection;
   if(!section){
      if(!sections.isEmpty()){
         section = o._currentSection = sections.shift();
      }
   }
   // 段落处理
   if(section){
      section.process(context);
      // 测试完成
      if(section.testStop()){
         section.stop(context);
         section.dispose();
         o._currentSection = null;
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MTimelineActions_dispose = function MTimelineActions_dispose(){
   var o = this;
   // 释放属性
   o._sections = MO.Lang.Object.dispose(o._sections);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
