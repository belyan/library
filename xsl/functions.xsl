<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:func="http://exslt.org/functions"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:ya="urn:yandex-functions"
    exclude-result-prefixes="ya"
    extension-element-prefixes="func"
    version="1.0">

    <!-- Склонялка -->
    <func:function name="ya:decliner">
        <xsl:param name="number" select="0"/>
        <xsl:param name="first-form"/>
        <xsl:param name="second-form"/>
        <xsl:param name="third-form"/>

        <xsl:variable name="last-number" select="$number mod 10"/>
        <xsl:variable name="last-numbers" select="$number mod 100"/>

        <xsl:variable name="result">
            <xsl:choose>
                <xsl:when test="$last-number = 1 and not($last-numbers = 11)">
                    <xsl:value-of select="$first-form"/>
                </xsl:when>
                <xsl:when test="($last-number = 2 or $last-number = 3 or $last-number = 4) and not($last-numbers = 12 or $last-numbers = 13 or $last-numbers = 14)">
                    <xsl:value-of select="$second-form"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$third-form"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>

        <func:result select="concat($number, '&#160;', $result)"/>
    </func:function>

</xsl:stylesheet>
