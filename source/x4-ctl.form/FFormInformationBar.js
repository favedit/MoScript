// *********************************************************
// <T>记录信息栏控件。</T>
// <P>显示当前记录的一些即时信息。</P>
// *********************************************************
function FFormInformationBar(o){
   o = RClass.inherits(this, o, FEditControl, MHorizontal);
   // @attribute
   o._esize      = ESize.Horizontal;
   // @event
   o.onBuildEdit = RMethod.empty;
   // @process
   o.oeBuild     = FFormInformationBar_oeBuild;
   // @method
   o.set         = FFormInformationBar_set;
   o.get         = RMethod.empty;
   o.dispose     = FFormInformationBar_dispose;
   return o;
}

// *********************************************************
// <T>建立显示框架。</T>
//
// @param e:event:TEvent 事件对象
// *********************************************************
function FFormInformationBar_oeBuild(e){
   var o = this;
   // 建立控件的最底层HTML容器
   var hp = o.hForm = o.hPanel = RBuilder.appendTable();
   hp.style.marginBottom = 8;
   hp.style.borderLeft = '1 solid #666666';
   hp.style.borderTop = '1 solid #666666';
   hp.style.borderRight = '1 solid #DDDDDD';
   hp.style.borderBottom = '1 solid #DDDDDD';
   // 设置容器位置，大小，空余
   o.setBounds(o.left, o.top, o.right, o.bottom, true);
   o.setSize(o.width, o.height);
   o.setPads(o.padLeft, o.padTop, o.padRight, o.padBottom, true);
   // 如果父容器是可以容纳控件的，则将自己添加到父容器
   if(RClass.isClass(o.parent, MContainer)){
      o.parent.appendChild(o);
   }
   var he = o.hEdit = hp.insertRow().insertCell();
   he.noWrap = true;
   he.style.paddingLeft = 10;
   // 建立控件对象
   hp.width = '100%';
   hp.height = '26';
   return EEventStatus.Stop;
}

// *********************************************************
// <T>设置记录信息。</T>
//
// @param v:value:String 记录信息
// *********************************************************
function FFormInformationBar_set(v){
   var o = this;
   var t = new TString();
   if(v){
      var vs = RString.split(v, '|');
      var d = new TDate();
      RDate.autoParse(d, vs[3]);
      var st =  RDate.formatDate(d, RDate.DisplayFormat);
      t.append('<FONT color=#6868EE>');
      t.append(o.topControl().label);
      t.append('</FONT>  编号(<FONT color=green>');
      t.append(vs[0]);
      t.append('</FONT>) 状态(<FONT color=green>');
      if(RBool.isTrue(vs[1])){
         t.append('有效');
      }else{
         t.append('无效');
      }
      t.append('</FONT>) 上次操作(<FONT color=green>');
      if('I' == vs[2]){
         t.append('新建');
      }else if('U' == vs[2]){
         t.append('更新');
      }else if('D' == vs[2]){
         t.append('删除');
      }
      t.append('</FONT>) 上次修改时间(<FONT color=green>');
      t.append(st);
      t.append('</FONT>)');
      if(vs[5]){
         t.append(' 修改者(<FONT color=green>');
         t.append(vs[5]);
         t.append('</FONT>)');
      }
   }
   o.hEdit.innerHTML = t.toString();
}
// ------------------------------------------------------------

// *********************************************************
// <T>设置记录信息。</T>
//
// @param v:value:String 记录信息
// *********************************************************
function FFormInformationBar_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   o.hEdit = null;
}
// ------------------------------------------------------------
