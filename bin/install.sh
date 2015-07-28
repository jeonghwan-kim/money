#! /bin/sh

cp /home/ubuntu/money2/bin/money /etc/init.d/money
chmod 755 /etc/init.d/money
update-rc.d -f money remove
update-rc.d money defaults 99
