Comprise jQuery
===============

Плагин позволяет вместить в любом блоке любое количество элементов. <br/>

Определяет размер родительского блока элемента, затем размер и кол-во дочерних элементов и вычисляет расстояние на которое необходимо подвинуть все (кроме первого) элементы, чтобы они влезли в родительский элемент.
    
    
**Пример использования:**

```html      
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="content-type" content="text/html" />
	<meta name="author" content="Nepster" />
	<title>Demo</title>
    <style type="text/css">
        * {
            outline: none !important; 
            box-sizing: border-box; 
            padding: 0px; 
            margin: 0px;
        } 
        .camp {
            width: 500px;
            height: 100px;
            border: solid 1px black;
            overflow: hidden;
            list-style-type: none;
            text-align: center;
            font-size: 0;
            position: absolute;
        }
        .camp li{
            width: 100px;
            height: 100px;
            border: solid 1px red;
            display: inline-block;
            font-size: 1rem;
            text-align: left;
            padding: 5px;
        }
    </style>
</head>
<body>
    <ul class="camp">
        <li style="background: #FF8080;">1</li>
        <li style="background: #FFFF80;">2</li>
        <li style="background: #80FF80;">3</li>
        <li style="background: #80FFFF;">4</li>
        <li style="background: #0080FF;">5</li>
        <li style="background: #FF80C0;">6</li>
        <li style="background: #004080;">7</li>
        <li style="background: #408080;">8</li>
    </ul>
    <script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="comprise.js"></script>
    <script type="text/javascript">
        jQuery('.camp').comprise({
            'child': 'li',
            'margin': 'margin-left',
            'size': 'px',
            'extra': 0,
        });
    </script>
</body>
</html>
```
<br/>

**Все настройки:** <br/>

`section` - Идентификатор родительского элемента

`child` - Тег дочерних элементов

`margin` - Отступ (например margin-left)

`size` - Мера измерения (например px)

`extra` - Дополнительный отступ к определенному

<br/>

Использование функции
--------------------------
```js
/**
 * Функция позволяет вместить в любом блоке любое кол-во элементов
 *
 * Определяет размер родительского блока элемента, затем
 * размер и кол-во дочерних элементов и вычисляет расстояние
 * на которое необходимо подвинуть все (кроме первого) элементы,
 * чтобы они влезли в родительский элемент.
 *
 * var section Идентификатор родительского элемента
 * var child Тег дочерних элементов
 * var margin Отступ (например margin-left)
 * var size Мера измерения (например px)
 * var extra Дополнительный отступ к определенному
 *
 */
function comprise(section, child, margin, size, extra) {
    
    section = section || null;
    
    var settings = new Object;
    settings.child = child || 'li';
    settings.margin = margin || 'margin-left';
    settings.size = size || 'px';
    settings.extra = extra || 0;
    
    if (section) {
        var $section = jQuery(section),
            $elements = $section.find(settings.child),
            $countElements = $elements.length;
           
        var $elementSize = $section.find(settings.child).outerWidth(true),
            $elementsContainer = $section.width();
            
        if(($countElements * $elementSize) > $elementsContainer) {
            var $lm = ($countElements * $elementSize - $elementsContainer) / ($countElements - 1);
            $lm += settings.extra;
            $section.find(settings.child + ':not(:first)').css(settings.margin,  '-' + $lm + settings.size);
        } else {
            $section.find(settings.child + ':not(:first)').css(settings.margin,  '0');
        }
    }
}
```



<br/>

Рекомендации
--------------------------
<br/>
Если Вы используете данный плагин (например в виде простой функции) и при этом Ваш макет сайта поддерживает адаптивную верстку, не забудьте вызвать функцию при ресайзе:

```js
comprise('.camp');
        
// Window Resize
window.onresize = function() {
    comprise('.camp');
}
```