<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

    <!-- Наследование параметров вывода (xsl:output) -->
    <xsl:import href="common.xsl"/>

    <xsl:template match="page" mode="content">
        <div class="content">Content</div>
    </xsl:template>

    <xsl:template match="/" mode="title">
       <xsl:apply-imports />
       <xsl:text> - Index</xsl:text>
    </xsl:template>

</xsl:stylesheet>
