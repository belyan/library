<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

    <xsl:output method="xml"/>

    <!-- Из этих айтемов нужно отобрать только те, в строковом значении которых есть число > 500 -->
    <xsl:template match="/">
        <items>
            <xsl:copy-of select="/items/item[number(translate(., translate(., '0123456789', ''), '')) &gt; 500]"/>
        </items>
    </xsl:template>

</xsl:stylesheet>
