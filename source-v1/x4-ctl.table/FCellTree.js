/**************************************************************
 * 单元格内Edit控件类
 *
 * @class FCellEditControl
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FCellTree(o){
   o = RClass.inherits(this, o, FCell);
   // Html
   o.hEdit        = null;
   o.label        = RClass.register(o, new TPtyStr('label'));
   // Method
   o.build        = FCellTree_build;
   o.text         = FCellTree_text;
   o.setText      = FCellTree_setText;
   o.set          = FCellTree_set;
   return o;
}

/**************************************************************
 * 创建单元格和内部的input 并添加页面相应函数
 *
 * @method
 * @return HTML td标签
 **************************************************************/
function FCellTree_build(){
   var o = this;
   var t = o.column.table;
   var h = o.base.FCell.build.call(o);
   h.noWrap = true;
   var hs = RBuilder.append(h, 'SPAN');
   var s = '';
   var p = o.row.parentRow;
   while(p){
      s += '&nbsp;&nbsp;';
      p = p.parentRow;
   }
   hs.innerHTML = s;
   var hImg = o.hImg = RBuilder.append(h, 'IMG');
   hImg.align = 'absmiddle'
   var hTxt = o.hLabel = RBuilder.append(h, 'SPAN');
   t.linkEvent(o, 'onColumnTreeClick', hImg);
   return h;
}

/**************************************************************
 * 得到input 内的值
 *
 * @method
 * @return String input内的值
 **************************************************************/
function FCellTree_text(){
   return this.hEdit.value;
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellTree_setText(v){
   this.hEdit.value = v;
}
/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellTree_set(){
   var o = this;
   var r = o.row;
   var ochd = r.get('ochd');
   if(ochd == 'Y'){
      o.hImg.src = o.styleIconPath('Expend', FColumnTree);
   }else if(ochd == 'N'){
      o.hImg.src = o.styleIconPath('Node', FColumnTree);
   }
   var lbs = r.row.get('label');
   o.hLabel.innerText = RString.nvl(lbs);
}
