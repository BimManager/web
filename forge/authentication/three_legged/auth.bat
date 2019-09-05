@echo off
set err=0


if not defined FORGE_CLIENT_ID (
    echo FORGE_CLIENT_ID is not defined
    goto:eof
)
if not defined FORGE_CLIENT_SECRET (
    echo FORGE_CLIENT_SECRET is not defined
    goto:eof
)

if not defined CODE (
    echo CODE is not defined
    goto:eof
)

curl -X POST "https://developer.api.autodesk.com/authentication/v1/gettoken" ^
     -H "Content-Type: application/x-www-form-urlencoded"^
     -d client_id=%FORGE_CLIENT_ID%^
     -d client_secret=%FORGE_CLIENT_SECRET%^
     -d code=%CODE%^
     -d grant_type=authorization_code ^
     -d redirect_uri=https://autodesk.com > res.txt
