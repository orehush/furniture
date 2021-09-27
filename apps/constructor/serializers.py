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


class NightstandInputItemReadUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NightstandInputItem
        fields = ('id', 'value', 'template_type', 'template_name', )

    template_type = serializers.IntegerField(source='template.type', read_only=True)
    template_name = serializers.CharField(source='template.name', read_only=True)


class NightstandCalculatedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NightstandCalculatedItem
        fields = (
            'width', 'length', 'amount', 'square', 'square_extra',
            'edge', 'edge_extra', 'drilling_count', 'base', 'name',
        )

    base = serializers.CharField(source='template.base')
    name = serializers.CharField(source='template.name')


class NightstandCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nightstand
        fields = ('template', 'project', 'inputs')

    inputs = NightstandInputItemSerializer(many=True, required=True, write_only=True)

    @atomic()
    def create(self, validated_data):
        inputs = validated_data.pop('inputs', [])
        nightstand = super(NightstandCreateSerializer, self).create(validated_data)
        inputs_objs = [NightstandInputItem(nightstand=nightstand, **input_item) for input_item in inputs]
        NightstandInputItem.objects.bulk_create(inputs_objs)
        for output in nightstand.template.outputs.all():
            NightstandCalculatedItem.objects.create(template=output, nightstand=nightstand)
        return nightstand


class NightstandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nightstand
        fields = ('id', 'template', 'project', 'inputs', 'outputs', 'short_name',)
        read_only_fields = ('template', 'project', 'outputs', 'short_name',)

    inputs = NightstandInputItemReadUpdateSerializer(many=True)
    outputs = NightstandCalculatedItemSerializer(many=True, read_only=True)
