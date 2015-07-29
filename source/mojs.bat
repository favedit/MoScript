@CLS

@SET JS_HOME=%cd%
@SET PJ_HOME=%JS_HOME%\..\..
@SET PJ_EAI=%PJ_HOME%\MoCloud\mp-eai-content\webroot

@SET JAVA_PATH=%JS_HOME%\..\library\jdom-2.0.5.jar;%JS_HOME%\..\library\mo-common.jar;%JS_HOME%\..\library\mo-utility.jar

@REM ============================================================
@SET JAVA_BUILDER=org.mo.util.javascript.FJsFileBuilder
@"%JAVA_HOME%\bin\java.exe" -Xms256m -Xmx512m -cp %JAVA_PATH% %JAVA_BUILDER% %JS_HOME% debug

@REM ============================================================
@COPY /Y %JS_HOME%\9.1.01-context\*.js %JS_HOME%\ajs\

@COPY /Y %JS_HOME%\ajs\extension.js   %PJ_EAI%\ajs\extension.js
@COPY /Y %JS_HOME%\ajs\me.js          %PJ_EAI%\ajs\me.js
@COPY /Y %JS_HOME%\ajs\mo.js          %PJ_EAI%\ajs\mo.js
@COPY /Y %JS_HOME%\ajs\eai.js         %PJ_EAI%\ajs\eai.js
@COPY /Y %JS_HOME%\ajs\context_cn.js  %PJ_EAI%\ajs\context_cn.js
