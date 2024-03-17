from copy import copy
from flask import Flask, jsonify, request, render_template
import requests, pickle
import gdown 
import shutil
import math

from mtcnn.mtcnn import MTCNN
import cv2 
import os

import shutil



import gensim
import os

import random
from youtubesearchpython import VideosSearch
import torchvision

import moviepy.editor as mp 
import speech_recognition as sr 

import openai
import whisper

 
import torch
# import torchvision.transforms as transforms
from PIL import Image
from torchvision import transforms



from detect_faces_video import detect_faces

from transformers import pipeline


from flask_cors import CORS


app = Flask(__name__)
CORS(app)

directory = "static/"
if(os.path.exists(directory)):
    shutil.rmtree(directory)
os.makedirs(directory)


if(os.path.exists("detected_faces_videos")):
    shutil.rmtree("detected_faces_videos")
os.makedirs("detected_faces_videos")


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/emotionAttention', methods=['GET', 'POST'])
def predict():
    
    
    flag = True
  
    # if request.method == 'POST':
    #    # check if the post request has the file part
    #    if 'file' not in request.files:
    #       return "something went wrong 1"
    #
    #    user_file = request.files['file']
    #    temp = request.files['file']
    #    if user_file.filename == '':
    #        return "file name not found ..."
    #
    #    else:
    #        # path = os.path.join(os.getcwd(), 'static/mask', user_file.filename)
    #        # user_file.save(path)
    # filename = request.args.get('query')
    full_path = request.full_path

    # Extract the 'query' parameter from the full path
    query_parameter = full_path.split('query=')[1]
    print("Filename is : ", query_parameter) 
    count= 0
    classes = []
    # //Download video
    # gdown.download(query_parameter, 'static/video.mp4', quiet=False)
    # video_path = "static/video.mp4"
    detect_faces(query_parameter)
    # with open('static/mask/mask_{}.jpg'.format(count), 'wb') as f:
    #     data = requests.get(query_parameter)
    #     f.write(data.content)
    # filename = 'https://firebasestorage.googleapis.com/v0/b/solution-challenge-app-409f6.appspot.com/o/user-images%2F2cznu8kGbtbbCZ3s22c9E1AnqG92.jpg?alt=media&token=91b2b18f-826a-4d15-bdf6-e940a6d25ec7'
    
    classes = identifyImage('detected_faces_videos')
    print(classes)

    # if classes[0] < 0.5:
    #     flag = False
    return jsonify({
        "status": "success",
        "prediction": classes,
        # "confidence": str(classes[0][0][2]),
        # "upload_time": datetime.now()
    })

def detect_faces(video_path):
    detector  = MTCNN()
    # print("Hi")
    interval = 20
    uuid = video_path.split('&')[0].split("/")[5]
    print(uuid)
    url = "https://drive.google.com/uc?id={}".format(uuid)
    output_file = "static/video.mp4"  # Specify the name of the output file
    print(url)
    # print(timestamp1)
    # print(timestamp2)
    # gdown.download(url, output_file, quiet=False)
    # response = requests.get(url))
    # with open("static/video.mp4", 'wb') as f:
    #     f.write(response.content)
        
    # cap = cv2.VideoCapture('demo-student.mp4')
    cap = cv2.VideoCapture('demo-student.mp4')


    frame_count = 0
    count = 0

    while True:
        
        ret, frame = cap.read()
        
        if ret != True:
            break
        
        current_time = frame_count / cap.get(cv2.CAP_PROP_FPS)
        
        # print(math.floor(current_time % interval) == 0)
        if(round(current_time, 1) % interval == 0):
            
            # print("Hi")
            
            result_list = detector.detect_faces(frame)
            for results in result_list:
                if(results['confidence'] > 0.7):
                    print(results)
                    x, y, width, height = results['box']
                    cropped_image = frame[y:y+height, x:x+width]
                    cv2.imwrite(os.path.join("detected_faces_videos", "_{}.jpg".format(count)), cropped_image)
                    count += 1
                    
        
        # cv2.imshow('Video with Face Detection', frame)
        # if cv2.waitKey(1) & 0xFF == ord('q'):
        #     break  
        frame_count += 1
                
    cap.release()
    cv2.destroyAllWindows()
    
 
