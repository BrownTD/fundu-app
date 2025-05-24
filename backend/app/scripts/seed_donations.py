import random
from datetime import datetime, timedelta
from app.models import Donation, Campaign, CustomUser

def run():
    campaign = Campaign.objects.get(pk=6)
    donors = list(CustomUser.objects.filter(role="donor"))

    start_date = datetime(2024, 3, 1)
    end_date = datetime(2024, 5, 24)
    delta = end_date - start_date

    for _ in range(100):
        user = random.choice(donors)
        amount = round(random.uniform(5, 100), 2)
        days_offset = random.randint(0, delta.days)
        donation_date = start_date + timedelta(days=days_offset)

        Donation.objects.create(
            user=user,
            campaign=campaign,
            amount=amount,
            donation_date=donation_date
        )

    print("✅ 100 donations added successfully.")
