<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">

    <xsl:output method="text"/>

    <xsl:variable name="string" select="/page/string"/>
    <xsl:variable name="number" select="/page/number"/>
    <xsl:variable name="boolean" select="/page/boolean"/>
    <xsl:variable name="node-set" select="/page/node-set/item"/>

    <!--
        Строковые функции
        Числовые функции
        Булевские функции
        Функции по работе с узлами
    -->
    <xsl:template match="/">
        <!-- Конкатенация -->
        <xsl:text>concat = </xsl:text>
        <xsl:value-of select="concat($node-set[1], $node-set[2], $node-set[3], $node-set[4])"/>

        <!-- Проверка на начало строки -->
        <xsl:text>&#13;starts-with = </xsl:text>
        <xsl:value-of select="starts-with($string, 'abc')"/>

        <!-- Проверка на подстроку -->
        <xsl:text>&#13;contains = </xsl:text>
        <xsl:value-of select="contains($string, 'bd')"/>

        <!-- Подстрока до первого вхождения -->
        <xsl:text>&#13;substring-before = </xsl:text>
        <xsl:value-of select="substring-before($string, 'c')"/>

        <!-- Подстрока после первого вхождения -->
        <xsl:text>&#13;substring-after = </xsl:text>
        <xsl:value-of select="substring-after($string, 'c')"/>

        <!-- Поиск подстроки -->
        <xsl:text>&#13;substring = </xsl:text>
        <xsl:value-of select="substring($string, 2)"/>
        <xsl:text>, </xsl:text>
        <xsl:value-of select="substring($string, 1, 3)"/>

        <!-- Длина строки -->
        <xsl:text>&#13;string-length = </xsl:text>
        <xsl:value-of select="string-length($string)"/>

        <!-- Удаление пробельных символов -->
        <xsl:text>&#13;normalize-space = </xsl:text>
        <xsl:value-of select="normalize-space(' a  b ')"/>

        <!-- Замена символов -->
        <xsl:text>&#13;translate = </xsl:text>
        <xsl:value-of select="translate($string, 'a', 'b')"/>
        <xsl:text>, </xsl:text>
        <xsl:value-of select="translate($string, 'ab', 'c')"/>
        <xsl:text>, </xsl:text>
        <xsl:value-of select="translate($string, 'c', 'ab')"/>

        <!-- Округление -->
        <xsl:text>&#13;</xsl:text>
        <xsl:text>&#13;floor = </xsl:text>
        <xsl:value-of select="floor($number)"/>
        <xsl:text>&#13;ceiling = </xsl:text>
        <xsl:value-of select="ceiling($number)"/>
        <xsl:text>&#13;round = </xsl:text>
        <xsl:value-of select="round($number)"/>

        <xsl:text>&#13;sum = </xsl:text>
        <xsl:value-of select="sum($node-set)"/>

        <xsl:text>&#13;</xsl:text>
        <xsl:text>&#13;boolean = </xsl:text>
        <xsl:value-of select="boolean(0)"/>
        <xsl:text>, </xsl:text>
        <xsl:value-of select="boolean('0')"/>
        <xsl:text>, </xsl:text>
        <xsl:value-of select="boolean($node-set)"/>
        <xsl:text>, </xsl:text>
        <xsl:value-of select="boolean($node-set[5])"/>

        <!-- Отрицание -->
        <xsl:text>&#13;not = </xsl:text>
        <xsl:value-of select="not($boolean)"/>

        <xsl:text>&#13;</xsl:text>
        <xsl:apply-templates select="$node-set"/>
    </xsl:template>

    <xsl:template match="item"/>
    <xsl:template match="item[2]">
        <!-- Текущая позиция в контексте -->
        <xsl:text>&#13;position = </xsl:text>
        <xsl:value-of select="position()"/>

        <!-- Размер контекста -->
        <xsl:text>&#13;last = </xsl:text>
        <xsl:value-of select="last()"/>

        <!-- Текущее значение -->
        <xsl:text>&#13;current = </xsl:text>
        <xsl:value-of select="current()"/>

        <!-- Размер набора узлов (нодсета) -->
        <xsl:text>&#13;count = </xsl:text>
        <xsl:value-of select="count($node-set)"/>

        <!-- Как определить входит ли узел в набор узлов? -->
        <xsl:text>&#13;</xsl:text>
        <xsl:value-of select="count(. | $node-set) = count($node-set)"/>

        <!-- Имя элемента -->
        <xsl:text>&#13;name = </xsl:text>
        <xsl:value-of select="name(.)"/>
    </xsl:template>

</xsl:stylesheet>
