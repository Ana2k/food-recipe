import React,{ useEffect } from 'react'
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import '../styles/voiceAssistant.css'
// Attempt at a custom hook...
export function useVoiceRecognition({onResult}){
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

    // Kick-off one single non-continous recording session.
    const startListening = () => {
        resetTranscript()
        SpeechRecognition.startListening({ continous : false})
    }

    return {
        listening,
        startListening,
        browserSupportsSpeechRecognition
    }
}

// Voice Button Component
export function VoiceButton({onResult}) {
    const { listening, startListening, browserSupportsSpeechRecognition } = useVoiceRecognition({onResult})

    if(!browserSupportsSpeechRecognition){
        // If the browser does not support we can perhaps add a message saying 
        // This is only supported in chrome - try a web-prompt....
        return (
            <div className="mic-browser-not-supported">
                Speech recognition only supported by Chrome, Safari.
            </div>
        )
    }
    return (
        <button
            className={listening ? 'mic mic--listening' : 'mic'}
            onClick={startListening}
            aria-label = {listening ? 'Listening.. \n Click to restart' : 'Click to speak..'}
        >
        🎤︎
        </button>
    )
}