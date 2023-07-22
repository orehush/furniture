from django.urls import path

from .views import (
    CounterPartyAccountListView,
    DocumentsListView, DocumentCreateView,
    DocumentApproveView, DocumentCancelView,
)

urlpatterns = [
    path('documents', DocumentsListView.as_view()),
    path('documents/<slug:pk>/approve', DocumentApproveView.as_view()),
    path('documents/<slug:pk>/cancel', DocumentCancelView.as_view()),
    path('create_document/', DocumentCreateView.as_view()),
    path('account63/', CounterPartyAccountListView.as_view()),
]
