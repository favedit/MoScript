//==========================================================
// <T>分割控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiSplit = function FDuiSplit(o){
   //o = MO.Class.inherits(this, o, FDuiControl, MDesign, MDisplay, MDuiHorizontal);
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   //..........................................................
   // @property
   //o._dispStyle        = MO.Class.register(o, new MO.APtyString('_dispStyle', ESplitStyle.Normal));
   //o._icon             = MO.Class.register(o, new MO.APtyString('_icon'));
   //o._editExtend       = MO.Class.register(o, new MO.APtyBoolean('_editExtend'), true);
   // @style
   //o._styleTitle       = MO.Class.register(o, new MO.AStyle('Title'));
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
   //o.onSplitMouseEnter = MO.Class.register(o, new HMouseEnter('onSplitMouseEnter'), FDuiSplit_onSplitMouseEnter); 
   //o.onSplitMouseLeave = MO.Class.register(o, new HMouseLeave('onSplitMouseLeave'), FDuiSplit_onSplitMouseLeave); 
   //o.onMouseDown       = FDuiSplit_onMouseDown;
   //o.onBuildPanel      = FDuiSplit_onBuildPanel;
   //..........................................................
   // @process
   //o.oeBuild           = FDuiSplit_oeBuild;
   //o.oeMode            = FDuiSplit_oeMode;
   //..........................................................
   // @method
   //o.construct         = FDuiSplit_construct;
   //o.extend            = FDuiSplit_extend;
   //o.pushLine          = FDuiSplit_pushLine;
   //o.dispose           = FDuiSplit_dispose;
   return o;
}

//==========================================================
// <T>�������¼���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
MO.FDuiSplit_onSplitMouseEnter = function FDuiSplit_onSplitMouseEnter(e){
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
MO.FDuiSplit_onSplitMouseLeave = function FDuiSplit_onSplitMouseLeave(e){
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
MO.FDuiSplit_onMouseDown = function FDuiSplit_onMouseDown(){
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
MO.FDuiSplit_onBuildPanel = function FDuiSplit_onBuildPanel(){
   var o = this;
   o.hPanel = MO.Window.Builder.create(null, 'DIV');
   o.hForm = MO.Window.Builder.appendTable(o.hPanel);
   o.hForm.width = '100%';
}

//==========================================================
// <T>�����ؼ���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
MO.FDuiSplit_oeBuild = function FDuiSplit_oeBuild(e){
   var o = this;
   o.base.FDuiControl.oeBuild.call(o, e);
   o.height = 2;
   // Text
   if(MO.Lang.String.equals(o._dispStyle, ESplitStyle.Normal)){
      var hf = o.hForm;
      var hr = hf.insertRow()
      o.attachEvent('onSplitMouseEnter', hf);
      o.attachEvent('onSplitMouseLeave', hf);
      // ��������
      var hc = hr.insertCell();
      hc.width = '100%';
      hc.height = 25;
      hc.style.padding = '0 0';
      hc.style.background = 'url(' + RRes._iconPath('ctl.FDuiSplit_Panel') + ')';
      MO.Window.Builder.appendEmpty(hc, 4);
      o.hImage = MO.Window.Builder.appendIcon(hc, o._iconMinus);
      if(o._icon){
         o.hIcon = MO.Window.Builder.appendIcon(hc, o._icon);
      }
      o.hText = MO.Window.Builder.appendText(hc, '&nbsp;&nbsp;' + o.label);
      o.hText.style.fontWeight='BOLD';
   }else if(MO.Lang.String.equals(o._dispStyle, ESplitStyle.BulgeLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #666666';
      h.style.borderTop  = '1px solid #DDDDDD';
      h.height = 2;
   }else if(MO.Lang.String.equals(o._dispStyle, ESplitStyle.HollowLine)){
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
MO.FDuiSplit_oeMode = function FDuiSplit_oeMode(e){
   var o = this;
   var r = o.base.FDuiControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   o.extend(o._editExtend);
   return r;
}

//==========================================================
// <T>��������</T>
//
// @method
//==========================================================
MO.FDuiSplit_construct = function FDuiSplit_construct(){
   var o = this;
   o.__lines = new TList();
}

//==========================================================
// <T>չ������������ؼ���</T>
//
// @method
// @param v:visible:Boolean �Ƿ�չ��
//==========================================================
MO.FDuiSplit_extend = function FDuiSplit_extend(v){
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
MO.FDuiSplit_pushLine = function FDuiSplit_pushLine(hr){
   this.__lines.push(hr);
}

//==========================================================
// <T>�ͷŶ���</T>
//
// @method
//==========================================================
MO.FDuiSplit_dispose = function FDuiSplit_dispose(){
   var o = this;
   o.base.FDuiControl.dispose.call(o);
   if(o.__lines){
      o.__lines.release();
      o.__lines = null;
   }
   o.hForm = null;
   o.hText = null;
   o.hIcon = null;
   o.hImage = null;
}
