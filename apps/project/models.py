from django.db import models


class Project(models.Model):
    city = models.CharField(max_length=255)
    street = models.CharField(max_length=255, blank=True, default='')
    name = models.CharField(max_length=255, blank=True, default='')

    def __str__(self):
        return f'{self.city} | {self.street} | {self.name}'
