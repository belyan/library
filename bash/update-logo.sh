#!/bin/bash
##############################################################################
# Данный скрипт загружает геофайл поставщика данных (Сервис-ТВ),
# получает из него список логотипов, загружает их в нужную директорию и
# ресайзит до нужного размера.
#
# Автор: Yuriy Belyakov <belyan@yandex-team.ru>
##############################################################################

GEO_URL=http://xmltv.s-tv.ru/pers/yandex/generate_region_xml.php
GEO_FILE=geofile.xml
GEO_PATH=../data/

IMG_PATH=logo/
IMG_EMPTY_URL=http://yandex.st/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif

LOG_FILE=update-logo.log
COUNTER=0

# Создаем лог-файл
echo "=== `date` ===" > $LOG_FILE

# Загружаем геофайл с данными
echo -e "\nLoad geofile..." >> $LOG_FILE
curl $GEO_URL > ${GEO_PATH}${GEO_FILE}
echo $GEO_FILE >> $LOG_FILE

if [ -s ${GEO_PATH}${GEO_FILE} ]; then
	GEO_FILE_SIZE=$(stat -c %s ${GEO_PATH}${GEO_FILE})
	echo -e "\nTotal received of bytes: $GEO_FILE_SIZE" >> $LOG_FILE
fi

# Получаем список логотипов
xsltproc -o logo.txt logo.xsl ${GEO_PATH}${GEO_FILE}

# Загружаем логотипы по списку
echo -e "\nLoad logotypes..." >> $LOG_FILE
cat logo.txt |
{
	while read line; do
		IFS=";"
		set -- $line
		LOGO_URL=$1
		LOGO_ID=$2  
		curl $LOGO_URL > ${IMG_PATH}${LOGO_ID}.jpg
		if [ ! -s ${IMG_PATH}${LOGO_ID}.jpg ]; then
			echo "$LOGO_ID.jpg: File does not exists" >> $LOG_FILE
			if [ ! -s ${IMG_PATH}${LOGO_ID}.gif ]; then
				curl $IMG_EMPTY_URL > ${IMG_PATH}${LOGO_ID}.gif
			fi
		else
			let COUNTER=COUNTER+1
		fi
	done
	echo -e "\nTotal number of logotypes: $COUNTER" >> $LOG_FILE
}

# Ресайзим до нужного размера
mogrify -path $IMG_PATH -format gif -resize 45x45 $IMG_PATH*.jpg
mogrify -path ${IMG_PATH}pda/ -format gif -resize 20x20 $IMG_PATH*.jpg
rm $IMG_PATH*.jpg
