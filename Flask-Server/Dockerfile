# Dockerfile
FROM python:3.10.13
FROM ubuntu:latest


# Allow statements and log messages to immediately appear in the logs
ENV PYTHONUNBUFFERED True
# Copy local code to the container image.
# ENV APP_HOME /back-end
WORKDIR /server
COPY . /server

RUN apt-get update

RUN apt-get update && apt-get install -y python3-pip
RUN  apt-get install libglib2.0-dev -y
RUN apt-get install libgl1-mesa-glx -y
RUN pip install gunicorn
RUN pip install  -r requirements.txt

EXPOSE 8080

CMD ["gunicorn", "-c", "gunicorn_config.py","main:app"]