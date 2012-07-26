<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:x="http://www.yandex.ru/xscript"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    exclude-result-prefixes="x"
    version="1.0">

    <!-- Глобальные переменные -->
    <xsl:variable name="page" select="/page/@name"/>
    <xsl:variable name="userinfo" select="/page/common/userinfo"/>
    <xsl:variable name="device" select="/page/common/device"/>
     
    <!-- Текущий URL -->
    <xsl:variable name="current-url" select="x:get-protocol-arg('originalurl')"/>
     
    <!-- Текущий хост -->
    <xsl:variable name="current-host" select="concat('http://', x:get-protocol-arg('host'), '/')"/>
     
    <!-- Среда окружения -->
    <xsl:variable name="environment" select="x:get-state-arg('environment')"/>

    <!-- Определяем класс устройства -->
    <xsl:variable name="device-class" select="$device/model/attr[@name = 'device_class']/@value"/>
    <xsl:variable name="device-is-iphone" select="boolean($device-class = 'iphoneos')"/>
    <xsl:variable name="device-is-android" select="boolean($device-class = 'android')"/>

    <!-- Ширина устройства -->
    <xsl:variable name="device-width">
        <xsl:choose>
            <xsl:when test="$device/model/attr[@name = 'screenx']/@value">
                <xsl:value-of select="number($device/model/attr[@name = 'screenx']/@value)"/>
            </xsl:when>
            <xsl:otherwise>240</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <!-- Браузер устройства -->
    <xsl:variable name="browser-is-webkit" select="contains(x:get-header('USER-AGENT'), 'AppleWebKit')"/>

    <!-- Локальное смещение по времени относительно UTC -->
    <xsl:variable name="local-offset" select="x:get-state-arg('tz_offset', 0)"/>

</xsl:stylesheet>