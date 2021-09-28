from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.constructor.models import NightstandInputItem


@receiver(post_save, sender=NightstandInputItem)
def recalculate(instance: NightstandInputItem, created, **kwargs):
    if not created:
        instance.nightstand.save()
        for item in instance.nightstand.outputs.all():
            item.save()
