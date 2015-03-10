@CLS

@SET JS_HOME=%cd%

@SET JAVA_PATH=%JS_HOME%\..\library\jdom-2.0.5.jar;%JS_HOME%\..\library\mo-common.jar;%JS_HOME%\..\library\mo-utility.jar

@REM ============================================================
@SET JAVA_BUILDER=org.mo.util.javascript.FJsFileBuilder
@"%JAVA_HOME%\bin\java.exe" -cp %JAVA_PATH% %JAVA_BUILDER% %JS_HOME%

@REM ============================================================
COPY /Y %JS_HOME%\9.1.1-context\*.js %JS_HOME%\ajs\

@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\me.js --js_output_file ajs\me-release.js
@"%JAVA_HOME%\bin\java.exe" -jar %JS_HOME%\..\library\compiler.jar --js ajs\mo.js --js_output_file ajs\mo-release.js
