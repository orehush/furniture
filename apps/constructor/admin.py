from django.contrib import admin

from .models import NightstandTemplate, NightstandInputItemTemplate, NightstandCalculatedItemTemplate


@admin.register(NightstandTemplate)
class NightstandTemplateAdmin(admin.ModelAdmin):
    pass


@admin.register(NightstandInputItemTemplate)
class NightstandInputItemTemplateAdmin(admin.ModelAdmin):
    pass


@admin.register(NightstandCalculatedItemTemplate)
class NightstandCalculatedItemTemplateAdmin(admin.ModelAdmin):
    pass
