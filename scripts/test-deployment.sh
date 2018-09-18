#!/bin/bash

result=0

for i in {1..40}; do NODE_ENV=integration mocha 'test/integration/api' --recursive; if [ $? -ne 0 ]; then result=1; else result=0; fi; sleep 15; done;

echo $result

exit $result
