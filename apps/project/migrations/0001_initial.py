# Generated by Django 3.2.5 on 2021-07-24 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=255)),
                ('street', models.CharField(blank=True, default='', max_length=255)),
                ('name', models.CharField(blank=True, default='', max_length=255)),
            ],
        ),
    ]
