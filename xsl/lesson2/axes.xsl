<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

    <xsl:output method="xml"/>

    <!--
        Оси в XPath:
        * идем вниз - child, descendant, descendant-or-self
        * идем вверх - parent, ancestor, ancestor-or-self
        * идем влево - preceding-sibling, preceding
        * идем вправо - following-sibling, following
        * стоим на месте - self

        * attribute, namespace
    -->
    <xsl:template match="/">
        <axes>
            <xsl:apply-templates select="//item[@id = 2]"/>
            <xsl:apply-templates select="//xml:block"/>
        </axes>
    </xsl:template>

    <xsl:template match="item">
        <!-- Непосредственные потомки (дети) -->
        <child>
            <xsl:copy-of select="child::*"/>
        </child>
        <!-- Все потомки (дети) -->
        <descendant>
            <xsl:copy-of select="descendant::*"/>
        </descendant>
        <!-- Текущий узел и все потомки (дети) -->
        <descendant-or-self>
            <xsl:copy-of select="descendant-or-self::*"/>
        </descendant-or-self>
        <!-- Непосредственный предок (родитель) -->
        <parent>
            <xsl:copy-of select="parent::*"/>
        </parent>
        <!-- Все предки (родители) -->
        <ancestor>
            <xsl:copy-of select="ancestor::*"/>
        </ancestor>
        <!-- Текущий узел и все предки (родители) -->
        <ancestor-or-self>
            <xsl:copy-of select="ancestor-or-self::*"/>
        </ancestor-or-self>
        <!-- Предыдущие узлы с общим предком (братья) -->
        <preceding-sibling>
            <xsl:copy-of select="preceding-sibling::*"/>
        </preceding-sibling>
        <!-- Предыдущие узлы -->
        <preceding>
            <xsl:copy-of select="preceding::*"/>
        </preceding>
        <!-- Последующие узлы с общим предком (братья) -->
        <following-sibling>
            <xsl:copy-of select="following-sibling::*"/>
        </following-sibling>
        <!-- Последующие узлы -->
        <following>
            <xsl:copy-of select="following::*"/>
        </following>
        <!-- Текущий узел -->
        <self>
            <xsl:copy-of select="self::*"/>
        </self>
        <!-- Атрибуты -->
        <attribute>
            <xsl:copy-of select="attribute::*"/>
        </attribute>
    </xsl:template>

    <xsl:template match="xml:block">
        <!-- Пространство имен -->
        <namespace>
            <xsl:value-of select="namespace::*"/>
        </namespace>
    </xsl:template>

</xsl:stylesheet>
