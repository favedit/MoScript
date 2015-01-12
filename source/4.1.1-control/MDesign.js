/**************************************************************
 * 可设计控件接口
 * 
 * @manger
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MDesign(o){
   o = RClass.inherits(this, o);
   // Attribute
   o.inDesign      = false;
   o.storage       = null;
   // Process
   o.oeDesign      = MDesign_oeDesign;
   /// @event
   o.onDesignEnter = RClass.register(o, new HMouseEnter('onDesignEnter'), MDesign_onDesignEnter);
   /// @event
   o.onDesignLeave = RClass.register(o, new HMouseEnter('onDesignLeave'), MDesign_onDesignLeave);
   /// @event
   o.onDesignBegin = RClass.register(o, new HMouseEnter('onDesignBegin'), MDesign_onDesignBegin);
   /// @event
   o.onDesignEnd   = RClass.register(o, new HMouseEnter('onDesignEnd'), MDesign_onDesignEnd);
   return o;
}
// ------------------------------------------------------------
function MDesign_oeDesign(e){
   if(e.isBefore()){
      switch(e.mode){
         case EDesign.Move:
            // 控件被移动时处理
            var o = this;
            var h = o.hPanel;
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
            var h = o.hPanel;
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
// ------------------------------------------------------------
function MDesign_onDesignEnter(){
   var o = this;
   o.hPanel.className = o.style('Design');
}
// ------------------------------------------------------------
function MDesign_onDesignLeave(){
}
// ------------------------------------------------------------
function MDesign_onDesignBegin(){
   var o = this;
   var g = o.storage = RObject.nvlObj(o.storage);
   g.designStyle = o.hPanel.className;
   g.designLayer = o.hPanel.zIndex;
   o.hPanel.className = o.style('DesignDrag');
   o.inDesign = true;
}
// ------------------------------------------------------------
function MDesign_onDesignEnd(){
   var o = this;
   var g = o.storage = RObject.nvlObj(o.storage);
   o.hPanel.className = g.designStyle;
   o.hPanel.zIndex = g.designLayer;
   o.inDesign = false;
}
// ------------------------------------------------------------