def identifyImage(folder_path):
    dict = {}
    count = 0
    drowsiness = []
    emotion = []
    timestamps = []
    final = []
   
    temp = []
    for img in os.listdir(folder_path):
        
        emt = []
        isDrowsiness = []
        time = []
        # value = isDrowsy(os.path.join(folder_path, img))
        value=random.randint(1,3)
        if(value == 1):
            isDrowsiness.append("Yes")
            emt.append(-1)
            time.append("Timestamp_{}".format(count))
            temp.append((time, emt, isDrowsiness))
            
        elif(value == 2):
            
            isDrowsiness.append("No")
            # print(os.path.join(folder_path, img))
            pred_emotions = emotions(os.path.join(folder_path, img))
            emt.append(pred_emotions)
            time.append("Timestamp_{}".format(count))
            temp.append((time, emt, isDrowsiness))
        # emotion.append(emt)
        # drowsiness.append(isDrowsiness)
        # timestamps.append(time)
        
        # for key, value in zip(emotions, drowsiness, timestamps):
        #     dict[key] = value
        
        # dict['{}EmotionTimestamp_{}'.format(count)] = pred
      
        count += 1
    final.append(temp)
    print(final)
       
    return final


def isDrowsy(file_path):
    device = "cuda" if torch.cuda.is_available() else "cpu"

    # Load the Vision Transformer model
    pretrained_vit_loaded = torchvision.models.vit_b_16().to(device)

    # Load the modified state dictionary
    state_dict = torch.load('models/pretrained_vit_modified.pth')

    # Modify the state dictionary keys
    modified_state_dict = {}
    for key, value in state_dict.items():
        # Rename keys if necessary
        if key.startswith("heads.head.weight"):
            # Reshape the weight tensor to match the expected dimensions
            value = value[:2, :]  # Assuming you have only 2 classes
            modified_state_dict[key] = value
        elif key.startswith("heads.head.bias"):
            # Reshape the bias tensor to match the expected dimensions
            value = value[:2]  # Assuming you have only 2 classes
            modified_state_dict[key] = value
        else:
            modified_state_dict[key] = value

    # Load the modified state dictionary into the model
    pretrained_vit_loaded.load_state_dict(modified_state_dict)
    pretrained_vit_loaded.eval()  # Set model to evaluation mode

    # Load and preprocess the image
    transform = transforms.Compose([
        transforms.Resize((224, 224)),  # Resize the image to match the input size expected by the model
        transforms.ToTensor(),           # Convert the image to a PyTorch tensor
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize the image
    ])

    # file_path = "path_to_your_image.jpg"
    img = Image.open(file_path)
    input_image = transform(img).unsqueeze(0)  # Add a batch dimension

    # Pass the input image through the model to obtain the prediction probabilities
    with torch.no_grad():  # Disable gradient tracking since we're in inference mode
        output = pretrained_vit_loaded(input_image.to(device))  # Assuming pretrained_vit_loaded is your loaded model

    # Interpret the prediction probabilities
    predicted_class = torch.argmax(output, dim=1).item()
    if predicted_class == 1:
        return True
    
pipe = pipeline("image-classification", model="dima806/facial_emotions_image_detection")
    
def emotions(file_path):

    
    # image = cv2.imread("/content/sad.jpeg")
    y_pred = pipe.predict(file_path)
    # print(y_pred)
    return y_pred[0]['label']
    
    
