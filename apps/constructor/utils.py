from math import *


def eval_formula(formula, inputs):
    for key, value in inputs.items():
        formula = formula.replace(key, value)
    try:
        # TODO add regex validation here
        return eval(formula)
    except Exception:
        return None
