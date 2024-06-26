# Generated by Django 3.2.5 on 2023-07-24 13:39

from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='start_debit',
            field=models.DecimalField(decimal_places=2, default=Decimal('0.0'), max_digits=8),
        ),
        migrations.AlterField(
            model_name='document',
            name='status',
            field=models.CharField(choices=[('created', 'Не проведено'), ('accounted', 'Проведено'), ('canceled', 'Скасовано')], max_length=50),
        ),
    ]
