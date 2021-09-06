from django.db.transaction import atomic
from rest_framework import serializers

from .models import NightstandTemplate, NightstandInputItemTemplate, Nightstand, NightstandInputItem, \
    NightstandCalculatedItem


class NightstandInputItemTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NightstandInputItemTemplate
        exclude = ('nightstand', )


class NightstandTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NightstandTemplate
        fields = '__all__'

    inputs = NightstandInputItemTemplateSerializer(many=True, read_only=True)


class NightstandInputItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NightstandInputItem
        fields = ('template', 'value', )


class NightstandCalculatedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NightstandCalculatedItem
        fields = (
            'width', 'length', 'amount', 'square', 'square_extra',
            'edge', 'edge_extra', 'drilling_count', 'base',
        )

    base = serializers.CharField(source='template.base')


class NightstandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nightstand
        fields = ('template', 'project', 'inputs', 'outputs',)

    inputs = NightstandInputItemSerializer(many=True, required=True)
    outputs = NightstandCalculatedItemSerializer(many=True, read_only=True)

    @atomic()
    def create(self, validated_data):
        inputs = validated_data.pop('inputs', [])
        nightstand = super(NightstandSerializer, self).create(validated_data)
        inputs_objs = [NightstandInputItem(nightstand=nightstand, **input_item) for input_item in inputs]
        NightstandInputItem.objects.bulk_create(inputs_objs)
        for output in nightstand.template.outputs.all():
            NightstandCalculatedItem.objects.create(template=output, nightstand=nightstand)
        return nightstand
