from django_filters import filters

from django import forms


class Filter(filters.Filter):
    field_class = forms.Field


class CharFilter(filters.CharFilter):
    field_class = forms.CharField


class BooleanFilter(filters.BooleanFilter):
    field_class = forms.NullBooleanField


class ChoiceFilter(filters.ChoiceFilter):
    field_class = forms.ChoiceField


class TypedChoiceFilter(filters.TypedChoiceFilter):
    field_class = forms.TypedChoiceField


class UUIDFilter(filters.UUIDFilter):
    field_class = forms.UUIDField


class MultipleChoiceFilter(filters.MultipleChoiceFilter):
    field_class = forms.MultipleChoiceField


class TypedMultipleChoiceFilter(filters.TypedMultipleChoiceFilter):
    field_class = forms.TypedMultipleChoiceField


class DateFilter(filters.DateFilter):
    field_class = forms.DateField


class DateTimeFilter(filters.DateTimeFilter):
    field_class = forms.DateTimeField


class TimeFilter(filters.TimeFilter):
    field_class = forms.TimeField


class DurationFilter(filters.DurationFilter):
    field_class = forms.DurationField


class ModelChoiceFilter(filters.ModelChoiceFilter):
    field_class = forms.ModelChoiceField


class ModelMultipleChoiceFilter(filters.ModelMultipleChoiceFilter):
    field_class = forms.ModelMultipleChoiceField


class NumberFilter(filters.NumberFilter):
    field_class = forms.DecimalField


class NumericRangeFilter(filters.NumericRangeFilter):
    """
    TODO: we first must redeclare the RangeField
    """
