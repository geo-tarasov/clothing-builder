# Конструктор одежды. Расширение для сайта на Tilda
## Задача
Сделать из стандартного блока "Пошаговая форма" на тильде удобный конструтор одежды. Похожий конструктор можно найти здесь https://hoolitruly.com/man-sale

Нужно было добавить:

1. Итоговую цену за одежду внизу формы
2. Возможность указывать цену для определенных вариантов выбора. Например, +300 руб за другой цвет худи
3. Отображение результатов в конце формы, а именно выбранные параметры одежды и ее цена
4. Возможность переместить собранную одежду в корзину для покупки
5. Размерную таблицу в один из вопросов

## Решение
Важно было учесть, что стандартный функционал формы позволяет вернуться к предыдущим ответам и изменить свой выбор. Я решил сохранить эту возможность в конструкторе и добавил динамический массив с выбранными вариантами. После изменения выбора стоимость сразу пересчитывалась

Для добавления стоимости определенных вариантов выбора был выбран двумерный массив, в котором первый индекс указывает на вопрос в форме, а второй на вариант ответа. Если вариант бесплатный, в массиве можно указать 0 (руб)

Перемещение одежды в корзину и рассчет цены был реализован на клиентской части. Для заказчика это был подходящий вариант.

## Результат
https://github.com/geo-tarasov/clothing-builder/assets/88404017/e403d2c0-f9e4-48ce-84b9-9612be6b7e8d

###### Код представлен в ознакомительных целях, не для свободного использования
