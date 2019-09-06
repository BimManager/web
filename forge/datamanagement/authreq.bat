curl -X POST https://developer.api.autodesk.com/authentication/v1/authenticate ^
-H "Content-Type: application/x-www-form-urlencoded" ^
-d client_id=FKHvpje5Y6F6AOsBpHoIHUxggtTqJ9iW ^
-d client_secret=CDjpGkYfhhJ2c0wy ^
-d grant_type=client_credentials ^
-d scope=data:read > res.txt