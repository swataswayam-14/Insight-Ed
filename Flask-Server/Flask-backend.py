from copy import copy
import chromadb
from flask import Flask, jsonify, request, render_template
import requests, pickle
import gdown 
import shutil
import math
from tqdm import tqdm

import json 
from mtcnn.mtcnn import MTCNN
import cv2 
import os

import shutil
import numpy as np

import google.generativeai as genai

import gensim
import os

import random
from youtubesearchpython import VideosSearch
import torchvision

import moviepy.editor as mp 
import speech_recognition as sr 

import pandas as pd
import openai
import whisper

import keras
from keras.models import Sequential
from keras.layers import Lambda, Dense

import torch
# import torchvision.transforms as transforms
from PIL import Image
from torchvision import transforms

import tensorflow as tf


from detect_faces_video import detect_faces

from transformers import pipeline

from chromadb import Documents, EmbeddingFunction, Embeddings
from PyPDF2 import PdfFileReader
import tempfile
from pathlib import Path

from flask_cors import CORS


from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI



from langchain import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

from langchain_google_genai import GoogleGenerativeAIEmbeddings

app = Flask(__name__)
CORS(app)

directory = "static/"
if(os.path.exists(directory)):
    shutil.rmtree(directory)
os.makedirs(directory)


api_key = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=api_key)

final = {}

model_ai = genai.GenerativeModel('gemini-pro')

class GeminiEmbeddingFunction(EmbeddingFunction):
  def __call__(self, input: Documents) -> Embeddings:
    model = 'models/embedding-001'
    title = "Custom query"
    return genai.embed_content(model=model,
                                content=input,
                                task_type="retrieval_document",
                                title=title)["embedding"]

    

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
    # print("uuid is:", uuid)
    url = "https://drive.google.com/uc?id={}".format(uuid)
    output_file = "static/video.mp4"  # Specify the name of the output file
    print(url)
    # print(timestamp1)
    # print(timestamp2)
    gdown.download(url, output_file, quiet=False)
    # response = requests.get(url))
    # with open("static/video.mp4", 'wb') as f:
    #     f.write(response.content)
        
    # cap = cv2.VideoCapture('demo-student.mp4')
    cap = cv2.VideoCapture('static/video.mp4')


    frame_count = 0
    count = 0
    timecount = []
    # unique_timecount = set()
    while True:
        
        ret, frame = cap.read()
        
        if ret != True:
            break
        
        current_time = frame_count / cap.get(cv2.CAP_PROP_FPS)
        
        # print(math.floor(current_time % interval) == 0)
        if(round(current_time, 1) % interval == 0):
            
            # print("Hi")
            print(round(current_time, 1))
            if round(current_time, 1) not in timecount:
                # continue
            
                result_list = detector.detect_faces(frame)
                for results in result_list:
                    if(results['confidence'] > 0.7):
                        print(results)
                        x, y, width, height = results['box']
                        cropped_image = frame[y:y+height, x:x+width]
                        cv2.imwrite(os.path.join("detected_faces_videos", "_{}.jpg".format(count)), cropped_image)
                
                        count += 1
                        timecount.append(round(current_time, 1))    
        
        # cv2.imshow('Video with Face Detection', frame)
        # if cv2.waitKey(1) & 0xFF == ord('q'):
        #     break  
        # timecount = set(timecount)
        frame_count += 1
                
    cap.release()
    cv2.destroyAllWindows()
    print(list(timecount))
    pickle.dump(timecount , open('students_timestamps_all.pkl', 'wb'))
 
