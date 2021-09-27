# Generated by Django 3.2.5 on 2021-09-27 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('constructor', '0008_auto_20210927_0911'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nightstandcalculateditem',
            name='length',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='x'),
        ),
        migrations.AlterField(
            model_name='nightstandcalculateditem',
            name='width',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='y'),
        ),
        migrations.AlterField(
            model_name='nightstandcalculateditemtemplate',
            name='length_formula',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='x formula'),
        ),
        migrations.AlterField(
            model_name='nightstandcalculateditemtemplate',
            name='width_formula',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='y formula'),
        ),
    ]