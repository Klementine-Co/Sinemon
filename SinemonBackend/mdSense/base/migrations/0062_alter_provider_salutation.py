# Generated by Django 3.2.12 on 2023-09-26 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0061_auto_20230812_1041"),
    ]

    operations = [
        migrations.AlterField(
            model_name="provider",
            name="salutation",
            field=models.CharField(
                blank=True,
                help_text="e.g Dr, NP, BSN",
                max_length=24,
                null=True,
                verbose_name="Salutation",
            ),
        ),
    ]
