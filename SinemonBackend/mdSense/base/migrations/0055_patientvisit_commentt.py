# Generated by Django 3.2.12 on 2023-01-03 04:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0054_providerratings_update_date"),
    ]

    operations = [
        migrations.AddField(
            model_name="patientvisit",
            name="commentt",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="base.comment",
            ),
        ),
    ]
