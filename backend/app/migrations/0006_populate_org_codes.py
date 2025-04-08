from django.db import migrations
import string
import secrets

def generate_org_code(length=6):
    chars = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(chars) for _ in range(length))

def populate_org_codes(apps, schema_editor):
    Organization = apps.get_model('app', 'Organization')
    existing_codes = set(Organization.objects.values_list('code', flat=True))

    for org in Organization.objects.all():
        code = generate_org_code()
        while code in existing_codes:
            code = generate_org_code()
        org.code = code
        org.save()
        existing_codes.add(code)

class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_organization_code_organization_logo'),
    ]

    operations = [
        migrations.RunPython(populate_org_codes),
    ]
