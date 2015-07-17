//==========================================================
// <T>可设计控件接口。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.MUiDesign = function MUiDesign(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._statusDesign      = false;
   o._storage       = null;
   //..........................................................
   // @process
   o.oeDesign      = MO.MUiDesign_oeDesign;
   //..........................................................
   // @event
   o.onDesignEnter = MO.Class.register(o, new MO.AEventMouseEnter('onDesignEnter'), MO.MUiDesign_onDesignEnter);
   o.onDesignLeave = MO.Class.register(o, new MO.AEventMouseEnter('onDesignLeave'), MO.MUiDesign_onDesignLeave);
   o.onDesignBegin = MO.Class.register(o, new MO.AEventMouseEnter('onDesignBegin'), MO.MUiDesign_onDesignBegin);
   o.onDesignEnd   = MO.Class.register(o, new MO.AEventMouseEnter('onDesignEnd'), MO.MUiDesign_onDesignEnd);
   return o;
}

//==========================================================
// <T>设计处理。</T>
//
// @method
// @param p:process:TEventProcess 事件处理
//==========================================================
MO.MUiDesign_oeDesign = function MUiDesign_oeDesign(e){
   if(e.isBefore()){
      switch(e.mode){
         case MO.EDesign.Move:
            // 控件被移动时处理
            var o = this;
            var h = o._hPanel;
            if(e.flag){
               o.isDesign = true;
               MO.RHtml.link(h, 'className', h.className);
               MO.RHtml.link(h, 'onmousedown', h.onmousedown);
               h.onmousedown = null;
               o.onDesignEnter();
            }else{
               o.isDesign = false;
               h.className = MO.RHtml.findLink(h, 'className'); 
               var omd = MO.RHtml.findLink(h, 'onmousedown'); 
               if(omd){
                  h.onmousedown = omd;
               }
            }
            break;
         case MO.EDesign.Border:
            // 控件边框被改动时处理
            var o = this;
            var h = o._hPanel;
            if(e.flag){
               MO.RHtml.link(h, 'styleBorder', h.style.border);
               h.style.border = '1 solid red';
            }else{
               h.style.border = MO.RHtml.findLink(h, 'styleBorder'); 
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
MO.MUiDesign_onDesignEnter = function MUiDesign_onDesignEnter(p){
   var o = this;
   o._hPanel.className = o.style('Design');
}

//==========================================================
// <T>设计离开处理。</T>
//
// @method
// @param p:process:SEvent 事件
//==========================================================
MO.MUiDesign_onDesignLeave = function MUiDesign_onDesignLeave(p){
}

//==========================================================
// <T>设计开始处理。</T>
//
// @method
// @param p:process:SEvent 事件
//==========================================================
MO.MUiDesign_onDesignBegin = function MUiDesign_onDesignBegin(p){
   var o = this;
   var g = o._storage = MO.Lang.Object.nvlObj(o._storage);
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
MO.MUiDesign_onDesignEnd = function MUiDesign_onDesignEnd(p){
   var o = this;
   var g = o._storage = MO.Lang.Object.nvlObj(o._storage);
   o._hPanel.className = g.designStyle;
   o._hPanel.zIndex = g.designLayer;
   o._statusDesign = false;
}