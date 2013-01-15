<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

    <xsl:output method="xml"/>

    <xsl:template match="/">
        <root>
            <!-- Объяснить разницу между следующими XPath-выражениями -->
            <p><xsl:value-of select="//div[@class='bar']//div[2]"/></p>
            <p><xsl:value-of select="(//div[@class='bar']//div)[2]"/></p>
            <p><xsl:value-of select="//div[@class='bar']//div[@class='foo'][2]"/></p>
            <p><xsl:value-of select="//div[@class='bar']//div[2][@class='foo']"/></p>
            <p><xsl:value-of select="(//div[@class='bar']//div)[2][@class='foo']"/></p>
            <p><xsl:value-of select="(//div[@class='bar']//div)[@class='foo'][2]"/></p>
        </root>
    </xsl:template>

</xsl:stylesheet>
