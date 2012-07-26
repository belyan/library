<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
        xmlns:lego="https://lego.yandex-team.ru"
        xmlns:x="http://www.yandex.ru/xscript"
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        exclude-result-prefixes="lego x">

    <xsl:import href="../../pages/common/common.xsl"/>

    <xsl:output method="x:xhtml" encoding="utf-8" indent="no" doctype-public="-//WAPFORUM//DTD XHTML Mobile 1.0//EN" doctype-system="http://www.wapforum.org/DTD/xhtml-mobile10.dtd" omit-xml-declaration="yes"/>

    <!-- Глобальные переменные -->
    <xsl:variable name="page-name" select="/page/@name"/>
    <xsl:variable name="userinfo" select="/page/common/userinfo"/>
    <xsl:variable name="device" select="/page/common/device"/>

    <!-- Параметры запроса -->
    <xsl:variable name="query-text" select="x:get-query-arg('text')"/>

    <!-- Текущий URL -->
    <xsl:variable name="current-url" select="x:get-protocol-arg('originalurl')"/>

    <!-- Среда окружения -->
    <xsl:variable name="environment" select="x:get-state-arg('environment')"/>

    <!-- Определяем класс устройства -->
    <xsl:variable name="device-class" select="$device/model/attr[@name = 'device_class']/@value"/>
    <xsl:variable name="device-is-iphone" select="boolean($device-class = 'iphoneos')"/>
    <xsl:variable name="device-is-android" select="boolean($device-class = 'android')"/>

    <!-- Общий шаблон страницы -->
    <xsl:template match="/">
        <xsl:apply-templates select="page" mode="redirect"/>
        <html>
            <head>
                <title>
                    <xsl:apply-templates select="page" mode="window-title"/>
                </title>
                <xsl:apply-templates select="page" mode="head-meta"/>
                <xsl:apply-templates select="page" mode="head-link"/>
                <xsl:apply-templates select="page/cssjs"/>
            </head>
            <xsl:apply-templates select="page" mode="html-body"/>
        </html>
    </xsl:template>

    <!-- Передаем параметры в Лего -->
    <xsl:template match="/" mode="lego:params">
        <lego:id>zakladki</lego:id>
        <xsl:if test="$page-name = 'index'">
            <lego:index/>
        </xsl:if>
        <xsl:if test="$userinfo/user">
            <lego:login>
                <xsl:value-of select="$userinfo/user/login"/>
            </lego:login>
        </xsl:if>
        <lego:retpath>
            <xsl:value-of select="$current-url"/>
        </lego:retpath>
        <lego:b-search>
            <lego:input>
                <lego:label>поиск закладок</lego:label>
                <lego:value><xsl:value-of select="$query-text"/></lego:value>
            </lego:input>
        </lego:b-search>
        <lego:device_class><xsl:value-of select="$device-class"/></lego:device_class>
    </xsl:template>

    <xsl:template match="page" mode="redirect"/>

    <!-- Заголовок окна -->
    <xsl:template match="page" mode="window-title">
        <xsl:text>Яндекс.Сервис</xsl:text>
    </xsl:template>

    <!-- META информация -->
    <xsl:template match="page" mode="head-meta">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="MobileOptimized" content="176"/>
        <xsl:if test="$device-is-iphone or $device-is-android">
            <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0"/>
        </xsl:if>
    </xsl:template>

    <!-- Ссылки в шапке -->
    <xsl:template match="page" mode="head-link">
        <link rel="shortcut icon" href="//yandex.st/lego/_/XXX.ico"/>
        <xsl:if test="$device-is-iphone">
            <link rel="apple-touch-icon" href="//yandex.st/lego/_/XXX.png"/>
        </xsl:if>
    </xsl:template>

    <!-- CSS/JS -->
    <xsl:template match="cssjs">
        <xsl:variable name="name" select="x:get-state-arg('page_name')"/>
        <xsl:choose>
            <xsl:when test="$environment = 'development'">
                <link rel="stylesheet" type="text/css" href="/pages/{$name}/_{$name}.css"/>
                <script type="text/javascript" charset="utf-8" src="/pages/{$name}/_{$name}.js"></script>
            </xsl:when>
            <xsl:otherwise>
                <style type="text/css" media="screen, handheld">
                    <xsl:value-of select="css" disable-output-escaping="yes"/>
                </style>
                <script type="text/javascript">
                    <xsl:value-of select="js" disable-output-escaping="yes"/>
                </script>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
     
    <!-- Тело страницы -->
    <xsl:template match="page" mode="html-body">
        <body>
            <xsl:if test="$device-is-iphone">
                <xsl:attribute name="class">iphone</xsl:attribute>
                <xsl:attribute name="onload">setTimeout(function(){scrollTo(0, 1)}, 1)</xsl:attribute>
            </xsl:if>
            <xsl:if test="$device-is-android">
                <xsl:attribute name="class">android</xsl:attribute>
            </xsl:if>
            <xsl:if test="$userinfo/user/services/service[@id = 668]/@suid">
                <xsl:apply-templates select="common/lego:page/lego:b-mooa"/>
            </xsl:if>
            <xsl:apply-templates select="common/lego:page/lego:b-head"/>

            <div class="b-page">
                <xsl:choose>
                    <xsl:when test="xscript_invoke_failed">
                        <xsl:apply-templates select="." mode="error"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates select="." mode="content"/>
                    </xsl:otherwise>
                </xsl:choose>
            </div>

            <xsl:apply-templates select="common/lego:page/lego:b-foot"/>
            <xsl:apply-templates select="common/lego:page/lego:i-metrika" mode="js"/>
        </body>
    </xsl:template>
     
    <!-- Содержимое страницы -->
    <xsl:template match="page" mode="content"/>
     
    <!-- Сервис не доступен -->
    <xsl:template match="page" mode="error">
        <div class="b-text">Извините, сервис временно недоступен. Попробуйте обновить страницу или зайдите позже.</div>
    </xsl:template>

    <!-- Ссылка на полную версию -->
    <xsl:template match="lego:b-foot//lego:link[@type = 'full']" mode="lego:url-content">
        <xsl:text>http://tune.yandex.ru/api/my/v1.0/my.xml?param=1&amp;block=44&amp;sk=</xsl:text>
        <xsl:value-of select="x:get-secret-key()"/>
        <xsl:text>&amp;retpath=</xsl:text>
        <xsl:value-of select="@url"/>
        <xsl:apply-templates select="/page" mode="full-version"/>
    </xsl:template>

    <xsl:template match="page" mode="full-version"/>

    <!-- Код Метрики -->
    <xsl:template match="lego:i-metrika[string(@counter)]"/>
    <xsl:template match="lego:i-metrika[string(@counter)]" mode="js">
        <script type="text/javascript" src="//mc.yandex.ru/metrika/watch.js"><xsl:comment/></script>
        <script type="text/javascript">
            <xsl:text>try { var yaCounter</xsl:text>
            <xsl:value-of select="@counter"/>
            <xsl:text> = new Ya.Metrika(</xsl:text>
            <xsl:value-of select="@counter"/>
            <xsl:text>); } catch(e){}</xsl:text>
        </script>
        <noscript><div style="position: absolute;"><img src="//mc.yandex.ru/watch/{@counter}" alt=""/></div></noscript>
    </xsl:template>

</xsl:stylesheet>
