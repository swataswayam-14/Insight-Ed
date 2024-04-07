# Dockerfile
FROM python:3.10.13
FROM ubuntu:latest


# Allow statements and log messages to immediately appear in the logs
ENV PYTHONUNBUFFERED True
# Copy local code to the container image.
# ENV APP_HOME /back-end
WORKDIR /server
# COPY detect_faces_video.py /server
# COPY app.py /server
# COPY Dockerfile /server
# COPY .dockerignore /server
# COPY gunicorn_config.py /server
# COPY requirements.txt /server
# COPY /static /server
# COPY /detected_faces_videos /server
# COPY index.html /server

COPY . /server


RUN apt-get update

RUN apt-get update && apt-get install -y python3-pip
RUN  apt-get install libglib2.0-dev -y
RUN apt-get install libgl1-mesa-glx -y
RUN pip install gunicorn
RUN pip install  -r requirements.txt
RUN pip install  google-generativeai
RUN pip install tf-keras
RUN apt-get update && apt-get install -y ffmpeg
RUN pip install faiss-gpu
RUN pip install pypdf
RUN pip install gevent

EXPOSE 8080

CMD ["gunicorn", "-c", "gunicorn_config.py","app:app"]
# CMD ["gunicorn","--timeout", "1000", "--bind", "0.0.0.0:8080" "app:app"]