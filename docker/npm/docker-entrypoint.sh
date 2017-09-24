#!/bin/bash

function finish {
	kill $pid
}

trap 'finish' SIGTERM

cd /app
npm start &
pid=$!

wait
