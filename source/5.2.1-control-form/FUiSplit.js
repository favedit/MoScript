//==========================================================
// <T>分割控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
function FUiSplit(o){
   //o = RClass.inherits(this, o, FUiControl, MDesign, MDisplay, MUiHorizontal);
   o = RClass.inherits(this, o, FUiControl);
   //..........................................................
   // @property
   //o._dispStyle        = RClass.register(o, new APtyString('_dispStyle', ESplitStyle.Normal));
   //o._icon             = RClass.register(o, new APtyString('_icon'));
   //o._editExtend       = RClass.register(o, new APtyBoolean('_editExtend'), true);
   // @style
   //o._styleTitle       = RClass.register(o, new AStyle('Title'));
   //o._iconMinus        = 'ctl.collapse_nor';
   //o._iconPlus         = 'ctl.expand_nor';
   // @attribute
   //o.__lines           = null;
   //o._esize            = ESize.Horizontal;
   //o.extended          = true;
   // @html
   //o.hImage            = null;
   //o.hIcon             = null;
   //o.hText             = null;
   //..........................................................
   // @event
   //o.onSplitMouseEnter = RClass.register(o, new HMouseEnter('onSplitMouseEnter'), FUiSplit_onSplitMouseEnter); 
   //o.onSplitMouseLeave = RClass.register(o, new HMouseLeave('onSplitMouseLeave'), FUiSplit_onSplitMouseLeave); 
   //o.onMouseDown       = FUiSplit_onMouseDown;
   //o.onBuildPanel      = FUiSplit_onBuildPanel;
   //..........................................................
   // @process
   //o.oeBuild           = FUiSplit_oeBuild;
   //o.oeMode            = FUiSplit_oeMode;
   //..........................................................
   // @method
   //o.construct         = FUiSplit_construct;
   //o.extend            = FUiSplit_extend;
   //o.pushLine          = FUiSplit_pushLine;
   //o.dispose           = FUiSplit_dispose;
   return o;
}

//==========================================================
// <T>�������¼���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
function FUiSplit_onSplitMouseEnter(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_hvr' : 'ctl.expand_hvr');
   }
}

//==========================================================
// <T>����뿪�¼���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
function FUiSplit_onSplitMouseLeave(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_nor' : 'ctl.expand_nor');
   }
}

//==========================================================
// <T>��갴���¼���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
function FUiSplit_onMouseDown(){
   var o = this;
   if(ESplitStyle.Normal == o._dispStyle){
      o.extend(!o.extended);
   }
}

//==========================================================
// <T>�����װ塣</T>
//
// @method
//==========================================================
function FUiSplit_onBuildPanel(){
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
function FUiSplit_oeBuild(e){
   var o = this;
   o.base.FUiControl.oeBuild.call(o, e);
   o.height = 2;
   // Text
   if(RString.equals(o._dispStyle, ESplitStyle.Normal)){
      var hf = o.hForm;
      var hr = hf.insertRow()
      o.attachEvent('onSplitMouseEnter', hf);
      o.attachEvent('onSplitMouseLeave', hf);
      // ��������
      var hc = hr.insertCell();
      hc.width = '100%';
      hc.height = 25;
      hc.style.padding = '0 0';
      hc.style.background = 'url(' + RRes._iconPath('ctl.FUiSplit_Panel') + ')';
      RBuilder.appendEmpty(hc, 4);
      o.hImage = RBuilder.appendIcon(hc, o._iconMinus);
      if(o._icon){
         o.hIcon = RBuilder.appendIcon(hc, o._icon);
      }
      o.hText = RBuilder.appendText(hc, '&nbsp;&nbsp;' + o.label);
      o.hText.style.fontWeight='BOLD';
   }else if(RString.equals(o._dispStyle, ESplitStyle.BulgeLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #666666';
      h.style.borderTop  = '1px solid #DDDDDD';
      h.height = 2;
   }else if(RString.equals(o._dispStyle, ESplitStyle.HollowLine)){
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
function FUiSplit_oeMode(e){
   var o = this;
   var r = o.base.FUiControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   o.extend(o._editExtend);
   return r;
}

//==========================================================
// <T>��������</T>
//
// @method
//==========================================================
function FUiSplit_construct(){
   var o = this;
   o.__lines = new TList();
}

//==========================================================
// <T>չ������������ؼ���</T>
//
// @method
// @param v:visible:Boolean �Ƿ�չ��
//==========================================================
function FUiSplit_extend(v){
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
      o.hImage.src = v ? RResource._iconPath(o._iconMinus) : RRes._iconPath(o._iconPlus);
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
function FUiSplit_pushLine(hr){
   this.__lines.push(hr);
}

//==========================================================
// <T>�ͷŶ���</T>
//
// @method
//==========================================================
function FUiSplit_dispose(){
   var o = this;
   o.base.FUiControl.dispose.call(o);
   if(o.__lines){
      o.__lines.release();
      o.__lines = null;
   }
   o.hForm = null;
   o.hText = null;
   o.hIcon = null;
   o.hImage = null;
}
