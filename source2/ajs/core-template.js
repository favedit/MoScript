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
