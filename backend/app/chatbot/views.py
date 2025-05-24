from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .client import chat_with_gpt

class ChatBotView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt")
        user_role = getattr(request.user, "role", "member")  # default to 'member'

        if not prompt:
            return Response({"error": "Prompt is required"}, status=400)

        response = chat_with_gpt(prompt, user_role=user_role)
        return Response({"response": response})
