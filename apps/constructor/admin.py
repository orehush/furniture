from django.contrib import admin

from .models import NightstandTemplate, NightstandInputItemTemplate, NightstandCalculatedItemTemplate, \
    NightstandInputItem, NightstandCalculatedItem, Nightstand, GlobalInputValue


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


@admin.register(Nightstand)
class NightstandAdmin(admin.ModelAdmin):
    inlines = (NightstandInputItemInlineAdmin, NightstandCalculatedItemInlineAdmin)


@admin.register(GlobalInputValue)
class GlobalInputValueAdmin(admin.ModelAdmin):
    pass
