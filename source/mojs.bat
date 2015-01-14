@CLS

@SET JS_HOME=%cd%

@SET JAVA_PATH=%JS_HOME%\..\library\mo-common.jar;%JS_HOME%\..\library\mo-utility.jar

@REM ============================================================
@SET JAVA_PMGR=org.mo.util.javascript.FJsPathMerger

@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\1.1.1-runtime            %JS_HOME%\ajs\runtime.js            N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\1.2.1-lang               %JS_HOME%\ajs\lang.js               N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\1.2.2-lang-math          %JS_HOME%\ajs\lang-math.js          N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\1.3.1-core               %JS_HOME%\ajs\core.js               N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\1.3.1-core-template      %JS_HOME%\ajs\core-template.js      N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\1.3.2-console            %JS_HOME%\ajs\console.js            N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\2.1.1-graphic            %JS_HOME%\ajs\graphic.js            N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\2.2.1-graphic-2d         %JS_HOME%\ajs\graphic-2d.js         N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\2.3.1-graphic-3d         %JS_HOME%\ajs\graphic-3d.js         N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\2.3.2-graphic-3d-render  %JS_HOME%\ajs\graphic-3d-render.js  N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\2.3.3-graphic-3d-effect  %JS_HOME%\ajs\graphic-3d-effect.js  N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\2.4.1-graphic-3d-wgl     %JS_HOME%\ajs\graphic-3d-wgl.js     N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\3.1.1-engine             %JS_HOME%\ajs\engine.js             N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\3.2.1-engine-2d          %JS_HOME%\ajs\engine-2d.js          N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\3.3.1-engine-3d          %JS_HOME%\ajs\engine-3d.js          N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\3.3.2-engine-3d-resource %JS_HOME%\ajs\engine-3d-resource.js N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\3.3.3-engine-3d-render   %JS_HOME%\ajs\engine-3d-render.js   N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\4.1.1-control            %JS_HOME%\ajs\control.js            N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\4.2.1-control-form       %JS_HOME%\ajs\control-form.js       N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\4.3.1-control-table      %JS_HOME%\ajs\control-table.js      N
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_PMGR% %JS_HOME%\5.1.1-stage              %JS_HOME%\ajs\stage.js              N

COPY /Y %JS_HOME%\9.1.1-context\*.js %JS_HOME%\ajs\

@REM ============================================================
@SET JAVA_FMGR=org.mo.util.javascript.FJsFileMerger

@SET JS_FILES=
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\runtime.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\lang.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\lang-math.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\core.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\core-template.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\console.js
echo %JS_FILES%
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_FMGR% %JS_FILES% %JS_HOME%\ajs\mo-core.js

@SET JS_FILES=
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\graphic.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\graphic-2d.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\graphic-3d.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\graphic-3d-render.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\graphic-3d-effect.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\graphic-3d-wgl.js
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_FMGR% %JS_FILES% %JS_HOME%\ajs\mo-graphic.js

@SET JS_FILES=
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\engine.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\engine-2d.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\engine-3d.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\engine-3d-resource.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\engine-3d-render.js
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_FMGR% %JS_FILES% %JS_HOME%\ajs\mo-engine.js

@SET JS_FILES=
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\control.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\control-form.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\control-table.js
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_FMGR% %JS_FILES% %JS_HOME%\ajs\mo-control.js

@SET JS_FILES=
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\mo-core.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\mo-graphic.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\mo-engine.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\mo-graphic.js
@SET JS_FILES=%JS_FILES% %JS_HOME%\ajs\mo-control.js
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_FMGR% %JS_FILES% %JS_HOME%\ajs\mo.js

