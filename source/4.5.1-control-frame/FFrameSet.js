//==========================================================
// <T>页面集合。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
function FFrameSet(o){
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @style
   o._directionCd     = EDirection.Vertical;
   o._frames          = null;
   //..........................................................
   // @html
   o._hRow            = null;
   //..........................................................
   // @event
   o.onBuildContainer = FFrameSet_onBuildContainer
   //..........................................................
   // @method
   o.construct        = FFrameSet_construct;
   // @method
   o.appendFrame      = FFrameSet_appendFrame;
   o.appendSpliter    = FFrameSet_appendSpliter;
   // @method
   o.dispose          = FFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FFrameSet_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._frames = new TObjects();
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FFrameSet_onBuildContainer(e){
   var o = this;
   var h = o._hContainer = RBuilder.createTable(e.hDocument, o.styleName('Container'));
   h.style.width = '100%';
   h.style.height = '100%';
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:frame:FFrame 页面
//==========================================================
function FFrameSet_appendFrame(p){
   var o = this;
   if(o._directionCd == EDirection.Horizontal){
      // 横向排布
      var hr = o._hRow;
      if(hr == null){
         hr = o._hRow = RBuilder.appendTableRow(o._hContainer);
      }
      var hc = RBuilder.appendTableCell(hr);
      hc.appendChild(p._hContainer);
      // 设置宽度
      if(p._size.width){
         hc.width = p._size.width;
      }
   }else if(o._directionCd == EDirection.Vertical){
      // 纵向排布
      var hr = RBuilder.appendTableRow(o._hContainer);
      var hc = RBuilder.appendTableCell(hr);
      hc.appendChild(p._hContainer);
      // 设置高度
      if(p._size.height){
         hc.height = p._size.height;
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
function FFrameSet_appendSpliter(){
   var o = this;
   var sp = RClass.create(FFrameSpliter);
   sp.psBuild(o._hContainer);
   if(o._directionCd == EDirection.Horizontal){
      // 横向排布
      o._hRow.appendChild(sp._hContainer);
      sp._hContainer.style.width = '20px';
   }else if(o._directionCd == EDirection.Vertical){
      // 纵向排布
      var hr = RBuilder.appendTableRow(o._hContainer);
      hr.appendChild(sp._hContainer);
      sp._hContainer.style.height = '20px';
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
function FFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FContainer.dispose.call(o);
}
