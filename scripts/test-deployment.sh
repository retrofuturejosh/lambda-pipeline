#!/bin/bash

result=0

sleep 60

# test API every 15 seconds for 10 minutes
for i in {1..40}; do NODE_ENV=integration mocha 'test/integration/api' --recursive
# check for errors and assign result
if [ $? -eq 0 ]
then result=0
else result=1
fi
# if tests fail more than 5 times, fail out
if [[ $result -eq 1 && i -gt 5 ]]
then exit $result
fi; sleep 15; done;

echo $result

exit $result
