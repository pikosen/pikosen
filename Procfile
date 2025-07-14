web: python Pikosen.py
web: python main.py
web: gunicorn Pikosen:app
web: gunicorn Pikosen.wsgi:application --bind 0.0.0.0:$PORT
web: uvicorn Pikosen.asgi:application --host 0.0.0.0 --port $PORT