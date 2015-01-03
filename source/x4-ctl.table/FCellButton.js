//==========================================================
// <T>单元按键控件类。</T>
//
// @class FCell
// @history 090819 MAOCY 创建
//==========================================================
function FCellButton(o){
   o = RClass.inherits(this, o, FCell);
   //..........................................................
   // @attribute
   o.buttons           = null;
   o.attributes        = null;
   //..........................................................
   // @event
   o.onButtonEnter     = RClass.register(o, new HMouseEnter('onButtonEnter'), FCellButton_onButtonEnter);
   o.onButtonLeave     = RClass.register(o, new HMouseLeave('onButtonLeave'), FCellButton_onButtonLeave);
   o.onCellLeave       = RClass.register(o, new HMouseLeave('onCellLeave'), FCellButton_onCellLeave);
   o.onHintEnter       = RClass.register(o, new HMouseEnter('onHintEnter'), FCellButton_onHintEnter);
   o.onHintLeave       = RClass.register(o, new HMouseLeave('onHintLeave'), FCellButton_onHintLeave);
   o.onButtonClick     = RClass.register(o, new HClick('onButtonClick'), FCellButton_onButtonClick);
   //..........................................................
   // @method
   o.construct         = FCellButton_construct;
   o.isDataChanged     = RMethod.emptyFalse;
   o.findButtonByPanel = FCellButton_findButtonByPanel;
   o.buildForm         = FCellButton_buildForm;
   o.set               = FCellButton_set;
   o.modifyButton      = FCellButton_modifyButton;
   o.refreshStyle      = FCellButton_refreshStyle;
   return o;
}

//==========================================================
// <T>鼠标进入的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FCellButton_onButtonEnter(e){
   var o = this;
   var b = o.findButtonByPanel(e.hSource);
   if(b){
      var hs = b.hPanel.style;
      hs.color = 'black';
      hs.cursor = 'hand';
      if(b.hintBox){
  		b.hintBox.style.display = "block";
  	  }
   }
   if (o.hHintPanel) {
	   o.hHintPanel.style.display = '';
   }
}

//==========================================================
// <T>鼠标离开的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FCellButton_onButtonLeave(e){
   var o = this;
   var b = o.findButtonByPanel(e.hSource);
   if(b){
      var hs = b.hPanel.style;
      hs.color = '#0661B0';
      hs.cursor = 'normal';
   }
}

function FCellButton_onHintEnter(e){
   var o = this;
   e.hSource.style.backgroundColor = "#eeeeee";
   //e.hSource.style.cursor = "hand";
}
//------------------------------------------------------------
function FCellButton_onCellLeave(e){
	var bs = this.buttons;
	var c = bs.count;
	for(var n = 0; n<c; n++){
	   var b = bs.value(n);
	   if(b.hintBox){
	      b.hintBox.style.display='none';
	   }
	}
}

// ------------------------------------------------------------
function FCellButton_onHintLeave(e){
	e.hSource.style.backgroundColor = "#ffffff";
    e.hSource.style.display = "none";
}
//==========================================================
// <T>按键点击事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FCellButton_onButtonClick(e){
   var o = this;
   // 单击单元格
   var t = o.table;
   t.clickCell(o);
   // 处理事件
   var b = o.findButtonByPanel(e.hSource);
   if(b){
      b.button.callEvent('onClick', o, e);
   }
}

//==========================================================
// <T>根据底板对象查找按键对象。</T>
//
// @method
// @param h:html:<HTML> 页面对象
// @return 按键对象
//==========================================================
function FCellButton_construct(){
   var o = this;
   o.base.FCell.construct.call(o);
   o.attributes = new TAttributes();
}

//==========================================================
// <T>根据底板对象查找按键对象。</T>
//
// @method
// @param h:html:<HTML> 页面对象
// @return 按键对象
//==========================================================
function FCellButton_findButtonByPanel(h){
   var o = this;
   var bs = o.buttons;
   for(var n=0; n<bs.count; n++){
      var b = bs.value(n);
      if(b.hPanel == h){
         return b;
      }
   }
}