def identifyImage(folder_path):
    
    dict = {}
    count = 0
    drowsiness = []
    emotion = []
    timestamps = []
    final = []
    time = pickle.load(open('students_timestamps_all.pkl', 'rb'))
    temp = []
    for img in tqdm(os.listdir(folder_path)):
        
        emt = []
        isDrowsiness = []
        timecount = []
        value = isDrowsy(os.path.join(folder_path, img))
        # value=random.randint(1,3)
        if(value == 1):
            # isDrowsiness.append("Yes")
            isDrowsyGeminiProVision.append("Yes")
            emt.append("N/A")
            timecount.append(time[count])
            temp.append((timecount, emt, isDrowsiness))
            
        elif(value == 0):
            
            isDrowsiness.append("N/A")
            # print(os.path.join(folder_path, img))
            # pred_emotions = emotions(os.path.join(folder_path, img))
            pred_emotions = EmotionGeminiProVision(os.path.join(folder_path, img))
            emt.append(pred_emotions)
            timecount.append(time[count])
            temp.append((timecount, emt, isDrowsiness))
        # emotion.append(emt)
        # drowsiness.append(isDrowsiness)
        # timestamps.append(time)
        
        # for key, value in zip(emotions, drowsiness, timestamps):
        #     dict[key] = value
        
        # dict['{}EmotionTimestamp_{}'.format(count)] = pred
      
        count += 1
        # break
        # i += 1
    final.append(temp)
    print(final)
    pickle.dump(final , open('students_timestamps_emotion_drowsiness.pkl', 'wb'))
    return final

def efficientnet_preprocessing(img):
    return keras.applications.efficientnet.preprocess_input(img)
    
    
def build_model():
    
    IMAGE_WIDTH = 600
    IMAGE_HEIGHT = 600
    IMAGE_CHANNELS = 3
    efficientnet = keras.applications.EfficientNetB7(include_top=False, input_shape = (IMAGE_WIDTH, IMAGE_HEIGHT,IMAGE_CHANNELS))
    model = Sequential()
    model.add(keras.Input(shape=(IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS)))

    for layer in efficientnet.layers:

        layer.trainable = False

    def efficientnet_preprocessing(img):
        return keras.applications.efficientnet.preprocess_input(img)

    model.add(Lambda(efficientnet_preprocessing))
    model.add(efficientnet)
    model.add(tf.keras.layers.GlobalAveragePooling2D())
    model.add(Dense(1, activation='sigmoid'))
    return model

model = build_model()
model.load_weights('my_checkpoint.weights.h5')
    

def isDrowsyGeminiProVision(image_path):
    
    llm_vision = ChatGoogleGenerativeAI(model="gemini-pro-vision",google_api_key=api_key)

    message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": "Just output the word 'YES' of the person in the image is feeling 'sleepy' or 'drowsy' else output 'NO' if not.",
        },
        {"type": "image_url", "image_url": "{}".format(image_path)},
    ]
)
    answer = llm_vision.invoke([message]).content
    return answer

def EmotionGeminiProVision(image_path):
    
    llm_vision = ChatGoogleGenerativeAI(model="gemini-pro-vision",google_api_key=api_key)

    message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": "Just output the classification of the emotion of the human face in the image.",
        },
        {"type": "image_url", "image_url": "{}".format(image_path)},
    ]
)
    answer = llm_vision.invoke([message]).content
    return answer


def isDrowsy(file_path):
    
    print(file_path)
    img = tf.keras.utils.load_img(file_path, target_size=(600, 600))
    img_array = tf.keras.utils.img_to_array(img)
    expanded_img = np.expand_dims(img_array,axis=0)
    # preprocessed_img = tf.keras.applications.efficientnet.preprocess_input(expanded_img)
  
    print(model.summary())
    result = model.predict(expanded_img, verbose=0)
    # pred = np.argmax(result, axis=1)
    if result[0] > 0.5 :
        pred = 1
    else:
        pred = 0
    print(result)
    return pred


pipe = pipeline("image-classification", model="jayanta/vit-base-patch16-224-in21k-emotion-detection")

def emotions(file_path):

    
    # image = cv2.imread("/content/sad.jpeg")
    y_pred = pipe.predict(file_path)
    # print(y_pred)
    return y_pred[0]['label']


