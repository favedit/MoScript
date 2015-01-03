//==========================================================
// <T>�ָ����ؼ�</T>
//
// @class FControl, MDesign, MHorizontal
// @history 091028 MAOCY ����
//==========================================================
function FSplit(o){
   o = RClass.inherits(this, o, FControl, MDesign, MDisplay, MHorizontal);
   //..........................................................
   // @property
   o.dispStyle         = RClass.register(o, new TPtyStr('dispStyle', ESplitStyle.Normal));
   o.icon              = RClass.register(o, new TPtyStr('icon'));
   o.editExtend        = RClass.register(o, new TPtyBool('editExtend'), true);
   // @style
   o.stTitle           = RClass.register(o, new TStyle('Title'));
   o.iconMinus         = 'ctl.collapse_nor';
   o.iconPlus          = 'ctl.expand_nor';
   // @attribute
   o.__lines           = null;
   o._esize            = ESize.Horizontal;
   o.extended          = true;
   // @html
   o.hImage            = null;
   o.hIcon             = null;
   o.hText             = null;
   //..........................................................
   // @event
   o.onSplitMouseEnter = RClass.register(o, new HMouseEnter('onSplitMouseEnter'), FSplit_onSplitMouseEnter); 
   o.onSplitMouseLeave = RClass.register(o, new HMouseLeave('onSplitMouseLeave'), FSplit_onSplitMouseLeave); 
   o.onMouseDown       = FSplit_onMouseDown;
   o.onBuildPanel      = FSplit_onBuildPanel;
   //..........................................................
   // @process
   o.oeBuild           = FSplit_oeBuild;
   o.oeMode            = FSplit_oeMode;
   //..........................................................
   // @method
   o.construct         = FSplit_construct;
   o.extend            = FSplit_extend;
   o.pushLine          = FSplit_pushLine;
   o.dispose           = FSplit_dispose;
   return o;
}

//==========================================================
// <T>�������¼���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
function FSplit_onSplitMouseEnter(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes.iconPath(o.extended ? 'ctl.collapse_hvr' : 'ctl.expand_hvr');
   }
}

//==========================================================
// <T>����뿪�¼���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
function FSplit_onSplitMouseLeave(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes.iconPath(o.extended ? 'ctl.collapse_nor' : 'ctl.expand_nor');
   }
}

//==========================================================
// <T>��갴���¼���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
function FSplit_onMouseDown(){
   var o = this;
   if(ESplitStyle.Normal == o.dispStyle){
      o.extend(!o.extended);
   }
}

//==========================================================
// <T>�����װ塣</T>
//
// @method
//==========================================================
function FSplit_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.create(null, 'DIV');
   o.hForm = RBuilder.appendTable(o.hPanel);
   o.hForm.width = '100%';
}

//==========================================================
// <T>�����ؼ���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
function FSplit_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   o.height = 2;
   // Text
   if(RString.equals(o.dispStyle, ESplitStyle.Normal)){
      var hf = o.hForm;
      var hr = hf.insertRow()
      o.attachEvent('onSplitMouseEnter', hf);
      o.attachEvent('onSplitMouseLeave', hf);
      // ��������
      var hc = hr.insertCell();
      hc.width = '100%';
      hc.height = 25;
      hc.style.padding = '0 0';
      hc.style.background = 'url(' + RRes.iconPath('ctl.FSplit_Panel') + ')';
      RBuilder.appendEmpty(hc, 4);
      o.hImage = RBuilder.appendIcon(hc, o.iconMinus);
      if(o.icon){
         o.hIcon = RBuilder.appendIcon(hc, o.icon);
      }
      o.hText = RBuilder.appendText(hc, '&nbsp;&nbsp;' + o.label);
      o.hText.style.fontWeight='BOLD';
   }else if(RString.equals(o.dispStyle, ESplitStyle.BulgeLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #666666';
      h.style.borderTop  = '1px solid #DDDDDD';
      h.height = 2;
   }else if(RString.equals(o.dispStyle, ESplitStyle.HollowLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #DDDDDD';
      h.style.borderTop  = '1px solid #666666';
      h.height = 2;
   }
   // Event
   return EEventStatus.Stop;
}

//==========================================================
// <T>�����ؼ���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
function FSplit_oeMode(e){
   var o = this;
   var r = o.base.FControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   o.extend(o.editExtend);
   return r;
}

//==========================================================
// <T>��������</T>
//
// @method
//==========================================================
function FSplit_construct(){
   var o = this;
   o.__lines = new TList();
}

//==========================================================
// <T>չ������������ؼ���</T>
//
// @method
// @param v:visible:Boolean �Ƿ�չ��
//==========================================================
function FSplit_extend(v){
   var o = this;
   // ���ģʽ
   if(EMode.Design == o._emode){
      return;
   }
   // ����Ƿ����
   if(o.extended == v){
      return;
   }
   // ����չ��״̬
   o.extended = v;
   if(o.hImage){
      o.hImage.src = v ? RResource.iconPath(o.iconMinus) : RRes.iconPath(o.iconPlus);
   }
   // �������еĿɼ���
   var c = o.__lines.count;
   for(var n=0; n<c; n++){
      o.__lines.get(n).style.display = v ? 'block' : 'none';
   }
   // �����ı��С�¼�
   o.topControl().topResize(o);
}

//==========================================================
// <T>����һ�������С�</T>
//
// @method
// @param hr:htmlRow:<TR> �ж���
//==========================================================
function FSplit_pushLine(hr){
   this.__lines.push(hr);
}

//==========================================================
// <T>�ͷŶ���</T>
//
// @method
//==========================================================
function FSplit_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   if(o.__lines){
      o.__lines.release();
      o.__lines = null;
   }
   o.hForm = null;
   o.hText = null;
   o.hIcon = null;
   o.hImage = null;
}
