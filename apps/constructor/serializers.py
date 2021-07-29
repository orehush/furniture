from rest_framework import serializers

from .models import NightstandTemplate, NightstandInputItemTemplate


class NightstandTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NightstandTemplate
        fields = '__all__'


class NightstandInputItemTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NightstandInputItemTemplate
        exclude = ('nightstand', )
