from django.contrib import admin

from .models import CounterParty, Account, Transfer


admin.site.register(CounterParty)
admin.site.register(Account)
admin.site.register(Transfer)
