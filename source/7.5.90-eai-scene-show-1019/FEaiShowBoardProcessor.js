//==========================================================
// <T>显示面板处理器。</T>
//
// @class
// @author maocy
// @history 151012
//==========================================================
MO.FEaiShowBoardProcessor = function FEaiShowBoardProcessor(o) {
   o = MO.Class.inherits(this, o, MO.FE3dDisplayContainer);
   //..........................................................
   // @attribute
   o._optionRotation = true;
   o._optionArea     = false;
   o._selectBoard    = null;
   o._selectSpeed    = 0.04;
   o._boardCount     = 8;
   o._boardRotation  = 0;
   o._boardRadius    = 700;
   o._autoPlay       = MO.Class.register(o, new MO.AGetter('_autoPlay'));
   o._boards         = MO.Class.register(o, new MO.AGetSet('_boards'));
   //..........................................................
   // @method
   o.construct       = MO.FEaiShowBoardProcessor_construct;
   // @method
   o.reload          = MO.FEaiShowBoardProcessor_reload;
   o.setup           = MO.FEaiShowBoardProcessor_setup;
   o.setAutoPlay     = MO.FEaiShowBoardProcessor_setAutoPlay;
   o.setAutoRotation = MO.FEaiShowBoardProcessor_setAutoRotation;
   o.showArea        = MO.FEaiShowBoardProcessor_showArea;
   o.process         = MO.FEaiShowBoardProcessor_process;
   // @method
   o.dispose         = MO.FEaiShowBoardProcessor_dispose;
   return o;
}

//==========================================================
// <T>重新加载</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_reload = function FEaiShowBoardProcessor_reload() {
   var o = this;
   var boards = o._boards;
   var count = boards.count();
   for (var i = 0; i < count; i++) {
      var board = boards.at(i);
      board._videoData.hVideo().load();
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_construct = function FEaiShowBoardProcessor_construct() {
   var o = this;
   o.__base.FE3dDisplayContainer.construct.call(o);
   // 配置属性
   o._boards = new MO.TObjects();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_setup = function FEaiShowBoardProcessor_setup() {
   var o = this;
   var boards = o._boards;
   // 创建面板
   for(var i = 1; i <= o._boardCount; i++){
      var board = MO.Class.create(MO.FEaiShowBoard);
      board.linkGraphicContext(o);
      board.setUrl('{eai.resource}/show1019/center/' + i + '.mp4');
      board.setMaskUrl('{eai.resource}/show1019/center/' + i + '.jpg');
      board.setup();
      boards.push(board);
      o.pushDisplay(board);
   }
   // 计算位置
   var count = boards.count();
   var angle = Math.PI * 2 / count;
   var radius = o._boardRadius;
   var rotation = o._boardRotation;
   for(var i = 0; i < count; i++){
      var board = boards.at(i);
      var boardAngle = angle * i;
      board.setRadius(boardAngle);
      board.setCurrent(Math.cos(boardAngle) * radius, 0, -Math.sin(boardAngle) * radius);
   }
}

//==========================================================
// <T>设置自动播放。</T>
//
// @method
// @param flag:Boolean 标志
//==========================================================
MO.FEaiShowBoardProcessor_setAutoPlay = function FEaiShowBoardProcessor_setAutoPlay(flag){
   var o = this;
   // 设置面板
   var boards = o._boards;
   var count = boards.count();
   for(var i = 0; i < count; i++){
      var board = boards.at(i);
      board.play(flag);
   }
   // 设置换转
   if(flag){
      o._optionArea = false;
      o._optionRotation = true;
   }
   // 设置可见性
   o.setVisible(flag);
}

//==========================================================
// <T>设置自动旋转。</T>
//
// @method
// @param flag:Boolean 标志
//==========================================================
MO.FEaiShowBoardProcessor_setAutoRotation = function FEaiShowBoardProcessor_setAutoRotation(flag){
   var o = this;
   //o._optionRotation = flag;
   // 设置面板
   //var boards = o._boards;
   //var count = boards.count();
   //for(var i = 0; i < count; i++){
   //   var board = boards.at(i);
   //   board.play(flag);
   //}
   // 设置可见性
   //o.setVisible(flag);
}

//==========================================================
// <T>显示区域。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_showArea = function FEaiShowBoardProcessor_showArea(areaId){
   var o = this;
   var id = parseInt(areaId);
   // 选中区域
   if(id){
      o._optionArea = true;
      var selectBoard = o._boards.get(id - 1);
      MO.Assert.debugNotNull(selectBoard);
      o._selectBoard = selectBoard;
      var radius = selectBoard.radius();
      o._stopRadius = MO.Lang.Math.PI_2 + radius;
      o._boardRotation = o._boardRotation % MO.Lang.Math.PI2
   }else{
      o._optionArea = false;
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_process = function FEaiShowBoardProcessor_process() {
   var o = this;
   // 旋转处理
   var rotation = o._boardRotation;
   if(o._optionArea){
      var radius = o._stopRadius;
      if(rotation > radius){
         rotation -= o._selectSpeed;
         if(rotation <= radius){
            rotation = radius;
         }
      }else if(rotation < radius){
         rotation += o._selectSpeed;
         if(rotation >= radius){
            rotation = radius;
         }
      }
   }else if(o._optionRotation){
      rotation += 0.001;
   }
   // 设置旋转
   var matrix = o._matrix;
   o._boardRotation = rotation;
   var radius = o._boardRadius;
   // 逻辑处理
   //var startAngle = Math.PI / 6;
   //var endAngle = Math.PI - (Math.PI / 6);
   var startAngle = 0;
   var endAngle = Math.PI;
   var boards = o._boards;
   var count = boards.count();
   for(var i = 0; i < count; i++){
      var board = boards.at(i);
      var boardAngle = rotation + board.radius();
      boardAngle %= MO.Lang.Math.PI2;
      //if((boardAngle >= startAngle) && (boardAngle < endAngle)){
      //   board.play(true);
      //}else{
      //   board.play(false);
      //}
      // 逻辑处理
      board.setTarget(Math.cos(boardAngle) * radius, 0, -Math.sin(boardAngle) * radius);
   }
   // 逻辑处理
   o.__base.FE3dDisplayContainer.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_dispose = function FEaiShowBoardProcessor_dispose() {
   var o = this;
   o._boards = MO.Lang.Object.dispose(o._boards);
   // 配置属性
   o.__base.FE3dDisplayContainer.construct.call(o);
}
