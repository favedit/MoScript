with(MO){
   //===========================================================
   // <T>运行信息管理类。</T>
   //
   // @tool
   // @author maocy
   // @version 141229
   //===========================================================
   MO.RDump = function RDump(){
      var o = this;
      //..........................................................
      // @define
      o.LINE_SINGLE = '------------------------------';
      o.LINE_DOUBLE = '==============================';
      o.LINE_DOT    = '..............................';
      o.LINE_STAR   = '******************************';
      return o;
   }

   //===========================================================
   // <T>鼠标点击处理。</T>
   //
   // @method
   //===========================================================
   MO.RDump.prototype.onclick = function RDump_onclick(){
      var o = this;
      var d = o.link;
      if(o.link){
         if(d.loaded){
            d.show(!d.display);
         }else{
            RDump.dumpInner(o.link);
            d.loaded = true;
            d.show(true);
         }
      }
   }

   //===========================================================
   // <T>获得对象的名称信息。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @return 名称信息
   //===========================================================
   MO.RDump.prototype.nameInfo = function RDump_nameInfo(v){
      var t = RClass.typeOf(v);
      switch(t){
         case 'Unknown':
            return '@unknown';
         case 'Function':
            return RMethod.name(v) + '@Function';
         case 'Array':
            return '@<Array>';
      }
      return v;
   }

   //===========================================================
   // <T>获得对象的类型信息。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param t:typeName:Object 类型
   // @return 类型信息
   //===========================================================
   MO.RDump.prototype.typeInfo = function RDump_typeInfo(v, t){
      // 检查参数
      if(v == null){
         return 'null';
      }
      // 获得内容
      switch(t){
         case 'Unknown':
            return 'unknown';
         case 'Undefined':
            return 'undefined';
         case 'Boolean':
         case 'Number':
            return v.toString();
         case 'String':
            return v.length + ':\'' + RString.toLine(v) + '\'';
         case 'Function':
            if(v.__virtual){
               return 'virtual';
            }
            return RMethod.name(v, true);
         case 'Array':
            return '@<Array@' + RClass.code(v) + '> length=' + v.length;
         case 'Html':
            return '@<' + v.tagName + '>';
         default:
            if(v.constructor == TClass){
               return '@<' + v.name + '@' + RClass.code(v) + '>';
            }
            if(v.constructor == Function){
               return "@" + v.toString();
            }
            try{
               for(var name in v){
                  return '@<Object@' + RClass.code(v) + '>';
               }
            }catch(e){}
            return '<Object@' + RClass.code(v) + '>';
      }
   }

   //===========================================================
   // <T>生成对象的运行信息。</T>
   //
   // @method
   // @param di:dumpItem:TDumpItem 运行信息项目
   //===========================================================
   MO.RDump.prototype.dumpInner = function RDump_dumpInner(di){
      var hTable  = di.hTable;
      var hParent = di.hParent;
      var hInsRow = di.hRow;
      var level   = di.level;
      var obj     = di.link;
      var type    = RClass.typeOf(obj, true);
      var vcls    = obj.__class;
      // Names sort
      var names = new Array();
      for(var name in obj){
         names[names.length] = name;
      }
      if(RString.endsWith(type, 'Array')){
         RArray.reverse(names, 0, names.length - 1);
      }else{
         RArray.sort(names, true);
         //RArray.sort(names);
      }
      // Items Info
      var items = new Array();
      var c = names.length;
      if(c > 2000){
         c = 2000;
      }
      for(var n = 0; n < c; n++){
         var name = names[n];
         var value = '{error}';
         try{
            value = obj[name];
         }catch(e){}
         var stype = RClass.safeTypeOf(value, true);
         var type = RClass.safeTypeOf(value, true);
         var info = null;
         var infoFormat = true;
         if(vcls){
            var ann = vcls.attributeFind(name);
            if(ann){
               type = 'Annotation<' + RMethod.name(ann.constructor) + '>'
               if(value && value.constructor == Function){
                  info = "<FONT color='green'>" + RMethod.name(value) + "</FONT>";
               }else{
                  info = value + "<FONT color='green'> - (" + RHtml.toHtml(ann.toString()) + ")</FONT>";
               }
               infoFormat = false;
            }
         }
         if(info == null){
            info = this.typeInfo(value, type);
         }
         // 建立表格行
         var rdi = null;
         var index = hInsRow ? hInsRow.rowIndex + 1 : 0;
         var hRow = RBuilder.appendTableRow(hTable, null, index);
         hRow.bgColor = '#FFFFFF';
         if(RString.startsWith(info, '@')){
            hRow.style.cursor = 'pointer';
            hRow.onclick = this.onclick;
            hRow.bgColor = '#FFF0E0';
            rdi = hRow.link = di.create();
            rdi.link = value;
            rdi.level = level;
            rdi.caption = name;
            rdi.hTable = hTable;
            rdi.level = level + 1;
            rdi.hRow = hRow;
         }else{
            di.push(hRow);
         }
         // 设置虚函数
         if((type == 'Function') && (info == 'virtual')){
            hRow.bgColor = '#E0F0FF';
         }
         // 建立名称单元格
         var hCell = RBuilder.appendTableCell(hRow);
         var icon = RString.startsWith(info, '@') ? ' +' : '  ';
         var label = RString.repeat('   ', level) + icon + ' ' + name
         hCell.innerHTML = RHtml.toHtml(label);
         hCell.style.borderBottom = '1px solid #F0F0F0';
         hCell.width = '240px'
         if(rdi){
            rdi.hText = hCell;
         }
         // 建立类型单元格
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.innerHTML = RHtml.toHtml(type);
         hCell.style.borderBottom = '1px solid #F0F0F0';
         if(type == 'Function'){
            hCell.style.color = '#3333FF';
         }else{
            hCell.style.color = '#FF3333';
         }
         hCell.width = '200px'
         // 建立信息单元格
         var hCell = RBuilder.appendTableCell(hRow);
         if(RString.startsWith(info, '@')){
            info = info.substr(1);
         }
         if(infoFormat){
            hCell.innerHTML = RHtml.toHtml(info);
         }else{
            hCell.innerHTML = info;
         }
         hCell.style.borderBottom = '1px solid #F0F0F0';
      }
      hTable.width = '100%'
      //console.log(hTable.outerHTML);
   }

   //===========================================================
   // <T>生成对象的运行信息。</T>
   //
   // @method
   // @param value:Object 对象
   // @param hPanel:HtmlTag 页面元素
   //===========================================================
   MO.RDump.prototype.dump = function RDump_dump(value, hPanel){
      if(!hPanel){
         hPanel = RBuilder.append(null, 'DIV')
      }
      // 生成对象信息
      var s = new TString();
      s.append('<', RClass.safeTypeOf(value));
      if(value && value.tagName){
         s.append(' - ', value.tagName);
      }
      s.appendLine('@' + RClass.code(value) + '>');
      // 追加内容
      var hPanel = RBuilder.append(hPanel, 'DIV');
      hPanel.style.border = '1px solid #BBBBBB';
      hPanel.style.backgroundColor = '#E0E0EB';
      // 追加功能
      var hTitleTable = RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
      var hRow = RBuilder.appendTableRow(hTitleTable);
      var hCell = RBuilder.appendTableCell(hRow);
      hTitleTable.width = '100%'
      hCell.style.padding = 2;
      hCell.style.borderBottom = '1px solid gray';
      hCell.style.backgroundColor = '#E0E0EB';
      RHtml.textSet(hCell, s.toString());
      // 追加行内容
      var hTable = RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
      hTable.style.width = '100%';
      // 建立新的层次
      var di = new TDumpItem();
      di.hTable = hTable;
      di.hRow = null;
      di.hParent = hPanel;
      di.link = value;
      di.level = 0;
      this.dumpInner(di);
   }

   //===========================================================
   // <T>追加运行层次。</T>
   //
   // @param r:result:FString 字符串
   // @param l:level:Integer 层次
   //===========================================================
   MO.RDump.prototype.appendLevel = function RDump_appendLevel(r, l){
      for(var n = 0; n < l; n++){
         r.append('   ');
      }
   }

   //===========================================================
   // <T>获得当前调用堆栈。</T>
   //
   // @return 堆栈信息
   //===========================================================
   MO.RDump.prototype.stack = function RDump_stack(){
      var o = RDump_stack.caller;
      var s = new TString();
      while(o){
         s.append(RMethod.name(o));
         o = o.caller;
         if(o){
            s.appendLine();
         }
      }
      MO.Logger.debug(this, s);
   }
   //..........................................................
   // 实例化内容
   MO.RDump = new RDump();
}
