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

Used Transfer Learning on EfficientNetB7 model along with a custom dataset combined with an open-sourced LLMs to capture the same through the recorded lecture which the student attended through the webcam during that session.

2. **Topic Modelling for Each Segment where Student lost attention**

-> Through the power of Gemini-Pro SDK and OpenAI Whisper module, each of the segments where the loss of interest is detected is transcribed into text and the most relevant keywords(Topic Modelling) are done to bring out the topics where students need clarification.
-> The teacher is thus present with an analysis as to when did student lost his/her attention and on which topic(s) through the video lecture

3. **Automatic Video Time-stamping into Different Topics- Saving Teacher's Time**

-> This feature allows automatic time stamping of videos depending on a hyperparameter chosen by the teacher exclusively.

4. **Reverse Video Search**

-> This feature allows the student to not get through the video again and again for a particular keyword but rather type it and get the exact timestamp(s) for the same.

5. **Generation of Questionnaire on topics where students lacked attention**

-> This feature allows the teacher to generate/upload a questionnaire through an LLM for the topics for the student to double-check his/her understanding to plan further steps.
-> The student can also get recommended most relevant YouTube videos on the same or the teacher could suggest some materials or videos from their course itself.




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



## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors


- [@Swata Swayam Dash](https://github.com/swataswayam-14)
- [@YuvrajSingh](https://github.com/YuvrajSingh-mist)


