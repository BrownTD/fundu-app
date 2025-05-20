import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Set OpenAI API key from environment
openai.api_key = os.getenv("OPENAI_API_KEY")

def chat_with_gpt(prompt, user_role="member"):
    """
    Generates a response from the GPT model using a user prompt
    and optional role to personalize the response.
    """
    system_prompt = (
         f"""
    You are Penny, the AI fundraising assistant built into the Fundu app.
    You help student organizations raise money by answering questions and offering personalized tips.

    You are currently assisting a {user_role}.

    Your responses should be:
    - Friendly and encouraging
    - Focused on fundraising best practices
    - Clear and concise

    You may reference:
    - Donation data
    - Engagement trends
    - Goal-setting strategies

    Avoid technical jargon unless the user specifically asks for it.
    """
    )

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content.strip()
