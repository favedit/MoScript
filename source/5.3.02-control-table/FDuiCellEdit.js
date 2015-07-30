with(MO){
   //==========================================================
   // <T>文本编辑单元格控件。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FDuiCellEdit = function FDuiCellEdit(o){
      //o = RClass.inherits(this, o, FDuiCellEditControl, MDuiFocus);
      o = RClass.inherits(this, o, FDuiCellEditControl);
      //..........................................................
      // @style
      o._styleInput = RClass.register(o, new AStyle('_styleInput'));
      //..........................................................
      // @html
      o._hInput     = null;
      //..........................................................
      // @event
      o.onBuildEdit = FDuiCellEdit_onBuildEdit;
      //..........................................................
      // @method
      o.get         = FDuiCellEdit_get;
      o.set         = FDuiCellEdit_set;
      //..........................................................
      // @method
      //o.buildDrop = FDuiCellEdit_buildDrop;
      //o.setInfo   = FDuiCellEdit_setInfo;
      //o.text      = FDuiCellEdit_text;
      //o.setText   = FDuiCellEdit_setText;
      return o;
   }

   //==========================================================
   // <T>在单元格内编辑区创建编辑控件。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDuiCellEdit_onBuildEdit = function FDuiCellEdit_onBuildEdit(p){
      var o = this;
      var c = o._column;
      // 建立文本输入框
      o._hInput = RBuilder.appendEdit(o._hEditPanel, o.styleName('Input'));
      //if(c.canZoom()){
      //   // 设置文本底板
      //   var hep = o.hEditPanel;
      //   c.linkEvent(o, 'onCellDoubleClick', hep, c.onCellDoubleClick);
      //   // 建立显示文本
      //   var he = o.hEdit = RBuilder.append(hep, 'SPAN');
      //   he.style.color = 'blue';
      //   he.style.textDecoration = 'underline';
      //   he.style.cursor = 'hand';
      //   he.style.paddingBottom = 1;
      //   //he.style.borderBottom = '1px dotted #000000';
      //   c.linkEvent(o, 'onZoomClick', he, c.onZoomClick);
      //   c.linkEvent(o, 'onZoomHover', he, c.onZoomHover);
      //   c.linkEvent(o, 'onZoomLeave', he, c.onZoomLeave);
      //   // 设置文字对齐方式
      //   if(!RString.isEmpty(c.editAlign)){
      //      he.style.textAlign = c.editAlign;
      //   }
      //}else{
         //if(c._absEdit){
         //   o.base.FDuiCellEditControl.buildEdit.call(o);
         //}else{
         //   var he = o.hEditPanel;
         //   c.linkEvent(o, 'onCellMouseDown', he, c.onCellMouseDown);
         //   c.linkEvent(o, 'onCellClick', he, c.onCellClick);
         //   c.linkEvent(o, 'onCellDoubleClick', he, c.onCellDoubleClick);
         //}
      //}
   }

   //==========================================================
   // <T>获取数据。</T>
   //
   // @method
   // @return String 数据
   //==========================================================
   MO.FDuiCellEdit_get = function FDuiCellEdit_get(){
      var r = o.__base.FDuiCellEditControl.get.call(o, p);
      // 获得显示
      var h = o._hInput;
      if(h){
         r = h.value;
      }
      return r;
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @method
   // @param p:value:String 数据
   //==========================================================
   MO.FDuiCellEdit_set = function FDuiCellEdit_set(p){
      var o = this;
      o.__base.FDuiCellEditControl.set.call(o, p);
      // 设置显示
      var h = o._hInput;
      if(h){
         h.value = RString.nvl(p);
      }
      //o.finded = v;
      //if(o.hChangeIcon){
      //   o.hChangeIcon.style.display = 'none';
      //}
   }




   //==========================================================
   MO.FDuiCellEdit_buildDrop = function FDuiCellEdit_buildDrop(){
      var o = this;
      var c = o.column;
      if(!RString.isEmpty(c.lovRefer)){
         var hdp = o.hDropPanel;
         hdp.align = 'right';
         hdp.style.paddingRight = 2;
         var hli = o.hLovImage = RBuilder.appendIcon(hdp, 'ctl.FDuiCellEdit_Lov', null, 16, 16);
         hli.style.borderLeft='1 solid #CCCCCC';
         hli.style.cursor = 'hand';
         c.linkEvent(o, 'onListClick', hli);
      }
   }

   //==========================================================
   // <T>设置控件信息。</T>
   //
   // @method
   // @param f:info:TControlInfo 控件信息
   //==========================================================
   MO.FDuiCellEdit_setInfo = function FDuiCellEdit_setInfo(f){
      var o = this;
      o.base.FDuiCellEditControl.setInfo.call(o, f);
      var d = o.column;
      var m = d.iconMap;
      var hi = o.hIcon;
      if(m && m.get(f.icon)){
         hi.style.display = 'block';
         hi.title = f.iconHint;
         hi.src = RResource.iconPath(m.get(f.icon));
      }else{
         if(hi){
            hi.style.display = 'none';
         }
      }
   }

   //==========================================================
   // <T>获得文本内容。</T>
   //
   // @method
   // @return String 文本内容
   //==========================================================
   MO.FDuiCellEdit_text = function FDuiCellEdit_text(){
      var o = this;
      var c = o.column;
      if(c.canZoom()){
         return o.hEdit.innerText;
      }
      //
      if(c._absEdit){
         return o.hEdit.value;
      }
      return o.hEditPanel.innerText;
   }

   //==========================================================
   // <T>设置文本内容。</T>
   //
   // @method
   // @param t:text:String 文本内容
   //==========================================================
   MO.FDuiCellEdit_setText = function FDuiCellEdit_setText(t){
      var o = this;
      var c = o.column;
      if(c.canZoom()){
         o.hEdit.innerText = t;
      }else{
         if(c._absEdit){
            o.hEdit.value = t;
         }else{
            o.hEditPanel.innerText = t;
         }
      }
   }
}
