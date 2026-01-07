# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response

class HelloWorld(APIView):
    """
    A class-based view for the hello world endpoint.
    """
    def get(self, request, *args, **kwargs):
        return Response({"message": "Hello, world!"})
