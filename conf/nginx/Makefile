all:
	cp 10-PROJECT.conf /etc/nginx/sites-available/
	chmod 644 /etc/nginx/sites-available/10-PROJECT.conf
	ln -s /etc/nginx/sites-available/10-PROJECT.conf /etc/nginx/sites-enabled/
	sudo /etc/init.d/nginx restart
