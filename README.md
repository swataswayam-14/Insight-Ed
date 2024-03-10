# Insight-Ed


Our product (**website**) provides a solution to tackle the challenge of distance learning between student and teacher, especially in the pandemic era where offline learning was a thing of the past.

Our solution tries to bridge the knowledge gap between a teacher and a student in online classes by leveraging the power of AI to provide the teacher and student with insights to better prepare themselves for the course/lecture, leading to our solution - *Insight-Ed*.

![logo](https://github.com/YuvrajSingh-mist/Insight-Ed/assets/141050962/23380baa-22ab-4b41-aabd-b146dd370478)


## Tech Stack

**Client:** HTML, React.js

**Backend:** Flask, Python, Keras, GeminiPro-SDK, HuggingFace API (EmotionLLM)

**Storage:** MongoDB, ChromaDB

**Other Tools:** GCP APIs, Docker

## Features

1. **Detection of Emotion and Attentiveness of a Student**

Used Transfer Learning on EfficientNetB7 model alongwith a custom dataset combined with an open-sourced LLMs to capture the same through the recorded lecture which the student attended through the web cam during that session.

2. **Topic Modelling for Each Segment where student lost attention**

-> Through the power of Gemini-Pro SDK and OpenAI Whisper module, each of the segments where loss of interest is detected is transcribe into text and most relavant keywords(Topic Modelling) is done to bring out the topics where students needs clarification.





## Requirements


Please install the following requirements before proceeding with the next steps
#### Server

```bash
Docker
```


## Run Locally



### Server

Pull the server image from DockerHub

```bash
  docker pull  yuvrajsingh9886/insight-ed-flask-server:v1.0
```

Run the server image

```bash
  docker container run -d -p 8080:8080  yuvrajsingh9886/insight-ed-flask-server:v1.0
```

### Website

Clone the project

```bash
  git clone https://github.com/swataswayam-14/Insight-Ed
```

Go to the project directory

```bash
  cd Insight-Ed
```
Create an enviroment variable 'GOOGLE_API_KEY' in the .env file for gemini-pro to work

```bash
  GOOGLE_API_KEY=<YOUR_API_KEY>
```


Create a virtual environment

```bash
  mkvirtualenv envname
```

Activate virtualenv

```bash
  workon envname
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Run the website Locally

```bash
  python manage.py runserver
```


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors


- [@Swata Swayam Dash](https://github.com/swataswayam-14)
- [@YuvrajSingh](https://github.com/YuvrajSingh-mist)


