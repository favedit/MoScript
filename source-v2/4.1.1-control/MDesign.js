//==========================================================
// <T>可设计控件接口。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
function MDesign(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._statusDesign      = false;
   o._storage       = null;
   //..........................................................
   // @process
   o.oeDesign      = MDesign_oeDesign;
   //..........................................................
   // @event
   o.onDesignEnter = RClass.register(o, new AEventMouseEnter('onDesignEnter'), MDesign_onDesignEnter);
   o.onDesignLeave = RClass.register(o, new AEventMouseEnter('onDesignLeave'), MDesign_onDesignLeave);
   o.onDesignBegin = RClass.register(o, new AEventMouseEnter('onDesignBegin'), MDesign_onDesignBegin);
   o.onDesignEnd   = RClass.register(o, new AEventMouseEnter('onDesignEnd'), MDesign_onDesignEnd);
   return o;
}

//==========================================================
// <T>设计处理。</T>
//
// @method
// @param p:process:TEventProcess 事件处理
//==========================================================
function MDesign_oeDesign(e){
   if(e.isBefore()){
      switch(e.mode){
         case EDesign.Move:
            // 控件被移动时处理
            var o = this;
            var h = o._hPanel;
            if(e.flag){
               o.isDesign = true;
               RHtml.link(h, 'className', h.className);
               RHtml.link(h, 'onmousedown', h.onmousedown);
               h.onmousedown = null;
               o.onDesignEnter();
            }else{
               o.isDesign = false;
               h.className = RHtml.findLink(h, 'className'); 
               var omd = RHtml.findLink(h, 'onmousedown'); 
               if(omd){
                  h.onmousedown = omd;
               }
            }
            break;
         case EDesign.Border:
            // 控件边框被改动时处理
            var o = this;
            var h = o._hPanel;
            if(e.flag){
               RHtml.link(h, 'styleBorder', h.style.border);
               h.style.border = '1 solid red';
            }else{
               h.style.border = RHtml.findLink(h, 'styleBorder'); 
            }
            break;
      }
   }
}

//==========================================================
// <T>设计进入处理。</T>
//
// @method
// @param p:process:SEvent 事件
//==========================================================
function MDesign_onDesignEnter(p){
   var o = this;
   o._hPanel.className = o.style('Design');
}

//==========================================================
// <T>设计离开处理。</T>
//
// @method
// @param p:process:SEvent 事件
//==========================================================
function MDesign_onDesignLeave(p){
}

//==========================================================
// <T>设计开始处理。</T>
//
// @method
// @param p:process:SEvent 事件
//==========================================================
function MDesign_onDesignBegin(p){
   var o = this;
   var g = o._storage = RObject.nvlObj(o._storage);
   g.designStyle = o._hPanel.className;
   g.designLayer = o._hPanel.zIndex;
   o._hPanel.className = o.style('DesignDrag');
   o._statusDesign = true;
}

//==========================================================
// <T>设计结束处理。</T>
//
// @method
// @param p:process:SEvent 事件
//==========================================================
function MDesign_onDesignEnd(p){
   var o = this;
   var g = o._storage = RObject.nvlObj(o._storage);
   o._hPanel.className = g.designStyle;
   o._hPanel.zIndex = g.designLayer;
   o._statusDesign = false;
}
