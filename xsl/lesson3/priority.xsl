<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

    <xsl:output method="text"/>

    <xsl:template match="/">
        <xsl:apply-templates select="//text"/>
    </xsl:template>

    <!-- Если приоритет у шаблонов одинаковый, то побеждает последний -->
    <xsl:template match="text" priority="0">
        <xsl:text>text</xsl:text>
    </xsl:template>

    <!-- priority="0.5" -->
    <xsl:template match="item/item/text">
        <xsl:text>item/item/text</xsl:text>
    </xsl:template>

    <!-- priority="0.5" -->
    <xsl:template match="item/text">
        <xsl:text>item/text</xsl:text>
    </xsl:template>

</xsl:stylesheet>
