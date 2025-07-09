import { useEffect } from 'react'
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'

// Attempt at a custom hook...
export function useVoiceRecognition(onResult){
    // website dependency link = https://www.npmjs.com/package/react-speech-recognition
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

    // Callback once listening stops. 
    useEffect(() =>{
        if(!listening && transcript.trim() !== ''){
            onResult(transcript.trim())
        }
    },[listening, transcript, onResult])
    function start(){
        resetTranscript()
        SpeechRecognition.startListening({ continous : false })
    }
    return { start, listening, browserSupportsSpeechRecognition}
}