FROM python:3.12-slim

WORKDIR /app

# Copy requirements from root
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app from root
COPY app/ .

RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

CMD ["bash", "/app/entrypoint.sh"]