from django.db import models

from apps.constructor.choices import InputItemType, CalculatedItemBaseType
from apps.constructor.utils import eval_formula
from apps.project.models import Project


class NightstandTemplate(models.Model):
    class Meta:
        verbose_name = 'Шаблон тумби'
        verbose_name_plural = 'Шаблони тумб'

    name = models.CharField(max_length=255)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.name

    def get_inputs(self):
        return self.inputs.all()


class GlobalInputValue(models.Model):
    class Meta:
        verbose_name = 'Глобальна змінна'
        verbose_name_plural = 'Глобальні змінні'

    name = models.CharField(max_length=255)
    formula_name = models.CharField(max_length=50)
    value = models.IntegerField()

    @classmethod
    def get_items(cls):
        result = {}
        for row in cls.objects.all().values('formula_name', 'value'):
            result[row['formula_name']] = row['value']
        return result

    def __str__(self):
        return self.name


class NightstandInputItemTemplate(models.Model):
    class Meta:
        verbose_name = 'Шаблон вхідного параметру тумби'
        verbose_name_plural = 'Шаблони вхідних параметрів тубми'

    name = models.CharField(max_length=255)
    type = models.IntegerField(choices=InputItemType.choices)
    default_value = models.IntegerField()
    formula_name = models.CharField(max_length=50)
    nightstand = models.ForeignKey(NightstandTemplate, on_delete=models.CASCADE, related_name='inputs')

    def __str__(self):
        return f'{self.name} для {self.nightstand}'


class NightstandCalculatedItemTemplate(models.Model):
    class Meta:
        verbose_name = 'Шаблон розрахункового елемента'
        verbose_name_plural = 'Шаблони розрахункових елементів'

    name = models.CharField(max_length=255)
    base = models.CharField(max_length=20, choices=CalculatedItemBaseType.choices)
    nightstand = models.ForeignKey(NightstandTemplate, on_delete=models.CASCADE, related_name='outputs')
    formula_name = models.CharField(max_length=50, default='')
    width_formula = models.CharField(max_length=255, blank=True, default='')
    length_formula = models.CharField(max_length=255, blank=True, default='')
    amount_formula = models.CharField(max_length=255, blank=True, default='')
    square_formula = models.CharField(max_length=255, blank=True, default='')
    square_extra_formula = models.CharField(max_length=255, blank=True, default='')
    edge_formula = models.CharField(max_length=255, blank=True, default='')
    edge_extra_formula = models.CharField(max_length=255, blank=True, default='')
    drilling_count_formula = models.CharField(max_length=255, blank=True, default='')

    def __str__(self):
        return f'{self.name} для {self.nightstand}'


class Nightstand(models.Model):
    class Meta:
        verbose_name = 'Тумба'
        verbose_name_plural = 'Тумби'

    template = models.ForeignKey(NightstandTemplate, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='nightstands')

    def __str__(self):
        return f'{self.template}'

    def get_inputs(self):
        result = {}
        for input_item in self.inputs.all():
            result[input_item.template.formula_name] = input_item.value
        return result


class NightstandInputItem(models.Model):
    class Meta:
        verbose_name = 'Вхідний параметр тумби'
        verbose_name_plural = 'Вхідні параметри тубми'

    template = models.ForeignKey(NightstandInputItemTemplate, on_delete=models.CASCADE)
    nightstand = models.ForeignKey(Nightstand, on_delete=models.CASCADE, related_name='inputs')
    value = models.IntegerField()

    def __str__(self):
        return f'{self.template} для {self.nightstand}'


class NightstandCalculatedItem(models.Model):
    class Meta:
        verbose_name = 'Розрахунковий елемент'
        verbose_name_plural = 'Розрахункові елементи'

    template = models.ForeignKey(NightstandCalculatedItemTemplate, on_delete=models.CASCADE)
    nightstand = models.ForeignKey(Nightstand, on_delete=models.CASCADE, related_name='outputs')
    width = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    length = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    square = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    square_extra = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    edge = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    edge_extra = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    drilling_count = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f'{self.template} для {self.nightstand}'

    def _calculate(self, field, inputs):
        formula = getattr(self.template, f'{field}_formula', None)
        if not formula:
            return None
        return eval_formula(formula, inputs, GlobalInputValue.get_items())

    def calculate(self):
        inputs = self.nightstand.get_inputs()
        self.width = self._calculate('width', inputs)
        self.length = self._calculate('length', inputs)
        self.amount = self._calculate('amount', inputs)
        self.square = self._calculate('square', inputs)
        self.square_extra = self._calculate('square_extra', inputs)
        self.edge = self._calculate('edge', inputs)
        self.edge_extra = self._calculate('edge_extra', inputs)
        self.drilling_count = self._calculate('drilling_count', inputs)

    def save(self, **kwargs):
        self.calculate()
        super(NightstandCalculatedItem, self).save(**kwargs)
