from datetime import timedelta
from decimal import Decimal

from django.db import models
from django.db.transaction import atomic
from django.utils import timezone


class CounterParty(models.Model):
    class Meta:
        verbose_name = 'Контрагент'

    name = models.CharField(max_length=500)

    def __str__(self):
        return self.name

    def save(self, **kwargs):
        is_new_obj = False
        if not self.pk:
            is_new_obj = True
        super(CounterParty, self).save(**kwargs)
        if is_new_obj:
            Account.objects.create(counter_party=self, type=AccountType.CounterPartyDesk.value)


class Product(models.Model):
    class Meta:
        verbose_name = 'Товар'

    name = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class AccountType(models.IntegerChoices):
    MainDesk = 301, 'Каса'
    CounterPartyDesk = 631, 'Рахунок контрагента'


class Account(models.Model):
    class Meta:
        verbose_name = 'Каса'

    type = models.IntegerField(choices=AccountType.choices)
    counter_party = models.ForeignKey(CounterParty, on_delete=models.SET_NULL, null=True, blank=True)
    start_debit = models.DecimalField(max_digits=8, decimal_places=2, default=Decimal('0.0'))

    def __str__(self):
        if self.counter_party:
            return f'{self.type} {self.counter_party}'
        return f'{self.type}'


class DocumentType(models.IntegerChoices):
    IncomingCashOrderFromCounterParty = 1, 'Прихідний касовий ордер від контрагента'
    IncomingCashOrderFromAccountablePerson = 2, 'Повернення готівки від підзвітної особи'
    OutcomeCashOrderToCounterParty = 3, 'Оплата контрагенту'
    OutcomeCashOrderToAccountablePerson = 4, 'Видача готівки підзвітній особі'
    OutcomeCashOrderToCustomer = 5, 'Поверення готівки покупцеві'


class DocumentStatus(models.TextChoices):
    Created = 'created', 'Не проведено'
    Accounted = 'accounted', 'Проведено'
    Canceled = 'canceled', 'Скасовано'


class Document(models.Model):
    type = models.IntegerField(choices=DocumentType.choices)
    amount = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    credit_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='credit_documents')
    debit_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='debit_documents')
    number = models.CharField(max_length=200)
    status = models.CharField(max_length=50, choices=DocumentStatus.choices)
    note = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    @atomic()
    def save(self, **kwargs):
        if not self.number:
            today = timezone.now()
            cnt = Document.objects.filter(type=self.type, created__gte=today - timedelta(days=1)).count()
            self.number = f'{today.strftime("%d%m")}/{cnt + 1}'
        if not self.status:
            self.status = DocumentStatus.Created.value

        super(Document, self).save(**kwargs)

        Transfer.objects.create(
            account=self.debit_account,
            from_account=self.credit_account,
            debit=self.amount, note=self.note, document=self
        )
        Transfer.objects.create(
            account=self.credit_account,
            from_account=self.debit_account,
            credit=self.amount, note=self.note, document=self
        )
        self.status = DocumentStatus.Accounted.value

    @atomic()
    def cancel(self):
        Transfer.objects.filter(document=self).delete()
        self.status = DocumentStatus.Canceled.value
        self.save()


class Transfer(models.Model):
    class Meta:
        verbose_name = 'Рух коштів'

    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='operations')
    from_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='+')
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    debit = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    credit = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    created = models.DateTimeField(auto_now_add=True)
    note = models.TextField(blank=True)
