/**************************************************************
 * 单元格内Edit控件类
 *
 * @class FCellEditControl
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FCellBar(o){
   o = RClass.inherits(this, o, FCell);
   // Html
   o.hEdit              = null;
   o.hLine              = null;
   o.buttons            = new TMap();
   o.stButton           = RClass.register(o, new TStyle('Button'));
   o.stHover            = RClass.register(o, new TStyle('Hover'));
   o.stPress            = RClass.register(o, new TStyle('Press'));
   // Method
   o.build              = FCellBar_build;
   o.set                = FCellBar_set;
   o.get               = FCellBar_get;
   return o;
}

/**************************************************************
 * 创建单元格和内部的input 并添加页面相应函数
 *
 * @method
 * @return HTML td标签
 **************************************************************/
function FCellBar_build(){
   var o = this;
   var c = o.column;
   var h = o.hPanel = o.base.FCell.build.call(o);
   var hb = o.hButton = RBuilder.appendTable(h);
   var hLine = o.hLine = o.hButton.insertRow();
   for(var n = 0; n < o.column.controls.count; n++){
   if(n != 0){
     hCelSplit = o.hLine.insertCell();
     hCelSplit.innerHTML = '|';
   }
    var button = c.controls.value(n);
    o.buttons.push(button.name, button);
    buttonPanel = button.build();
    var hTd = RBuilder.create(null, 'TD');
    hCel = o.hLine.insertCell();
    hCel.appendChild(buttonPanel);
   }
   return h;
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellBar_set(v){
   var o = this;
   var d = o.descriptor();
   var c = o.column;
   o.dataValue = RString.nvl(v);
   var s = o.dataValue;
   var bs = new TStrings();
   bm = new TMap();
   bs.unpack(v);
   for(var n = 0; n < o.buttons.count; n++){
      bn = o.buttons.name(n);
      b = o.buttons.value(n);
      bb = bs.get(bn);
      if(!bm.isEmpty()){
         bm.clear();
      }
      bm.unpack(bb);
      if(!bm.get('visiable')){
         b.setVisiable(false);
      }
   }
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellBar_get(){
   return this.dataValue;
}