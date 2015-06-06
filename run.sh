#!/usr/bin/env bash
NODE_ENV=production PORT=8500 forever start --uid money2 -c "npm start"
