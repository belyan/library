#!/bin/bash
##############################################################################
# Данный скрипт загружает фотографии с ресурса NetCarShow.com
# и раскладывает их в директории по брендам, моделям и годам
#
# Параметры:
#   b (brand)   производитель
#   m (model)   модель
#   y (year)    год выпуска
#   s (size)    размер фотографии
#   h (help)    пример использования
#
# Пример вызова:
#   netcarshow.sh -b Audi -m "RS7 Sportback" -y 2014 -s 1024x768
#
# Автор: Yuriy Belyakov <belyan@yandex-team.ru>
##############################################################################

SITE=http://www.netcarshow.com
SIZE=1280x960
TIMEOUT=10
HR="=============================================================================="
USER_AGENT="Mozilla/5.0 (Windows NT 6.1; WOW64; rv:16.0) Gecko/20100101 Firefox/16.0"

# Вспомогательные функции
function contains() {
	local n=$#
	local value=${!n}
	for (( i=1; i < $n; i++ )) {
		if [[ ${!i} == $value ]]; then
			echo "y"
			return 0 # true
		fi
	}
	echo "n"
	return 1 #false
}

function tolower() {
	echo $1 | tr "[A-Z]" "[a-z]"
}

# Получаем параметры в качестве аргументов
while getopts ":b:m:y:s:h" option; do
	case $option in
		b  ) BRAND=${OPTARG};;
		m  ) MODEL=${OPTARG};;
		y  ) YEAR=${OPTARG};;
		s  ) SIZE=${OPTARG};;
		h  ) echo "Usage: $0 -b <brand> -m <model> -y <year> [-s <size>] [-h]"; exit 1;;
		\? ) echo -e "Invalid option: -${OPTARG}\nTry '$0 -h' for more information."; exit 1;;
	esac
done

# Формируем ссылку
BRAND_NSP=${BRAND// /_}
MODEL_NSP=${MODEL// /_}
PAGE_BRAND=$(tolower /$BRAND_NSP/)
PAGE_START=$(tolower /$BRAND_NSP/$YEAR-$MODEL_NSP/)

# Загружаем первую страницу
echo -e "\nLoad pages...\n$HR"
echo "${SITE}${PAGE_START}"
PAGE_LOAD=$(curl -s --user-agent "$USER_AGENT" --referer ${SITE}${PAGE_BRAND} ${SITE}${PAGE_START})

# Находим все страницы
PAGES=()
PAGES+=($PAGE_START)
PAGE_PATTERN=${PAGE_START}[0-9]{2}.htm

for word in $PAGE_LOAD; do
	[[ $word =~ $PAGE_PATTERN ]]
	page=${BASH_REMATCH[0]}
	if [[ $page && $(contains ${PAGES[@]} $page) == "n" ]]; then
		PAGES+=($page)
	fi
done

# Бежим по страницам и находим все картинки
IMAGES=()
IMAGE_PATTERN=http://[^/]+/${BRAND_NSP}-${MODEL_NSP}_${YEAR}_thumbnail_[0-9a-z]{2}.jpg

for page in ${PAGES[@]}; do
	if [[ $page != $PAGE_START ]]; then
		echo "${SITE}${page}"
		PAGE_LOAD=$(curl -s --user-agent "$USER_AGENT" --referer ${SITE}${PAGE_START} ${SITE}${page})
	fi
	for word in $PAGE_LOAD; do
		[[ $word =~ $IMAGE_PATTERN ]]
		thumbnail=${BASH_REMATCH[0]}
		if [[ $thumbnail ]]; then
			thumbnail=${thumbnail//img1./img2.}
			image=${thumbnail//thumbnail/${SIZE}_wallpaper}
			name=${image:${#image}-6}
			if [[ $name != "00.jpg" ]]; then
				IMAGES+=($image)
			fi
		fi
	done
done

# Создаем директорию и удаляем старые картинки
IMAGES_PATH=$HOME/photo/$BRAND/$MODEL/$YEAR
mkdir -p "$IMAGES_PATH"
find "$IMAGES_PATH" -type f -a -name *.jpg -delete

# Загружаем картинки и сохраняем в директорию
COUNTER=0
echo -e "\nLoad images...\n$HR"
for image in ${IMAGES[@]}; do
	echo "${image}"
	name=${image:${#image}-6:2}
	referer="${SITE}${PAGE_START}${SIZE}/wallpaper_${name}.htm"
	curl -s --user-agent "$USER_AGENT" --referer $referer "$image" > "$IMAGES_PATH/${name}.jpg"
	sleep $TIMEOUT
	let COUNTER=COUNTER+1
done
echo -e "\nSuccesfully saved $COUNTER images in folder: '$IMAGES_PATH'"
