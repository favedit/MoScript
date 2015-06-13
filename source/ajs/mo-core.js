with(MO){
   MO.AListener = function AListener(name, linker){
      var o = this;
      ASource.call(o, name, ESource.Listener, linker);
      o.build = AListener_build;
      return o;
   }
   MO.AListener_build = function AListener_build(clazz, instance){
      var o = this;
      var addListener = 'add' + o._linker + 'Listener';
      instance[addListener] = RListener.makeAddListener(addListener, o._linker);
      var setListener = 'set' + o._linker + 'Listener';
      instance[setListener] = RListener.makeSetListener(setListener, o._linker);
      var removeListener = 'remove' + o._linker + 'Listener';
      instance[removeListener] = RListener.makeRemoveListener(removeListener, o._linker);
      var clearListeners = 'clear' + o._linker + 'Listeners';
      instance[clearListeners] = RListener.makeClearListener(clearListeners, o._linker);
      var processListener = 'process' + o._linker + 'Listener';
      instance[processListener] = RListener.makeProcessListener(processListener, o._linker);
   }
}
with(MO){
   MO.AStyle = function AStyle(n, s){
      var o = this;
      AAnnotation.call(o, n);
      o._annotationCd = EAnnotation.Style;
      o._duplicate    = true;
      o._style        = s;
      o.code          = AStyle_code;
      o.style         = AStyle_style;
      o.build         = AStyle_build;
      o.toString      = AStyle_toString;
      if(s == null){
         var v = null;
         if(RString.startsWith(n, '_style')){
            v = n.substring(6);
         }else if(RString.startsWith(n, 'style')){
            v = n.substring(5);
         }
         if(v == null){
            throw new TError('Style name is empty.');
         }
         o._style = v;
      }
      return o;
   }
   MO.AStyle_code = function AStyle_code(){
      return this._style;
   }
   MO.AStyle_style = function AStyle_style(){
      return this._style;
   }
   MO.AStyle_build = function AStyle_build(v){
      var o = this;
      v[o._name] = null;
   }
   MO.AStyle_toString = function AStyle_toString(){
      var o = this;
      return 'style=' + o._style;
   }
}
with(MO){
   MO.AStyleIcon = function AStyleIcon(n, s){
      var o = this;
      AAnnotation.call(o, n);
      o._annotationCd = EAnnotation.Style;
      o._style        = s;
      o.code          = AStyleIcon_code;
      o.style         = AStyleIcon_style;
      o.build         = AStyleIcon_build;
      o.toString      = AStyleIcon_toString;
      if(s == null){
         var v = null;
         if(RString.startsWith(n, '_style')){
            v = n.substring(6);
         }else if(RString.startsWith(n, 'style')){
            v = n.substring(5);
         }
         if(v == null){
            throw new TError('Style name is empty.');
         }
         o._style = v;
      }
      return o;
   }
   MO.AStyleIcon_code = function AStyleIcon_code(){
      return this._style;
   }
   MO.AStyleIcon_style = function AStyleIcon_style(){
      return this._style;
   }
   MO.AStyleIcon_build = function AStyleIcon_build(v){
      var o = this;
      v[o._name] = null;
   }
   MO.AStyleIcon_toString = function AStyleIcon_toString(){
      var o = this;
      return 'style=' + o._style;
   }
}
MO.EEvent = new function EEvent(){
   var o = this;
   o.Unknown     = 'Unknown';
   o.Load        = 'Load';
   o.Process     = 'Process';
   o.EnterFrame  = 'EnterFrame';
   o.LeaveFrame  = 'LeaveFrame';
   o.Enter       = 'Enter';
   o.Leave       = 'Leave';
   o.Focus       = 'Focus';
   o.Blur        = 'Blur';
   o.Click       = 'Click';
   o.DoubleClick = 'DoubleClick';
   o.ItemClick   = 'ItemClick';
   o.Selected    = 'Selected';
   o.DataChanged = 'DataChanged';
   o.Result      = 'Result';
   o.TouchZoom   = 'TouchZoom';
   return o;
}
MO.EEventInvoke = new function EEventInvoke(){
   var o = this;
   o.Unknown = 0;
   o.Before  = 1;
   o.After   = 2;
   return o;
}
MO.EEventStatus = new function EEventStatus(){
   var o = this;
   o.Unknown  = 0;
   o.Continue = 1;
   o.Stop     = 2;
   o.Cancel   = 3;
   o.Failure  = 4;
   return o;
}
MO.EHttpContent = new function EHttpContent(){
   var o = this;
   o.Binary = 1;
   o.Text  = 2;
   return o;
}
MO.EHttpMethod = new function EHttpMethod(){
   var o = this;
   o.Get  = 'GET';
   o.Post = 'POST';
   return o;
}
MO.EHttpStatus = new function EHttpStatus(){
   var o = this;
   o.Uninitialized = 0;
   o.Open          = 1;
   o.Send          = 2;
   o.Receiving     = 3;
   o.Loaded        = 4;
   return o;
}
MO.EKeyCode = new function EKeyCode(){
   var o = this;
   o.None      = 0;
   o.Esc       = 27;
   o.Tab       = 9;
   o.Enter     = 13;
   o.Shift     = 16;
   o.Alt       = 18;
   o.Ctrl      = 17;
   o.BackSpace = 8;
   o.Space     = 32;
   o.Left      = 37;
   o.Up        = 38;
   o.Right     = 39;
   o.Down      = 40;
   o.Insert    = 45;
   o.Delete    = 46;
   o.Home      = 36;
   o.End       = 35;
   o.PageUp    = 33;
   o.PageDown  = 34;
   o.F1        = 112;
   o.F2        = 113;
   o.F3        = 114;
   o.F4        = 115;
   o.F5        = 116;
   o.F6        = 117;
   o.F7        = 118;
   o.F8        = 119;
   o.F9        = 120;
   o.F10       = 121;
   o.F11       = 122;
   o.F12       = 123;
   o.N0        = 48;
   o.N1        = 49;
   o.N2        = 50;
   o.N3        = 51;
   o.N4        = 52;
   o.N5        = 53;
   o.N6        = 54;
   o.N7        = 55;
   o.N8        = 56;
   o.N9        = 57;
   o.A         = 65;
   o.B         = 66;
   o.C         = 67;
   o.D         = 68;
   o.E         = 69;
   o.F         = 70;
   o.G         = 71;
   o.H         = 72;
   o.I         = 73;
   o.J         = 74;
   o.K         = 75;
   o.L         = 76;
   o.M         = 77;
   o.N         = 78;
   o.O         = 79;
   o.P         = 80;
   o.Q         = 81;
   o.R         = 82;
   o.S         = 83;
   o.T         = 84;
   o.U         = 85;
   o.V         = 86;
   o.W         = 87;
   o.X         = 88;
   o.Y         = 89;
   o.Z         = 90;
   o.ControlKeys = [
      o.Tab, o.Enter, o.BackSpace, o.Left, o.Up, o.Right, o.Down,
      o.Insert, o.Delete, o.Home, o.End, o.PageUp, o.PageDown,
      o.F1, o.F2, o.F3, o.F4, o.F5, o.F6, o.F7, o.F8, o.F9, o.F10, o.F11, o.F12];
   var f = o.integerCodes  = new Object();
   f[45] = true;
   f[190] = true;
   for(var n = o.N0; n <= o.N9; n++){
      f[n] = true;
   }
   var f = o.floatCodes  = new Object();
   f[45] = true;
   f[190] = true;
   f[46] = true;
   f[189] = true;
   for(var n = o.N0; n <= o.N9; n++){
      f[n] = true;
   }
   return o;
}
MO.EKeyStatus = new function EKeyStatus(){
   var o = this;
   o.Normal = 0;
   o.Press  = 1;
   return o;
}
MO.EMouseButton = new function EMouseButton(){
   var o = this;
   o.Left   = 0;
   o.Right  = 2;
   o.Middle = 3;
   return o;
}
MO.EMouseCursor = new function EMouseCursor(){
   var o = this;
   o.HSize = 'E-resize';
   o.VSize = 'N-resize';
   return o;
}
MO.EOrientation = new function EOrientation(){
   var o = this;
   o.Unknown = 0;
   o.Horizontal = 'H';
   o.Vertical   = 'V';
   return o;
}
with(MO){
   MO.MAttributeCode = function MAttributeCode(o){
      o = RClass.inherits(this, o);
      o._code   = null;
      o.isCode  = MAttributeCode_isCode;
      o.code    = MAttributeCode_code;
      o.setCode = MAttributeCode_setCode;
      return o;
   }
   MO.MAttributeCode_isCode = function MAttributeCode_isCode(code){
      return this._code == code;
   }
   MO.MAttributeCode_code = function MAttributeCode_code(){
      return this._code;
   }
   MO.MAttributeCode_setCode = function MAttributeCode_setCode(code){
      this._code = code;
   }
}
with(MO){
   MO.MAttributeGuid = function MAttributeGuid(o){
      o = RClass.inherits(this, o);
      o._guid   = null;
      o.guid    = MAttributeGuid_guid;
      o.setGuid = MAttributeGuid_setGuid;
      return o;
   }
   MO.MAttributeGuid_guid = function MAttributeGuid_guid(){
      return this._guid;
   }
   MO.MAttributeGuid_setGuid = function MAttributeGuid_setGuid(guid){
      this._guid = guid;
   }
}
with(MO){
   MO.MAttributeLabel = function MAttributeLabel(o){
      o = RClass.inherits(this, o);
      o._label   = null;
      o.label    = MAttributeLabel_label;
      o.setLabel = MAttributeLabel_setLabel;
      return o;
   }
   MO.MAttributeLabel_label = function MAttributeLabel_label(){
      return this._label;
   }
   MO.MAttributeLabel_setLabel = function MAttributeLabel_setLabel(label){
      this._label = label;
   }
}
with(MO){
   MO.MAttributeName = function MAttributeName(o){
      o = RClass.inherits(this, o);
      o._name   = null;
      o.name    = MAttributeName_name;
      o.setName = MAttributeName_setName;
      return o;
   }
   MO.MAttributeName_name = function MAttributeName_name(){
      return this._name;
   }
   MO.MAttributeName_setName = function MAttributeName_setName(name){
      this._name = name;
   }
}
with(MO){
   MO.MAttributeParent = function MAttributeParent(o){
      o = RClass.inherits(this, o);
      o._parent    = null;
      o.parent     = MAttributeParent_parent;
      o.findParent = MAttributeParent_findParent;
      o.setParent  = MAttributeParent_setParent;
      o.dispose    = MAttributeParent_dispose;
      return o;
   }
   MO.MAttributeParent_parent = function MAttributeParent_parent(){
      return this._parent;
   }
   MO.MAttributeParent_findParent = function MAttributeParent_findParent(clazz){
      var find = this;
      if(clazz){
         while(RClass.isClass(find._parent, clazz)){
            find = find._parent;
         }
      }else{
         while(find._parent){
            find = find._parent;
         }
      }
      return find;
   }
   MO.MAttributeParent_setParent = function MAttributeParent_setParent(parent){
      this._parent = parent;
   }
   MO.MAttributeParent_dispose = function MAttributeParent_dispose(){
      var o = this;
      o._parent = null;
   }
}
with(MO){
   MO.MClone = function MClone(o){
      o = RClass.inherits(this, o);
      o.clone  = MClone_clone;
      return o;
   }
   MO.MClone_clone = function MClone_clone(){
      var o = this;
      var r = RClass.create(o.constructor);
      for(var n in o){
         v = o[n];
         if(v != null){
            if(!RClass.isBaseDataType(v.constructor)){
               r[n] = v.clone();
            }
         }
         r[n] = v;
      }
      return r;
   }
}
with(MO){
   MO.MDataStream = function MDataStream(o){
      o = RClass.inherits(this, o);
      o._viewer      = null;
      o._endianCd    = false;
      o._position    = 0;
      o.testString   = MDataStream_testString;
      o.readBoolean  = MDataStream_readBoolean;
      o.readInt8     = MDataStream_readInt8;
      o.readInt16    = MDataStream_readInt16;
      o.readInt32    = MDataStream_readInt32;
      o.readInt64    = MDataStream_readInt64;
      o.readUint8    = MDataStream_readUint8;
      o.readUint16   = MDataStream_readUint16;
      o.readUint32   = MDataStream_readUint32;
      o.readUint64   = MDataStream_readUint64;
      o.readFloat    = MDataStream_readFloat;
      o.readDouble   = MDataStream_readDouble;
      o.readString   = MDataStream_readString;
      o.readData     = MDataStream_readData;
      o.readBytes    = MDataStream_readBytes;
      o.writeBoolean = MDataStream_writeBoolean;
      o.writeInt8    = MDataStream_writeInt8;
      o.writeInt16   = MDataStream_writeInt16;
      o.writeInt32   = MDataStream_writeInt32;
      o.writeInt64   = MDataStream_writeInt64;
      o.writeUint8   = MDataStream_writeUint8;
      o.writeUint16  = MDataStream_writeUint16;
      o.writeUint32  = MDataStream_writeUint32;
      o.writeUint64  = MDataStream_writeUint64;
      o.writeFloat   = MDataStream_writeFloat;
      o.writeDouble  = MDataStream_writeDouble;
      o.writeString  = MDataStream_writeString;
      o.writeBytes   = MDataStream_writeBytes;
      return o;
   }
   MO.MDataStream_testString = function MDataStream_testString(){
      var o = this;
      var position = o._position;
      var length = o._viewer.getUint16(position, o._endianCd);
      position += 2;
      var result = new TString();
      for(var i = 0; i < length; i++){
         var value = o._viewer.getUint16(position, o._endianCd);
         position += 2;
         result.push(String.fromCharCode(value));
      }
      return result.toString();
   }
   MO.MDataStream_readBoolean = function MDataStream_readBoolean(){
      var o = this;
      var value = o._viewer.getInt8(o._position, o._endianCd);
      o._position++;
      return value > 0;
   }
   MO.MDataStream_readInt8 = function MDataStream_readInt8(){
      var o = this;
      var value = o._viewer.getInt8(o._position, o._endianCd);
      o._position++;
      return value;
   }
   MO.MDataStream_readInt16 = function MDataStream_readInt16(){
      var o = this;
      var value = o._viewer.getInt16(o._position, o._endianCd);
      o._position += 2;
      return value;
   }
   MO.MDataStream_readInt32 = function MDataStream_readInt32(){
      var o = this;
      var value = o._viewer.getInt32(o._position, o._endianCd);
      o._position += 4;
      return value;
   }
   MO.MDataStream_readInt64 = function MDataStream_readInt64(){
      var o = this;
      var value = o._viewer.getInt64(o._position, o._endianCd);
      o._position += 8;
      return value;
   }
   MO.MDataStream_readUint8 = function MDataStream_readUint8(){
      var o = this;
      var value = o._viewer.getUint8(o._position, o._endianCd);
      o._position += 1;
      return value;
   }
   MO.MDataStream_readUint16 = function MDataStream_readUint16(){
      var o = this;
      var value = o._viewer.getUint16(o._position, o._endianCd);
      o._position += 2;
      return value;
   }
   MO.MDataStream_readUint32 = function MDataStream_readUint32(){
      var o = this;
      var value = o._viewer.getUint32(o._position, o._endianCd);
      o._position += 4;
      return value;
   }
   MO.MDataStream_readUint64 = function MDataStream_readUint64(){
      var o = this;
      var value = o._viewer.getUint64(o._position, o._endianCd);
      o._position += 8;
      return value;
   }
   MO.MDataStream_readFloat = function MDataStream_readFloat(){
      var o = this;
      var value = o._viewer.getFloat32(o._position, o._endianCd);
      o._position += 4;
      return value;
   }
   MO.MDataStream_readDouble = function MDataStream_readDouble(){
      var o = this;
      var value = o._viewer.getFloat64(o._position, o._endianCd);
      o._position += 8;
      return value;
   }
   MO.MDataStream_readString = function MDataStream_readString(){
      var o = this;
      var viewer = o._viewer;
      var endianCd = o._endianCd;
      var position = o._position;
      var length = viewer.getUint16(position, endianCd);
      position += 2;
      var value = new TString();
      for(var i = 0; i < length; i++){
         var character = viewer.getUint16(position, endianCd);
         value.push(String.fromCharCode(character));
         position += 2;
      }
      o._position = position;
      return value.flush();
   }
   MO.MDataStream_readData = function MDataStream_readData(dataCd){
      var o = this;
      switch(dataCd){
         case EDataType.Int8:
            return o.readInt8();
         case EDataType.Int16:
            return o.readInt16();
         case EDataType.Int32:
            return o.readInt32();
         case EDataType.Int64:
            return o.readInt64();
         case EDataType.Uint8:
            return o.readUint8();
         case EDataType.Uint16:
            return o.readUint16();
         case EDataType.Uint32:
            return o.readUint32();
         case EDataType.Uint64:
            return o.readUint64();
         case EDataType.Float32:
            return o.readFloat();
         case EDataType.Float64:
            return o.readDouble();
         case EDataType.String:
            return o.readString();
      }
      throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
   }
   MO.MDataStream_readBytes = function MDataStream_readBytes(data, offset, length){
      var o = this;
      var viewer = o._viewer;
      if(length <= 0){
         return;
      }
      if(offset != 0){
         throw new TError(o, 'Unsupport.');
      }
      var position = o._position;
      var endianCd = o._endianCd;
      if(length % 8 == 0){
         var array = new Float64Array(data);
         var count = length >> 3;
         for(var i = 0; i < count; i++){
            array[i] = viewer.getFloat64(position, endianCd);
            position += 8;
         }
         o._position = position;
         return;
      }
      if(length % 4 == 0){
         var array = new Uint32Array(data);
         var count = length >> 2;
         for(var i = 0; i < count; i++){
            array[i] = viewer.getUint32(position, endianCd);
            position += 4;
         }
         o._position = position;
         return;
      }
      if(length % 2 == 0){
         var array = new Uint16Array(data);
         var count = length >> 1;
         for(var i = 0; i < count; i++){
            array[i] = viewer.getUint16(position, endianCd);
            position += 2;
         }
         o._position = position;
         return;
      }
      var array = new Uint8Array(data);
      for(var i = 0; i < length; i++){
         array[i] = viewer.getUint8(position++, endianCd);
      }
      o._position = position;
   }
   MO.MDataStream_writeBoolean = function MDataStream_writeBoolean(value){
      var o = this;
      o._viewer.setInt8(o._position, (value > 0) ? 1 : 0, o._endianCd);
      o._position++;
   }
   MO.MDataStream_writeInt8 = function MDataStream_writeInt8(value){
      var o = this;
      o._viewer.setInt8(o._position, value, o._endianCd);
      o._position++;
   }
   MO.MDataStream_writeInt16 = function MDataStream_writeInt16(value){
      var o = this;
      o._viewer.setInt16(o._position, value, o._endianCd);
      o._position += 2;
   }
   MO.MDataStream_writeInt32 = function MDataStream_writeInt32(value){
      var o = this;
      o._viewer.setInt32(o._position, value, o._endianCd);
      o._position += 4;
   }
   MO.MDataStream_writeInt64 = function MDataStream_writeInt64(value){
      var o = this;
      o._viewer.setInt64(o._position, value, o._endianCd);
      o._position += 8;
   }
   MO.MDataStream_writeUint8 = function MDataStream_writeUint8(value){
      var o = this;
      o._viewer.setUint8(o._position, value, o._endianCd);
      o._position += 1;
   }
   MO.MDataStream_writeUint16 = function MDataStream_writeUint16(value){
      var o = this;
      o._viewer.setUint16(o._position, value, o._endianCd);
      o._position += 2;
   }
   MO.MDataStream_writeUint32 = function MDataStream_writeUint32(value){
      var o = this;
      o._viewer.setUint32(o._position, value, o._endianCd);
      o._position += 4;
   }
   MO.MDataStream_writeUint64 = function MDataStream_writeUint64(value){
      var o = this;
      o._viewer.setUint64(o._position, value, o._endianCd);
      o._position += 8;
   }
   MO.MDataStream_writeFloat = function MDataStream_writeFloat(value){
      var o = this;
      o._viewer.setFloat32(o._position, value, o._endianCd);
      o._position += 4;
   }
   MO.MDataStream_writeDouble = function MDataStream_writeDouble(value){
      var o = this;
      o._viewer.setDouble(o._position, value, o._endianCd);
      o._position += 8;
   }
   MO.MDataStream_writeString = function MDataStream_writeString(value){
      var o = this;
      var viewer = o._viewer;
      var length = v.length;
      var endianCd = o._endianCd;
      var position = o._position;
      viewer.setUint16(position, length, endianCd);
      position += 2;
      for(var i = 0; i < length; i++){
         viewer.setUint16(position, value.charCodeAt(i), endianCd);
         position += 2;
      }
      o._position = position;
   }
   MO.MDataStream_writeBytes = function MDataStream_writeBytes(data, offset, length){
      var o = this;
      var viewer = o._viewer;
      if(length <= 0){
         return;
      }
      if(offset != 0){
         throw new TError('Unsupport.');
      }
      var position = o._position;
      var endianCd = o._endianCd;
      if(length % 8 == 0){
         var array = new Float64Array(data);
         var count = length >> 3;
         for(var i = 0; i < count; i++){
            viewer.setFloat64(position, array[i], endianCd);
            position += 8;
         }
         o._position = position;
         return;
      }
      if(length % 4 == 0){
         var array = new Uint32Array(data);
         var count = length >> 2;
         for(var i = 0; i < count; i++){
            viewer.setUint32(position, array[i], endianCd);
            position += 4;
         }
         o._position = position;
         return;
      }
      if(length % 2 == 0){
         var array = new Uint16Array(data);
         var count = length >> 1;
         for(var i = 0; i < count; i++){
            viewer.setUint16(position, array[i], endianCd);
            position += 2;
         }
         o._position = position;
         return;
      }
      var array = new Uint8Array(data);
      for(var i = 0; i < length; i++){
         viewer.setUint8(position++, array[i], endianCd);
      }
      o._position = position;
   }
}
with(MO){
   MO.MDataView = function MDataView(o){
      o = RClass.inherits(this, o);
      o._viewer     = null;
      o._endianCd   = 0;
      o.endianCd    = MDataView_endianCd;
      o.setEndianCd = MDataView_setEndianCd;
      o.getInt8     = MDataView_getInt8;
      o.getInt16    = MDataView_getInt16;
      o.getInt32    = MDataView_getInt32;
      o.getInt64    = MDataView_getInt64;
      o.getUint8    = MDataView_getUint8;
      o.getUint16   = MDataView_getUint16;
      o.getUint32   = MDataView_getUint32;
      o.getUint64   = MDataView_getUint64;
      o.getFloat    = MDataView_getFloat;
      o.getDouble   = MDataView_getDouble;
      o.setInt8     = MDataView_setInt8;
      o.setInt16    = MDataView_setInt16;
      o.setInt32    = MDataView_setInt32;
      o.setInt64    = MDataView_setInt64;
      o.setUint8    = MDataView_setUint8;
      o.setUint16   = MDataView_setUint16;
      o.setUint32   = MDataView_setUint32;
      o.setUint64   = MDataView_setUint64;
      o.setFloat    = MDataView_setFloat;
      o.setDouble   = MDataView_setDouble;
      return o;
   }
   MO.MDataView_endianCd = function MDataView_endianCd(p){
      return this._endianCd;
   }
   MO.MDataView_setEndianCd = function MDataView_setEndianCd(p){
      this._endianCd = p;
   }
   MO.MDataView_getInt8 = function MDataView_getInt8(p){
      var o = this;
      return o._viewer.getInt8(p, o._endianCd);
   }
   MO.MDataView_getInt16 = function MDataView_getInt16(p){
      var o = this;
      return o._viewer.getInt16(p, o._endianCd);
   }
   MO.MDataView_getInt32 = function MDataView_getInt32(p){
      var o = this;
      return o._viewer.getInt32(p, o._endianCd);
   }
   MO.MDataView_getInt64 = function MDataView_getInt64(p){
      var o = this;
      return o._viewer.getInt64(p, o._endianCd);
   }
   MO.MDataView_getUint8 = function MDataView_getUint8(p){
      var o = this;
      return o._viewer.getUint8(p, o._endianCd);
   }
   MO.MDataView_getUint16 = function MDataView_getUint16(p){
      var o = this;
      return o._viewer.getUint16(p, o._endianCd);
   }
   MO.MDataView_getUint32 = function MDataView_getUint32(p){
      var o = this;
      return o._viewer.getUint32(p, o._endianCd);
   }
   MO.MDataView_getUint64 = function MDataView_getUint64(p){
      var o = this;
      return o._viewer.getUint64(p, o._endianCd);
   }
   MO.MDataView_getFloat = function MDataView_getFloat(p){
      var o = this;
      return o._viewer.getFloat32(p, o._endianCd);
   }
   MO.MDataView_getDouble = function MDataView_getDouble(p){
      var o = this;
      return o._viewer.getFloat64(p, o._endianCd);
   }
   MO.MDataView_setInt8 = function MDataView_setInt8(p, v){
      var o = this;
      o._viewer.setInt8(p, v, o._endianCd);
   }
   MO.MDataView_setInt16 = function MDataView_setInt16(p, v){
      var o = this;
      o._viewer.setInt16(p, v, o._endianCd);
   }
   MO.MDataView_setInt32 = function MDataView_setInt32(p, v){
      var o = this;
      o._viewer.setInt32(p, v, o._endianCd);
   }
   MO.MDataView_setInt64 = function MDataView_setInt64(p, v){
      var o = this;
      o._viewer.setInt64(p, v, o._endianCd);
   }
   MO.MDataView_setUint8 = function MDataView_setUint8(p, v){
      var o = this;
      o._viewer.setUint8(p, v, o._endianCd);
   }
   MO.MDataView_setUint16 = function MDataView_setUint16(p, v){
      var o = this;
      o._viewer.setUint16(p, v, o._endianCd);
   }
   MO.MDataView_setUint32 = function MDataView_setUint32(p, v){
      var o = this;
      o._viewer.setUint32(p, v, o._endianCd);
   }
   MO.MDataView_setUint64 = function MDataView_setUint64(p, v){
      var o = this;
      o._viewer.setUint64(p, v, o._endianCd);
   }
   MO.MDataView_setFloat = function MDataView_setFloat(p, v){
      var o = this;
      o._viewer.setFloat32(p, v, o._endianCd);
   }
   MO.MDataView_setDouble = function MDataView_setDouble(p, v){
      var o = this;
      o._viewer.setDouble(p, v, o._endianCd);
   }
}
with(MO){
   MO.MListener = function MListener(o){
      o = RClass.inherits(this, o);
      o._listenerss       = null;
      o.addListener       = MListener_addListener;
      o.setListener       = MListener_setListener;
      o.removeListener    = MListener_removeListener;
      o.clearListeners    = MListener_clearListeners;
      o.clearAllListeners = MListener_clearAllListeners;
      o.processListener   = MListener_processListener;
      o.dispose           = MListener_dispose;
      return o;
   }
   MO.MListener_addListener = function MListener_addListener(name, owner, method){
      var o = this;
      var listenerss = o._listenerss;
      if(!listenerss){
         listenerss = o._listenerss = new TDictionary();
      }
      var listeners = listenerss.get(name);
      if(!listeners){
         listeners = new TListeners();
         listenerss.set(name, listeners);
      }
      return listeners.register(owner, method);
   }
   MO.MListener_setListener = function MListener_setListener(name, owner, method){
      var o = this;
      var listenerss = o._listenerss;
      if(listenerss){
         var listeners = listenerss.get(name);
         if(listeners){
            listeners.clear();
         }
      }
      return o.addListener(name, owner, method)
   }
   MO.MListener_removeListener = function MListener_removeListener(name, owner, method){
      var o = this;
      var listenerss = o._listenerss;
      var listeners = listenerss.get(name);
      return listeners.unregister(owner, method);
   }
   MO.MListener_clearListeners = function MListener_clearListeners(name){
      var o = this;
      var listenerss = o._listenerss;
      if(listenerss){
         var listeners = listenerss.get(name);
         if(listeners){
            listeners.clear();
         }
      }
   }
   MO.MListener_clearAllListeners = function MListener_clearAllListeners(){
      var o = this;
      var listenerss = o._listenerss;
      if(listenerss){
         var count = listenerss.count();
         for(var i = 0; i < count; i++){
            var listeners = listenerss.at(i);
            if(listeners){
               listeners.clear();
            }
         }
      }
   }
   MO.MListener_processListener = function MListener_processListener(name, p1, p2, p3, p4, p5){
      var o = this;
      var listenerss = o._listenerss;
      if(listenerss){
         var listeners = listenerss.get(name);
         if(listeners){
            listeners.process(p1, p2, p3, p4, p5);
         }
      }
   }
   MO.MListener_dispose = function MListener_dispose(){
      var o = this;
      var listenerss = o._listenerss;
      if(listenerss){
         for(var i = listenerss.count() - 1; i >= 0; i--){
            var listeners = listenerss.at(i);
            listeners.dispose();
         }
         o._listenerss = RObject.dispose(listenerss);
      }
   }
}
with(MO){
   MO.MListenerLoad = function MListenerLoad(o){
      o = RClass.inherits(this, o, MListener);
      o.addLoadListener     = MListenerLoad_addLoadListener;
      o.removeLoadListener  = MListenerLoad_removeLoadListener;
      o.clearLoadListeners  = MListenerLoad_clearLoadListeners;
      o.processLoadListener = MListenerLoad_processLoadListener;
      return o;
   }
   MO.MListenerLoad_addLoadListener = function MListenerLoad_addLoadListener(w, m){
      return this.addListener(EEvent.Load, w, m);
   }
   MO.MListenerLoad_removeLoadListener = function MListenerLoad_removeLoadListener(w, m){
      this.removeListener(EEvent.Load, w, m);
   }
   MO.MListenerLoad_clearLoadListeners = function MListenerLoad_clearLoadListeners(){
      this.clearListeners(EEvent.Load);
   }
   MO.MListenerLoad_processLoadListener = function MListenerLoad_processLoadListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Load, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerProcess = function MListenerProcess(o){
      o = RClass.inherits(this, o, MListener);
      o.addProcessListener     = MListenerProcess_addProcessListener;
      o.removeProcessListener  = MListenerProcess_removeProcessListener;
      o.clearProcessListeners  = MListenerProcess_clearProcessListeners;
      o.processProcessListener = MListenerProcess_processProcessListener;
      return o;
   }
   MO.MListenerProcess_addProcessListener = function MListenerProcess_addProcessListener(owner, process){
      return this.addListener(EEvent.Process, owner, process);
   }
   MO.MListenerProcess_removeProcessListener = function MListenerProcess_removeProcessListener(owner, process){
      this.removeListener(EEvent.Process, owner, process);
   }
   MO.MListenerProcess_clearProcessListeners = function MListenerProcess_clearProcessListeners(){
      this.clearListeners(EEvent.Process);
   }
   MO.MListenerProcess_processProcessListener = function MListenerProcess_processProcessListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Process, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerTouchZoom = function MListenerTouchZoom(o){
      o = RClass.inherits(this, o, MListener);
      o.addTouchZoomListener     = MListenerTouchZoom_addTouchZoomListener;
      o.removeTouchZoomListener  = MListenerTouchZoom_removeTouchZoomListener;
      o.clearTouchZoomListeners  = MListenerTouchZoom_clearTouchZoomListeners;
      o.processTouchZoomListener = MListenerTouchZoom_processTouchZoomListener;
      return o;
   }
   MO.MListenerTouchZoom_addTouchZoomListener = function MListenerTouchZoom_addTouchZoomListener(w, m){
      return this.addListener(EEvent.TouchZoom, w, m);
   }
   MO.MListenerTouchZoom_removeTouchZoomListener = function MListenerTouchZoom_removeTouchZoomListener(w, m){
      this.removeListener(EEvent.TouchZoom, w, m);
   }
   MO.MListenerTouchZoom_clearTouchZoomListeners = function MListenerTouchZoom_clearTouchZoomListeners(){
      this.clearListeners(EEvent.TouchZoom);
   }
   MO.MListenerTouchZoom_processTouchZoomListener = function MListenerTouchZoom_processTouchZoomListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.TouchZoom, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MMouseCapture = function MMouseCapture(o){
      o = RClass.inherits(this, o);
      o.onMouseCaptureStart = RMethod.virtual(o, 'onMouseCaptureStart');
      o.onMouseCapture      = RMethod.virtual(o, 'onMouseCapture');
      o.onMouseCaptureStop  = RMethod.virtual(o, 'onMouseCaptureStop');
      o.testMouseCapture    = RMethod.emptyTrue;
      return o;
   }
}
with(MO){
   MO.MMouseWheel = function MMouseWheel(o){
      o = RClass.inherits(this, o);
      o.onMouseWheel = RClass.register(o, new AEventMouseWheel('onMouseWheel'), RMethod.empty);
      return o;
   }
}
with(MO){
   MO.MProperty = function MProperty(o){
      o = RClass.inherits(this, o);
      o.propertyAssign = MProperty_propertyAssign;
      o.propertyLoad   = MProperty_propertyLoad;
      o.propertySave   = MProperty_propertySave;
      return o;
   }
   MO.MProperty_propertyAssign = function MProperty_propertyAssign(value){
      var o = this;
      var clazz = RClass.find(o.constructor);
      var annotations = clazz.annotations(EAnnotation.Property);
      for(var name in annotations){
         var annotation = annotations[name];
         if(annotation.constructor != Function){
            o[annotation._name] = value[annotation._name];
         }
      }
   }
   MO.MProperty_propertyLoad = function MProperty_propertyLoad(xconfig){
      var o = this;
      var clazz = RClass.find(o.constructor);
      var annotations = clazz.annotations(EAnnotation.Property);
      for(var name in annotations){
         var annotation = annotations[name];
         if(annotation.constructor != Function){
            if(annotation._force){
               annotation.load(o, xconfig);
            }else{
               if(xconfig.contains(annotation._linker)){
                  annotation.load(o, xconfig);
               }else if(o[annotation._name] == null){
                  o[annotation._name] = annotation._value;
               }
            }
         }
      }
   }
   MO.MProperty_propertySave = function MProperty_propertySave(xconfig){
      var o = this;
      var clazz = RClass.find(o.constructor);
      var annotations = clazz.annotations(EAnnotation.Property);
      for(var name in annotations){
         var annotation = annotations[name];
         if(annotation.constructor != Function){
            annotation.save(o, xconfig);
         }
      }
   }
}
with(MO){
   MO.SClickEvent = function SClickEvent(sender){
      var o = this;
      SEvent.call(o, sender);
      return o;
   }
}
with(MO){
   MO.SEvent = function SEvent(sender){
      var o = this;
      o.annotation = null;
      o.listener   = null;
      o.sender     = sender;
      o.source     = null;
      o.hEvent     = null;
      o.hSender    = null;
      o.hSource    = null;
      o.ohProcess  = null;
      o.onProcess  = null;
      o.process    = null;
      o.dispose    = SEvent_dispose;
      return o;
   }
   MO.SEvent_dispose = function SEvent_dispose(){
      var o = this;
      for(var name in o){
         o[name] = null;
      }
   }
}
with(MO){
   MO.SKeyboardEvent = function SKeyboardEvent(){
      var o = this;
      SEvent.call(o);
      o.altKey      = false;
      o.shiftKey    = false;
      o.ctrlKey     = false;
      o.keyCode     = 0;
      o.attachEvent = SKeyboardEvent_attachEvent;
      o.cancel      = SKeyboardEvent_cancel;
      return o;
   }
   MO.SKeyboardEvent_attachEvent = function SKeyboardEvent_attachEvent(p){
      var o = this;
      o.altKey = p.altKey;
      o.shiftKey = p.shiftKey;
      o.ctrlKey = p.ctrlKey;
      o.keyCode = p.keyCode;
   }
   MO.SKeyboardEvent_cancel = function SKeyboardEvent_cancel(){
      var o = this;
      o.hEvent.returnValue = false;
   }
}
with(MO){
   MO.SMouseEvent = function SMouseEvent(){
      var o = this;
      SEvent.call(o);
      o.button      = null;
      o.mouseLeft   = false;
      o.mouseMiddle = false;
      o.mouseRight  = false;
      o.altKey      = false;
      o.ctrlKey     = false;
      o.x           = 0;
      o.y           = 0;
      o.offsetX     = 0;
      o.offsetY     = 0;
      o.clientX     = 0;
      o.clientY     = 0;
      o.deltaX      = 0;
      o.deltaY      = 0;
      o.deltaZ      = 0;
      o.attachEvent = SMouseEvent_attachEvent;
      return o;
   }
   MO.SMouseEvent_attachEvent = function SMouseEvent_attachEvent(event){
      var o = this;
      var hs = o.hSource = RHtml.eventSource(event);
      if(hs){
         o.source = hs.__linker;
      }
      o.button = event.button;
      o.mouseLeft = (event.button == EMouseButton.Left);
      o.mouseMiddle = (event.button == EMouseButton.Middle);
      o.mouseRight = (event.button == EMouseButton.Right);
      o.altKey = event.altKey;
      o.ctrlKey = event.ctrlKey;
      if(RBrowser.isBrowser(EBrowser.FireFox)){
         o.x = event.pageX;
         o.y = event.pageY;
         o.offsetX = event.layerX;
         o.offsetY = event.layerY;
      }else{
         o.x = event.x;
         o.y = event.y;
         o.offsetX = event.offsetX;
         o.offsetY = event.offsetY;
      }
      o.clientX = event.clientX;
      o.clientY = event.clientY;
      o.deltaX = event.deltaX;
      o.deltaY = event.deltaY;
      o.deltaZ = event.deltaZ;
   }
}
with(MO){
   MO.SResizeEvent = function SResizeEvent(){
      var o = this;
      SEvent.call(o);
      o.width       = null;
      o.height      = null;
      o.attachEvent = SResizeEvent_attachEvent;
      return o;
   }
   MO.SResizeEvent_attachEvent = function SResizeEvent_attachEvent(p){
      var o = this;
      var hs = o.hSource = RHtml.eventSource(p);
      if(hs){
         o.source = hs.__linker;
      }
   }
}
with(MO){
   MO.SXmlEvent = function SXmlEvent(){
      var o = this;
      SEvent.call(o);
      o.connection = null;
      o.document   = null;
      o.root       = null;
      return o;
   }
}
with(MO){
   MO.THtmlItem = function THtmlItem(){
      var o = this;
      o._link  = null;
      o._links = new Object();
      o.get    = THtmlItem_get;
      o.set    = THtmlItem_set;
      return o;
   }
   MO.THtmlItem_get = function THtmlItem_get(n){
      return this._links[n];
   }
   MO.THtmlItem_set = function THtmlItem_set(n, v){
      this._links[n] = v;
   }
}
with(MO){
   MO.TXmlDocument = function TXmlDocument(){
      var o = this;
      o._root   = null;
      o.create  = TXmlDocument_create;
      o.root    = TXmlDocument_root;
      o.setRoot = TXmlDocument_setRoot;
      o.xml     = TXmlDocument_xml;
      o.dump    = TXmlDocument_dump;
      return o;
   }
   MO.TXmlDocument_create = function TXmlDocument_create(n, a, v){
      var r = new TXmlNode();
      r._name = n;
      r._attributes = a;
      r._value = v;
      return r;
   }
   MO.TXmlDocument_root = function TXmlDocument_root(){
      var o = this;
      var r = o._root;
      if(!r){
         r = o._root = new TXmlNode();
         r._name = 'Configuration';
      }
      return r;
   }
   MO.TXmlDocument_setRoot = function TXmlDocument_setRoot(p){
      var o = this;
      if(!o._root){
         o._root = p;
      }else{
         throw new TError(o, 'Root node is already exists.');
      }
   }
   MO.TXmlDocument_xml = function TXmlDocument_xml(){
      var s = new TString();
      s.append("<?xml version='1.0' encoding='UTF-8'?>");
      this.root().innerXml(s, 0);
      return s.flush();
   }
   MO.TXmlDocument_dump = function TXmlDocument_dump(){
      var o = this;
      var r = new TString();
      r.appendLine(RClass.name(o));
      o.root().dump(r);
      return r.flush();
   }
}
with(MO){
   MO.TXmlNode = function TXmlNode(name){
      var o = this;
      TNode.call(o, name);
      o.create   = TXmlNode_create;
      o.innerXml = TXmlNode_innerXml;
      o.xml      = TXmlNode_xml;
      o.toString = TXmlNode_toString;
      return o;
   }
   MO.TXmlNode_create = function TXmlNode_create(n, a){
      var o = this;
      var r = new TXmlNode();
      r._name = n;
      r._attributes = a;
      if(!RClass.isClass(a, TAttributes)){
         var a = arguments;
         var len = a.length;
         for(var n = 1; n < len; n += 2){
            if(n + 1 < len){
               r.set(a[n], a[n+1]);
            }else{
               r._value = a[n];
            }
         }
      }
      o.push(r);
      return r;
   }
   MO.TXmlNode_innerXml = function TXmlNode_innerXml(s, l){
      var o = this;
      s.appendRepeat('   ', l);
      s.append('<', o._name);
      var as = o._attributes;
      if(as){
         var ac = as.count();
         for(var n = 0; n < ac; n++){
            s.append(' ', as.name(n), '="');
            RXml.buildText(s, as.value(n));
            s.append('"');
         }
      }
      if(!o._nodes && (o._value == null)){
         s.append('/');
      }
      s.append('>\n');
      var ns = o._nodes;
      if(ns){
         var c = ns.count();
         for(var n = 0; n < c; n++){
            ns.get(n).innerXml(s, l + 1);
         }
      }
      RXml.buildText(s, o._value)
      if(o._nodes || o._value != null){
         s.appendRepeat('   ', l);
         s.append('</', o._name, '>');
         s.append('\n');
      }
      return s;
   }
   MO.TXmlNode_xml = function TXmlNode_xml(){
      var s = new TString();
      this.innerXml(s, 0);
      return s.flush();
   }
   MO.TXmlNode_toString = function TXmlNode_toString(){
      return this.xml().toString();
   }
}
with(MO){
   MO.FBytes = function FBytes(o){
      o = RClass.inherits(this, o, FObject, MDataView);
      o._memory   = null;
      o.construct = FBytes_construct;
      o.dispose   = FBytes_dispose;
      return o;
   }
   MO.FBytes_construct = function FBytes_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._memory = new ArrayBuffer();
      o._viewer = new DataView(o._memory);
   }
   MO.FBytes_dispose = function FBytes_dispose(){
      var o = this;
      o._memory = null;
      o._viewer = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FClassFactory = function FClassFactory(o){
      o = RClass.inherits(this, o, FObject);
      o._classes   = null;
      o.construct  = FClassFactory_construct;
      o.register   = FClassFactory_register;
      o.unregister = FClassFactory_unregister;
      o.create     = FClassFactory_create;
      o.dispose    = FClassFactory_dispose;
      return o;
   }
   MO.FClassFactory_construct = function FClassFactory_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._classes = new TDictionary();
   }
   MO.FClassFactory_register = function FClassFactory_register(n, c){
      this._classes.set(n, c);
   }
   MO.FClassFactory_unregister = function FClassFactory_unregister(n){
      this._classes.set(n, null);
   }
   MO.FClassFactory_create = function FClassFactory_create(n){
      var o = this;
      var c = o._classes.get(n);
      if(!c){
         throw new TError('Create unregister class. (name={1})', n);
      }
      return RClass.create(c);
   }
   MO.FClassFactory_dispose = function FClassFactory_dispose(){
      var o = this;
      o._classes = RObject.dispose(o._classes);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FComponent = function FComponent(o){
      o = RClass.inherits(this, o, FObject, MAttributeParent, MAttributeCode);
      o.dispose = FComponent_dispose;
      return o;
   }
   MO.FComponent_dispose = function FComponent_dispose(){
      var o = this;
      o.__base.MAttributeParent.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FDataStream = function FDataStream(o){
      o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
      o._length   = RClass.register(o, new AGetter('_length'), 0);
      o._memory   = RClass.register(o, new AGetter('_memory'));
      o._viewer   = null;
      o.construct = FDataStream_construct;
      o.setLength = FDataStream_setLength;
      o.flip      = FDataStream_flip;
      o.dispose   = FDataStream_dispose;
      return o;
   }
   MO.FDataStream_construct = function FDataStream_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FDataStream_setLength = function FDataStream_setLength(length){
      var o = this;
      o._length = length;
      o._memory = new ArrayBuffer(length);
      o._viewer = new DataView(o._memory);
   }
   MO.FDataStream_flip = function FDataStream_flip(){
      var o = this;
      o._length = o._position;
      o._position = 0;
   }
   MO.FDataStream_dispose = function FDataStream_dispose(){
      var o = this;
      o._viewer = null;
      o._memory = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FDataView = function FDataView(o){
      o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
      o.link    = FDataView_link;
      o.dispose = FDataView_dispose;
      return o;
   }
   MO.FDataView_link = function FDataView_link(p){
      var o = this;
      o._memory = p;
      o._viewer = new DataView(p);
   }
   MO.FDataView_dispose = function FDataView_dispose(){
      var o = this;
      o._viewer = null;
      o._memory = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FFileReader = function FFileReader(o){
      o = RClass.inherits(this, o, FObject, MListenerLoad);
      o._reader        = null;
      o._fileName      = RClass.register(o, new AGetter('_fileName'));
      o._length        = RClass.register(o, new AGetter('_length'), 0);
      o._data          = RClass.register(o, new AGetter('_data'));
      o._statusLoading = false;
      o.ohloadStart    = FFileReader_ohLoadStart;
      o.ohLoad         = FFileReader_ohLoad;
      o.ohLoadEnd      = FFileReader_ohLoadEnd;
      o.ohProgress     = FFileReader_ohProgress;
      o.construct      = FFileReader_construct;
      o.loadFile       = FFileReader_loadFile;
      o.dispose        = FFileReader_dispose;
      return o;
   }
   MO.FFileReader_ohLoadStart = function FFileReader_ohLoadStart(){
      var o = this.__linker;
   }
   MO.FFileReader_ohLoad = function FFileReader_ohLoad(){
      var o = this.__linker;
   }
   MO.FFileReader_ohLoadEnd = function FFileReader_ohLoadEnd(){
      var o = this.__linker;
      var reader = o._reader;
      o._statusFree = true;
      if(reader.error){
         MO.Logger.error(o, 'Load file failure. (error={1])', reader.error);
      }else{
         o._length = reader.result.byteLength;
         o._data = reader.result;
         var event = new SEvent(o);
         o.processLoadListener(event);
         event.dispose();
      }
   }
   MO.FFileReader_ohProgress = function FFileReader_ohProgress(){
   }
   MO.FFileReader_construct = function FFileReader_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      var reader = o._reader = new FileReader();
      reader.__linker = o;
      reader.onloadstart = o.ohLoadStart;
      reader.onload = o.ohLoad;
      reader.onloadend = o.ohLoadEnd;
      reader.onprogress = o.ohProgress;
   }
   MO.FFileReader_loadFile = function FFileReader_loadFile(file){
      var o = this;
      o._fileName = file.name;
      o._length = file.size;
      var reader = o._reader;
      reader.readAsArrayBuffer(file);
   }
   MO.FFileReader_dispose = function FFileReader_dispose(){
      var o = this;
      var reader = o._reader = new FileReader();
      reader.__linker = null;
      reader.onloadstart = null;
      reader.onload = null;
      reader.onloadend = null;
      reader.onprogress = null;
      o._reader = null;
      o._fileName = null;
      o._data = null;
      o.__base.MListenerLoad.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FHttpConnection = function FHttpConnection(o){
      o = RClass.inherits(this, o, FObject, MListenerLoad, MListenerProcess);
      o._asynchronous        = false;
      o._methodCd            = EHttpMethod.Get;
      o._contentCd           = EHttpContent.Binary;
      o._url                 = null;
      o._input               = null;
      o._inputData           = null;
      o._output              = null;
      o._outputData          = null;
      o._connection          = null;
      o._contentLength       = 0;
      o._statusFree          = true;
      o.onConnectionSend     = FHttpConnection_onConnectionSend;
      o.onConnectionReady    = FHttpConnection_onConnectionReady;
      o.onConnectionComplete = FHttpConnection_onConnectionComplete;
      o.construct            = FHttpConnection_construct;
      o.setHeaders           = FHttpConnection_setHeaders;
      o.inputData            = FHttpConnection_inputData;
      o.setInputData         = FHttpConnection_setInputData;
      o.outputData           = FHttpConnection_outputData;
      o.setOutputData        = FHttpConnection_setOutputData;
      o.content              = FHttpConnection_content;
      o.sendSync             = FHttpConnection_sendSync;
      o.sendAsync            = FHttpConnection_sendAsync;
      o.send                 = FHttpConnection_send;
      o.dispose              = FHttpConnection_dispose;
      return o;
   }
   MO.FHttpConnection_onConnectionSend = function FHttpConnection_onConnectionSend(){
      var o = this;
      var input = o._input;
      if(input){
         if(input.constructor == String){
            o._inputData = input;
            o._contentLength = input.length;
         }else if(input.constructor == ArrayBuffer){
            o._inputData = input;
            o._contentLength = input.byteLength;
         }else{
            throw new TError('Unknown send data type.');
         }
      }
   }
   MO.FHttpConnection_onConnectionReady = function FHttpConnection_onConnectionReady(){
      var o = this._linker;
      if(o._asynchronous){
         var connection = o._connection;
         if(connection.readyState == EHttpStatus.Loaded){
            if(connection.status == 200){
               o.setOutputData();
               o.onConnectionComplete();
            }else{
               throw new TError(o, 'Connection failure. (url={1})', o._url);
            }
         }
      }
   }
   MO.FHttpConnection_onConnectionComplete = function FHttpConnection_onConnectionComplete(){
      var o = this;
      o._statusFree = true;
      o.processLoadListener(o);
   }
   MO.FHttpConnection_construct = function FHttpConnection_construct(){
      var o = this;
      var c = o._connection = RXml.createConnection();
      c._linker = o;
      c.onreadystatechange = o.onConnectionReady;
   }
   MO.FHttpConnection_setHeaders = function FHttpConnection_setHeaders(){
      var o = this;
      var connection = o._connection;
      if(o._contentCd == EHttpContent.Binary){
         if(RBrowser.isBrowser(EBrowser.Explorer)){
            connection.setRequestHeader('Accept-Charset', 'x-user-defined');
            connection.responseType = 'arraybuffer';
         }else{
            connection.overrideMimeType('text/plain; charset=x-user-defined');
            if(o._asynchronous){
               connection.responseType = 'arraybuffer';
            }
         }
      }else{
         connection.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      }
      if(!RBrowser.isBrowser(EBrowser.Chrome)){
         if(o._contentLength > 0){
            connection.setRequestHeader('content-length', o._contentLength);
         }
      }
   }
   MO.FHttpConnection_inputData = function FHttpConnection_inputData(){
      return this._inputData;
   }
   MO.FHttpConnection_setInputData = function FHttpConnection_setInputData(p){
      this._inputData = p;
   }
   MO.FHttpConnection_outputData = function FHttpConnection_outputData(){
      return this._outputData;
   }
   MO.FHttpConnection_setOutputData = function FHttpConnection_setOutputData(){
      var o = this;
      var connection = o._connection;
      if(o._contentCd == EHttpContent.Binary){
         o._outputData = connection.response;
      }else{
         o._outputData = connection.responseText;
      }
   }
   MO.FHttpConnection_content = function FHttpConnection_content(){
      return this._outputData;
   }
   MO.FHttpConnection_sendSync = function FHttpConnection_sendSync(){
      var o = this;
      var connection = o._connection;
      connection.open(o._methodCd, o._url, false);
      o.setHeaders(connection, 0);
      connection.send(o._inputData);
      o.setOutputData();
      o.onConnectionComplete();
      MO.Logger.info(this, 'Send http sync request. (method={1}, url={2})', o._methodCd, o._url);
   }
   MO.FHttpConnection_sendAsync = function FHttpConnection_sendAsync(){
      var o = this;
      var connection = o._connection;
      connection.open(o._methodCd, o._url, true);
      o.setHeaders(connection, 0);
      connection.send(o._inputData);
      MO.Logger.info(this, 'Send http asynchronous request. (method={1}, url={2})', o._methodCd, o._url);
   }
   MO.FHttpConnection_send = function FHttpConnection_send(url, data){
      var o = this;
      o._url = url;
      o._input = data;
      o._methodCd = (data != null) ? EHttpMethod.Post : EHttpMethod.Get;
      o._statusFree = false;
      o.onConnectionSend();
      if(o._asynchronous){
         o.sendAsync();
      }else{
         o.sendSync();
      }
      return o.content();
   }
   MO.FHttpConnection_dispose = function FHttpConnection_dispose(){
      var o = this;
      o._input = null;
      o._inputData = null;
      o._output = null;
      o._outputData = null;
      var connection = o._connection;
      if(connection){
         connection.onreadystatechange = null;
         o._connection = null;
      }
      o.__base.MListenerLoad.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FXmlConnection = function FXmlConnection(o){
      o = RClass.inherits(this, o, FHttpConnection);
      o._contentCd           = EHttpContent.Text;
      o._inputNode           = null;
      o._outputNode          = null;
      o.onConnectionSend     = FXmlConnection_onConnectionSend;
      o.onConnectionComplete = FXmlConnection_onConnectionComplete;
      o.content              = FXmlConnection_content;
      return o;
   }
   MO.FXmlConnection_onConnectionSend = function FXmlConnection_onConnectionSend(){
      var o = this;
      var d = o._input;
      if(d){
         var s = null;
         if(d.constructor == String){
            s = d;
            o._inputNode = null;
         }else if(d.constructor == TXmlNode){
            var x = new TXmlDocument();
            x.setRoot(d);
            s = x.xml();
            o._inputNode = d;
         }else if(d.constructor == TXmlDocument){
            s = d.xml();
            o._inputNode = d.root();
         }else{
            throw new TError('Unknown send data type.');
         }
         o._inputData = s;
         o._contentLength = s.length;
      }
   }
   MO.FXmlConnection_onConnectionComplete = function FXmlConnection_onConnectionComplete(){
      var o = this;
      var c = o._connection;
      var e = null;
      if(c.responseXML){
         e = c.responseXML.documentElement;
      }else if(c.responseXml){
         e = c.responseXml.documentElement;
      }else{
         throw new TError(o, "Fetch xml data failure.");
      }
      if(!e){
         return RMessage.fatal(o, null, 'Read xml error. (url={1})\n{2}', o._url, c._outputText)
      }
      var d = new TXmlDocument();
      RXml.buildNode(d, null, e);
      var r = o._outputNode = d.root();
      o._statusFree = true;
      var e = new SXmlEvent();
      e.connection = o;
      e.document = d;
      e.root = r;
      e.parameters = o._parameters;
      o.processLoadListener(e);
      e.dispose();
      if(o._asynchronous){
         o._input = null;
         o._inputNode = null;
         o._output = null;
         o._outputNode = null;
         o._parameters = null;
      }
   }
   MO.FXmlConnection_content = function FXmlConnection_content(){
      return this._outputNode;
   }
}
with(MO){
   MO.FXmlData = function FXmlData(o){
      o = RClass.inherits(this, o, FObject);
      o._ready    = null;
      o._config   = null;
      o.testReady = FXmlData_testReady;
      return o;
   }
   MO.FXmlData_testReady = function FXmlData_testReady(){
      return this._ready;
   }
}
with(MO){
   MO.REngine = function REngine(){
      var o = this;
      o._spaces    = new Object();
      o.Global     = new Object();
      o.Top        = new Object();
      o.Local      = new Object();
      o.onRelease  = REngine_onRelease;
      o.register   = REngine_register;
      o.initialize = REngine_initialize;
      o.connect    = REngine_connect;
      o.buildSpace = REngine_buildSpace;
      o.find       = REngine_find;
      o.findGlobal = REngine_findGlobal;
      o.findTop    = REngine_findTop;
      o.findLocal  = REngine_findLocal;
      return o;
   }
   MO.REngine_onRelease = function REngine_onRelease(){
      RConsole.release();
      REvent.release();
      CollectGarbage();
   }
   MO.REngine_register = function REngine_register(s){
      var o = this;
      var p = o._spaces[s.space];
      if(!p){
         p = o._spaces[s.space] = new Object();
      }
      p[s.name] = s;
   }
   MO.REngine_initialize = function REngine_initialize(){
      var o = this;
      RConsole.initialize();
   }
   MO.REngine_connect = function REngine_connect(){
      var o = this;
      RConsole.initialize();
   }
   MO.REngine_buildSpace = function REngine_buildSpace(t, p){
      var o = this;
      for(var n in p){
         if(RString.startsWith(n, 'R')){
            t[n.substring(1)] = p[n].instance;
         }
      }
   }
   MO.REngine_find = function REngine_find(s, n){
      var r = null;
      var s = this._spaces[s];
      if(s){
         r = s[n];
         if(r){
            return r.instance;
         }
      }
      return null;
   }
   MO.REngine_findGlobal = function REngine_findGlobal(n){
      return this.find(ESpace.Global, n);
   }
   MO.REngine_findTop = function REngine_findTop(n){
      return top.REngine.find(ESpace.Top, n);
   }
   MO.REngine_findLocal = function REngine_findLocal(n){
      return this.find(ESpace.Local, n);
   }
   MO.REngine = new REngine();
}
with(MO){
   MO.RKeyboard = function RKeyboard(){
      var o = this;
      o._status      = new Array();
      o.onKeyDown    = RKeyboard_onKeyDown;
      o.onKeyUp      = RKeyboard_onKeyUp;
      o.construct    = RKeyboard_construct;
      o.isControlKey = RKeyboard_isControlKey;
      o.isIntegerKey = RKeyboard_isIntegerKey;
      o.isFloatKey   = RKeyboard_isFloatKey;
      o.isNumKey     = RKeyboard_isNumKey;
      o.isPress      = RKeyboard_isPress;
      o.fixCase      = RKeyboard_fixCase;
      o.fixPattern   = RKeyboard_fixPattern;
      o.fixChars     = RKeyboard_fixChars;
      return o;
   }
   MO.RKeyboard_onKeyDown = function RKeyboard_onKeyDown(p){
      var o = this;
      var c = p.keyCode;
      o._status[c] = EKeyStatus.Press;
   }
   MO.RKeyboard_onKeyUp = function RKeyboard_onKeyUp(p){
      var o = this;
      var c = p.keyCode;
      o._status[c] = EKeyStatus.Normal;
   }
   MO.RKeyboard_construct = function RKeyboard_construct(){
      var o = this;
      var s = o._status;
      for(var i = 0; i < 256; i++){
         s[i] = EKeyStatus.Normal;
      }
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
      RWindow.lsnsKeyUp.register(o, o.onKeyUp);
   }
   MO.RKeyboard_isControlKey = function RKeyboard_isControlKey(p){
      var s = EKeyCode.ControlKeys;
      for(var i = s.length - 1; i >= 0; i--){
         if(s[i] == p){
            return true;
         }
      }
      return false;
   }
   MO.RKeyboard_isIntegerKey = function RKeyboard_isIntegerKey(c){
      return EKeyCode.integerCodes[c];
   }
   MO.RKeyboard_isFloatKey = function RKeyboard_isFloatKey(c){
      return EKeyCode.floatCodes[c];
   }
   MO.RKeyboard_isNumKey = function RKeyboard_isNumKey(c){
      if(p >= 96 && p <= 105){
         return true;
      }
      return false;
   }
   MO.RKeyboard_isPress = function RKeyboard_isPress(p){
      var o = this;
      var v = o._status[p];
      return v == EKeyStatus.Press;
   }
   MO.RKeyboard_fixCase = function RKeyboard_fixCase(e, c){
      if(e && c){
         var k = e.keyCode;
         if(ECase.Upper == c){
            k = String.fromCharCode(k).toUpperCase().charCodeAt(0)
         }else if(ECase.Lower == c){
            k = String.fromCharCode(k).toLowerCase().charCodeAt(0)
         }
         e.keyCode = k;
      }
   }
   MO.RKeyboard_fixPattern = function RKeyboard_fixPattern(e, p){
      if(p){
         var k = e.keyCode;
         if(!this.isControlKeyPress(k)){
            if(!RString.isPattern(String.fromCharCode(k), p)){
               e.keyCode = 0;
               return false;
            }
         }
      }
      return true;
   }
   MO.RKeyboard_fixChars = function RKeyboard_fixChars(e, p){
      if(p){
         var k = e.keyCode;
         if(this.isNumKey(k)){
       	  k = e.keyCode = e.keyCode - 48;
         }
         if(!this.isControlKeyPress(k)){
            if(!RString.inChars(String.fromCharCode(k), p)){
               e.keyCode = 0;
               e.returnValue = false;
               return false;
            }
         }
      }
      return true;
   }
   MO.RKeyboard = new RKeyboard();
}
with(MO){
   MO.RLoader = function RLoader(){
      var o = this;
      o._loading      = new TArray();
      o._loaded       = new TArray()
      o._waits        = new TArray()
      o._intervalId   = null;
      o.hWindow       = null;
      o.onInterval    = RLoader_onInterval;
      o.intervalStart = RLoader_intervalStart;
      o.intervalStop  = RLoader_intervalStop;
      o.loadJsFile    = RLoader_loadJsFile;
      o.loadJs        = RLoader_loadJs;
      o.loaded        = RLoader_loaded;
      o.wait          = RLoader_wait;
      o.waitJs        = RLoader_waitJs;
      o.dispose       = RLoader_dispose;
      return o;
   }
   MO.RLoader_dispose = function RLoader_dispose(){
      var o = this;
      o.intervalStop();
      o.hWindow = null;
   }
   MO.RLoader_onInterval = function RLoader_onInterval(){
      var o = this;
      var ws = o._waits;
      var c = ws.length;
      for(var n=0; n<c; n++){
         var l = ws.get(n);
         if(l){
            if(l.check(o._loaded)){
               l.invoke.invoke();
               ws.set(n, null);
            }
         }
      }
      ws.compress();
      if(ws.isEmpty()){
         o.intervalStop();
      }
   }
   MO.RLoader_intervalStart = function RLoader_intervalStart(){
      var o = this;
      if(!o._intervalId){
         o.hWindow = window;
         o._intervalId = window.setInterval(function(){o.onInterval();}, 10);
      }
   }
   MO.RLoader_intervalStop = function RLoader_intervalStop(){
      var o = this;
      var w = o.hWindow;
      if(w && o._intervalId){
         w.clearInterval(o._intervalId);
         o.hWindow = null;
         o._intervalId = null;
      }
   }
   MO.RLoader_loadJsFile = function RLoader_loadJsFile(id, src){
      var o = this;
      var d = RWindow.hDocument;
      var h = d.getElementsByTagName("head")[0];
      if(document.getElementById(id) == null){
         var url = top.RContext.location(src);
         var hs = RWindow.createElement('SCRIPT');
         hs.id = id;
         hs.type = 'text/javascript';
         hs.src = url;
         if(d.attachEvent){
            hs.onreadystatechange = function(){
               var s = hs.readyState;
               if('loaded' == s || 'complete' == s){
                  hs.onreadystatechange = null;
                  o._loading.extract(id);
                  o._loaded.push(id);
               }
            }
         }else{
            hs.onload = function(){
               if(d.readyState == 'complete'){
                  hs.onload = null;
                  o._loading.extract(id);
                  o._loaded.push(id);
               }
            }
         }
         h.appendChild(hs);
      }
   }
   MO.RLoader_loadJs = function RLoader_loadJs(ps){
      var as = arguments;
      var c = as.length;
      for(var n = 0; n < c; n++){
         var p = as[n];
         this.loadJsFile('js:' + p, '/ajs/' + p.replace(/\./g, '/') + '.js');
      }
   }
   MO.RLoader_loaded = function RLoader_loaded(id){
      var o = this;
      o._loading.extract(id);
      o._loaded.push(id);
   }
   MO.RLoader_wait = function RLoader_wait(invoke, ids){
      var o = this;
      var l = new TLoaderListener();
      l.invoke = invoke;
      var c = arguments.length;
      for(var n = 1; n < c; n++){
         l.ids.push(arguments[n]);
      }
      o._waits.push(l);
      o.intervalStart();
   }
   MO.RLoader_waitJs = function RLoader_waitJs(invoke, ids){
      var o = this;
      var l = new TLoaderListener();
      l.invoke = invoke;
      var as = arguments;
      var c = as.length;
      for(var n = 1; n < c; n++){
         l.ids.push('js:' + as[n]);
      }
      o._waits.push(l);
      o.intervalStart();
   }
   MO.RLoader = new RLoader();
}
with(MO){
   MO.RMessage = function RMessage(){
      var o = this;
      o._hasError     = false;
      o._messages     = null;
      o.push          = RMessage_push;
      o.fatal         = RMessage_fatal;
      o.confirmResult = false;
      o.error         = RMessage_error;
      o.warn          = RMessage_warn;
      o.onWindowClose = RMessage_onWindowClose;
      o.confirm       = RMessage_confirm;
      o.info          = RMessage_info;
      return o;
   }
   MO.RMessage_push = function RMessage_push(msg){
      if(!this._messages){
         this._messages = new FLoopList();
      }
      this._messages.push(msg);
   }
   MO.RMessage_fatal = function RMessage_fatal(sf, er, ms, pm){
      var o = this;
      if(o._hasError){
         return;
      }
      o._hasError = true;
      var s = new TString();
      var t = new Array();
      var f = RMessage_fatal.caller;
      while(f){
         if(RArray.contains(t, f)){
            break;
         }
         t.push(f);
         f = f.caller;
      }
      var c = t.length;
      for(var n = 0; n < c; n++){
         f = t[n];
         if(n > 0){
            s.appendLine();
         }
         s.append('   ' + (c - n) + ': ' + RMethod.name(f));
      }
      var m = new TString();
      m.appendLine(RContext.get('RMessage:fatal'));
      m.appendLine(RString.repeat('-', 60));
      m.append(RClass.dump(sf), ': ');
      if(ms){
         var ag = arguments;
         c = ag.length;
         for(var n = 3; n < c; n++){
            var p = ag[n];
            if('function' == typeof(p)){
               p = RMethod.name(p);
            }
            var pi = n - 2;
            ms = ms.replace('{' + pi + '}', p);
         }
      }
      m.appendLine(ms);
      m.appendLine(RString.repeat('-', 60));
      m.appendLine('Stack:');
      m.append(s);
      alert(m);
   }
   MO.RMessage_error = function RMessage_error(self, method, msg, params){
      if(this._hasError){
         return;
      }
      this._hasError = true;
      throw new Error(msg);
   }
   MO.RMessage_warn = function RMessage_warn(self, message, params){
      var s = new TString();
      var n = 0;
      var aw = top.RControl.create(FAlertWindow);
      aw.setText(message);
      aw.show();
   }
   MO.RMessage_info = function RMessage_info(self, message, params){
      var s = new TString();
      var n = 0;
      var aw = top.RControl.create(FInfoWindow);
      aw.setText(message);
      aw.show();
   }
   MO.RMessage_confirm = function RMessage_confirm(message,callback){
      var o = this;
      var ls = top.RControl.create(FConfirmWindow);
      ls.setText(message);
      ls.lsns.register(o, callback);
      ls.show();
   }
   MO.RMessage_onWindowClose = function RMessage_onWindowClose(v){
      this.confirmResult = v;
   }
   MO.RMessage = new RMessage();
}
with(MO){
   MO.RListener = function RListener(){
      var o = this;
      o._listeners = new Object();
      return o;
   }
   MO.RListener.prototype.makeAddListener = function RListener_makeAddListener(methodName, code){
      var o = this;
      var method = null;
      if(o._listeners[methodName]){
         method = o._listeners[methodName];
      }else{
         var source = 'return this.addListener(\''+ code +'\',owner,callback);';
         method = new Function('owner', 'callback', source);
         o._listeners[methodName] = method;
      }
      return method;
   }
   MO.RListener.prototype.makeSetListener = function RListener_makeSetListener(methodName, code){
      var o = this;
      var method = null;
      if(o._listeners[methodName]){
         method = o._listeners[methodName];
      }else{
         var source = 'return this.setListener(\''+ code +'\',owner,callback);';
         method = new Function('owner', 'callback', source);
         o._listeners[methodName] = method;
      }
      return method;
   }
   MO.RListener.prototype.makeRemoveListener = function RListener_makeRemoveListener(methodName, code){
      var o = this;
      var method = null;
      if(o._listeners[methodName]){
         method = o._listeners[methodName];
      }else{
         var source = 'return this.removeListener(\''+ code +'\',owner,callback);';
         method = new Function('owner', 'callback', source);
         o._listeners[methodName] = method;
      }
      return method;
   }
   MO.RListener.prototype.makeClearListener = function RListener_makeClearListener(methodName, code){
      var o = this;
      var method = null;
      if(o._listeners[methodName]){
         method = o._listeners[methodName];
      }else{
         var source = 'return this.clearListeners(\''+ code +'\');';
         method = new Function(source);
         o._listeners[methodName] = method;
      }
      return method;
   }
   MO.RListener.prototype.makeProcessListener = function RListener_makeProcessListener(methodName, code){
      var o = this;
      var method = null;
      if(o._listeners[methodName]){
         method = o._listeners[methodName];
      }else{
         var source = 'return this.processListener(\''+ code +'\', p1, p2, p3, p4, p5, p6);';
         method = new Function('p1', 'p2', 'p3', 'p4', 'p5', 'p6', source);
         o._listeners[methodName] = method;
      }
      return method;
   }
   MO.RListener = new RListener();
}
with(MO){
   MO.RResource = function RResource(){
      var o = this;
      o.uriIcon     = '/ars/icon/';
      o.uriImage    = '/ars/img/';
      o.iconPath    = RResource_iconPath;
      o.iconUrlPath = RResource_iconUrlPath;
      o.imagePath   = RResource_imagePath;
      return o;
   }
   MO.RResource_iconPath = function RResource_iconPath(path, type){
      var o = this;
      path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
      return RBrowser.contentPath('/ars/icon/' + path);
   }
   MO.RResource_iconUrlPath = function RResource_iconUrlPath(path, type){
      var o = this;
      path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
      return RBrowser.contentPath('/ars/icon/' + path);
   }
   MO.RResource_imagePath = function RResource_imagePath(path, type){
      var o = this;
   }
   MO.RResource = new RResource();
}
with(MO){
   MO.RStyle = function RStyle(){
      var o = this;
      o._connected = false;
      o._rules     = new TMap();
      o.connect    = RStyle_connect;
      o.has        = RStyle_has;
      o.nvl        = RStyle_nvl;
      o.style      = RStyle_style;
      return o;
   }
   MO.RStyle_connect = function RStyle_connect(){
      var o = this;
      if(o._connected){
         return;
      }
      var s = o._rules;
      var ds = document.styleSheets;
      var dc = ds.length;
      for(var n = 0; n < dc; n++){
         var rs = ds[n].cssRules;
         if(rs){
            var rc = rs.length;
            for(var i = 0; i < rc; i++){
               var r = rs[i];
               s.set(r.selectorText, r);
            }
         }
      }
      o._connected = true;
   }
   MO.RStyle_has = function RStyle_has(s){
      var o = this;
      if(!o._connected){
         o.connect();
      }
      if(s){
         return this._rules.contains('.' + s.toLowerCase());
      }
      return false;
   }
   MO.RStyle_nvl = function RStyle_nvl(s, n){
      var o = this;
      o.connect();
      var a = arguments;
      var c = a.length;
      for(var n = 0; n < c; n++){
         var s = a[n];
         if(s){
            if(o._rules.contains('.' + s.toLowerCase())){
               return s;
            }
         }
      }
      return null;
   }
   MO.RStyle_style = function RStyle_style(c, n){
      return RClass.name(c) + '_' + n;
   }
   MO.RStyle = new RStyle();
}
with(MO){
   MO.RTypeArray = function RTypeArray(){
      var o = this;
      o._float3  = null;
      o._float4  = null;
      o._data    = new Object();
      o.float3      = RTypeArray_float3;
      o.float4      = RTypeArray_float4;
      o.createArray = RTypeArray_createArray;
      o.findTemp    = RTypeArray_findTemp;
      return o;
   }
   MO.RTypeArray_float3 = function RTypeArray_float3(){
      var o = this;
      var v = o._float3;
      if(v == null){
         v = o._float3 = new Float32Array(3);
      }
      return v;
   }
   MO.RTypeArray_float4 = function RTypeArray_float4(){
      var o = this;
      var v = o._float4;
      if(v == null){
         v = o._float4 = new Float32Array(4);
      }
      return v;
   }
   MO.RTypeArray_createArray = function RTypeArray_createArray(t, l){
      switch(t){
         case EDataType.Boolean:
         case EDataType.Int8:
            return new Int8Array(l);
         case EDataType.Int16:
            return new Int16Array(l);
         case EDataType.Int32:
            return new Int32Array(l);
         case EDataType.Int64:
            return new Int64Array(l);
         case EDataType.Uint8:
            return new Uint8Array(l);
         case EDataType.Uint16:
            return new Uint16Array(l);
         case EDataType.Uint32:
            return new Uint32Array(l);
         case EDataType.Float32:
            return new Float32Array(l);
         case EDataType.Float64:
            return new Float64Array(l);
      }
      throw new TError('Create unknown type array. (type={1}, length={2})', t, l);
   }
   MO.RTypeArray_findTemp = function RTypeArray_findTemp(t, l){
      var o = this;
      var d = o._data;
      var s = d[t];
      if(s == null){
         s = d[t] = new Object();
      }
      var r = s[l];
      if(r == null){
         r = s[l] = o.createArray(t, l);
      }
      return r;
   }
   MO.RTypeArray = new RTypeArray();
}
with(MO){
   MO.FTag = function FTag(o){
      o = RClass.inherits(this, o, FObject);
      o._name      = 'Tag';
      o._children  = null;
      o._trimLeft  = false;
      o._trimRight = false;
      o.onBegin    = FTag_onBegin;
      o.onEnd      = FTag_onEnd;
      o.name       = FTag_name;
      o.set        = FTag_set;
      o.push       = FTag_push;
      o.parse      = FTag_parse;
      o.toString   = FTag_toString;
      o.innerDump  = FTag_innerDump;
      o.dump       = FTag_dump;
      return o;
   }
   MO.FTag_onBegin = function FTag_onBegin(p){
      return EResult.Continue;
   }
   MO.FTag_onEnd = function FTag_onEnd(p){
      return EResult.Continue;
   }
   MO.FTag_name = function FTag_name(){
      return this._name;
   }
   MO.FTag_set = function FTag_set(n, v){
      throw new TError(this, 'Unknown attribute name. (name={1}, value={2})', n, v);
   }
   MO.FTag_push = function FTag_push(p){
      var o = this;
      var ts = o._children;
      if(ts == null){
         ts = o._children = new TObjects();
      }
      ts.push(p);
   }
   MO.FTag_parse = function FTag_parse(p){
      var o = this;
      var r = o.onBegin(p);
      if(r == EResult.Continue){
         var ts = o._children;
         if(ts){
            var c = ts.count();
            for(var i = 0; i < c; i++){
               var t = ts.get(i);
               r = t.parse(p);
               if(r == EResult.Cancel){
                  return r;
               }
               p._trimLeft = t._trimLeft;
               p._trimRight = t._trimRight;
            }
         }
         return o.onEnd(p);
      }
      return r;
   }
   MO.FTag_toString = function FTag_toString(){
      return null;
   }
   MO.FTag_innerDump = function FTag_innerDump(ps, pt, pl){
      var o = this;
      ps.appendRepeat('   ', pl);
      ps.append(RClass.dump(pt));
      var s = pt.toString();
      if(!RString.isEmpty(s)){
         ps.append(' [', s, ']');
      }
      var ts = pt._children;
      if(ts){
         ps.append('\n');
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.get(i);
            o.innerDump(ps, t, pl + 1);
            if(i < c - 1){
               ps.append('\n');
            }
         }
      }
   }
   MO.FTag_dump = function FTag_dump(){
      var r = new TString();
      this.innerDump(r, this, 0);
      return r.toString();
   }
}
with(MO){
   MO.FTagContext = function FTagContext(o){
      o = RClass.inherits(this, o, FObject, MInstance);
      o._trimLeft       = false;
      o._trimRight      = false;
      o._attributes     = null;
      o._source         = null;
      o.construct       = FTagContext_construct;
      o.instanceAlloc   = FTagContext_instanceAlloc; // Implement MInstance
      o.attributes      = FTagContext_attributes;
      o.get             = FTagContext_get;
      o.set             = FTagContext_set;
      o.setBoolean      = FTagContext_setBoolean;
      o.source          = FTagContext_source;
      o.write           = FTagContext_write;
      o.resetSource     = FTagContext_resetSource;
      o.dispose         = FTagContext_dispose;
      return o;
   }
   MO.FTagContext_construct = function FTagContext_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._attributes = new TAttributes();
      o._source = new TString();
   }
   MO.FTagContext_instanceAlloc = function FTagContext_instanceAlloc(p){
      this._attributes.clear();
   }
   MO.FTagContext_attributes = function FTagContext_attributes(){
      return this._attributes;
   }
   MO.FTagContext_get = function FTagContext_get(n, v){
      return this._attributes.get(n, v);
   }
   MO.FTagContext_set = function FTagContext_set(n, v){
      this._attributes.set(n, v);
   }
   MO.FTagContext_setBoolean = function FTagContext_setBoolean(n, v){
      this._attributes.set(n, RBoolean.toString(v));
   }
   MO.FTagContext_source = function FTagContext_source(){
      return this._source.toString();
   }
   MO.FTagContext_write = function FTagContext_write(p){
      if(!RString.isEmpty(p)){
         this._source.append(p);
      }
   }
   MO.FTagContext_resetSource = function FTagContext_resetSource(p){
      this._source.clear();
   }
   MO.FTagContext_dispose = function FTagContext_dispose(){
      var o = this;
      o._attributes.dispose();
      o._attributes = null;
      o._source.dispose();
      o._source = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FTagDocument = function FTagDocument(o){
      o = RClass.inherits(this, o, FObject);
      o._space  = null;
      o._root   = null;
      o.space    = FTagDocument_space;
      o.setSpace = FTagDocument_setSpace;
      o.create   = FTagDocument_create;
      o.root     = FTagDocument_root;
      o.loadNode = FTagDocument_loadNode;
      o.load     = FTagDocument_load;
      o.parse    = FTagDocument_parse;
      o.dump     = FTagDocument_dump;
      return o;
   }
   MO.FTagDocument_space = function FTagDocument_space(){
      return this._space;
   }
   MO.FTagDocument_setSpace = function FTagDocument_setSpace(p){
      this._space = p;
   }
   MO.FTagDocument_create = function FTagDocument_create(p){
      var o = this;
      var sn = o._space + '_';
      var n = null;
      if(RString.startsWith(p, sn)){
         n = p.substring(sn.length);
      }else{
         n = p;
      }
      var t = null;
      switch(n){
         case 'source':
            t = RClass.create(FTag);
            break;
         case 'write':
            t = RClass.create(FTagWrite);
            break;
         case 'true':
            t = RClass.create(FTagTrue);
            break;
         case 'false':
            t = RClass.create(FTagFalse);
            break;
         case 'equals':
            t = RClass.create(FTagEquals);
            break;
         case 'notEquals':
            t = RClass.create(FTagNotEquals);
            break;
         default:
            throw new TError(o, 'Unknown tag type. (name={1})', n);
      }
      return t;
   }
   MO.FTagDocument_root = function FTagDocument_root(){
      return this._root;
   }
   MO.FTagDocument_loadNode = function FTagDocument_loadNode(pn, pe){
      var o = this;
      var x = o.create(pe.nodeName);
      if(pn){
         pn.push(x);
      }else{
         o._root = x;
      }
      var eas = pe.attributes;
      if(eas){
         var c = eas.length;
         for(var i = 0; i < c; i++){
            var ea = eas[i];
            if(ea.nodeName){
               x.set(ea.nodeName, RXml.formatText(ea.value));
            }
         }
      }
      var ens = pe.childNodes
      if(ens){
         var c = ens.length;
         for(var i = 0; i < c; i++){
            var en = ens[i];
            switch(en.nodeType){
               case ENodeType.Text:
                  var xt = RClass.create(FTagText);
                  xt.setText(en.nodeValue);
                  x.push(xt);
                  break;
               case ENodeType.Data:
                  var xt = RClass.create(FTagText);
                  xt.setText(en.data);
                  x.push(xt);
                  break;
               case ENodeType.Node:
                  o.loadNode(x, en);
                  break;
            }
         }
      }
   }
   MO.FTagDocument_load = function FTagDocument_load(p){
      var o = this;
      var s = '<source>' + p + '</source>'
      s = s.replace(new RegExp('<' + o._space + ':', 'g'), '<' + o._space + '_');
      s = s.replace(new RegExp('</' + o._space + ':', 'g'), '</' + o._space + '_');
      s = s.replace(new RegExp(' & ', 'g'), ' &amp; ');
      s = s.replace(new RegExp(' < ', 'g'), ' &lt; ');
      s = s.replace(new RegExp(' > ', 'g'), ' &gt; ');
      var xr = RXml.makeString(s);
      o.loadNode(null, xr.firstChild);
   }
   MO.FTagDocument_parse = function FTagDocument_parse(p){
      var o = this;
      p.resetSource();
      o._root.parse(p);
      return p.source();
   }
   MO.FTagDocument_dump = function FTagDocument_dump(){
      var o = this;
      var r = new TString();
      r.appendLine(RClass.dump(o));
      r.appendLine(o.root().dump(r));
      return r.toString();
   }
}
with(MO){
   MO.FTagEquals = function FTagEquals(o){
      o = RClass.inherits(this, o, FTag);
      o._trimLeft = true;
      o._source   = null;
      o._value    = null;
      o.onBegin   = FTagEquals_onBegin;
      o.set       = FTagEquals_set;
      o.toString  = FTagEquals_toString;
      return o;
   }
   MO.FTagEquals_onBegin = function FTagEquals_onBegin(p){
      var o = this;
      var r = false;
      var s = p.get(o._source);
      var vs = o._value.split('|');
      var c = vs.length;
      for(var i = 0; i < c; i++){
         var v = vs[i]
         if(s == v){
            r = true;
            break;
         }
      }
      return r ? EResult.Continue : EResult.Skip;
   }
   MO.FTagEquals_set = function FTagEquals_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
            return;
         case 'value':
            o._value = v;
            return;
      }
      o.__base.FTag.set.call(o, n, v);
   }
   MO.FTagEquals_toString = function FTagEquals_toString(){
      var o = this;
      return 'source=' + o._source + ', value=' + o._value;
   }
}
with(MO){
   MO.FTagFalse = function FTagFalse(o){
      o = RClass.inherits(this, o, FTag);
      o._trimLeft = true;
      o._source   = null;
      o.onBegin   = FTagFalse_onBegin;
      o.set       = FTagFalse_set;
      o.toString  = FTagFalse_toString;
      return o;
   }
   MO.FTagFalse_onBegin = function FTagFalse_onBegin(p){
      var o = this;
      var v = p.get(o._source);
      return RBoolean.parse(v) ? EResult.Skip : EResult.Continue;
   }
   MO.FTagFalse_set = function FTagFalse_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
            return;
      }
      o.__base.FTag.set.call(o, n, v);
   }
   MO.FTagFalse_toString = function FTagFalse_toString(){
      var o = this;
      return 'source=' + o._source;
   }
}
with(MO){
   MO.FTagNotEquals = function FTagNotEquals(o){
      o = RClass.inherits(this, o, FTag);
      o._trimLeft = true;
      o._source   = null;
      o._value    = null;
      o.onBegin   = FTagNotEquals_onBegin;
      o.set       = FTagNotEquals_set;
      o.toString  = FTagNotEquals_toString;
      return o;
   }
   MO.FTagNotEquals_onBegin = function FTagNotEquals_onBegin(p){
      var o = this;
      var r = true;
      var s = p.get(o._source);
      var vs = o._value.split('|');
      var c = vs.length;
      for(var i = 0; i < c; i++){
         var v = vs[i]
         if(s == v){
            r = false;
            break;
         }
      }
      return r ? EResult.Continue : EResult.Skip;
   }
   MO.FTagNotEquals_set = function FTagNotEquals_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
            return;
         case 'value':
            o._value = v;
            return;
      }
      o.__base.FTag.set.call(o, n, v);
   }
   MO.FTagNotEquals_toString = function FTagNotEquals_toString(){
      var o = this;
      return 'source=' + o._source + ', value=' + o._value;
   }
}
with(MO){
   MO.FTagText = function FTagText(o){
      o = RClass.inherits(this, o, FTag);
      o._text    = null;
      o.onBegin  = FTagText_onBegin;
      o.text     = FTagText_text;
      o.setText  = FTagText_setText;
      o.toString = FTagText_toString;
      return o;
   }
   MO.FTagText_onBegin = function FTagText_onBegin(p){
      var t = this._text;
      if(p._trimLeft){
         if(RString.startsWith(t, '\r')){
            t = t.substring(1);
         }
         if(RString.startsWith(t, '\n')){
            t = t.substring(1);
         }
      }
      if(p._trimRight){
         if(RString.endsWith(t, '\r')){
            t = t.substring(0, t.length - 1);
         }
         if(RString.endsWith(t, '\n')){
            t = t.substring(0, t.length - 1);
         }
      }
      p.write(t);
      return EResult.Skip;
   }
   MO.FTagText_text = function FTagText_text(){
      return this._text;
   }
   MO.FTagText_setText = function FTagText_setText(p){
      this._text = p;
   }
   MO.FTagText_toString = function FTagText_toString(){
      var o = this;
      return '{' + o._text + '}';
   }
}
with(MO){
   MO.FTagTrue = function FTagTrue(o){
      o = RClass.inherits(this, o, FTag);
      o._trimLeft = true;
      o._source   = null;
      o.onBegin   = FTagTrue_onBegin;
      o.set       = FTagTrue_set;
      o.toString  = FTagTrue_toString;
      return o;
   }
   MO.FTagTrue_onBegin = function FTagTrue_onBegin(p){
      var o = this;
      var r = false;
      var ns = o._source.split('|');
      var c = ns.length;
      for(var i = 0; i < c; i++){
         var n = ns[i]
         var v = p.get(n);
         if(RBoolean.parse(v)){
            r = true;
            break;
         }
      }
      return r ? EResult.Continue : EResult.Skip;
   }
   MO.FTagTrue_set = function FTagTrue_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
            return;
      }
      o.__base.FTag.set.call(o, n, v);
   }
   MO.FTagTrue_toString = function FTagTrue_toString(){
      var o = this;
      return 'source=' + o._source;
   }
}
with(MO){
   MO.FTagWrite = function FTagWrite(o){
      o = RClass.inherits(this, o, FTag);
      o._source  = null;
      o.onBegin  = FTagWrite_onBegin;
      o.set      = FTagWrite_set;
      o.toString = FTagWrite_toString;
      return o;
   }
   MO.FTagWrite_onBegin = function FTagWrite_onBegin(p){
      var o = this;
      var v = p.get(o._source);
      p.write(v);
      return EResult.Skip;
   }
   MO.FTagWrite_set = function FTagWrite_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
            return;
      }
      o.__base.FTag.set.call(o, n, v);
   }
   MO.FTagWrite_toString = function FTagWrite_toString(){
      var o = this;
      return 'source=' + o._source;
   }
}
MO.EThreadStatus = new function EThreadStatus(){
   var o = this;
   o.Sleep  = 0;
   o.Active = 1;
   o.Finish = 2;
   return o;
}
with(MO){
   MO.SProcessEvent = function SProcessEvent(){
      var o = this;
      o.index = null;
      o.code  = null;
      o.data  = null;
      return o;
   }
}
with(MO){
   MO.SXmlEvent = function SXmlEvent(){
      var o = this;
      o.owner          = null;
      o.url            = null;
      o.action         = null;
      o.parameter      = null;
      o.inputDocument  = null;
      o.outputDocument = null;
      o.callback       = null;
      o.process        = SXmlEvent_process;
      o.dispose        = SXmlEvent_dispose;
      return o;
   }
   MO.SXmlEvent_process = function SXmlEvent_process(p){
      var o = this;
      o.outputDocument = p.document;
      o.outputNode = p.root;
      if(o.owner){
         o.callback.call(o.owner, o);
      }else{
         o.callback(o);
      }
   }
   MO.SXmlEvent_dispose = function SXmlEvent_dispose(){
      var o = this;
      o.owner = null;
      o.url = null;
      o.action = null;
      o.parameter = null;
      o.inputDocument = null;
      o.outputDocument = null;
      o.callback = null;
   }
}
with(MO){
   MO.FContent = function FContent(o){
      o = RClass.inherits(this, o, FObject);
      o._name = null;
      o.name  = FContent_name;
      return o;
   }
   MO.FContent_name = function FContent_name(){
      return this._name;
   }
}
with(MO){
   MO.FContentConsole = function FContentConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o.connections = null;
      o.onLoad      = FContentConsole_onLoad;
      o.construct   = FContentConsole_construct;
      o.alloc       = FContentConsole_alloc;
      o.process     = FContentConsole_process;
      o.send        = FContentConsole_send;
      return o;
   }
   MO.FContentConsole_construct = function FContentConsole_construct(){
      var o = this;
      o.connections = new TObjects();
   }
   MO.FContentConsole_onLoad = function FContentConsole_onLoad(){
      var o = this;
      var e = o.event;
      e.document = o.document;
      e.process();
      o.event = null;
      o.document = null;
      o._statusFree = true;
   }
   MO.FContentConsole_alloc = function FContentConsole_alloc(){
      var o = this;
      var a = null;
      var cs = o.connections;
      for(var n = cs.count - 1; n >= 0; n--){
         var c = cs.get(n);
         if(c._statusFree){
            a = c;
            break;
         }
      }
      if(!a){
         a = RClass.create(FXmlConnection);
         cs.push(a);
         a.onLoad = o.onLoad;
      }
      a._statusFree = false;
      return a;
   }
   MO.FContentConsole_process = function FContentConsole_process(e){
      var o = this;
      var c = o.alloc();
      c.event = e;
      switch(e.code){
         case EXmlEvent.Send:
            c.send(e.url, e.document);
            break;
         case EXmlEvent.Receive:
            c.receive(e.url, e.document);
            break;
         case EXmlEvent.SyncSend:
            return c.syncSend(e.url, e.document);
         case EXmlEvent.SyncReceive:
            return c.syncReceive(e.url, e.document);
      }
   }
   MO.FContentConsole_send = function FContentConsole_send(u, d){
      var o = this;
      var c = o.alloc();
      var r = c.syncSend(u, d);
      c._statusFree = true;
      return r;
   }
}
with(MO){
   MO.FContentPipeline = function FContentPipeline(o){
      o = RClass.inherits(this, o, FPipeline);
      o._scopeCd = EScope.Global;
      o.scopeCd  = FContentPipeline_scopeCd;
      return o;
   }
   MO.FContentPipeline_scopeCd = function FContentPipeline_scopeCd(){
      return this._scopeCd;
   }
}
with(MO){
   MO.FDragConsole = function FDragConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd        = EScope.Local;
      o._activeDragable = null;
      o._dragables      = null;
      o.onMouseDown     = FDragConsole_onMouseDown;
      o.onMouseMove     = FDragConsole_onMouseMove;
      o.onMouseUp       = FDragConsole_onMouseUp;
      o.construct       = FDragConsole_construct;
      o.register        = FDragConsole_register;
      o.unregister      = FDragConsole_unregister;
      o.clear           = FDragConsole_clear;
      return o;
   }
   MO.FDragConsole_onMouseDown = function FDragConsole_onMouseDown(p){
      var o = this;
      var es = p.source;
      if(!es){
         return;
      }
      if(!RClass.isClass(es, MUiDragable)){
         return;
      }
      RWindow.setOptionSelect(false);
      o._activeDragable = es;
      es.onDragStart(p);
   }
   MO.FDragConsole_onMouseMove = function FDragConsole_onMouseMove(p){
      var o = this;
      if(!o._activeDragable){
         return;
      }
      o._activeDragable.onDragMove(p);
   }
   MO.FDragConsole_onMouseUp = function FDragConsole_onMouseUp(p){
      var o = this;
      if(!o._activeDragable){
         return;
      }
      RWindow.setOptionSelect(true);
      o._activeDragable.onDragStop(p);
      o._activeDragable = null;
   }
   MO.FDragConsole_construct = function FDragConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._dragables = new TObjects();
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      RWindow.lsnsMouseUp.register(o, o.onMouseUp);
   }
   MO.FDragConsole_register = function FDragConsole_register(p){
      this._dragables.push(p);
   }
   MO.FDragConsole_unregister = function FDragConsole_unregister(po, pc){
      this._dragables.remove(p);
   }
   MO.FDragConsole_clear = function FDragConsole_clear(){
      this._dragables.clear();
   }
}
with(MO){
   MO.FEnvironment = function FEnvironment(o){
      o = RClass.inherits(this, o, FObject);
      o._name  = RClass.register(o, new AGetSet('_name'));
      o._value = RClass.register(o, new AGetSet('_value'));
      o.set    = FEnvironment_set;
      return o;
   }
   MO.FEnvironment_set = function FEnvironment_set(name, value){
      var o = this;
      o._name = name;
      o._value = value;
   }
}
with(MO){
   MO.FEnvironmentConsole = function FEnvironmentConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._environments = null;
      o.construct     = FEnvironmentConsole_construct;
      o.register      = FEnvironmentConsole_register;
      o.registerValue = FEnvironmentConsole_registerValue;
      o.find          = FEnvironmentConsole_find;
      o.findValue     = FEnvironmentConsole_findValue;
      return o;
   }
   MO.FEnvironmentConsole_construct = function FEnvironmentConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._environments = new TDictionary();
   }
   MO.FEnvironmentConsole_register = function FEnvironmentConsole_register(environment){
      var o = this;
      var name = environment.name();
      o._environments.set(name, environment);
   }
   MO.FEnvironmentConsole_registerValue = function FEnvironmentConsole_registerValue(name, value){
      var o = this;
      var environment = MO.RClass.create(MO.FEnvironment);
      environment.set(name, value);
      o._environments.set(name, environment);
      return environment;
   }
   MO.FEnvironmentConsole_find = function FEnvironmentConsole_find(name){
      return this._environments.get(name);
   }
   MO.FEnvironmentConsole_findValue = function FEnvironmentConsole_findValue(name){
      var o = this;
      var value = null;
      var environment = o._environments.get(name);
      if(environment){
         value = environment.value();
      }
      return value;
   }
}
with(MO){
   MO.FEvent = function FEvent(o){
      o = RClass.inherits(this, o, FObject);
      o._owner      = null;
      o._callback   = null;
      o._valid      = true;
      o.owner       = FEvent_owner;
      o.setOwner    = FEvent_setOwner;
      o.callback    = FEvent_callback;
      o.setCallback = FEvent_setCallback;
      o.valid       = FEvent_valid;
      o.setValid    = FEvent_setValid;
      o.process     = FEvent_process;
      return o;
   }
   MO.FEvent_owner = function FEvent_owner(){
      return this._owner;
   }
   MO.FEvent_setOwner = function FEvent_setOwner(p){
      this._owner = p;
   }
   MO.FEvent_callback = function FEvent_callback(){
      return this._callback;
   }
   MO.FEvent_setCallback = function FEvent_setCallback(p){
      this._callback = p;
   }
   MO.FEvent_valid = function FEvent_valid(){
      return this._valid;
   }
   MO.FEvent_setValid = function FEvent_setValid(p){
      this._valid = p;
   }
   MO.FEvent_process = function FEvent_process(){
      var o = this;
      if(o._valid){
         var s = o._owner;
         if(s){
            o._callback.call(s, o);
         }else{
            o._callback(o);
         }
      }
   }
}
with(MO){
   MO.FEventConsole = function FEventConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._thread        = null;
      o._interval      = 100;
      o._processEvents = null;
      o._events        = null;
      o.onProcess      = FEventConsole_onProcess;
      o.construct      = FEventConsole_construct;
      o.register       = FEventConsole_register;
      o.push           = FEventConsole_push;
      o.clear          = FEventConsole_clear;
      return o;
   }
   MO.FEventConsole_onProcess = function FEventConsole_onProcess(){
      var o = this;
      var es = o._events;
      if(es.isEmpty()){
         return;
      }
      var ps = o._processEvents;
      ps.assign(es);
      es.clear();
      var c = ps.count();
      if(c > 0){
         for(var i = 0; i < c; i++){
            ps.get(i).process();
         }
         ps.clear();
      }
   }
   MO.FEventConsole_construct = function FEventConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._processEvents = new TObjects();
      o._events = new TObjects();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.lsnsProcess.register(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
      MO.Logger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
   }
   MO.FEventConsole_register = function FEventConsole_register(po, pc){
      var o = this;
      var e = RClass.create(FEvent);
      e.owner = po;
      e.callback = pc;
      o._events.push(e);
   }
   MO.FEventConsole_push = function FEventConsole_push(p){
      var o = this;
      var es = o._events;
      if(!es.contains(p)){
         es.push(p);
      }
   }
   MO.FEventConsole_clear = function FEventConsole_clear(){
      this._events.clear();
   }
}
with(MO){
   MO.FHttpConsole = function FHttpConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._pool     = null;
      o.onLoad    = FHttpConsole_onLoad;
      o.construct = FHttpConsole_construct;
      o.alloc     = FHttpConsole_alloc;
      o.free      = FHttpConsole_free;
      o.send      = FHttpConsole_send;
      o.sendAsync = FHttpConsole_sendAsync;
      o.dispose   = FHttpConsole_dispose;
      return o;
   }
   MO.FHttpConsole_onLoad = function FHttpConsole_onLoad(connection){
      var o = this;
      o._pool.free(connection);
   }
   MO.FHttpConsole_construct = function FHttpConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._pool = RClass.create(FObjectPool);
   }
   MO.FHttpConsole_alloc = function FHttpConsole_alloc(){
      var o = this;
      var pool = o._pool;
      if(!pool.hasFree()){
         var connection = RClass.create(FHttpConnection);
         connection._asynchronous = true;
         o._pool.push(connection);
      }
      var connection = pool.alloc();
      connection.clearLoadListeners();
      connection.clearProcessListeners();
      connection.addLoadListener(o, o.onLoad);
      return connection;
   }
   MO.FHttpConsole_free = function FHttpConsole_free(connection){
      this._pool.free(connection);
   }
   MO.FHttpConsole_send = function FHttpConsole_send(url, data){
      var o = this;
      var connection = o.alloc();
      connection.send(url, data);
      return connection;
   }
   MO.FHttpConsole_sendAsync = function FHttpConsole_sendAsync(url, data){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = true;
      connection.send(url, data);
      return connection;
   }
   MO.FHttpConsole_dispose = function FHttpConsole_dispose(){
      var o = this;
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FIdleConsole = function FIdleConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope            = EScope.Page;
      o.register         = FIdleConsole_register;
      return o;
   }
   MO.FIdleConsole_register = function FIdleConsole_register(c, cFun){
      var o = this;
      o.active = new TActive(c, cFun);
      o.active.interval = 100;
      RConsole.find(FActiveConsole).push(o.active);
   }
   MO.FIdleConsole_construct = function FIdleConsole_construct(){
      var o = this;
   }
}
with(MO){
   MO.FJsonConsole = function FJsonConsole(o){
      o = RClass.inherits(this, o, FHttpConsole);
      o._scopeCd  = EScope.Local;
      o.onLoad    = FJsonConsole_onLoad;
      o.send      = FJsonConsole_send;
      o.sendAsync = FJsonConsole_sendAsync;
      return o;
   }
   MO.FJsonConsole_onLoad = function FJsonConsole_onLoad(connection){
      var o = this;
      o.__base.FHttpConsole.onLoad.call(o, connection)
      var source = connection.outputData();
      var content = JSON.parse(source);
      var event = MO.Memory.alloc(SEvent);
      event.connection = connection;
      event.content = content;
      connection.processProcessListener(event);
      MO.Memory.free(event);
   }
   MO.FJsonConsole_send = function FJsonConsole_send(u, d){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = false;
      connection._contentCd = EHttpContent.Text;
      var result = connection.send(url, data);
      console.free(connection);
      return result;
   }
   MO.FJsonConsole_sendAsync = function FJsonConsole_sendAsync(url, data){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = true;
      connection._contentCd = EHttpContent.Text;
      connection.send(url, data);
      return connection;
   }
}
with(MO){
   MO.FLoggerConsole = function FLoggerConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope      = EScope.Page;
      o.iLogger    = null;
      o.onKeyDown  = FLoggerConsole_onKeyDown;
      o.construct  = FLoggerConsole_construct;
      o.connect    = FLoggerConsole_connect;
      o.disconnect = FLoggerConsole_disconnect;
      o.output     = FLoggerConsole_output;
      return o;
   }
   MO.FLoggerConsole_onKeyDown = function FLoggerConsole_onKeyDown(e){
      if(e.shiftKey && e.ctrlKey && EKey.L == e.keyCode){
         this.connect();
      }
   }
   MO.FLoggerConsole_construct = function FLoggerConsole_construct(){
      var o = this;
      o.base.FConsole.construct.call(o);
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   }
   MO.FLoggerConsole_connect = function FLoggerConsole_connect(){
   }
   MO.FLoggerConsole_disconnect = function FLoggerConsole_disconnect(){
      this.iLogger = null;
   }
   MO.FLoggerConsole_output = function FLoggerConsole_output(level, obj, method, ms, msg, stack){
      var o = this;
      if(o.iLogger){
         var m = RClass.dump(obj);
         if(ms){
            m += ' (' + ms + 'ms)';
         }
         var s = level + ' [' + RString.rpad(m, 36) + '] ';
         if(stack){
            s += RString.rpad(msg, 120) + ' [' + stack + ']';
         }else{
            s += msg;
         }
         o.iLogger.Output(s);
      }
   }
   MO.FLoggerConsole_xml = function FLoggerConsole_xml(){
      if(!this.environment){
         this.connect()
      }
      if(this.environment){
         return this.environment.xml();
      }
      return null;
   }
}
with(MO){
   MO.FMonitorConsole = function FMonitorConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope      = EScope.Global;
      o.working    = false;
      o.interval   = 10;
      o.intervalId = null;
      o.monitors   = new TList();
      o.hWindow    = null;
      o.doInterval = FMonitorConsole_doInterval;
      o.push       = FMonitorConsole_push;
      o.process    = FMonitorConsole_process;
      o.processAll = FMonitorConsole_processAll;
      o.startup    = FMonitorConsole_startup;
      o.wait       = FMonitorConsole_wait;
      o.release    = FMonitorConsole_release;
      return o;
   }
   MO.FMonitorConsole_push = function FMonitorConsole_push(monitor){
      this.startup();
      monitor.id = this.monitors.sync(monitor);
      monitor.name = 'T:' + RString.lpad(monitor.id, 4, '0');
      monitor.status = EMonitor.Active;
   }
   MO.FMonitorConsole_process = function FMonitorConsole_process(monitor){
      if(monitor){
         switch(monitor.status){
            case EMonitor.Sleep:
               break;
            case EMonitor.Active:
               monitor.process(this.interval);
               break;
            case EMonitor.Cancel:
               this.monitors.removeItem(monitor);
               break;
         }
      }
   }
   MO.FMonitorConsole_processAll = function FMonitorConsole_processAll(){
      this.working = true;
      var monitors = this.monitors;
      for(var n=0; n<monitors.count; n++){
         this.process(monitors.get(n));
      }
      this.working = false;
   }
   MO.FMonitorConsole_doInterval = function FMonitorConsole_doInterval(){
      var con = RGlobal.get(FMonitorConsole);
      if(con && !con.working){
         con.processAll();
      }
   }
   MO.FMonitorConsole_startup = function FMonitorConsole_startup(){
      if(!this.hWindow){
         this.hWindow = window;
         debugger;
         this.intervalId = this.hWindow.setInterval(this.doInterval, this.interval);
      }
   }
   MO.FMonitorConsole_wait = function FMonitorConsole_wait(request){
   }
   MO.FMonitorConsole_release = function FMonitorConsole_release(){
      if(this.hWindow && this.intervalId){
         this.hWindow.clearInterval(this.intervalId);
      }
   }
}
with(MO){
   MO.FMouseConsole = function FMouseConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._activeCapture = null;
      o.onMouseDown    = FMouseConsole_onMouseDown;
      o.onMouseMove    = FMouseConsole_onMouseMove;
      o.onMouseUp      = FMouseConsole_onMouseUp;
      o.construct      = FMouseConsole_construct;
      o.captureStart   = FMouseConsole_captureStart;
      o.capture        = FMouseConsole_capture;
      o.captureStop    = FMouseConsole_captureStop;
      o.register       = FMouseConsole_register;
      o.unregister     = FMouseConsole_unregister;
      o.clear          = FMouseConsole_clear;
      return o;
   }
   MO.FMouseConsole_onMouseDown = function FMouseConsole_onMouseDown(p){
      var o = this;
      var s = RHtml.searchLinker(p.hSource, MMouseCapture);
      if(!s){
         return;
      }
      if(!s.testMouseCapture()){
         return;
      }
      o._activeCapture = s;
      o.captureStart(p);
   }
   MO.FMouseConsole_onMouseMove = function FMouseConsole_onMouseMove(p){
      var o = this;
      if(!o._activeCapture){
         return;
      }
      o.capture(p);
   }
   MO.FMouseConsole_onMouseUp = function FMouseConsole_onMouseUp(p){
      var o = this;
      if(!o._activeCapture){
         return;
      }
      o.captureStop(p);
   }
   MO.FMouseConsole_construct = function FMouseConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      RWindow.lsnsMouseUp.register(o, o.onMouseUp);
   }
   MO.FMouseConsole_captureStart = function FMouseConsole_captureStart(p){
      var o = this;
      var c = o._activeCapture;
      if(c){
         RWindow.setOptionSelect(false);
         c.onMouseCaptureStart(p);
      }
   }
   MO.FMouseConsole_capture = function FMouseConsole_capture(p){
      var o = this;
      var c = o._activeCapture;
      if(c){
         if(c.testMouseCapture()){
            c.onMouseCapture(p);
         }else{
            o.captureStop(p)
         }
      }
   }
   MO.FMouseConsole_captureStop = function FMouseConsole_captureStop(p){
      var o = this;
      var c = o._activeCapture;
      if(c){
         c.onMouseCaptureStop(p);
         o._activeCapture = null;
      }
      RWindow.setOptionSelect(true);
   }
   MO.FMouseConsole_register = function FMouseConsole_register(p){
   }
   MO.FMouseConsole_unregister = function FMouseConsole_unregister(p){
   }
   MO.FMouseConsole_clear = function FMouseConsole_clear(){
   }
}
with(MO){
   MO.FPipeline = function FPipeline(o){
      o = RClass.inherits(this, o, FObject);
      o._code = null;
      o.code  = FPipeline_code;
      return o;
   }
   MO.FPipeline_code = function FPipeline_code(){
      return this._code;
   }
}
with(MO){
   MO.FProcess = function FProcess(o){
      o = RClass.inherits(this, o, FObject);
      o._name     = null;
      o._source   = null;
      o._worker   = null;
      o._events   = null;
      o.ohMessage = FProcess_ohMessage;
      o.onMessage = FProcess_onMessage;
      o.construct = FProcess_construct;
      o.name      = FProcess_name;
      o.start     = FProcess_start;
      o.process   = FProcess_process;
      return o;
   }
   MO.FProcess_ohMessage = function FProcess_ohMessage(){
      var o = this.__linker;
      o.onMessage(this);
   }
   MO.FProcess_onMessage = function FProcess_onMessage(p){
   }
   MO.FProcess_name = function FProcess_name(){
      return this._name;
   }
   MO.FProcess_construct = function FProcess_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._events = new TObjects();
   }
   MO.FProcess_start = function FProcess_start(p){
      var o = this;
      if(o._worker){
         throw new TError(o, 'Process is already start.');
      }
      o._source = p;
      var w = o._worker = new Worker(p);
      w.__linker = o;
      w.onmessage = o.ohMessage;
   }
   MO.FProcess_process = function FProcess_process(p){
      var o = this;
      var es = o._events;
      var c = es.count();
      es.push(p);
      var e = new SProcessEvent();
      e.index = c;
      e.code = p.code();
      e.data = p.data();
      o._worker.postMessage(e);
   }
}
with(MO){
   MO.FProcessConsole = function FProcessConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o.connections = null;
      o.onLoad      = FProcessConsole_onLoad;
      o.construct   = FProcessConsole_construct;
      o.alloc       = FProcessConsole_alloc;
      o.process     = FProcessConsole_process;
      o.send        = FProcessConsole_send;
      return o;
   }
   MO.FProcessConsole_construct = function FProcessConsole_construct(){
      var o = this;
      o.connections = new TObjects();
   }
   MO.FProcessConsole_onLoad = function FProcessConsole_onLoad(){
      var o = this;
      var e = o.event;
      e.document = o.document;
      e.process();
      o.event = null;
      o.document = null;
      o._statusFree = true;
   }
   MO.FProcessConsole_alloc = function FProcessConsole_alloc(){
      var o = this;
      var a = null;
      var cs = o.connections;
      for(var n = cs.count - 1; n >= 0; n--){
         var c = cs.get(n);
         if(c._statusFree){
            a = c;
            break;
         }
      }
      if(!a){
         a = RClass.create(FXmlConnection);
         cs.push(a);
         a.onLoad = o.onLoad;
      }
      a._statusFree = false;
      return a;
   }
   MO.FProcessConsole_process = function FProcessConsole_process(e){
      var o = this;
      var c = o.alloc();
      c.event = e;
      switch(e.code){
         case EXmlEvent.Send:
            c.send(e.url, e.document);
            break;
         case EXmlEvent.Receive:
            c.receive(e.url, e.document);
            break;
         case EXmlEvent.SyncSend:
            return c.syncSend(e.url, e.document);
         case EXmlEvent.SyncReceive:
            return c.syncReceive(e.url, e.document);
      }
   }
   MO.FProcessConsole_send = function FProcessConsole_send(u, d){
      var o = this;
      var c = o.alloc();
      var r = c.syncSend(u, d);
      c._statusFree = true;
      return r;
   }
}
with(MO){
   MO.FProcessEvent = function FProcessEvent(o){
      o = RClass.inherits(this, o, FObject);
      o._code      = null;
      o._data      = null;
      o._listeners = null;
      o.code       = FProcessEvent_code;
      o.setCode    = FProcessEvent_setCode;
      o.data       = FProcessEvent_data;
      o.setData    = FProcessEvent_setData;
      o.register   = FProcessEvent_register;
      return o;
   }
   MO.FProcessEvent_name = function FProcessEvent_name(){
      return this._name;
   }
   MO.FProcessEvent_code = function FProcessEvent_code(){
      return this._code;
   }
   MO.FProcessEvent_setCode = function FProcessEvent_setCode(p){
      this._code = p;
   }
   MO.FProcessEvent_data = function FProcessEvent_data(){
      return this._data;
   }
   MO.FProcessEvent_setData = function FProcessEvent_setData(p){
      this._data = p;
   }
   MO.FProcessEvent_register = function FProcessEvent_register(po, pf){
      var o = this;
      if(!o._listeners){
         o._listeners = new TListeners();
      }
      o._listeners.register(po, pf);
   }
}
with(MO){
   MO.FProcessor = function FProcessor(o){
      o = RClass.inherits(this, o, FObject);
      o._name     = null;
      o._source   = null;
      o._worker   = null;
      o._events   = null;
      o.ohMessage = FProcessor_ohMessage;
      o.onMessage = FProcessor_onMessage;
      o.construct = FProcessor_construct;
      o.name      = FProcessor_name;
      o.start     = FProcessor_start;
      o.process   = FProcessor_process;
      return o;
   }
   MO.FProcessor_ohMessage = function FProcessor_ohMessage(){
      var o = this.__linker;
      o.onMessage(this);
   }
   MO.FProcessor_onMessage = function FProcessor_onMessage(p){
   }
   MO.FProcessor_name = function FProcessor_name(){
      return this._name;
   }
   MO.FProcessor_construct = function FProcessor_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._events = new TObjects();
   }
   MO.FProcessor_start = function FProcessor_start(p){
      var o = this;
      if(o._worker){
         throw new TError(o, 'Process is already start.');
      }
      o._source = p;
      var w = o._worker = new Worker(p);
      w.__linker = o;
      w.onmessage = o.ohMessage;
   }
   MO.FProcessor_process = function FProcessor_process(p){
      var o = this;
      var es = o._events;
      var c = es.count();
      es.push(p);
      var e = new SProcessEvent();
      e.index = c;
      e.code = p.code();
      e.data = p.data();
      o._worker.postMessage(e);
   }
}
with(MO){
   MO.FProcessServer = function FProcessServer(o){
      o = RClass.inherits(this, o, FObject);
      o._name               = null;
      o._handle             = null;
      o._processors         = null;
      o.ohInterval          = FProcessServer_ohInterval;
      o.onInterval          = FProcessServer_onInterval;
      o.ohMessage           = FProcessServer_ohMessage;
      o.onMessage           = FProcessServer_onMessage;
      o.construct           = FProcessServer_construct;
      o.name                = FProcessServer_name;
      o.registerProcessor   = FProcessServer_registerProcessor;
      o.unregisterProcessor = FProcessServer_unregisterProcessor;
      o.send                = FProcessServer_send;
      o.process             = FProcessServer_process;
      return o;
   }
   MO.FProcessServer_ohInterval = function FProcessServer_ohInterval(){
      FProcessServer.__linker.onInterval();
   }
   MO.FProcessServer_onInterval = function FProcessServer_onInterval(){
      var o = this;
   }
   MO.FProcessServer_ohMessage = function FProcessServer_ohMessage(p){
      FProcessServer.__linker.onMessage(p.data);
   }
   MO.FProcessServer_onMessage = function FProcessServer_onMessage(p){
      var o = this;
      console.log('messgae', this, p);
   }
   MO.FProcessServer_construct = function FProcessServer_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._processors = new TDictionary();
   }
   MO.FProcessServer_name = function FProcessServer_name(){
      return this._name;
   }
   MO.FProcessServer_registerProcessor = function FProcessServer_registerProcessor(c, p){
      this._processors.set(c, p);
   }
   MO.FProcessServer_unregisterProcessor = function FProcessServer_unregisterProcessor(c){
      this._processors.set(c, null);
   }
   MO.FProcessServer_send = function FProcessServer_send(p){
      var o = this;
      postMessage(p);
   }
   MO.FProcessServer_process = function FProcessServer_process(){
      var o = this;
      onmessage = o.ohMessage;
      FProcessServer.__linker = o;
   }
}
with(MO){
   MO.FStatistics = function FStatistics(o){
      o = RClass.inherits(this, o, FObject);
      o._code      = null;
      o.reset      = FStatistics_reset;
      o.resetFrame = FStatistics_resetFrame;
      return o;
   }
   MO.FStatistics_reset = function FStatistics_reset(){
   }
   MO.FStatistics_resetFrame = function FStatistics_resetFrame(){
   }
}
with(MO){
   MO.FStatisticsConsole = function FStatisticsConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._statisticses = null;
      o.construct     = FStatisticsConsole_construct;
      o.register      = FStatisticsConsole_register;
      o.unregister    = FStatisticsConsole_unregister;
      o.find          = FStatisticsConsole_find;
      o.statisticses  = FStatisticsConsole_statisticses;
      o.reset         = FStatisticsConsole_reset;
      o.resetFrame    = FStatisticsConsole_resetFrame;
      return o;
   }
   MO.FStatisticsConsole_construct = function FStatisticsConsole_construct(){
      var o = this;
      o._statisticses = new TDictionary();
   }
   MO.FStatisticsConsole_register = function FStatisticsConsole_register(n, s){
      this._statisticses.set(n, s);
   }
   MO.FStatisticsConsole_unregister = function FStatisticsConsole_unregister(n){
      return this._statisticses.remove(n);
   }
   MO.FStatisticsConsole_find = function FStatisticsConsole_find(n){
      return this._statisticses.get(n);
   }
   MO.FStatisticsConsole_statisticses = function FStatisticsConsole_statisticses(){
      return this._statisticses;
   }
   MO.FStatisticsConsole_reset = function FStatisticsConsole_reset(e){
      var s = this._statisticses;
      for(var i = s.count() - 1; i >= 0; i--){
         s.getAt(i).reset();
      }
   }
   MO.FStatisticsConsole_resetFrame = function FStatisticsConsole_resetFrame(u, d){
      var s = this._statisticses;
      for(var i = s.count() - 1; i >= 0; i--){
         s.getAt(i).resetFrame();
      }
   }
}
with(MO){
   MO.FThread = function FThread(o){
      o = RClass.inherits(this, o, FObject, MListenerProcess);
      o._name       = null;
      o._statusCd   = EThreadStatus.Sleep;
      o._interval   = 100;
      o._delay      = 0;
      o.construct   = FThread_construct;
      o.name        = FThread_name;
      o.statusCd    = FThread_statusCd;
      o.interval    = FThread_interval;
      o.setInterval = FThread_setInterval;
      o.start       = FThread_start;
      o.stop        = FThread_stop;
      o.process     = FThread_process;
      return o;
   }
   MO.FThread_construct = function FThread_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FThread_name = function FThread_name(){
      return this._name;
   }
   MO.FThread_statusCd = function FThread_statusCd(){
      return this._statusCd;
   }
   MO.FThread_interval = function FThread_interval(){
      return this._interval;
   }
   MO.FThread_setInterval = function FThread_setInterval(p){
      this._interval = p;
   }
   MO.FThread_start = function FThread_start(){
      this._statusCd = EThreadStatus.Active;
   }
   MO.FThread_stop = function FThread_stop(){
      this._statusCd = EThreadStatus.Finish;
   }
   MO.FThread_process = function FThread_process(p){
      var o = this;
      if(o._delay <= 0){
         o.processProcessListener(o);
         o._delay = o._interval;
      }else{
         o._delay -= p;
      }
   }
}
with(MO){
   MO.FThreadConsole = function FThreadConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Local;
      o._active      = true;
      o._interval    = 10;
      o._threads     = null;
      o._hWindow     = null;
      o._hIntervalId = null;
      o.ohInterval   = FThreadConsole_ohInterval;
      o.construct    = FThreadConsole_construct;
      o.push         = FThreadConsole_push;
      o.start        = FThreadConsole_start;
      o.process      = FThreadConsole_process;
      o.processAll   = FThreadConsole_processAll;
      o.dispose      = FThreadConsole_dispose;
      return o;
   }
   MO.FThreadConsole_ohInterval = function FThreadConsole_ohInterval(){
      var c = RConsole.get(FThreadConsole);
      c.processAll();
   }
   MO.FThreadConsole_push = function FThreadConsole_push(p){
      this._threads.push(p);
   }
   MO.FThreadConsole_start = function FThreadConsole_start(p){
      p.start();
      this._threads.push(p);
   }
   MO.FThreadConsole_construct = function FThreadConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._threads = new TObjects();
      o._hWindow = window;
      o._hIntervalId = o._hWindow.setInterval(o.ohInterval, o._interval);
   }
   MO.FThreadConsole_process = function FThreadConsole_process(p){
      var o = this;
      if(p){
         switch(p.statusCd()){
            case EThreadStatus.Sleep:
               break;
            case EThreadStatus.Active:
               p.process(o._interval);
               break;
            case EThreadStatus.Finish:
               p.dispose();
               o._threads.remove(p);
               break;
         }
      }
   }
   MO.FThreadConsole_processAll = function FThreadConsole_processAll(){
      var o = this;
      if(o._active){
         var ts = o._threads;
         var c = ts.count();
         for(var n = 0; n < c; n++){
            var t = ts.get(n);
            o.process(t);
         }
      }
   }
   MO.FThreadConsole_dispose = function FThreadConsole_dispose(){
      var o = this;
      var hw = o._hWindow;
      if(hw){
         var hi = o._hIntervalId;
         if(hi){
            hw.clearInterval(hi);
            o._hIntervalId = null;
         }
         o._hWindow = null;
      }
   }
}
with(MO){
   MO.FXmlConsole = function FXmlConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Local;
      o._connections = null;
      o._caches      = null;
      o.onLoad       = FXmlConsole_onLoad;
      o.construct    = FXmlConsole_construct;
      o.alloc        = FXmlConsole_alloc;
      o.send         = FXmlConsole_send;
      o.sendAsync    = FXmlConsole_sendAsync;
      o.load         = FXmlConsole_load;
      o.process      = FXmlConsole_process;
      return o;
   }
   MO.FXmlConsole_construct = function FXmlConsole_construct(){
      var o = this;
      o._connections = new TObjects();
      o._caches = new TDictionary();
   }
   MO.FXmlConsole_onLoad = function FXmlConsole_onLoad(p){
      var o = this;
      debugger
   }
   MO.FXmlConsole_alloc = function FXmlConsole_alloc(){
      var o = this;
      var alloc = null;
      var connections = o._connections;
      for(var n = connections.count - 1; n >= 0; n--){
         var connection = connections.get(n);
         if(connection._statusFree){
            alloc = connection;
            break;
         }
      }
      if(!alloc){
         alloc = RClass.create(FXmlConnection);
         connections.push(alloc);
         alloc.onLoad = o.onLoad;
      }
      alloc._statusFree = false;
      alloc.clearLoadListeners();
      return alloc;
   }
   MO.FXmlConsole_send = function FXmlConsole_send(u, d){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = false;
      var r = connection.send(u, d);
      connection._statusFree = true;
      return r;
   }
   MO.FXmlConsole_sendAsync = function FXmlConsole_sendAsync(u, d, p){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = true;
      connection._parameters = p;
      connection.send(u, d);
      return connection;
   }
   MO.FXmlConsole_load = function FXmlConsole_load(u, d, p){
      var o = this;
      var v = o._caches.get(u);
      if(v){
         return v;
      }
      var connection = o.alloc();
      connection._asynchronous = true;
      connection._parameters = p;
      v = connection._cache = RClass.create(FXmlData);
      connection.send(u, d);
      o._caches.set(u, v);
      return v;
   }
   MO.FXmlConsole_process = function FXmlConsole_process(p){
      var o = this;
      if(p.constructor != SXmlEvent){
         throw new TError('Parameter type is invalid.');
      }
      var connection = o.alloc();
      connection._asynchronous = true;
      connection.send(p.url, p.inputDocument);
      connection.addLoadListener(p, p.process);
      return connection;
   }
}
