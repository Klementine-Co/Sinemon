# Generated by Django 3.2.12 on 2022-12-16 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0050_auto_20221215_0926"),
    ]

    operations = [
        migrations.AlterField(
            model_name="claim_info",
            name="claimid",
            field=models.CharField(max_length=24, primary_key=True, serialize=False),
        ),
    ]
