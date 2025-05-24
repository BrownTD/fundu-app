import csv
from django.core.management.base import BaseCommand
from app.models import College  # Replace 'app' with your actual Django app name

class Command(BaseCommand):
    help = 'Import U.S. colleges from CSV into the College model'

    def handle(self, *args, **kwargs):
        with open('app/data/US_Colleges.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            # Strip potential BOM and whitespace from headers
            reader.fieldnames = [name.strip().replace('\ufeff', '') for name in reader.fieldnames]

            count = 0
            for row in reader:
                College.objects.get_or_create(
                    ipeds_unitid=row['UNITID'].strip(),
                    name=row['INSTNM'].strip(),
                    city=row['CITY'].strip(),
                    state=row['STABBR'].strip(),
                    zip_code=row['ZIP'].strip(),
                    website=row['INSTURL'].strip() if row.get('INSTURL') else None,
                    latitude=float(row['LATITUDE']) if row.get('LATITUDE') not in [None, '', 'NA'] else None,
                    longitude=float(row['LONGITUDE']) if row.get('LONGITUDE') not in [None, '', 'NA'] else None
                )
                count += 1

            self.stdout.write(self.style.SUCCESS(f'Successfully imported {count} colleges.'))
