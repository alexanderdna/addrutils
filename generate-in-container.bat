@ECHO OFF

SET BINARY_NAME=addrutils
SET CONTAINER_NAME=tmp-addrutils
SET ACCOUNT_COUNT=10
SET OUTPUT_FILE=addresses.txt

ECHO Will generate %ACCOUNT_COUNT% accounts
ECHO Output file is %OUTPUT_FILE%

MKDIR .tmp

ECHO Packaging script...
CALL npm run convert
CALL npx pkg ^
    -t node16-alpine ^
    -o .tmp/%BINARY_NAME% ^
    cjs/cli.js >NUL

ECHO Running a temporary container without network...
ECHO Container name is %CONTAINER_NAME%
docker run ^
    -d --rm ^
    --network none ^
    --name %CONTAINER_NAME% ^
    alpine:3.17 tail -f /dev/null >NUL

ECHO Copying script package to container...
docker cp .tmp/%BINARY_NAME% %CONTAINER_NAME%:/usr/bin/

ECHO Running script in container...
docker exec -it %CONTAINER_NAME% ^
    %BINARY_NAME% -c %ACCOUNT_COUNT% > %OUTPUT_FILE%

ECHO Stopping and removing container...
docker stop %CONTAINER_NAME% >NUL

ECHO Removing temporary files...
RMDIR /s /q .tmp

PAUSE