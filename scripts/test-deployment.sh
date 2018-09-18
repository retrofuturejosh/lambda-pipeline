#!/bin/bash

result=0
fails=0

# make file to capture results
touch results;
echo 0 > results;
aws s3 cp results s3://sohnserverlessbucket/integration-tests/results

# wait before starting tests
sleep 60

# test API every 5 seconds for 7 minutes
for i in {1..84}; do NODE_ENV=integration mocha 'test/integration/api' --recursive
# check for errors and assign result
if [ $? -eq 0 ]
then result=0
else result=1; (( fails++ ))
fi;
if [ $fails -gt 5 ]
then echo $fails > results;
exit 1;
fi; sleep 5; done;

echo Exit code is: $result

exit $result
