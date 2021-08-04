from django.contrib import admin

from .models import NightstandTemplate, NightstandInputItemTemplate, NightstandCalculatedItemTemplate, \
    NightstandInputItem, NightstandCalculatedItem, Nightstand


class NightstandInputItemTemplateInlineAdmin(admin.TabularInline):
    model = NightstandInputItemTemplate


class NightstandCalculatedItemTemplateInlineAdmin(admin.StackedInline):
    model = NightstandCalculatedItemTemplate


@admin.register(NightstandTemplate)
class NightstandTemplateAdmin(admin.ModelAdmin):
    inlines = (NightstandInputItemTemplateInlineAdmin, NightstandCalculatedItemTemplateInlineAdmin)


class NightstandInputItemInlineAdmin(admin.TabularInline):
    model = NightstandInputItem


class NightstandCalculatedItemInlineAdmin(admin.StackedInline):
    model = NightstandCalculatedItem


@admin.register(NightstandCalculatedItem)
class NightstandCalculatedItemAdmin(admin.ModelAdmin):
    pass


@admin.register(Nightstand)
class NightstandAdmin(admin.ModelAdmin):
    inlines = (NightstandInputItemInlineAdmin, NightstandCalculatedItemInlineAdmin)
