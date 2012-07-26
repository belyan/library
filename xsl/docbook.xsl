<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "symbols.ent">
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

    <!-- Статья -->
    <xsl:template match="article">
        <div class="b-text">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <!-- Подзаголовок -->
    <xsl:template match="title">
        <h2><xsl:apply-templates/></h2>
    </xsl:template>

    <!-- Раздел -->
    <xsl:template match="section">
        <xsl:apply-templates/>
    </xsl:template>

    <!-- Список -->
    <xsl:template match="itemizedlist">
        <ul>
            <xsl:apply-templates select="listitem"/>
        </ul>
    </xsl:template>

    <!-- Элемент списка -->
    <xsl:template match="listitem">
        <li>
            <xsl:apply-templates/>
        </li>
    </xsl:template>

    <!-- Параграф -->
    <xsl:template match="para">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <!-- Ссылка -->
    <xsl:template match="ulink[@url]">
        <a href="{@url}">
            <xsl:apply-templates/>
        </a>
    </xsl:template>

    <!-- Кавычки -->
    <xsl:template match="quote">
        <xsl:text>&laquo;</xsl:text>
        <xsl:apply-templates/>
        <xsl:text>&raquo;</xsl:text>
    </xsl:template>

    <!-- Текст -->
    <xsl:template match="text()">
        <xsl:value-of select="."/>
    </xsl:template>

</xsl:stylesheet>