//==========================================================
// <T>建立底板表单。</T>
//
// @method
//==========================================================
function FCellButton_buildForm(){
   var o = this;
   var c = o.column;
   var hp = o.hPanel;
   RControl.attachEvent(o, 'onCellLeave', hp, o.onCellLeave);
   hp.align = 'left';
   hp.padding = 1;
   // 建立表格底板
   var hf = o.hForm = RBuilder.appendTable(o.hPanel);
   var hr = o.hFormLine = hf.insertRow();
   // 建立按键
   var bs = c.components;

   if(bs){
      o.buttons = new TMap();
      for(var n=0; n<bs.count; n++){
         // 获得按键定义
         var b = bs.value(n);
         // 创建底板
         var hc = hr.insertCell();
         hc.align = 'center';
         hc.style.padding = '0 3';
         var hbp = RBuilder.append(hc, 'DIV');
         var hi = null;
         if(b.icon){
            hi = RBuilder.appendIcon(hbp, b.icon);
         }else{
            hbp.style.padding = '2 6';
            //hbp.style.borderLeft = '1 solid #DDDDDD';
            //hbp.style.borderTop = '1 solid #DDDDDD';
            //hbp.style.borderRight = '1 solid #000000';
            //hbp.style.borderBottom = '1 solid #000000';
            //hbp.style.backgroundColor = '#FFFFFF';
            hbp.style.color = '#0661B0';
            hbp.style.textDecoration = 'underline';
         }
         o.attachEvent('onButtonEnter', hbp, o.onButtonEnter);
         o.attachEvent('onButtonLeave', hbp, o.onButtonLeave);
         o.attachEvent('onButtonClick', hbp, o.onButtonClick);
         var ht = null;
         if(b.label){
            if(b.icon){
               hi.title = b.label;
            }else{
               ht = RBuilder.appendText(hbp, b.label);
            }
         }
         // 创建按键
         var cb = new TCellButton();
         cb.button = b;
         cb.hLayout = hc;
         cb.hPanel = hbp;
         cb.hIcon = hi;
         cb.hText = ht;
         o.buttons.set(b.name, cb);
      }
      // 创建提示面板
      var hfp = o.hHintPanel = o.hForm.insertRow().insertCell();
      hfp.height = 1;
      hfp.style.position = 'relative';
   }
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param v:value:String 文本内容
//==========================================================
function FCellButton_set(v){
   var o = this;
   if(!RString.isEmpty(v)){
      var pbs = new TAttributes();
      pbs.unpack(v);
      for(var n=0; n<pbs.count; n++){
         var b = o.buttons.get(pbs.name(n));
         var pk = pbs.value(n);
         if(b && !RString.isEmpty(pk)){
            var as = o.attributes;
            as.clear();
            as.unpack(pk);
            o.modifyButton(b, as);
         }
      }
   }
}

//==========================================================
// <T>更改按键状态。</T>
//
// @method
// @param b:button:TCellButton 按键对象
// @param as:attributes:TAttributes 属性对象
//==========================================================
function FCellButton_modifyButton(b, as){
   var o = this;
   // 设置可见性
   var bv = true;
   if(as.contains('visible')){
      bv = RBoolean.isTrue(as.get('visible'));
   }
   b.hLayout.style.display = bv ? 'block' : 'none';
   // 设置禁止状态
   var pd = as.get('disabled');
   if(pd){
      if(RBoolean.isTrue(pd)){
         hc.style.padding = 3;
         hc.style.border = 0;
      }else{
         hc.style.padding = 2;
         hc.style.borderLeft = '1 solid #DDDDDD';
         hc.style.borderTop = '1 solid #DDDDDD';
         hc.style.borderRight = '1 solid #999999';
         hc.style.borderBottom = '1 solid #999999';
         hc.style.backgroundColor = '#FFFFFF';
      }
   }
   // 设置标签
   var pl = as.get('label');
   if(pl){
      if(b.icon){
         b.hIcon.title = pl;
      }else{
         b.hText.innerText = pl;
      }
   }
   // 如果存在提示，则创建提示对象
   if(as.contains('hint')){
      // 自己创建div的提示框
      hfd = o.hFloatDrop = RBuilder.append(o.hHintPanel, 'DIV');
      // 设置样式
      hfd.style.borderLeft = '1 solid #CCCCCC';
      hfd.style.borderTop = '1 solid #CCCCCC';
      hfd.style.borderRight = '1 solid #666666';
      hfd.style.borderBottom = '1 solid #666666';
      hfd.style.zIndex = 40000;
      hfd.style.backgroundColor = '#FFFFFF';
      // 初试是不显示的
      hfd.style.display = 'none';
      hfd.style.position = 'absolute'
      hfd.style.padding = '4 8';
      hfd.style.width = '300px';
      hfd.style.pixelTop = b.offsetHeight + 1;
      hfd.style.pixelLeft = b.hPanel.offsetWidth + 20;
      hfd.innerHTML = as.get('hint');
      //hfd.innerHTML = '<A href="http://news.sina.com.cn/" ' +" target='_blank'>" + '新浪网站</A>';
      // 关联事件
      o.attachEvent('onHintEnter', hfd, o.onHintEnter);
      o.attachEvent('onHintLeave', hfd, o.onHintLeave);
      b.hintBox = hfd;
   }
}

//==========================================================
// <T>刷新样式。</T>
//
// @method
//==========================================================
function FCellButton_refreshStyle(){
   var o = this;
   var r = o.row;
   // 设置背景颜色
   var bc = null;
   if(r.isSelect){
      bc = EColor.RowSelect;
   }else{
      var ih = (o.column.table.__hoverRow == r);
      if(ih){
         bc = EColor.RowHover;
      }else{
         bc = EColor.Rows[r.index % EColor.Rows.length];
      }
   }
   o.hPanel.style.backgroundColor = bc;
}
