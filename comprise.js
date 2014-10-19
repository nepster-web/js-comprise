/**
 * Плагин позволяет вместить в любом блоке любое кол-во элементов
 *
 * Определяет размер родительского блока элемента, затем
 * размер и кол-во дочерних элементов и вычисляет расстояние
 * на которое необходимо подвинуть все (кроме первого) элементы,
 * чтобы они влезли в родительский элемент.
 *
 * section Идентификатор родительского элемента
 * child Тег дочерних элементов
 * margin Отступ (например margin-left)
 * size Мера измерения (например px)
 * extra Дополнительный отступ к определенному
 *
 *
 * ПРИМЕР ИСПОЛЬЗОВАНИЯ:
 *
 * jQuery('.camp').comprise({
 *   'child': 'li',
 *   'margin': 'margin-left',
 *   'size': 'px',
 *   'extra': 0,
 * })
 *
 */
;(function( $ ){

  $.fn.comprise = function( options ) {  

    // Настройки по-умолчанию
    var settings = $.extend( {
      'child': 'li',
      'margin': 'margin-left',
      'size': 'px',
      'extra': 0,
    }, options);

    return this.each(function() {
        var $section = jQuery(this),
            $elements = $section.find(settings.child),
            $countElements = $elements.length;
           
        var $elementSize = $section.find(settings.child).outerWidth(true),
            $elementsContainer = $section.width();
            
        if (($countElements * $elementSize) > $elementsContainer) {
            var $lm = ($countElements * $elementSize - $elementsContainer) / ($countElements - 1);
            $lm += settings.extra;
            $section.find(settings.child + ':not(:first)').css(settings.margin,  '-' + $lm + settings.size);
        } else {
            $section.find(settings.child + ':not(:first)').css(settings.margin,  0);
        }
    });
  };
})( jQuery );