from mtcnn.mtcnn import MTCNN
import cv2 
import os

import shutil

directory = "static/"
if(os.path.exists(directory)):
    shutil.rmtree(directory)
os.makedirs(directory)

def detect_faces(video_path):
    detector  = MTCNN()
    # print("Hi")
    interval = 60
    
    video_url = video_path
    cap = cv2.VideoCapture(video_url)


    frame_count = 0
    count = 0

    while cap.isOpened():
        
        ret, frame = cap.read()
        
        if ret != True:
            break
        
        current_time = frame_count / cap.get(cv2.CAP_PROP_FPS)
        
        
        if(current_time % interval == 0):
            
            
            result_list = detector.detect_faces(frame)
            for results in result_list:
                if(results['conf'] > 0.99):
                    x, y, width, height = results['box']
                    cropped_image = frame[y:y+height, x:x+width]
                    cv2.imwrite(os.path.join("detected_faces_videos", "static", frame, "{}".format(count)))
                    count += 1
                    
        
        # cv2.imshow('Video with Face Detection', frame)
        # if cv2.waitKey(1) & 0xFF == ord('q'):
        #     break  
        frame_count += 1
                
    cap.release()
    cv2.destroyAllWindows()