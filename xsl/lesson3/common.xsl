<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

    <xsl:output encoding="utf-8" method="html" indent="no"
        doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
        doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>
                    <xsl:apply-templates select="." mode="title"/>
                </title>
            </head>
            <body>
                <xsl:apply-templates select="." mode="content"/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="/" mode="title">
       <xsl:text>Project</xsl:text>
    </xsl:template>

</xsl:stylesheet>
