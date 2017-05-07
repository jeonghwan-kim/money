#! /bin/sh

rm /etc/init.d/money
update-rc.d -f money remove
exit 0
