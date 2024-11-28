@REM mkdir db
@REM mkdir src
@REM cd src
@REM mkdir controllers
@REM mkdir views
@REM mkdir public
@REM mkdir routes

npm init --y

npm install express mysql express-myconnection morgan ejs

npm install nodemon

set directorio=%CD%
set /p contra="Introduce la contraseña de root de mysql: "
mysql -u root -p%contra% -e "DROP DATABASE IF EXISTS kerumueblesnjs;"
mysql -u root -p%contra% -e "CREATE DATABASE kerumueblesnjs;"
mysql -u root -p%contra% kerumuebles_outlet < "%CD%\db\kerumueblesnjs.sql"