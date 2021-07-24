from django.db import models


class InputItemType(models.IntegerChoices):
    NUMBER = 1, 'Число, вимір в мм'
    AMOUNT = 2, 'Кількість'
    PERCENT = 3, 'Проценти'
    YES_NO = 4, 'Так/ні'


class CalculatedItemBaseType(models.TextChoices):
    DSP = 'ДСП'
    DVP = 'ДВП'
    GLASS = 'скло'
    DOOR = 'фасад'
    TABLETOP = 'стільниця'
