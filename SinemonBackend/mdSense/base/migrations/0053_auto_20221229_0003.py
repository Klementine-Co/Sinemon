# Generated by Django 3.2.12 on 2022-12-29 08:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0052_patientvisit_claim"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="providerrating",
            name="bedside_rating",
        ),
        migrations.RemoveField(
            model_name="providerrating",
            name="dr_rating",
        ),
        migrations.RemoveField(
            model_name="providerrating",
            name="office_rating",
        ),
        migrations.RemoveField(
            model_name="providerrating",
            name="score",
        ),
        migrations.RemoveField(
            model_name="providerrating",
            name="staff_rating",
        ),
        migrations.AddField(
            model_name="providerrating",
            name="polarity",
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name="providerrating",
            name="rating_type",
            field=models.CharField(
                blank=True,
                choices=[
                    ("DR", "DR"),
                    ("BEDSIDE", "BEDSIDE"),
                    ("STAFF", "STAFF"),
                    ("OFFICE", "OFFICE"),
                ],
                max_length=7,
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="providerrating",
            name="update_date",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="providerrating",
            name="value",
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.CreateModel(
            name="ProviderRatings",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("dr_rating", models.IntegerField(default=72)),
                ("staff_rating", models.IntegerField(default=72)),
                ("bedside_rating", models.IntegerField(default=72)),
                ("office_rating", models.IntegerField(default=72)),
                ("score", models.IntegerField(default=650)),
                (
                    "prov",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="base.provider"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ProviderRatingHistory",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("dr_polarity", models.IntegerField(blank=True, default=0, null=True)),
                (
                    "staff_polarity",
                    models.IntegerField(blank=True, default=0, null=True),
                ),
                (
                    "bedside_polarity",
                    models.IntegerField(blank=True, default=0, null=True),
                ),
                (
                    "office_polarity",
                    models.IntegerField(blank=True, default=0, null=True),
                ),
                ("updated_date", models.DateTimeField(blank=True, null=True)),
                ("loaded_date", models.DateTimeField(auto_now=True)),
                ("score", models.IntegerField(blank=True, default=0, null=True)),
                (
                    "prov",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="base.provider"
                    ),
                ),
            ],
        ),
    ]
