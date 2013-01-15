<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

    <xsl:output method="xml"/>

    <!-- Выбрать одним XPath ноды с простыми числами -->
    <xsl:template match="/">
        <items>
            <!-- 1 способ -->
            <xsl:copy-of select="/items/item[count(preceding-sibling::*[(last() + 1) mod . = 0]) = 1]"/>
            <!-- 2 способ
            <xsl:copy-of select="/items/item[count(preceding-sibling::*[(position() + .) mod . = 0]) = 1]"/> -->
        </items>
    </xsl:template>

</xsl:stylesheet>
