from django.contrib import messages
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import FormView, DetailView, ListView

from .forms import DocumentForm, DatesForm
from .models import AccountType, Transfer, Document, Account


class DocumentCreateView(FormView):
    form_class = DocumentForm
    success_url = '/documents'
    template_name = 'accounts/create_document.html'

    def form_valid(self, form):
        form.save()
        messages.add_message(self.request, messages.INFO, "Документ додано")
        return super(DocumentCreateView, self).form_valid(form)


class DocumentsListView(ListView):
    queryset = Document.objects.all()
    template_name = 'accounts/documents.html'
    context_object_name = 'documents'


@method_decorator(csrf_exempt, name='dispatch')
class DocumentApproveView(DetailView):
    queryset = Document.objects.all()

    def post(self, request, *args, **kwargs):
        document = self.get_object()
        document.apply()
        return HttpResponse(status=200)


@method_decorator(csrf_exempt, name='dispatch')
class DocumentCancelView(DetailView):
    queryset = Document.objects.all()

    def post(self, request, *args, **kwargs):
        document = self.get_object()
        document.apply()
        return HttpResponse(status=200)


class CounterPartyAccountListView(ListView):
    queryset = Transfer.objects.filter(account__type=AccountType.CounterPartyDesk)
    template_name = 'accounts/account.html'
    context_object_name = 'transfers'

    def get_queryset(self):
        queryset = super(CounterPartyAccountListView, self).get_queryset()
        form = DatesForm(self.request.GET)
        if not form.is_valid():
            return queryset
        start_date = form.cleaned_data.get('start_date')
        end_date = form.cleaned_data.get('end_date')
        if start_date:
            queryset = queryset.filter(created__gte=start_date)
        if end_date:
            queryset = queryset.filter(created__lte=end_date)
        return queryset