@app.route('/speechAndKeywordsEmotionDrwosiniess', methods=['GET', 'POST'])
def speechRecognition():

    data = pickle.load(open('students_timestamps_emotion_drowsiness.pkl', 'rb'))
    print(data)
    count = 0
    full_path = request.full_path


    query_parameter = full_path.split('query=')[1]

    directory = "static/"
    shutil.rmtree(directory)
    os.makedirs(directory)


    uuid = query_parameter.split('&')[0].split("/")[5]
    print(uuid)
    url = "https://drive.google.com/uc?id={}".format(uuid)
    output_file = "static/video.mp4" 
    print(url)

    gdown.download(url, output_file, quiet=False)

    topics = []
    timecount = []
    temp =  []
    # for i in data
    while(count + 1 < len(data[0])):
        timestamp1 = data[0][count][0]
        timestamp2 = data[0][count + 1][0]
        print(timestamp1)
        print(timestamp2)
        video = mp.VideoFileClip("static/video.mp4").subclip(timestamp1, timestamp2)

        video.write_videofile("static/video_clipped_{}.mp4".format(count), codec='libx264', audio_codec='aac')
        
        audio_model = whisper.load_model('base.en')
        option = whisper.DecodingOptions(language='en')
        text = audio_model.transcribe("static/video_clipped_{}.mp4".format(count))

        topics.append(keywords(text['text']))
        timecount.append((timestamp1, timestamp2))
    
        temp.append((timecount, topics))
        count += 1
    final= {}

    final['result'] = temp
    return final



@app.route('/speechAndKeywordsIndividualParts', methods=['GET', 'POST'])
def speechRecognitionIndividualParts():

   
    count = 0
    full_path = request.full_path


    query_parameter = full_path.split('query=')[1]
    timestamp1 = query_parameter.split('&')[1]
    timestamp2 = query_parameter.split('&')[2]

    directory = "static/"
    shutil.rmtree(directory)
    os.makedirs(directory)

    uuid = query_parameter.split('&')[0].split("/")[5]
    print(uuid)
    url = "https://drive.google.com/uc?id={}".format(uuid)
    output_file = "static/video.mp4"
    print(url)
    print(timestamp1)
    print(timestamp2)
    gdown.download(url, output_file, quiet=False)

         
    video = mp.VideoFileClip("static/video.mp4").subclip(timestamp1, timestamp2)
    count += 1

    video.write_videofile("static/video_clipped_{}.mp4".format(count), codec='libx264', audio_codec='aac')
    
    audio_model = whisper.load_model('base.en')
    option = whisper.DecodingOptions(language='en')
    text = audio_model.transcribe("static/video_clipped_{}.mp4".format(count), language='en')

    text_data = []
    keywords_dict = {}
    text_data.append(text['text'])
  
    keywords_dict= {}
    keyword = keywords(text)
    keywords_dict['keywords'] = keyword
    return keywords_dict


@app.route('/speechAndKeywordsFullOneShot', methods=['GET', 'POST'])
def speechRecognitionFullOneShot():

    timecount = []
    count = 0
    full_path = request.full_path
    topics = []

    query_parameter = full_path.split('query=')[1]
    interval = query_parameter.split('&')[1]

    directory = "static/"
    shutil.rmtree(directory)
    os.makedirs(directory)

    uuid = query_parameter.split('&')[0].split("/")[5]
    print(uuid)
    url = "https://drive.google.com/uc?id={}".format(uuid)
    output_file = "static/video.mp4"  
    print(url)

    gdown.download(url, output_file, quiet=False)

    video = mp.VideoFileClip("static/video.mp4")
    length = video.duration
    timestamp2 = 0
    timestamp1 = 0
    interval = int(interval)
    temp = []

    while((timestamp1 + interval) < int(length)):

        timestamp1 += interval
        clip = video.subclip(timestamp2, timestamp1)
        
        clip.write_videofile("static/video_clipped_{}.mp4".format(count), codec='libx264', audio_codec='aac')
        
        audio_model = whisper.load_model('base.en')
        option = whisper.DecodingOptions(language='en')
        text = audio_model.transcribe("static/video_clipped_{}.mp4".format(count), language='en')

        keywords_now = keywords(text['text'])['keywords']
        topics.append((timestamp1, timestamp2, keywords_now))

        timestamp2 = timestamp1  

        count += 1
        temp.append(topics)

    final = {}
    final['result'] = temp

    return final


