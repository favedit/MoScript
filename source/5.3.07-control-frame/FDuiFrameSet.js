//==========================================================
// <T>页面集合。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
MO.FUiFrameSet = function FUiFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MUiDescribeFrame);
   //..........................................................
   // @property String 提示信息
   o._sizeCd       = MO.EUiSize.Fill;
   o._directionCd  = MO.Class.register(o, new MO.APtyEnum('_directionCd', null, MO.EUiDirection), MO.EUiDirection.Vertical);
   //..........................................................
   // @style
   o._stylePanel   = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   //..........................................................
   // @style
   o._frames       = null;
   //..........................................................
   // @html
   o._hLine        = null;
   //..........................................................
   // @event
   o.onBuildPanel  = MO.FUiFrameSet_onBuildPanel;
   //..........................................................
   // @method
   o.construct     = MO.FUiFrameSet_construct;
   // @method
   o.appendFrame   = MO.FUiFrameSet_appendFrame;
   o.appendSpliter = MO.FUiFrameSet_appendSpliter;
   // @method
   o.appendChild   = MO.FUiFrameSet_appendChild;
   // @method
   o.dispose       = MO.FUiFrameSet_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
MO.FUiFrameSet_onBuildPanel = function FUiFrameSet_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiFrameSet_construct = function FUiFrameSet_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o._frames = new MO.TObjects();
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param frame:FUiFrame 页面
//==========================================================
MO.FUiFrameSet_appendFrame = function FUiFrameSet_appendFrame(frame){
   var o = this;
   if(o._directionCd == MO.EUiDirection.Horizontal){
      // 横向排布
      var hLine = o._hLine;
      if(!hLine){
         hLine = o._hLine = MO.Window.Builder.appendTableRow(o._hPanel);
      }
      frame.setPanel(hLine);
      // 设置宽度
      var sizeWidth = frame._size.width;
      if(sizeWidth){
         frame._hPanel.width = sizeWidth;
      }
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      // 纵向排布
      var hLine = MO.Window.Builder.appendTableRow(o._hPanel);
      frame.setPanel(hLine);
      // 设置高度
      var sizeHeight = frame._size.height;
      if(sizeHeight){
         frame._hPanel.height = sizeHeight;
      }
   }else{
      throw new MO.TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(frame);
}

//==========================================================
// <T>创建一个分隔符。</T>
//
// @method
//==========================================================
MO.FUiFrameSet_appendSpliter = function FUiFrameSet_appendSpliter(p){
   var o = this;
   var sp = null;
   if(p){
      sp = p;
   }else{
      sp = MO.Class.create(MO.FUiFrameSpliter);
      sp.build(o._hPanel);
   }
   if(o._directionCd == MO.EUiDirection.Horizontal){
      // 横向排布
      o._hLine.appendChild(sp._hPanel);
      sp._hPanel.style.width = '4px';
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      // 纵向排布
      var hr = MO.Window.Builder.appendTableRow(o._hPanel);
      hr.appendChild(sp._hPanel);
      sp._hPanel.style.height = '4px';
   }else{
      throw new MO.TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(sp);
   return sp;
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param p:control:FDuiControl 控件
//==========================================================
MO.FUiFrameSet_appendChild = function FUiFrameSet_appendChild(p){
   var o = this;
   p._frameset = o;
   if(MO.Class.isClass(p, MO.FUiFramePage)){
      o.appendFrame(p);
      return;
   }else if(MO.Class.isClass(p, MO.FUiFrameSpliter)){
      o.appendSpliter(p);
      return;
   }
   o.__base.FDuiContainer.appendChild.call(o, p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiFrameSet_dispose = function FUiFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiContainer.dispose.call(o);
}
