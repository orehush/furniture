from django.test import TestCase
from model_bakery import baker

from .models import (
    NightstandCalculatedItem,
    NightstandInputItem,
    Nightstand,
    NightstandInputItemTemplate,
    NightstandCalculatedItemTemplate,
)


class ConstructorTestCase(TestCase):
    def setUp(self):
        self.nightstand = baker.make(Nightstand)
        self.width_input_template = baker.make(
            NightstandInputItemTemplate,
            nightstand=self.nightstand.template,
            formula_name='width'
        )
        self.height_input_template = baker.make(
            NightstandInputItemTemplate,
            nightstand=self.nightstand.template,
            formula_name='height'
        )
        self.extra_input_template = baker.make(
            NightstandInputItemTemplate,
            nightstand=self.nightstand.template,
            formula_name='extra'
        )

    def test_check_calculations(self):
        width = 520
        height = 850
        extra = 15
        output_template = baker.make(
            NightstandCalculatedItemTemplate,
            nightstand=self.nightstand.template,
            width_formula='width',
            length_formula='height',
            amount_formula='2',
            square_formula='width*height',
            square_extra_formula='width*height*(1+extra/100)',
            edge_formula='(width+height)*2',
            edge_extra_formula='(width+height)*2*(1+extra/100)',
        )
        baker.make(
            NightstandInputItem,
            nightstand=self.nightstand,
            template=self.width_input_template,
            value=width
        )
        baker.make(
            NightstandInputItem,
            nightstand=self.nightstand,
            template=self.height_input_template,
            value=height
        )
        baker.make(
            NightstandInputItem,
            nightstand=self.nightstand,
            template=self.extra_input_template,
            value=extra
        )
        output = baker.make(NightstandCalculatedItem, nightstand=self.nightstand, template=output_template)
        self.assertEqual(output.width, width)
        self.assertEqual(output.length, height)
        self.assertEqual(output.amount, 2)
        self.assertEqual(output.square, width*height)
        self.assertEqual(output.square_extra, width*height*(1+extra/100))
        self.assertEqual(output.edge, (width+height)*2)
        self.assertEqual(output.edge_extra, (width+height)*2*(1+extra/100))
