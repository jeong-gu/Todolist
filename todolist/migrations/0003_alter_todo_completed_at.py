# Generated by Django 4.2.20 on 2025-04-06 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0002_todo_completed_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='completed_at',
            field=models.DateField(blank=True, null=True),
        ),
    ]