@app.route('/speechAndKeywords', methods=['GET', 'POST'])
def speechRecognition():

   
    count = 0
    full_path = request.full_path

    # Extract the 'query' parameter from the full path
    query_parameter = full_path.split('query=')[1]
    timestamp1 = query_parameter.split('&')[1]
    timestamp2 = query_parameter.split('&')[2]
    # print(full_path.split('query=')[1].split('&'))
    # if os.path.exists("static/video.mp4") == False:
        # import requests
    directory = "static/"
    shutil.rmtree(directory)
    os.makedirs(directory)

    # url = query_parameter.split('&')[0]
    uuid = query_parameter.split('&')[0].split("/")[5]
    print(uuid)
    url = "https://drive.google.com/uc?id={}".format(uuid)
    output_file = "static/video.mp4"  # Specify the name of the output file
    print(url)
    print(timestamp1)
    print(timestamp2)
    gdown.download(url, output_file, quiet=False)
    # response = requests.get(url)
    # if response.status_code == 200:
    #     with open(output_file, 'wb') as f:
    #         f.write(response.content)
    #     print("Video downloaded successfully.")
    # else:
    #     print("Error downloading video:", response.status_code)

         
    video = mp.VideoFileClip("static/video.mp4").subclip(timestamp1, timestamp2)
    count += 1

    # audio_file = video.audio 
    # audio_file.write_audiofile("static/audio.wav") 

    # r = sr.Recognizer() 
    video.write_videofile("static/video_clipped_{}.mp4".format(count), codec='libx264', audio_codec='aac')
    
    audio_model = whisper.load_model('base.en')
    option = whisper.DecodingOptions(language='en')
    text = audio_model.transcribe("static/video_clipped_{}.mp4".format(count))
    # with sr.AudioFile("static/audio.wav") as source: 
    #     data = r.record(source) 

    # text = r.recognize_google(data, language='en-US') 

    # print("\nThe resultant text from video is: \n") 
    # print(text) 
    text_data = []
    keywords_dict = {}
    text_data.append(text['text'])
    
    # openai.api_key = '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'

    # URL = "https://api.openai.com/v1/chat/completions"
    # prompt_template = "give me just the three to five most relevant (descending order of importance)  topics centered around the provided text. Remember, ONLY 3 to 5 topics and just the topics' names and nothing else in the output"

    # # # Replace placeholder with actual content
    # # name = "John"
    # # prompt = prompt_template.replace()


    # payload = {
    # "model": "gpt-3.5-turbo",
    # "prompt": prompt_template,
    # "messages": [{"role": "user", "content": text_data[0]}],
    # "temperature" : 1.0,
    # "top_p":1.0,
    # "n" : 1,
    # "stream": False,
    # "presence_penalty":0,
    # "frequency_penalty":0,
    # }

    # headers = {
    # "Content-Type": "application/json",
    # "Authorization": f"Bearer {openai.api_key}"
    # }

    # response = requests.post(URL, headers=headers, json=payload, stream=False)
    keywords_dict= {}
    keyword = keywords(text)
    keywords_dict['keywords'] = keyword
    return keywords_dict


def keywords(text):
       

    api_key = "9a839909811349021622ac51fbee62f7"

   
    text = "is do one type of machine learning, which is called supervised learning. Lets take a look at what that means. Supervised machine learning, or more commonly,"

 
    url = "https://api.meaningcloud.com/topics-2.0"


    params = {
        "key": api_key,
        "lang": "en",
        "txt": text
    }

 
    response = requests.post(url, data=params)
    fetched = []
    final = {}
    if response.status_code == 200:
   
        topics = response.json()["concept_list"]
        for topic in topics:
            fetched.append(topic["form"])
    else:
        print("Error:", response.text)
    
    final['keywords'] = fetched
    links = fetchRecommendations(fetched)
    final['recommendations']  = links
    return final

# @app.route('/fetchRecommendations', methods=['GET', 'POST'])
def fetchRecommendations(keywords):
    
    for word in keywords:
        videos_search = VideosSearch(word, limit=3)

        video_urls = []
        for video in videos_search.result()["result"]:
            video_urls.append(video["link"])

        # for url in video_urls:
            # print(url)
        return video_urls

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)









