#!/bin/bash
##############################################################################
# Данный скрипт переименовывает файлы из формата HEX в Decimal
#
# Автор: Yuriy Belyakov <belyan@yandex-team.ru>
##############################################################################

COUNTER=0

for file in *.jpg; do
	mv $file x$file
done

for file in *.jpg; do
	hex="${file%.*}"
	let dec=0${hex}
	mv $file "${dec}.jpg"
	let COUNTER=COUNTER+1
done

if [[ $COUNTER > 0 ]]; then
	echo "Succesfully renamed $COUNTER files"
fi
