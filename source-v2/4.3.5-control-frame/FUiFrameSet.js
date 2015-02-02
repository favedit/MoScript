//==========================================================
// <T>页面集合。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
function FUiFrameSet(o){
   o = RClass.inherits(this, o, FUiContainer);
   //..........................................................
   // @style
   o._stylePanel   = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   //..........................................................
   // @style
   o._directionCd  = EDirection.Vertical;
   o._frames       = null;
   //..........................................................
   // @html
   o._hLine        = null;
   //..........................................................
   // @event
   o.onBuildPanel  = FUiFrameSet_onBuildPanel;
   //..........................................................
   // @method
   o.construct     = FUiFrameSet_construct;
   // @method
   o.appendFrame   = FUiFrameSet_appendFrame;
   o.appendSpliter = FUiFrameSet_appendSpliter;
   // @method
   o.dispose       = FUiFrameSet_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FUiFrameSet_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiFrameSet_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._frames = new TObjects();
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:frame:FUiFrame 页面
//==========================================================
function FUiFrameSet_appendFrame(p){
   var o = this;
   if(o._directionCd == EDirection.Horizontal){
      // 横向排布
      var hr = o._hLine;
      if(hr == null){
         hr = o._hLine = RBuilder.appendTableRow(o._hPanel);
      }
      p.setPanel(hr);
      // 设置宽度
      if(p._size.width){
         p._hPanel.width = p._size.width;
      }
   }else if(o._directionCd == EDirection.Vertical){
      // 纵向排布
      var hr = RBuilder.appendTableRow(o._hPanel);
      p.setPanel(hr);
      // 设置高度
      if(p._size.height){
         p._hPanel.height = p._size.height;
      }
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(p);
}

//==========================================================
// <T>创建一个分隔符。</T>
//
// @method
//==========================================================
function FUiFrameSet_appendSpliter(){
   var o = this;
   var sp = RClass.create(FUiFrameSpliter);
   sp._frameset = o;
   sp.build(o._hPanel);
   if(o._directionCd == EDirection.Horizontal){
      // 横向排布
      o._hLine.appendChild(sp._hPanel);
      sp._hPanel.style.width = '4px';
   }else if(o._directionCd == EDirection.Vertical){
      // 纵向排布
      var hr = RBuilder.appendTableRow(o._hPanel);
      hr.appendChild(sp._hPanel);
      sp._hPanel.style.height = '4px';
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(sp);
   return sp;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiContainer.dispose.call(o);
}