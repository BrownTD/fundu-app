# Generated by Django 5.1.7 on 2025-04-07 21:57

import app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_populate_org_codes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='code',
            field=models.CharField(default=app.models.generate_org_code, max_length=10, unique=True),
        ),
    ]
