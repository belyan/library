#!/bin/bash
##############################################################################
# Данный скрипт добавляет префикс x: для всех тегов XScript при условии,
# что в файле объявлено пространство имен http://www.yandex.ru/xscript
#
# Автор: Yuriy Belyakov <belyan@yandex-team.ru>
##############################################################################

TAGS="add-headers|auth-block|banner-block|block|custom-morda|file|geo-block|guard|guard-not|header|http|js|lang-detect|local|local-program|lua|lua-after-cache-load|lua-before-cache-save|meta|method|mist|mobile-block|name|nameref|param|query-param|regional-units-block|root|tinyurl|uatraits|while|xpath|xpointer|xscript|xslt|xslt-param"

FILES=`find . -name "*.xml" -a -type f | grep -v "./lego/" | grep -v "./pages/"`

for file in $FILES; do
	if grep -Fq "xmlns:x=\"http://www.yandex.ru/xscript\"" $file; then
		sed -i -r "s/(<)($TAGS)((\s\S+)*(\s?\/?>))/\1x:\2\3/g" $file
		sed -i -r "s/(<\/)($TAGS)(\s?>)/\1x:\2\3/g" $file
		echo $file
	fi
done