from chromadb.config import Settings

def create_chromadb(list_of_words, timestamps):

    
    client = chromadb.PersistentClient(path="vectorSearchForSearchWithinVideo")
    # client.delete_collection(name='embeddings_topics_for_search_within_video')
    chroma_db = client.get_or_create_collection('embeddings_topics_for_search_within_video', embedding_function=GeminiEmbeddingFunction())
    
    for i, d in enumerate(list_of_words):

        chroma_db.add(
            documents=d,
            ids = str(i),
            metadatas={'Timestamp_{}'.format(i): str(timestamps[i][0]) + '_' + str(timestamps[i][1])}
        )

    return chroma_db


  
@app.route('/searchWitihinVideo', methods=['GET', 'POST'])
def searchWithinVideo():

    if os.path.exists('topics_videosearch.pkl'):
        os.remove('topics_videosearch.pkl')
    if os.path.exists('timestamps_videosearch.pkl'):
        os.remove('timestamps_videosearch.pkl')
        
    count = 0
    stride = 20
    full_path = request.full_path


    timestamp1 = 0
    timestamp2 = 0
    query = ' '.join(full_path.split('&')[1].split("%20"))
    num = int(full_path.split('&')[2])
    print(query)
    print(num)

    directory = "static/"
    shutil.rmtree(directory)
    os.makedirs(directory)

    query_parameter = full_path.split('query=')[1]
    uuid = query_parameter.split('&')[0].split("/")[5]
    print(uuid)
    url = "https://drive.google.com/uc?id={}".format(uuid)
    output_file = "static/video.mp4"  
    print(url)

    gdown.download(url, output_file, quiet=False)
    video = mp.VideoFileClip("static/video.mp4")
    
    temp = []
    topics = []
    timecount=  []
    while((timestamp1 + stride) < int(video.duration)):
        
        timestamp1 += stride
        clip = video.subclip(timestamp2, timestamp1)

        clip.write_videofile("static/video_clipped_{}.mp4".format(count), codec='libx264', audio_codec='aac')
        
        audio_model = whisper.load_model('base.en')
        # option = whisper.DecodingOptions(language='en')
        text = audio_model.transcribe("static/video_clipped_{}.mp4".format(count), language='en')

        topics.append(' '.join(keywords(text['text'])['keywords']))
        timecount.append([timestamp2, timestamp1])

        timestamp2 = timestamp1  
       
        print(timestamp1)
        print(timestamp2)
        count += 1
        temp.append(timecount)
        
    pickle.dump(topics, open('topics_videosearch.pkl', 'wb'))
    pickle.dump(timecount, open('timestamps_videosearch.pkl', 'wb'))
    print(timecount)
    print(topics)
    chroma_db = create_chromadb(topics, timestamps=timecount)
    print(pd.DataFrame(chroma_db.peek()))
    print(pd.DataFrame(chroma_db.get()))

    result = chroma_db.query(query_texts=[query], n_results=num)
  
    # json_data = '{"data":null,"distances":[[0.08081431700730621,0.10110898726031427,0.1663002628724509]],"documents":[["Machine Learning Prediction","Machine Learning Supervised Learning","Machine learning Supervised learning Label"]],"embeddings":null,"ids":[["3","0","2"]],"metadatas":[[{"Timestamp_3":"60_80"},{"Timestamp_0":"0_20"},{"Timestamp_2":"40_60"}]],"uris":null}'


    data = json.loads(result)

 
    timestamps = []
    for metadata in data.get("metadatas", []):
        for timestamp in metadata:
            timestamps.extend(timestamp.values())
            
    return timestamps
        
        
        
# @app.route('/generateQuestionnaireFromAssignment', methods=['GET','POST'])
# def generateQuestionnaire():


#     full_path = request.full_path

#     # Extract the 'query' parameter from the full path
#     query_parameter = full_path.split('query=')[1]
#     grade = full_path.split('&')[1]
#     print(grade)
    
