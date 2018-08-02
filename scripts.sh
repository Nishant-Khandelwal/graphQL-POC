#!/bin/bash

# Start all the processes
pm2 start npm -- run start-server
pm2 start npm -- run update-schema
pm2 start npm -- run relay
pm2 start npm -- run start