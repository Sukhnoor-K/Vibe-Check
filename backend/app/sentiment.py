from transformers import pipeline

emotion_classifier = pipeline(
    "text-classification",
    model="SamLowe/roberta-base-go_emotions", # used this model because of environment issues regarding torch update
    top_k=1
)


def get_emotion(text):
    result = emotion_classifier(text)[0][0]  # top emotion
    return result['label']  # returns e.g., "joy", "anger", etc.