#     directory = "static/"
#     shutil.rmtree(directory)
#     os.makedirs(directory)

#     # url = query_parameter.split('&')[0]
#     uuid = query_parameter.split('&')[0].split("/")[5]
#     print(uuid)
#     url = "https://drive.google.com/uc?id={}".format(uuid)
#     output_file = "static/video.mp4"  # Specify the name of the output file
#     print(url)

#     gdown.download(url, output_file, quiet=False)

#     audio_model = whisper.load_model('base.en')
#     option = whisper.DecodingOptions(language='en')
#     text = audio_model.transcribe("static/video.mp4", language='en')

#     text_data = []
#     text_data.append(text['text'])
#     response = model_ai.generate_content(
#         '''
#         Generate a mcq consisting of 10 questions on the given content for a {}th grader. DO NOT try to bold any text or numbers with NO HEADING PRECEDONG the questions. The content is {}.
#         '''.format(grade, text['text']),
        
#     generation_config={
#           # "max_output_tokens": 2048,
#           "temperature": 0.5,
#           "top_p": 1
#       },
          
#     )
    
  
#     return response.text.split("\n")

    
    
def keywords(text):
       

 
    response = model_ai.generate_content('''
    Return ONLY 2-3 most relavant keywords which summarizes, has essence and captures semantic meaning of the following as instructed for the following -{}. Just generate the Keywords and DO NOT BOLD THEM OR APPLY ANY NUMBER PRECEDING THEM.
    '''
    .format(text),
          generation_config={
          # "max_output_tokens": 2048,
          "temperature": 0.9,
          "top_p": 1
      },

      ),
    # print(response)
    # print(response.text)
    # fetched = response['result']['candidates'][0]['content']['parts'][0]['text']
    response_dict = response[0]._result
    candidates = response_dict.candidates
    # fetched = candidates[0]['content']['parts'][0]['text']
    # Extracting text
    if candidates:
    # Assuming candidates is a list
        candidate = candidates[0]
        parts = candidate.content.parts
        if parts:
            fetched = parts[0].text
            # print(text)
    final['keywords'] = fetched.split("\n")
    links = fetchRecommendations(fetched)
    final['recommendations']  = links
    print(final)
    return final


def setUpLangChainWithGemini():
    llm = ChatGoogleGenerativeAI(model="gemini-pro",google_api_key=api_key,temperature=0.2,convert_system_message_to_human=True)
    return llm


def setUpLangChainWithGeminiVision():

    llm_vision = ChatGoogleGenerativeAI(model="gemini-pro-vision",google_api_key=api_key,temperature=0.2,convert_system_message_to_human=True)
    return  llm_vision


def perform_ocr(image_path):
    
    llm = ChatGoogleGenerativeAI(model="gemini-pro-vision",google_api_key=api_key, temperature=0.2, max_output_tokens=4096)
# example
    message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": "You excel at extracting text from the images. Extract the full content of the image provided.",
        },
        {"type": "image_url", "image_url": "{}".format(image_path)},
    ]
)
    content = llm.invoke([message]).content
    return content


def separate_pdf_and_ocr(pdf_path):

    ocr_result = []
    
    with open(pdf_path, 'rb') as pdf_file:
   
        pdf_reader = PdfFileReader(pdf_file)
        
       
        for page_num in range(pdf_reader.numPages):
          
            page = pdf_reader.getPage(page_num)
            
            image_path = page_to_image(page)
            
         
            ocr_result.append(perform_ocr(image_path))
          
    return ocr_result


# Handle an instance where when the user is done, those file gets deleted
def page_to_image(page):
    
    save_dir = "static/notes/Handwriten/images"
    image = page.to_image()

    image = image.convert('RGB')
 
    image_path = os.path.join(save_dir, 'image.png')

   
    with open(image_path, 'wb') as image_file:
        image.save(image_file, format='PNG')
    
    return image_path


