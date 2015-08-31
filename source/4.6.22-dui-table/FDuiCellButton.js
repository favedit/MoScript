with(MO){
   //==========================================================
   // <T>表格按键单元格。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FDuiCellButton = function FDuiCellButton(o){
      o = MO.Class.inherits(this, o, FCell);
      //..........................................................
      // @attribute
      o.buttons           = null;
      o.attributes        = null;
      //..........................................................
      // @event
      o.onButtonEnter     = MO.Class.register(o, new MO.AEventMouseEnter('onButtonEnter'), FDuiCellButton_onButtonEnter);
      o.onButtonLeave     = MO.Class.register(o, new MO.AEventMouseLeave('onButtonLeave'), FDuiCellButton_onButtonLeave);
      o.onCellLeave       = MO.Class.register(o, new MO.AEventMouseLeave('onCellLeave'), FDuiCellButton_onCellLeave);
      o.onHintEnter       = MO.Class.register(o, new MO.AEventMouseEnter('onHintEnter'), FDuiCellButton_onHintEnter);
      o.onHintLeave       = MO.Class.register(o, new MO.AEventMouseLeave('onHintLeave'), FDuiCellButton_onHintLeave);
      o.onButtonClick     = MO.Class.register(o, new MO.AEventClick('onButtonClick'), FDuiCellButton_onButtonClick);
      //..........................................................
      // @method
      o.construct         = FDuiCellButton_construct;
      o.isDataChanged     = RMethod.emptyFalse;
      o.findButtonByPanel = FDuiCellButton_findButtonByPanel;
      o.buildForm         = FDuiCellButton_buildForm;
      o.set               = FDuiCellButton_set;
      o.modifyButton      = FDuiCellButton_modifyButton;
      o.refreshStyle      = FDuiCellButton_refreshStyle;
      return o;
   }

   //==========================================================
   // <T>鼠标进入的事件。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FDuiCellButton_onButtonEnter = function FDuiCellButton_onButtonEnter(e){
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
   MO.FDuiCellButton_onButtonLeave = function FDuiCellButton_onButtonLeave(e){
      var o = this;
      var b = o.findButtonByPanel(e.hSource);
      if(b){
         var hs = b.hPanel.style;
         hs.color = '#0661B0';
         hs.cursor = 'normal';
      }
   }

   MO.FDuiCellButton_onHintEnter = function FDuiCellButton_onHintEnter(e){
      var o = this;
      e.hSource.style.backgroundColor = "#eeeeee";
      //e.hSource.style.cursor = "hand";
   }
   //------------------------------------------------------------
   MO.FDuiCellButton_onCellLeave = function FDuiCellButton_onCellLeave(e){
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
   MO.FDuiCellButton_onHintLeave = function FDuiCellButton_onHintLeave(e){
      e.hSource.style.backgroundColor = "#ffffff";
       e.hSource.style.display = "none";
   }

   //==========================================================
   // <T>按键点击事件。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FDuiCellButton_onButtonClick = function FDuiCellButton_onButtonClick(e){
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
   MO.FDuiCellButton_construct = function FDuiCellButton_construct(){
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
   MO.FDuiCellButton_findButtonByPanel = function FDuiCellButton_findButtonByPanel(h){
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
   MO.FDuiCellButton_buildForm = function FDuiCellButton_buildForm(){
      var o = this;
      var c = o.column;
      var hp = o.hPanel;
      RControl.attachEvent(o, 'onCellLeave', hp, o.onCellLeave);
      hp.align = 'left';
      hp.padding = 1;
      // 建立表格底板
      var hf = o.hForm = MO.Window.Builder.appendTable(o.hPanel);
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
            var hbp = MO.Window.Builder.append(hc, 'DIV');
            var hi = null;
            if(b.icon){
               hi = MO.Window.Builder.appendIcon(hbp, b.icon);
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
                  ht = MO.Window.Builder.appendText(hbp, b.label);
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
   MO.FDuiCellButton_set = function FDuiCellButton_set(v){
      var o = this;
      if(!MO.Lang.String.isEmpty(v)){
         var pbs = new TAttributes();
         pbs.unpack(v);
         for(var n=0; n<pbs.count; n++){
            var b = o.buttons.get(pbs.name(n));
            var pk = pbs.value(n);
            if(b && !MO.Lang.String.isEmpty(pk)){
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
   MO.FDuiCellButton_modifyButton = function FDuiCellButton_modifyButton(b, as){
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
         hfd = o.hFloatDrop = MO.Window.Builder.append(o.hHintPanel, 'DIV');
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
   MO.FDuiCellButton_refreshStyle = function FDuiCellButton_refreshStyle(){
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
}
