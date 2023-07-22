from django import forms

from apps.accounts.models import Document


class DocumentForm(forms.ModelForm):
    class Meta:
        model = Document
        exclude = ('number', 'status')


class DatesForm(forms.Form):
    start_date = forms.DateField()
    end_date = forms.DateField()