@app.route('/qnabotHandwritten', methods=['POST'])
def ragBasedQnABotHandwritten():
    
    
    chroma_db_path = "chroma_db_qnabotHandwritten.pkl"
    llm_vision = setUpLangChainWithGeminiVision()
    llm = setUpLangChainWithGemini()
    
    
    if os.path.exists(chroma_db_path):
    # Load the existing Chroma instance
        vector_index = Chroma.load(chroma_db_path)
        
        template = """
        Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Keep the answer as concise as possible.
        {context}
        Question: {question}
        Helpful Answer:

        """
        QA_CHAIN_PROMPT = PromptTemplate.from_template(template)
        qa_chain = RetrievalQA.from_chain_type(
            llm,
            retriever=vector_index,
            # return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )
        result = qa_chain({"query": question})
        return result["result"]
    
    else:
        
        full_path = request.full_path

        directory = "static/notes/"
        directory2 = "static/notes/Handwriten/images"
        if os.path.exists(directory):
            shutil.rmtree(directory)
            os.makedirs(directory)
        else:
            os.makedirs(directory)
            
        
        if os.path.exists(directory2):
            shutil.rmtree(directory2)
            os.makedirs(directory2)
        else:
            os.makedirs(directory2)
            
        
        # query_parameter = full_path.split('query=')[1]
        # uuid = query_parameter.split('&')[0].split("/")[5]
        # question = query_parameter.split('&')[1]
        # print(uuid)
         # full_path = request.full_path
        # query_parameter = full_path.split('query=')[1]
        # uuid = query_parameter.split('&')[0].split("/")[5]
        data = request.get_json()
        question = data.get('message')
        uuid = data.get('url').split("/")[5]
        url = "https://drive.google.com/uc?id={}".format(uuid)
        output_file = "static/notes/notesHandwritten.pdf"  # Specify the name of the output file
        print(url)

        gdown.download(url, output_file, quiet=False)
        
        llm = setUpLangChainWithGemini()
        # pdf_loader = PyPDFLoader("/static/notes/notesHandwritten.pdf")
        # pages = pdf_loader.load_and_split()
        # print(pages[3].page_content)
        # text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
        # context = "\n\n".join(str(p.page_content) for p in pages)
        # texts = text_splitter.split_text(context)
        pdf_path = "static/notes/notesHandwritten.pdf"
        texts = separate_pdf_and_ocr(pdf_path)
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001",google_api_key=api_key)
        vector_index = Chroma.from_texts(texts, embeddings).as_retriever(search_kwargs={"k":3})
        vector_index.save(chroma_db_path)
        
        
        template = """
            Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Keep the answer as concise as possible.
            {context}
            Question: {question}
            Helpful Answer:
        
        """
        QA_CHAIN_PROMPT = PromptTemplate.from_template(template)
        qa_chain = RetrievalQA.from_chain_type(
            llm,
            retriever=vector_index,
            # return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )
        result = qa_chain({"query": question})
        return result["result"]
    
    
   
@app.route('/qnabotNonHandwritten', methods=['POST'])
def ragBasedQnABotNonHandwritten():
    
    chroma_db_path = "chroma_db_qnabotNonHandwritten.pkl"
    llm = setUpLangChainWithGemini()
    
    
    if os.path.exists(chroma_db_path):
    # Load the existing Chroma instance
        vector_index = Chroma.load(chroma_db_path)
        
        template = """
        Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Keep the answer as concise as possible.
        {context}
        Question: {question}
        Helpful Answer:

        """
        QA_CHAIN_PROMPT = PromptTemplate.from_template(template)
        qa_chain = RetrievalQA.from_chain_type(
            llm,
            retriever=vector_index,
            # return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )
        result = qa_chain({"query": question})
        return result["result"]
    
    else:
        
        full_path = request.full_path

        directory = "static/notes/"
        if os.path.exists(directory):
            shutil.rmtree(directory)
            os.makedirs(directory)
        else:
            os.makedirs(directory)
            
            
        # query_parameter = full_path.split('query=')[1]
        # uuid = query_parameter.split('&')[0].split("/")[5]
        # question = query_parameter.split('&')[1]
         # full_path = request.full_path
        # query_parameter = full_path.split('query=')[1]
        # uuid = query_parameter.split('&')[0].split("/")[5]
        data = request.get_json()
        question = data.get('message')
        uuid = data.get('url').split("/")[5]
        print(uuid)
        url = "https://drive.google.com/uc?id={}".format(uuid)
        output_file = "static/notes/notesNonHandwritten.pdf"  # Specify the name of the output file
        print(url)

        gdown.download(url, output_file, quiet=False)
        
        llm = setUpLangChainWithGemini()
        pdf_loader = PyPDFLoader("/static/notes/notesNonHandwritten.pdf")
        pages = pdf_loader.load_and_split()
        # print(pages[3].page_content)
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
        context = "\n\n".join(str(p.page_content) for p in pages)
        texts = text_splitter.split_text(context)

        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001",google_api_key=api_key)
        vector_index = Chroma.from_texts(texts, embeddings).as_retriever(search_kwargs={"k":3})
        vector_index.save(chroma_db_path)
        
        
        template = """
            Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Keep the answer as concise as possible.
            {context}
            Question: {question}
            Helpful Answer:
        
        """
        QA_CHAIN_PROMPT = PromptTemplate.from_template(template)
        qa_chain = RetrievalQA.from_chain_type(
            llm,
            retriever=vector_index,
            # return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )
        result = qa_chain({"query": question})
        return result["result"]



def  VideoTranscriptEmbeddingsAndQuery(uuid, question):
    
    
    chroma_db_path = "chroma_db_qnabotVideo.pkl"
    llm = setUpLangChainWithGemini()
    
    
    if os.path.exists(chroma_db_path):
    # Load the existing Chroma instance
        vector_index = Chroma.load(chroma_db_path)
        
        template = """
        Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Keep the answer as concise as possible.
        {context}
        Question: {question}
        Helpful Answer:

        """
        QA_CHAIN_PROMPT = PromptTemplate.from_template(template)
        qa_chain = RetrievalQA.from_chain_type(
            llm,
            retriever=vector_index,
            # return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )
        result = qa_chain({"query": question})
        return result["result"]
    
    else:
        #condiiton t check if vector database exists or not then only proceed with following
        url = "https://drive.google.com/uc?id={}".format(uuid)
        output_file = "static/docs/notesHandwritten.pdf"  # Specify the name of the output file
        print(url)

        gdown.download(url, output_file, quiet=False)
        audio_model = whisper.load_model('base.en')
        text = audio_model.transcribe("static/video.mp4", language='en')
        result = text["text"]
        
        llm = setUpLangChainWithGemini()
        # pdf_loader = PyPDFLoader("/static/notes/notesNonHandwritten.pdf")
        # pages = pdf_loader.load_and_split()
        # print(pages[3].page_content)
        # text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
        # context = "\n\n".join(str(p.page_content) for p in pages)
        # texts = text_splitter.split_text(context)

        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001",google_api_key=api_key)
        vector_index = Chroma.from_texts(result, embeddings).as_retriever(search_kwargs={"k":2})
        vector_index.save(chroma_db_path)
        
        template = """
            Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Keep the answer as concise as possible.
            {context}
            Question: {question}
            Helpful Answer:
        
        """
        QA_CHAIN_PROMPT = PromptTemplate.from_template(template)
        qa_chain = RetrievalQA.from_chain_type(
            llm,
            retriever=vector_index,
            # return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )
        result = qa_chain({"query": question})
        return result["result"]

    
@app.route('/qnabotVideo', methods=['POST'])
def ragBasedQnABotVideo():
    
    # full_path = request.full_path
    # query_parameter = full_path.split('query=')[1]
    # uuid = query_parameter.split('&')[0].split("/")[5]
    data = request.get_json()
    question = data.get('message')
    uuid = data.get('url').split("/")[5]
    # question = query_parameter.split('&')[1]
    answer = VideoTranscriptEmbeddingsAndQuery(uuid, question)
    return answer
    
    
    
    
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









