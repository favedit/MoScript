/**************************************************************
 * 分页控件的页控件
 * 模板:
 *  hPanel<TD>
 * ┌--------------------------------------------------------┐
 * │                                        hTitlePanel<TD> │
 * │┌------------┬------------------------┬------------┐│
 * ││hTopL<TD>   │hTop<TD>                │hTopR<TD>   ││
 * │├------------┼------------------------┼------------┤│
 * ││            │┌--------------------┐│            ││
 * ││hLeft<TD>   ││hButton<DIV>        ││hRight<TD>  ││
 * ││            │└--------------------┘│            ││
 * │├------------┼------------------------┼------------┤│
 * ││hBottomL<TD>│hBottom<TD>             │hBottomR<TD>││
 * │└------------┴------------------------┴------------┘│
 * └--------------------------------------------------------┘
 *  hDataPanel<TR>
 * ┌--------------------------------------------------------┐
 * │hContainer<DIV>                                         │
 * └--------------------------------------------------------┘
 *
 * @class FContainer, MHorizontal
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FPageSheet(o){
   o = RClass.inherits(this, o, FPanel, MDisplayAble);
   // Property
   o.icon            = RClass.register(o, new TPtyStr('icon', null));
   o.formName        = RClass.register(o, new TPtyStr('formName', null));
   o.formLink        = RClass.register(o, new TPtyStr('formLink', null));
   o.formWhere       = RClass.register(o, new TPtyStr('formWhere', null));
   o.formOrder       = RClass.register(o, new TPtyStr('formOrder', null));
   o.top             = 0;
   /// @event
   o.onHeadMouseDown = RClass.register(o, new HMouseDown('onHeadMouseDown'));
   /// @style
   o.stTop           = RClass.register(o, new TStyle('Top'));
   o.stTopSelect     = RClass.register(o, new TStyle('TopSelect'));
   o.stLeft          = RClass.register(o, new TStyle('Left'));
   o.stLeftSelect    = RClass.register(o, new TStyle('LeftSelect'));
   o.stRight         = RClass.register(o, new TStyle('Right'));
   o.stRightSelect   = RClass.register(o, new TStyle('RightSelect'));
   o.stRightPrior    = RClass.register(o, new TStyle('RightPrior'));
   o.stButtom        = RClass.register(o, new TStyle('Bottom'));
   o.stBottomSelect  = RClass.register(o, new TStyle('BottomSelect'));
   o.stButtonText    = RClass.register(o, new TStyle('ButtonText'));
   o.stButton        = RClass.register(o, new TStyle('Button'));
   o.stButtonHover   = RClass.register(o, new TStyle('ButtonHover'));
   o.stButtonSelect  = RClass.register(o, new TStyle('ButtonSelect'));
   o.stDataPanel     = RClass.register(o, new TStyle('DataPanel'));
   o.pages           = null;
   o.index           = null;
   o.selected        = false;
   o.hasBuilded      = false;
   o.lsnsSelect      = new TListeners();
   // Html
   o.hTopL           = null;
   o.hTop            = null;
   o.hTopR           = null;
   o.hLeft           = null;
   o.hButton         = null;
   o.hIcon           = null;
   o.hText           = null;
   o.hBottomL        = null;
   o.hBottom         = null;
   o.hBottomR        = null;
   o.hRight          = null;
   // Event
   o.onHeadMouseDown = FPageSheet_onHeadMouseDown;
   // Event
   o.onBuildPanel    = FPageSheet_onBuildPanel;
   o.onEnter         = FPageSheet_onEnter;
   o.onLeave         = FPageSheet_onLeave;
   // Method
   o.innerSelect     = FPageSheet_innerSelect;
   o.select          = FPageSheet_select;
   o.setVisible      = FPageSheet_setVisible;
   o.dump            = FPageSheet_dump;
   o.dispose         = FPageSheet_dispose
   // Event
   return o;
}
// ------------------------------------------------------------
function FPageSheet_onBuildPanel(){
   var o = this;
   var hp = o.hContainer = o.hPanel = RBuilder.create(null, 'DIV');
   hp.width = '100%';
   hp.height = '100%';
   var hf = o.hPanelForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   hf.height = '100%';
}
// ------------------------------------------------------------
function FPageSheet_onEnter(){
   var o = this;
   if(!o.selected){
      o.hButton.className = o.style('ButtonHover');
   }
}
// ------------------------------------------------------------
function FPageSheet_onLeave(){
   var o = this;
   if(!o.selected){
      o.hButton.className = o.style('Button');
   }
}
// ------------------------------------------------------------
function FPageSheet_onHeadMouseDown(){
   this.pages.select(this);
}
// ------------------------------------------------------------
function FPageSheet_innerSelect(flag){
   var o = this;
   var b = o.pages;
   if(flag && !o.hasBuilded){
      //o.buildChildren();
      o.hasBuilded = true;
   }
   var first = (o.index == 0);
   var prior = (b.selected.index-1 == o.index);
   // Select
   if(o.selected != flag){
      if(flag){
         o.lsnsSelect.process();
      }
      o.selected = flag;
   }
   // Style
   o.hButton.className = flag ? o.style('ButtonSelect') : o.style('Button');
   o.hTop.className = flag ? o.style('TopSelect') : o.style('Top');
   o.hLeft.className = flag ? o.style('LeftSelect') : (first ? o.style('Right') : o.style('Left'));
   o.hBottomL.className = flag ? o.style('BottomSelect') : o.style('Bottom');
   o.hBottom.className = flag ? o.style('BottomSelect') : o.style('Bottom');
   o.hBottomR.className = flag ? o.style('BottomSelect') : o.style('Bottom');
   o.hRight.className = flag ? o.style('RightSelect') : (prior ? o.style('RightPrior') : o.style('Right'));
   // Sheet
   o.hForm.style.display = flag ? 'block' : 'none';
}
// ------------------------------------------------------------
function FPageSheet_select(flag){
   var o = this;
   o.innerSelect(flag);
   if(flag){
      o.psRefresh();
      o.psResize();
   }
}
// ------------------------------------------------------------
function FPageSheet_setVisible(v){
   var o = this;
   o.hForm.style.display = v ? 'block' : 'none';
}
// ------------------------------------------------------------
function FPageSheet_dump(dump, space){
   dump = RString.nvlStr(dump);
   dump.append(space, RClass.name(this), ' [');
   dump.append('name=', this.name, ', ');
   dump.append('icon=', this.icon, ', ');
   dump.append('label=', this.label, ', ');
   dump.append('action=', this.action, ']');
   return dump;
}
// ------------------------------------------------------------
function FPageSheet_dispose(){
   var o = this;
   o.base.FPanel.dispose.call(o);
   RMemory.freeHtml(o.hButton);
   RMemory.freeHtml(o.hTop);
   RMemory.freeHtml(o.hLeft);
   RMemory.freeHtml(o.hBottomL);
   RMemory.freeHtml(o.hBottom);
   RMemory.freeHtml(o.hBottomR);
   RMemory.freeHtml(o.hRight);
   o.hButton = null;
   o.hTop = null;
   o.hLeft = null;
   o.hBottomL = null;
   o.hBottom = null;
   o.hBottomR = null;
   o.hRight = null;
}
// ------------------------------------------------------------
